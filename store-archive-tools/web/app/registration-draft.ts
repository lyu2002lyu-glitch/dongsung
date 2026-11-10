// A tab owns one unfinished registration. Keep only its small recovery hint in
// sessionStorage so typing a unit commits immediately, even before the camera opens.
const HINT_KEY = 'store.registration.draft.v1';
const DB_NAME = 'store-registration-drafts-v1';
const TABLE = 'photos';
const TTL = 24 * 60 * 60 * 1000;
const READ_TIMEOUT = 2000;

type Photo = { blob: Blob; name: string };
type Hint = { key: string; unit: string; requestId: string; version: number; count: number; expires: number };
type PhotoRecord = { key: string; version: number; expires: number; photos: Photo[] };

function readHint(): Hint | undefined {
  try {
    const raw = sessionStorage.getItem(HINT_KEY);
    if (!raw) return;
    const value: Hint = JSON.parse(raw);
    if (value && typeof value.key === 'string' && typeof value.unit === 'string' &&
        typeof value.requestId === 'string' && Number.isInteger(value.version) &&
        Number.isInteger(value.count) && value.expires > Date.now()) return value;
    sessionStorage.removeItem(HINT_KEY);
  } catch { /* Private browsing can disable local storage. */ }
}

export function hasRegistrationDraftHint() { return !!readHint(); }

function accessPhotos<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    let database: IDBDatabase | undefined;
    let transaction: IDBTransaction | undefined;
    let finished = false;
    const timer = setTimeout(() => {
      try { transaction?.abort(); } catch { /* Transaction already ended. */ }
      fail();
    }, mode === 'readwrite' ? 6000 : READ_TIMEOUT);
    function fail() {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      database?.close();
      reject(new Error('draft storage unavailable'));
    }
    try {
      const opening = indexedDB.open(DB_NAME, 1);
      opening.onupgradeneeded = () => {
        const store = opening.result.createObjectStore(TABLE, {keyPath: 'key'});
        store.createIndex('expires', 'expires');
      };
      opening.onerror = opening.onblocked = fail;
      opening.onsuccess = () => {
        database = opening.result;
        if (finished) { database.close(); return; }
        try {
          transaction = database.transaction(TABLE, mode);
          const store = transaction.objectStore(TABLE);
          if (mode === 'readwrite') {
            const expired = store.index('expires').openCursor(IDBKeyRange.upperBound(Date.now()));
            expired.onsuccess = () => { const cursor = expired.result; if (cursor) { cursor.delete(); cursor.continue(); } };
          }
          const request = action(store);
          transaction.onabort = transaction.onerror = fail;
          transaction.oncomplete = () => {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            database?.close();
            resolve(request.result);
          };
        } catch { fail(); }
      };
    } catch { fail(); }
  });
}

let photoWrite: Promise<boolean> = Promise.resolve(true);

export function persistRegistrationDraft(unit: string, photos: Photo[], requestId: string, changedPhotos = false) {
  try {
    const previous = readHint();
    const expires = changedPhotos || !previous ? Date.now() + TTL : previous.expires;
    const key = previous?.key || Array.from(crypto.getRandomValues(new Uint32Array(4))).join('-');
    const version = (previous?.version ?? 0) + (changedPhotos ? 1 : 0);
    const hint: Hint = {key, unit, requestId, version, count: photos.length, expires};
    sessionStorage.setItem(HINT_KEY, JSON.stringify(hint));
    if (changedPhotos) {
      const record: PhotoRecord = {key, version, expires, photos: photos.map(({name, blob}) => ({name, blob}))};
      photoWrite = photoWrite.then(() => accessPhotos('readwrite', store => store.put(record))).then(() => true, () => false);
    }
    return photoWrite;
  } catch { return Promise.resolve(false); }
}

export async function restoreRegistrationDraft() {
  const hint = readHint();
  if (!hint) return;
  let photos: Photo[] = [];
  if (hint.count) {
    try {
      const saved = await accessPhotos<PhotoRecord | undefined>('readonly', store => store.get(hint.key));
      if (saved?.version === hint.version && saved.photos.length === hint.count &&
          saved.photos.every(photo => photo.blob instanceof Blob && typeof photo.name === 'string')) photos = saved.photos;
    } catch { /* Recover the unit even if browser storage is unavailable. */ }
  }
  return {unit: hint.unit, requestId: hint.requestId, photos, missingPhotos: hint.count > photos.length};
}

export function clearRegistrationDraft() {
  const hint = readHint();
  try { sessionStorage.removeItem(HINT_KEY); } catch { /* Storage may have been disabled. */ }
  if (hint) {
    photoWrite = photoWrite.then(() => accessPhotos('readwrite', store => store.delete(hint.key))).then(() => true, () => false);
  }
}
