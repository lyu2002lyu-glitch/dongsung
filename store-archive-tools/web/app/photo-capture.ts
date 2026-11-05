import { MAX_FILE_BYTES, sniffMime } from '../lib/store-validation';

const PROCESS_TIMEOUT = 15000;
const MAX_CAMERA_INPUT = 32 * 1024 * 1024;

export type PreparedPhoto = { blob: Blob; name: string; url: string };

export function makeRequestId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  if (!globalThis.crypto?.getRandomValues) throw new Error('현재 브라우저에서 등록 식별자를 생성할 수 없습니다. 기본 브라우저에서 다시 시도해 주세요.');
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, n => n.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function withDeadline<T>(operation: Promise<T>, message: string, timeout = PROCESS_TIMEOUT): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), timeout);
    operation.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}

function copyCameraFile(file: File): Promise<ArrayBuffer> {
  if (typeof file.arrayBuffer === 'function') {
    return file.arrayBuffer().catch(() => { throw new Error('촬영한 파일을 읽을 수 없습니다. 사진 선택에서 다시 첨부해 주세요.'); });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => reader.result instanceof ArrayBuffer ? resolve(reader.result) : reject(new Error('사진 데이터를 읽을 수 없습니다.'));
    reader.onerror = () => reject(new Error('기기에서 사진을 읽을 수 없습니다. 사진 선택으로 다시 첨부해 주세요.'));
    reader.readAsArrayBuffer(file);
  });
}

function isHeif(header: Uint8Array, file: File) {
  const typeBox = String.fromCharCode(...header.slice(4, 64));
  return typeBox.startsWith('ftyp') && (
    /hei[cfmsx]|hev[csx]|mi[fF]1|msf1/.test(typeBox) ||
    /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name)
  );
}

function openImage(url: string, heif: boolean): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const finish = (error?: Error) => {
      clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      if (error) { image.removeAttribute('src'); reject(error); } else resolve(image);
    };
    const timer = setTimeout(() => finish(new Error('사진 미리보기 시간이 초과되었습니다. 사진 선택에서 다시 첨부해 주세요.')), PROCESS_TIMEOUT);
    image.onload = () => image.naturalWidth && image.naturalHeight ? finish() : finish(new Error('사진 크기를 확인할 수 없습니다.'));
    image.onerror = () => finish(new Error(heif ? '이 브라우저에서 HEIC 사진을 읽을 수 없습니다. JPG로 저장하거나 카메라의 호환성 설정으로 다시 촬영해 주세요.' : '사진을 읽을 수 없습니다. 원본을 다시 촬영하거나 다른 사진을 선택해 주세요.'));
    image.src = url;
  });
}

async function toJpeg(image: HTMLImageElement) {
  const scale = Math.min(1, 2400 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('사진 크기를 조정할 수 없습니다. 10MB 이하의 JPG로 등록해 주세요.');
  try {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const jpeg = await withDeadline(new Promise<Blob>((resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('JPG 변환에 실패했습니다. 다른 사진을 선택해 주세요.')),
      'image/jpeg', 0.85
    )), 'JPG 변환 시간이 초과되었습니다. 10MB 이하의 JPG로 등록해 주세요.');
    if (jpeg.size > MAX_FILE_BYTES) throw new Error('변환한 사진이 10MB를 초과합니다. 더 작은 사진을 선택해 주세요.');
    return jpeg;
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
}

async function convertHeif(blob: Blob): Promise<Blob> {
  try {
    const { heicTo } = await import('heic-to/csp');
    return await heicTo({ blob, type: 'image/jpeg', quality: 0.88 });
  } catch {
    throw new Error('HEIC 사진을 변환할 수 없습니다. JPG로 내보낸 사진을 선택하거나 카메라 호환성 설정으로 다시 촬영해 주세요.');
  }
}

export async function normalizeCapture(file: File, onProgress: (message: string) => void = () => {}): Promise<PreparedPhoto> {
  if (!file.size) throw new Error('비어 있는 사진입니다. 다시 촬영해 주세요.');
  if (file.size > MAX_CAMERA_INPUT) throw new Error('원본이 32MB를 초과합니다. 작은 크기로 저장한 뒤 첨부해 주세요.');
  onProgress('사진을 준비하고 있습니다.');
  // Read before clearing the picker. Mobile providers can use temporary camera files.
  const bytes = await withDeadline(copyCameraFile(file), '사진을 읽는 시간이 초과되었습니다. 사진 선택에서 다시 첨부해 주세요.');
  const header = new Uint8Array(bytes, 0, Math.min(bytes.byteLength, 64));
  const mime = sniffMime(header);
  const heif = !mime && isHeif(header, file);
  if (!mime && !heif) throw new Error('JPG, PNG, WebP, HEIC/HEIF 사진을 선택해 주세요.');
  const original = new Blob([bytes], {type: mime || 'image/heic'});
  let sourceUrl = URL.createObjectURL(original);
  let retainSource = false;
  const originalName = file.name || '매장사진';
  const jpegName = `${originalName.replace(/\.[^./]+$/, '')}.jpg`;
  try {
    let image: HTMLImageElement;
    try {
      image = await openImage(sourceUrl, heif);
    } catch (error) {
      if (!heif) throw error;
      onProgress('HEIC/HEIF 사진을 JPG로 변환하고 있습니다.');
      const jpeg = await withDeadline(convertHeif(original), 'HEIC 변환 시간이 초과되었습니다. JPG로 저장한 사진을 선택해 주세요.', 60000);
      if (!jpeg.size) throw new Error('변환된 사진이 비어 있습니다. 다른 사진을 선택해 주세요.');
      URL.revokeObjectURL(sourceUrl);
      sourceUrl = URL.createObjectURL(jpeg);
      if (jpeg.size <= MAX_FILE_BYTES) {
        retainSource = true;
        return {blob: jpeg, url: sourceUrl, name: jpegName};
      }
      image = await openImage(sourceUrl, false);
    }
    if (heif || original.size > MAX_FILE_BYTES) {
      onProgress('사진을 등록 용량에 맞춰 JPG로 저장하고 있습니다.');
      const jpeg = await toJpeg(image);
      return {blob: jpeg, url: URL.createObjectURL(jpeg), name: jpegName};
    }
    retainSource = true;
    return {blob: original, url: sourceUrl, name: file.name || `매장사진.${mime === 'image/jpeg' ? 'jpg' : mime === 'image/png' ? 'png' : 'webp'}`};
  } finally {
    if (!retainSource) URL.revokeObjectURL(sourceUrl);
  }
}
