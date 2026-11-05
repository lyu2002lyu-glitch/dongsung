import { allowRead, getPublicSource, readBounded, replyError, upstreamError } from '../lib/archive-bridge.js';

export default async function stores(request, response) {
  if (!allowRead(request, response)) return;
  const query = new URL(request.url || '/', 'https://local.invalid').searchParams;
  const page = query.get('page') ?? '1';
  const sort = query.get('sort') ?? 'latest';
  if (![...query.keys()].every(key => key === 'page' || key === 'sort')
      || !/^[1-9]\d{0,6}$/.test(page) || !['latest', 'name', 'unit'].includes(sort)) {
    return replyError(response, 400, '페이지 또는 정렬 값이 올바르지 않습니다.');
  }

  try {
    const params = new URLSearchParams({ page, sort });
    const upstream = await getPublicSource('/api/stores?' + params);
    if (upstream.status !== 200) return upstreamError(upstream, response);
    if (!upstream.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return upstreamError(upstream, response);
    }
    const data = JSON.parse((await readBounded(upstream, 2 * 1024 * 1024)).toString('utf8'));
    if (!Array.isArray(data.items) || data.items.some(row => !row || row.deletedAt != null)) {
      return replyError(response, 502, '공개 매장 목록을 확인하지 못했습니다.');
    }
    const body = Buffer.from(JSON.stringify(data));
    response.statusCode = 200;
    response.setHeader('Cache-Control', 'private, no-store');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Content-Length', String(body.length));
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.end(body);
  } catch {
    replyError(response, 502, '공개 매장 목록을 가져오지 못했습니다.');
  }
}
