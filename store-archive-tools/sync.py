"""Mirror active public stores only. Python 3.10+; stdlib only."""
import hashlib
import json
import os
import re
import shutil
import tempfile
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib import error, parse, request

DEFAULT_ORIGIN = "https://ddm-store-log-lyu.vercel.app"
RANGE_BYTES = 512 * 1024
FORMAT = "store-archive/v1"
UUID = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}")
EXTENSIONS = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
MAX_PHOTO = 10 * 1024 * 1024


class InconsistentSnapshot(Exception):
    pass


class NoRedirects(request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError("Source redirected; check STORE_ARCHIVE_ORIGIN")


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + "\n").encode()


def sha(data):
    return hashlib.sha256(data).hexdigest()


def validate_origin(origin):
    url = parse.urlsplit(origin)
    if (url.scheme != "https" or not url.hostname or url.username or url.password
            or url.query or url.fragment or url.path not in ("", "/")):
        raise ValueError("Set STORE_ARCHIVE_ORIGIN to an HTTPS origin without a path or credentials")
    return origin.rstrip("/")


class Source:
    def __init__(self, origin):
        self.origin = validate_origin(origin)
        self._local = threading.local()

    def get(self, path, limit, etag=None, extra_headers=None):
        # Construct paths here; never follow a URL contained in a public store.
        headers = {"User-Agent": "StoreArchiveSync/1.0", "Cache-Control": "no-cache", "Accept-Encoding": "identity"}
        if extra_headers:
            headers.update(extra_headers)
        if etag:
            headers["If-None-Match"] = etag
        req = request.Request(self.origin + path, headers=headers)
        if not hasattr(self._local, "opener"):
            self._local.opener = request.build_opener(NoRedirects())
        for attempt in range(3):
            try:
                with self._local.opener.open(req, timeout=30) as response:
                    content = response.read(limit + 1)
                    valid_status = response.status == 200 or (response.status == 206 and "Range" in headers)
                    if not valid_status or len(content) > limit:
                        raise ValueError("Unexpected or oversized response for " + path)
                    return response.status, response.headers, content
            except error.HTTPError as exc:
                if exc.code == 304 and etag:
                    return 304, exc.headers, b""
                if exc.code == 404 and path.startswith("/api/photos/"):
                    raise InconsistentSnapshot("Photo disappeared during synchronization") from exc
                if exc.code not in (408, 429, 500, 502, 503, 504) or attempt == 2:
                    raise RuntimeError(f"Source returned HTTP {exc.code} for {path}") from exc
            except (error.URLError, TimeoutError):
                if attempt == 2:
                    raise
            time.sleep(2 ** attempt)
        raise RuntimeError("Unreachable")

    def page(self, number):
        status, headers, data = self.get(f"/api/stores?sort=latest&page={number}", 4 * 1024 * 1024)
        if headers.get_content_type() != "application/json":
            raise ValueError("Source did not return a public store list")
        return json.loads(data)

    def photo(self, photo, etag):
        path = f"/api/photos/{photo['id']}"
        expected_size = photo["size"]
        chunks = []
        first_headers = None
        first_etag = None
        for start in range(0, expected_size, RANGE_BYTES):
            end = min(start + RANGE_BYTES, expected_size) - 1
            request_headers = {"Range": f"bytes={start}-{end}"}
            if start and first_etag:
                request_headers["If-Range"] = first_etag
            status, headers, data = self.get(path, expected_size, etag if start == 0 else None,
                                             request_headers)
            if status == 304 and start == 0:
                return status, headers, data
            if status == 200 and start == 0:
                # A source may ignore Range for small files. fetch_image validates the full image.
                return status, headers, data
            if status != 206 or headers.get("Content-Range") != f"bytes {start}-{end}/{expected_size}":
                raise InconsistentSnapshot("Missing or inconsistent photo range")
            if len(data) != end - start + 1 or headers.get_content_type() != photo["mime"]:
                raise InconsistentSnapshot("Incomplete photo range")
            if first_headers is None:
                first_headers, first_etag = headers, headers.get("ETag")
            elif headers.get("ETag") != first_etag:
                raise InconsistentSnapshot("Photo changed between range requests")
            chunks.append(data)
        return 200, first_headers, b"".join(chunks)


def require_id(value):
    if not isinstance(value, str) or not UUID.fullmatch(value):
        raise ValueError("Invalid store/photo ID")
    return value


def normalize_store(row):
    require_id(row["id"])
    if row.get("deletedAt") is not None:
        raise ValueError("The public store list unexpectedly included a deleted record")
    record = {key: row[key] for key in ("id", "name", "unit", "building", "floor", "createdAt", "updatedAt", "version")}
    if not all(isinstance(record[key], str) for key in ("name", "unit", "building", "floor", "createdAt")):
        raise ValueError("Incomplete store metadata")
    if not isinstance(record["version"], int) or record["version"] < 0:
        raise ValueError("Invalid record revision")
    if not isinstance(row["photos"], list) or not 1 <= len(row["photos"]) <= 10:
        raise ValueError("Incomplete store photos")
    record["photos"] = []
    for image in row["photos"]:
        pid = require_id(image["id"])
        if (image["mime"] not in EXTENSIONS or not isinstance(image["size"], int)
                or not 0 < image["size"] <= MAX_PHOTO or not isinstance(image["name"], str)):
            raise ValueError("Invalid photo metadata")
        if image["url"] != "/api/photos/" + pid:
            raise ValueError("Unexpected photo path")
        record["photos"].append({key: image[key] for key in ("id", "name", "size", "mime", "url")})
    return record


def snapshot(source):
    records, photo_ids = {}, set()
    total = size = None
    page = 1
    while True:
        body = source.page(page)
        if page == 1:
            total, size = body["total"], body["pageSize"]
            if type(total) is not int or total < 0 or type(size) is not int or not 1 <= size <= 100:
                raise ValueError("Invalid pagination")
        expected = min(size, max(0, total - (page - 1) * size))
        if (body.get("page") != page or body.get("pageSize") != size or body.get("total") != total
                or body.get("stats", {}).get("stores") != total or not isinstance(body.get("items"), list)
                or len(body["items"]) != expected):
            raise InconsistentSnapshot("The public list changed during pagination")
        for item in body["items"]:
            row = normalize_store(item)
            if row["id"] in records:
                raise InconsistentSnapshot("Duplicate store across pages")
            records[row["id"]] = row
            for image in row["photos"]:
                if image["id"] in photo_ids:
                    raise InconsistentSnapshot("Duplicate photo ID")
                photo_ids.add(image["id"])
        if len(records) == total:
            if body.get("stats", {}).get("photos") != len(photo_ids):
                raise InconsistentSnapshot("Incomplete photo inventory")
            return records
        page += 1


def read_previous(path, origin):
    if not path.exists():
        return None
    if path.is_symlink() or not path.is_dir():
        raise ValueError("Unexpected archive directory")
    manifest = path / "manifest.json"
    if not manifest.is_file() or manifest.is_symlink():
        raise ValueError("Refusing to replace an unmanaged data/store-archive directory")
    entry = json.loads(manifest.read_bytes())
    if entry.get("format") != FORMAT or entry.get("origin") != origin:
        raise ValueError("Existing archive has a different format or source")
    return entry


def old_photo(old_path, row, image):
    entry_path = old_path / "stores" / row["id"] / "record.json"
    if not entry_path.is_file() or entry_path.is_symlink() or not entry_path.resolve().is_relative_to(old_path):
        return None, None
    previous = json.loads(entry_path.read_bytes())
    match = next((p for p in previous.get("photos", []) if p["id"] == image["id"]), None)
    if not match or match["size"] != image["size"] or match["mime"] != image["mime"]:
        return None, None
    cached = entry_path.parent / "photos" / (image["id"] + EXTENSIONS[image["mime"]])
    if (not cached.is_file() or cached.is_symlink() or not cached.resolve().is_relative_to(old_path)
            or cached.stat().st_size != image["size"] or sha(cached.read_bytes()) != match.get("sha256")):
        return None, None
    return cached, match


def fetch_image(source, row, image, old_path, new_dir):
    cached, previous = old_photo(old_path, row, image)
    status, headers, data = source.photo(image, previous.get("etag") if previous else None)
    rel = "photos/" + image["id"] + EXTENSIONS[image["mime"]]
    target = new_dir / rel
    target.parent.mkdir(exist_ok=True)
    if status == 304:
        if cached is None:
            raise ValueError("Source returned 304 without a verified local image")
        shutil.copyfile(cached, target)
        digest = previous["sha256"]
        etag = previous.get("etag")
    else:
        if status != 200 or len(data) != image["size"] or headers.get_content_type() != image["mime"]:
            raise InconsistentSnapshot("Photo response and record metadata differ")
        if image["mime"] == "image/jpeg":
            signature = data.startswith(b"\xff\xd8\xff")
        elif image["mime"] == "image/png":
            signature = data.startswith(b"\x89PNG\r\n\x1a\n")
        else:
            signature = data.startswith(b"RIFF") and data[8:12] == b"WEBP"
        if not signature:
            raise ValueError("Downloaded file is not the expected image type")
        target.write_bytes(data)
        digest = sha(data)
        etag = headers.get("ETag")
    return {**image, "path": rel, "sha256": digest, "etag": etag}


def synchronize(source, root, clock=None):
    data_dir = root.resolve() / "data"
    if data_dir.is_symlink():
        raise ValueError("Refusing symlinked data directory")
    data_dir.mkdir(exist_ok=True)
    archive = data_dir / "store-archive"
    previous = read_previous(archive, source.origin)
    before = snapshot(source)
    with tempfile.TemporaryDirectory(prefix=".store-archive-stage-", dir=root) as temp:
        tmp = Path(temp)
        staged = tmp / "new"
        staged.mkdir()
        ordered_ids = sorted(before)
        tasks = []
        for store_id in ordered_ids:
            record = before[store_id]
            folder = staged / "stores" / store_id
            folder.mkdir(parents=True)
            tasks.extend((record, image, folder) for image in record["photos"])
        # Wait for all running downloads to stop before the temporary directory is removed.
        # map preserves input order even when downloads finish out of order.
        with ThreadPoolExecutor(max_workers=4) as executor:
            images = list(executor.map(
                lambda task: fetch_image(source, task[0], task[1], archive, task[2]), tasks))
        image_iter = iter(images)
        index = []
        for store_id in ordered_ids:
            record = before[store_id]
            folder = staged / "stores" / store_id
            images = [next(image_iter) for _ in record["photos"]]
            contents = json_bytes({**record, "photos": images})
            (folder / "record.json").write_bytes(contents)
            index.append({"id": store_id, "version": record["version"], "recordSha256": sha(contents)})
        after = snapshot(source)
        if before != after:
            raise InconsistentSnapshot("Records changed while downloading photos")
        digest = sha(json_bytes(index))
        now = (clock or (lambda: datetime.now(timezone.utc).isoformat()))()
        synchronized_at = (previous["syncedAt"] if previous and previous.get("snapshotSha256") == digest else now)
        manifest = {"format": FORMAT, "origin": source.origin, "syncedAt": synchronized_at,
                    "snapshotSha256": digest, "storeCount": len(index),
                    "photoCount": sum(len(r["photos"]) for r in before.values()), "records": index}
        (staged / "manifest.json").write_bytes(json_bytes(manifest))
        backup = tmp / "previous"
        if archive.exists():
            archive.rename(backup)
        try:
            staged.rename(archive)
        except BaseException:
            if backup.exists():
                backup.rename(archive)
            raise
    return manifest


def main():
    origin = os.getenv("STORE_ARCHIVE_ORIGIN") or DEFAULT_ORIGIN
    source = Source(origin)
    for attempt in range(3):
        try:
            result = synchronize(source, Path.cwd())
            print(f"Verified {result['storeCount']} stores and {result['photoCount']} photos.")
            return
        except InconsistentSnapshot:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)


if __name__ == "__main__":
    main()
