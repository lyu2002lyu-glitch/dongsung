import { allowRead, getPublicSource, maxChunkBytes, readBounded, replyError, upstreamError } from '../../lib/archive-bridge.js';

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export default async function photo(request, response) {
  if (!allowRead(request, response)) return;
  const url = new URL(request.url || '/', 'https://local.invalid');
  const id = request.query?.id ?? url.pathname.split('/').pop();
  if (typeof id !== 'string' || !uuid.test(id)) return replyError(response, 404, '사진을 찾을 수 없습니다.');
  const requested = /^bytes=(\d{1,9})-(\d{1,9})$/.exec(request.headers.range || '');
  if (!requested) return replyError(response, 416, '사진의 시작·끝 바이트 위치를 지정해 주세요.');
  const start = Number(requested[1]), end = Number(requested[2]);
  if (start > end || end - start + 1 > maxChunkBytes) {
    return replyError(response, 416, '한 번에 최대 768KiB까지 요청할 수 있습니다.');
  }
  const headers = { Range: 'bytes=' + start + '-' + end };
  const condition = request.headers['if-none-match'];
  if (typeof condition === 'string' && condition.length <= 512 && !/[\r\n]/.test(condition)) {
    headers['If-None-Match'] = condition;
  }

  const ifRange = request.headers['if-range'];
  if (typeof ifRange === 'string' && ifRange.length <= 512 && /^"[^"\r\n]+"$/.test(ifRange)) {
    headers['If-Range'] = ifRange;
  }

  try {
    const upstream = await getPublicSource('/api/photos/' + id, headers);
    response.setHeader('Cache-Control', 'private, no-store');
    if (upstream.status === 304 && headers['If-None-Match']) {
      response.statusCode = 304;
      const etag = upstream.headers.get('etag');
      if (etag) response.setHeader('ETag', etag);
      return response.end();
    }
    if (upstream.status !== 206) return upstreamError(upstream, response);
    const type = upstream.headers.get('content-type')?.toLowerCase();
    const contentRange = upstream.headers.get('content-range');
    const span = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(contentRange || '');
    if (!['image/jpeg', 'image/webp', 'image/png'].includes(type) || !span
        || Number(span[1]) !== start || Number(span[2]) !== Math.min(end, Number(span[3]) - 1)
        || Number(span[2]) < start || Number(span[3]) <= Number(span[2])) {
      return upstreamError(upstream, response);
    }
    const bytes = await readBounded(upstream, end - start + 1);
    if (bytes.byteLength !== Number(span[2]) - start + 1) return replyError(response, 502, '사진 데이터 길이가 일치하지 않습니다.');
    response.statusCode = 206;
    response.setHeader('Content-Type', type);
    response.setHeader('Content-Range', contentRange);
    response.setHeader('Content-Length', String(bytes.byteLength));
    response.setHeader('Accept-Ranges', 'bytes');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    const etag = upstream.headers.get('etag');
    if (etag) response.setHeader('ETag', etag);
    response.end(bytes);
  } catch {
    replyError(response, 502, '공개 사진을 가져오지 못했습니다.');
  }
}
