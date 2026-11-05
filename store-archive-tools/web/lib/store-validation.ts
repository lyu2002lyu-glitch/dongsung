export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
export const MAX_PHOTOS = 10;
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export class InputError extends Error {
  status: number; fields?: Record<string, string>;
  constructor(message: string, status = 400, fields?: Record<string, string>) { super(message); this.status = status; this.fields = fields; }
}
export function validateText(nameValue: unknown, unitValue: unknown) {
  const name = typeof nameValue === "string" ? nameValue.trim().normalize("NFC") : "";
  const unit = typeof unitValue === "string" ? unitValue.trim().normalize("NFC") : "";
  const fields: Record<string, string> = {};
  if (!name) fields.name = "매장명을 입력해 주세요.";
  else if (name.length > 100) fields.name = "매장명은 100자 이내로 입력해 주세요.";
  if (!unit) fields.unit = "매장호수를 입력해 주세요.";
  else if (unit.length > 60) fields.unit = "매장호수는 60자 이내로 입력해 주세요.";
  if (Object.keys(fields).length) throw new InputError("입력 내용을 확인해 주세요.", 400, fields);
  return { name, unit };
}
export function sniffMime(b: Uint8Array) {
  if (b[0] === 255 && b[1] === 216 && b[2] === 255) return "image/jpeg";
  if ([137,80,78,71,13,10,26,10].every((n,i) => b[i] === n)) return "image/png";
  if (String.fromCharCode(...b.slice(0,4)) === "RIFF" && String.fromCharCode(...b.slice(8,12)) === "WEBP") return "image/webp";
  return null;
}
export function escapeLike(value: string) { return value.replace(/[\\%_]/g, "\\$&"); }
export function naturalUnit(value: string) { return value.toLocaleLowerCase("ko-KR").replace(/\d+/g, v => v.padStart(16, "0")); }
export function koreaDayStart(now = new Date()) {
  const date = new Date(now.getTime() + 9 * 3600000).toISOString().slice(0, 10);
  return new Date(date + "T00:00:00+09:00").toISOString();
}
export async function parseLimitedForm(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) throw new InputError("사진과 매장 정보를 함께 전송해 주세요.");
  const limit = MAX_TOTAL_BYTES + 1024 * 1024;
  if (Number(request.headers.get("content-length") || 0) > limit) throw new InputError("사진 전체 용량은 25MB 이하여야 합니다.", 413, { photos: "사진 전체 용량을 25MB 이하로 줄여 주세요." });
  if (!request.body) throw new InputError("입력 데이터가 없습니다.");
  try {
    // Incoming HTTP Content-Length is bounded above before reading. Chunked
    // bodies use a bounded reader so the same limit applies without relying
    // on TransformStream transformer support in the Worker runtime.
    if (Number(request.headers.get("content-length")) > 0) return await request.formData();
    const reader = request.body.getReader();
    const parts: ArrayBuffer[] = [];
    let size = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new InputError("사진 전체 용량은 25MB 이하여야 합니다.", 413);
      }
      parts.push(new Uint8Array(value).buffer);
    }
    const response = new Response(new Blob(parts), {headers: {"Content-Type":request.headers.get("content-type")!}});
    return await response.formData();
  } catch (error) {
    if (error instanceof InputError) throw error;
    throw new InputError("사진을 전송하지 못했습니다. 선택한 사진을 확인한 뒤 다시 등록해 주세요.");
  }
}
