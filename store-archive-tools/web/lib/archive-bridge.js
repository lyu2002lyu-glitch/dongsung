const canonical = 'https://store-photo-log-uw2026.lyu2002.chatgpt.site';
export const maxChunkBytes = 768 * 1024;

export function replyError(response, status, error) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify({ error }));
}

export function allowRead(request, response) {
  if (request.method === 'GET') return true;
  response.setHeader('Allow', 'GET');
  replyError(response, 405, 'GET 요청만 허용합니다.');
  return false;
}

export function getPublicSource(path, extraHeaders = {}) {
  // Callers construct paths only from a validated number, sort key, or UUID.
  const url = new URL(path, canonical);
  if (url.origin !== canonical) throw new Error('Invalid archive origin');
  const headers = new Headers(extraHeaders);
  const token = process.env.STORE_ARCHIVE_SERVICE_TOKEN;
  if (token) headers.set('OAI-Sites-Authorization', 'Bearer ' + token);
  return fetch(url, {
    method: 'GET', headers, redirect: 'manual', cache: 'no-store',
    signal: AbortSignal.timeout(20000),
  });
}

export async function readBounded(upstream, limit) {
  const reader = upstream.body?.getReader();
  if (!reader) throw new Error('The source returned no body');
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) {
        await reader.cancel();
        throw new Error('Source body exceeds the limit');
      }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks, length);
  } finally {
    reader.releaseLock();
  }
}

export function upstreamError(upstream, response) {
  // Avoid reflecting upstream HTML, locations, access metadata or cookies.
  void upstream.body?.cancel().catch(() => {});
  if (upstream.status === 416) {
    const range = upstream.headers.get('content-range');
    if (/^bytes \*\/\d+$/.test(range || '')) response.setHeader('Content-Range', range);
  }
  const status = [400, 401, 403, 404, 410, 416, 429, 503].includes(upstream.status) ? upstream.status : 502;
  replyError(response, status, '공개 자료 원본에서 데이터를 가져올 수 없습니다.');
}
