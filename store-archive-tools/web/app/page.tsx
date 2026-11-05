"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Store, Plus, Search, LayoutGrid, List, Camera, Upload, X, ChevronRight, ChevronLeft, Check, CheckCircle2, LoaderCircle, RefreshCw, FolderOpen, MapPin, Clock3, CircleAlert, ShieldCheck, Image as ImageIcon, ArrowUpRight, Maximize2 } from "lucide-react";

import { makeRequestId, normalizeCapture, type PreparedPhoto } from "./photo-capture";
import { MAX_TOTAL_BYTES, MAX_PHOTOS } from "../lib/store-validation";
import { clearRegistrationDraft, persistRegistrationDraft, restoreRegistrationDraft } from "./registration-draft";
import "./registration.css";
import { hasRegistrationDraftHint } from "./registration-draft";

type Photo = { id: string; url: string; name: string; size: number; mime: string };
type StoreEntry = { id: string; name: string; unit: string; createdAt: string; photos: Photo[] };
type Collection = { items: StoreEntry[]; total: number; page: number; pageSize: number; stats: { stores: number; photos: number; today: number; latestAt: string | null } };
type DraftPhoto = PreparedPhoto & { key: number };
type FieldErrors = Partial<Record<"unit" | "photos", string>>;
function storeLabel(store: StoreEntry) { return store.name?.trim() || store.unit; }
function dateLabel(value: string, time = false) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", ...(time ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}), timeZone: "Asia/Seoul" }).format(new Date(value));
}
function bytesLabel(size: number) { return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`; }
function useDialog(open: boolean, close: () => void, container: React.RefObject<HTMLDivElement | null>) {
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => container.current?.querySelector<HTMLElement>("[data-autofocus], button, input, select, [tabindex='0']")?.focus(), 60);
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); closeRef.current(); }
      if (e.key === "Tab") {
        const targets = [...(container.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex='0']") || [])].filter(el => el.offsetParent !== null);
        if (!targets.length) { e.preventDefault(); return; }
        const first = targets[0], last = targets[targets.length - 1];
        if (e.shiftKey && (document.activeElement === first || !container.current?.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && (document.activeElement === last || !container.current?.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => { clearTimeout(focusTimer); document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", handleKey); previous?.focus(); };
  }, [open, container]);
}

export default function Dashboard() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "gallery">("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [ready, setReady] = useState<boolean | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selected, setSelected] = useState<StoreEntry | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [savedRecord, setSavedRecord] = useState<StoreEntry | null>(null);
  const noticeRef = useRef<HTMLElement>(null);
  const recentChange = useRef(false);
  const detailRef = useRef<HTMLDivElement>(null);
  useDialog(!!selected, () => setSelected(null), detailRef);
  useEffect(() => { const timer = setTimeout(() => { setDebouncedQuery(query.trim()); setPage(1); }, 300); return () => clearTimeout(timer); }, [query]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://store-photo-log-uw2026.lyu2002.chatgpt.site/api/status", { signal: controller.signal, cache: "no-store" }).then(r => r.ok ? r.json() : { ready: false }).then(d => setReady(!!(d as { ready: boolean }).ready)).catch(e => { if (e.name !== "AbortError") setReady(false); });
    return () => controller.abort();
  }, [refreshKey]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    fetch(`https://store-photo-log-uw2026.lyu2002.chatgpt.site/api/stores?${new URLSearchParams({ q: debouncedQuery, sort, page: String(page) })}`, { signal: controller.signal, cache: "no-store" })
      .then(async r => { const d = await r.json() as Collection & {error?: string}; if (!r.ok) throw new Error(d.error || "매장 목록을 불러오지 못했습니다."); return d as Collection; })
      .then(d => { setCollection({...d, items: d.items.map(item => ({...item, photos: item.photos.map(photo => ({...photo, url: new URL(photo.url, 'https://store-photo-log-uw2026.lyu2002.chatgpt.site').href}))}))}); setLoading(false); })
      .catch(e => { if (e.name !== "AbortError") { setError(e.message || "연결 상태를 확인한 후 다시 시도해 주세요."); setLoading(false); } });
    return () => controller.abort();
  }, [debouncedQuery, sort, page, refreshKey]);
  useEffect(() => {
    if (hasRegistrationDraftHint()) setRegisterOpen(true);
    let active = true;
    try {
      const raw = sessionStorage.getItem("store-recent-save");
      if (raw) {
        const recent = JSON.parse(raw) as {id:string; at:number};
        if (Date.now() - recent.at < 30 * 60 * 1000) {
          lookupRegistrationReceipt(recent.id).then(item => {
            if (active && !recentChange.current && item) setSavedRecord(item);
          }).catch(() => {});
        } else sessionStorage.removeItem("store-recent-save");
      }
    } catch { /* The form also works when browser storage is unavailable. */ }
    return () => {active = false;};
  }, []);
  useEffect(() => {
    if (!selected) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "ArrowRight") setPhotoIndex(i => (i + 1) % selected!.photos.length);
      if (e.key === "ArrowLeft") setPhotoIndex(i => (i - 1 + selected!.photos.length) % selected!.photos.length);
    }
    document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey);
  }, [selected]);
  const resetSearch = () => { setQuery(""); setDebouncedQuery(""); setPage(1); };
  const openDetail = (item: StoreEntry, index = 0) => { setPhotoIndex(index); setSelected(item); };
  const onSaved = (item: StoreEntry) => {
    recentChange.current = true;
    setRegisterOpen(false);
    resetSearch();
    setSort("latest");
    setSavedRecord(item);
    setRefreshKey(key => key + 1);
    try {sessionStorage.setItem("store-recent-save", JSON.stringify({id:item.id, at:Date.now()}));} catch {}
    requestAnimationFrame(() => noticeRef.current?.scrollIntoView({block:"center", behavior:"auto"}));
  };
  const dismissReceipt = () => {
    recentChange.current = true;
    setSavedRecord(null);
    try {sessionStorage.removeItem("store-recent-save");} catch {}
  };
  const stats = collection?.stats;
  const pages = collection ? Math.max(1, Math.ceil(collection.total / collection.pageSize)) : 1;

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="매장 기록 홈"><span className="brand-icon"><Store size={23}/></span><span><strong>매장 기록</strong><small>STORE ARCHIVE</small></span></a>
      <div className="sidebar-section">워크스페이스</div>
      <nav className="side-nav" aria-label="주 메뉴">
        <button className="active" onClick={() => { resetSearch(); setView("list"); }}><FolderOpen size={19}/>등록된 매장<span>{stats?.stores ?? "—"}</span></button>
        <button onClick={() => setRegisterOpen(true)}><Plus size={19}/>새 매장 등록</button>
      </nav>
      <div className="sidebar-note"><div className="note-mark"><Camera size={21}/></div><strong>현장의 모습을,<br/>한곳에 차곡차곡.</strong><p>매장 정보와 사진을 함께 기록하고 필요할 때 찾아보세요.</p><button onClick={() => setRegisterOpen(true)}>첫 기록 남기기 <ArrowUpRight size={15}/></button></div>
      <div className="sidebar-bottom"><ShieldCheck size={16}/><span>누구나 함께하는 매장 아카이브</span></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb"><span>워크스페이스</span><ChevronRight size={14}/><strong>등록된 매장</strong></div><a href="/" className="mobile-brand"><Store size={21}/><strong>매장 기록</strong></a><div className="header-actions"><a className="admin-entry" href="https://store-photo-log-uw2026.lyu2002.chatgpt.site/admin"><ShieldCheck size={15}/>관리자</a><div className={`connection ${ready === false ? "offline" : ""}`}><i className={ready === null ? "checking" : ""}/>{ready === null ? "저장소 확인 중" : ready ? "저장소 연결됨" : "저장소 연결 확인 필요"}</div></div></header>
      <main className="main-content">
        <section className="page-heading"><div><p className="eyebrow">STORE COLLECTION</p><h1>매장을 기록하는<br className="mobile-break"/> 가장 간편한 방법</h1><p className="heading-description">로그인 없이 매장호수와 현장 사진을 등록하고 찾아보세요.</p></div><button className="button primary add-store" onClick={() => setRegisterOpen(true)}><Plus size={19}/>새 매장 등록</button></section>
        {savedRecord && <section className="saved-receipt" ref={noticeRef} aria-label="최근 등록 결과">
          <CheckCircle2 size={23} aria-hidden="true"/>
          <div role="status"><h2>등록이 완료되었습니다</h2><p><strong>{savedRecord.unit}</strong> · 사진 {savedRecord.photos.length}장 · {dateLabel(savedRecord.createdAt,true)}</p></div>
          <button className="button secondary" onClick={() => openDetail(savedRecord)}>저장된 사진 보기</button>
          <button className="icon-button receipt-close" aria-label="등록 결과 닫기" onClick={dismissReceipt}><X size={17}/></button>
        </section>}
        <section className="stats-grid" aria-label="등록 현황">
          <div className="stat-card"><span className="stat-icon green"><Store size={21}/></span><div><p>전체 매장</p><strong>{stats?.stores.toLocaleString() ?? "—"}<small>개</small></strong></div><span className="stat-foot">누적 등록</span></div>
          <div className="stat-card"><span className="stat-icon blue"><ImageIcon size={21}/></span><div><p>저장된 사진</p><strong>{stats?.photos.toLocaleString() ?? "—"}<small>장</small></strong></div><span className="stat-foot">매장별 보관</span></div>
          <div className="stat-card"><span className="stat-icon amber"><Clock3 size={21}/></span><div><p>오늘 등록</p><strong>{stats?.today.toLocaleString() ?? "—"}<small>개</small></strong></div><span className="stat-foot">한국 시간 기준</span></div>
        </section>
        <section className="workflow-strip"><span className="workflow-caption"><Camera size={19}/>현장에서 바로 기록하세요</span><div className="workflow-steps"><span><b>1</b>매장호수</span><ChevronRight/><span><b>2</b>사진 촬영 또는 선택</span><ChevronRight/><span><b>3</b>등록 완료</span></div></section>
        <section className="collection-section" aria-label="등록된 매장 조회">
          <div className="section-heading"><div><h2>등록된 매장 <span>{collection?.total.toLocaleString() ?? "0"}</span></h2><p>매장명 또는 호수로 원하는 매장을 찾아보세요.</p></div><button className="text-button refresh-button" onClick={() => setRefreshKey(k => k + 1)} disabled={loading} aria-label="목록 새로고침"><RefreshCw size={16} className={loading ? "spin" : ""}/><span>새로고침</span></button></div>
          <div className="collection-toolbar"><div className="search-field"><Search size={19}/><input aria-label="매장명 또는 매장호수 검색" placeholder="매장명 또는 매장호수 검색" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button onClick={resetSearch} aria-label="검색 초기화"><X size={16}/></button>}</div><div className="view-tools"><label className="sort-field"><span className="sr-only">정렬 방식</span><select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}><option value="latest">최신 등록순</option><option value="name">매장명순</option><option value="unit">매장호수순</option></select></label><div className="view-switch" aria-label="보기 방식"><button aria-label="리스트 보기" aria-pressed={view === "list"} className={view === "list" ? "selected" : ""} onClick={() => setView("list")}><List size={18}/></button><button aria-label="갤러리 보기" aria-pressed={view === "gallery"} className={view === "gallery" ? "selected" : ""} onClick={() => setView("gallery")}><LayoutGrid size={18}/></button></div></div></div>
          {debouncedQuery && <div className="search-summary"><span>‘<strong>{debouncedQuery}</strong>’ 검색 결과 <b>{collection?.total ?? 0}개</b></span><button onClick={resetSearch}>검색 초기화 <X size={13}/></button></div>}
          <div className={`collection-body ${view}`} aria-busy={loading}>
            {error ? <div className="empty-state error-state" role="alert"><span className="empty-icon"><CircleAlert size={33}/></span><h3>목록을 불러오지 못했어요</h3><p>{error}</p><button className="button secondary" onClick={() => setRefreshKey(k => k + 1)}><RefreshCw size={16}/>다시 시도</button></div>
              : loading ? <div className="loading-state"><LoaderCircle className="spin" size={25}/><span>매장 기록을 불러오는 중입니다.</span></div>
              : !collection?.items.length ? <div className="empty-state">{debouncedQuery ? <><span className="empty-icon"><Search size={35}/></span><h3>검색된 매장이 없습니다</h3><p>매장명이나 호수의 일부만 입력해 보세요.</p><button className="button secondary" onClick={resetSearch}>전체 목록 보기</button></> : <><div className="empty-illustration"><div className="illustration-card back"><ImageIcon size={25}/></div><div className="illustration-card front"><Store size={34}/><i/><i/></div><span className="illustration-plus"><Plus size={17}/></span></div><h3>첫 번째 매장을 기록해 보세요</h3><p>매장호수를 입력하고 사진을 더하면<br/>이곳에 매장 기록이 차곡차곡 쌓입니다.</p><button className="button primary" onClick={() => setRegisterOpen(true)}><Plus size={17}/>새 매장 등록</button><span className="empty-hint"><ShieldCheck size={13}/>로그인 없이 매장 정보를 등록할 수 있습니다.</span></> }</div>
              : view === "list" ? <><div className="desktop-list"><table><thead><tr><th>매장 사진</th><th>매장</th><th>매장호수</th><th>사진</th><th>등록일시</th><th><span className="sr-only">상세보기</span></th></tr></thead><tbody>{collection.items.map(item => <tr key={item.id}><td><button className="table-thumb" onClick={() => openDetail(item)} aria-label={`${storeLabel(item)} 사진 확대`}><img crossOrigin="anonymous" src={item.photos[0]?.url} alt={`${storeLabel(item)} 대표 사진`} loading="lazy"/><span><Maximize2 size={15}/></span></button></td><td><button className="store-name" onClick={() => openDetail(item)}>{storeLabel(item)}</button></td><td><span className="unit-tag">{item.unit}</span></td><td><span className="photo-count"><ImageIcon size={15}/>{item.photos.length}장</span></td><td className="date-cell">{dateLabel(item.createdAt, true)}</td><td><button className="detail-button" onClick={() => openDetail(item)}>상세보기<ChevronRight size={14}/></button></td></tr>)}</tbody></table></div><div className="mobile-store-list">{collection.items.map(item => <StoreCard key={item.id} item={item} onOpen={openDetail} compact/>)}</div></>
              : <div className="gallery-grid">{collection.items.map(item => <StoreCard key={item.id} item={item} onOpen={openDetail}/>)}</div>}
          </div>
          {!loading && !error && !!collection?.items.length && <div className="pagination"><span>전체 {collection.total.toLocaleString()}개 중 {(page - 1) * collection.pageSize + 1}–{Math.min(page * collection.pageSize, collection.total)}개</span><div><button disabled={page <= 1} onClick={() => setPage(p => p - 1)} aria-label="이전 페이지"><ChevronLeft size={17}/></button><strong>{page} <span>/ {pages}</span></strong><button disabled={page >= pages} onClick={() => setPage(p => p + 1)} aria-label="다음 페이지"><ChevronRight size={17}/></button></div></div>}
        </section>
        <footer className="page-footer"><span>STORE ARCHIVE</span><p>현장의 기록이, 다음 업무의 시작이 됩니다.</p>{stats?.latestAt && <small>최근 등록 {dateLabel(stats.latestAt, true)}</small>}</footer>
      </main>
    </div>
    <Registration open={registerOpen} onClose={() => setRegisterOpen(false)} onSaved={onSaved}/>
    {selected && <div className="lightbox-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}><div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="photo-dialog-title" ref={detailRef}><header className="lightbox-header"><div>{selected.name?.trim() && <span className="lightbox-unit"><MapPin size={13}/>{selected.unit}</span>}<h2 id="photo-dialog-title">{storeLabel(selected)}</h2><p>{dateLabel(selected.createdAt, true)} 등록 · 사진 {selected.photos.length}장</p></div><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="사진 상세 닫기" data-autofocus><X size={23}/></button></header><div className="lightbox-stage">{selected.photos.length > 1 && <button className="photo-nav prev" aria-label="이전 사진" onClick={() => setPhotoIndex(i => (i - 1 + selected.photos.length) % selected.photos.length)}><ChevronLeft size={25}/></button>}<img crossOrigin="anonymous" src={selected.photos[photoIndex]?.url} alt={`${selected.name?.trim() ? `${selected.name} · ` : ""}${selected.unit} · 사진 ${photoIndex + 1}`}/>{selected.photos.length > 1 && <button className="photo-nav next" aria-label="다음 사진" onClick={() => setPhotoIndex(i => (i + 1) % selected.photos.length)}><ChevronRight size={25}/></button>}<span className="photo-position">{photoIndex + 1} / {selected.photos.length}</span></div><footer className="lightbox-footer"><div className="thumbnail-track">{selected.photos.map((photo, i) => <button key={photo.id} className={photoIndex === i ? "active" : ""} onClick={() => setPhotoIndex(i)} aria-label={`${i + 1}번째 사진 보기`} aria-pressed={photoIndex === i}><img crossOrigin="anonymous" src={photo.url} alt={`사진 ${i + 1}`} loading="lazy"/></button>)}</div><span className="photo-filename">{selected.photos[photoIndex]?.name}</span></footer></div></div>}
  </div>;
}

function StoreCard({ item, onOpen, compact = false }: { item: StoreEntry; onOpen: (item: StoreEntry) => void; compact?: boolean }) {
  return <article className={`store-card ${compact ? "compact" : ""}`}><button className="store-card-image" onClick={() => onOpen(item)} aria-label={`${storeLabel(item)} 사진 확대`}><img crossOrigin="anonymous" src={item.photos[0]?.url} alt={`${storeLabel(item)} 대표 사진`} loading="lazy"/><span><ImageIcon size={13}/>{item.photos.length}</span><i><Maximize2 size={20}/></i></button><div className="store-card-body">{item.name?.trim() && <span className="unit-tag">{item.unit}</span>}<button className="store-name" onClick={() => onOpen(item)}>{storeLabel(item)}</button><div className="store-card-bottom"><span>{dateLabel(item.createdAt)}</span><button aria-label={`${storeLabel(item)} 상세보기`} onClick={() => onOpen(item)}><ArrowUpRight size={18}/></button></div></div></article>;
}


type RegistrationProps = { open: boolean; onClose: () => void; onSaved: (item: StoreEntry) => void };
type UploadResponse = { item?: StoreEntry; error?: string; fields?: FieldErrors };

const REGISTRATION_API = 'https://store-photo-log-uw2026.lyu2002.chatgpt.site/api/stores';
const requestIdPattern = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;

async function requestRegistrationJson(url: string, init: RequestInit, timeout: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {...init, credentials: 'omit', signal: controller.signal});
    const body = await response.json().catch(() => null) as UploadResponse | null;
    return {response, body};
  } finally {
    clearTimeout(timer);
  }
}

function confirmedItem(body: UploadResponse | null, id: string): StoreEntry | null {
  const item = body?.item;
  if (!item || item.id !== id || typeof item.unit !== 'string' || !item.unit
      || typeof item.name !== 'string' || !Number.isFinite(Date.parse(item.createdAt))
      || !Array.isArray(item.photos) || !item.photos.length) return null;
  if (!item.photos.every(photo => photo && typeof photo.id === 'string' && typeof photo.url === 'string')) {
    return null;
  }
  // The result can be displayed immediately, including on the external dashboard.
  const apiBase = new URL(REGISTRATION_API, location.origin);
  return {...item, photos: item.photos.map(photo => ({...photo, url: new URL(photo.url, apiBase).href}))};
}

async function lookupRegistrationReceipt(id: string): Promise<StoreEntry | null> {
  if (!requestIdPattern.test(id)) return null;
  const {response, body} = await requestRegistrationJson(
    `${REGISTRATION_API}/${encodeURIComponent(id)}/receipt`, {cache: 'no-store'}, 8000
  );
  if (response.status === 404) return null;
  const item = response.ok ? confirmedItem(body, id) : null;
  if (!item) throw new Error('저장 결과를 확인하지 못했습니다.');
  return item;
}

async function uploadRegistration(form: FormData): Promise<UploadResponse> {
  const id = String(form.get('requestId') || '');
  if (!requestIdPattern.test(id)) return {error: '등록 식별자를 확인할 수 없습니다. 등록 창을 다시 열어 주세요.'};
  try {
    // Native browser FormData supplies the boundary. A plain POST avoids the
    // extra cross-origin preflight caused by XMLHttpRequest upload listeners.
    const {response, body} = await requestRegistrationJson(REGISTRATION_API, {method: 'POST', body: form}, 180000);
    if (response.status >= 400 && response.status < 500) {
      return {error: body?.error || '등록 요청이 거절됐습니다. 입력 내용과 사진을 확인해 주세요.', fields: body?.fields};
    }
    const item = response.ok ? confirmedItem(body, id) : null;
    if (item) return {item};
  } catch {
    // On a timeout or connection loss the write may already have committed.
  }

  for (const delay of [0, 1200]) {
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    try {
      const item = await lookupRegistrationReceipt(id);
      if (item) return {item};
    } catch {
      // Retry only the read. The form keeps its original identifier for a manual retry.
    }
  }
  return {error: '저장 여부를 아직 확인할 수 없습니다. 연결 상태를 확인한 뒤 같은 입력 내용으로 다시 시도해 주세요.'};
}

function Registration({ open, onClose, onSaved }: RegistrationProps) {
  const [unit, setUnit] = useState('');
  const [photos, setPhotos] = useState<DraftPhoto[]>([]);
  const [fields, setFields] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [recovering, setRecovering] = useState(false);
  const [draftMessage, setDraftMessage] = useState('');
  const unitRef = useRef('');
  const savedAction = useRef(onSaved);
  savedAction.current = onSaved;
  const requestId = useRef('');
  const submitLock = useRef(false);
  const processingLock = useRef(false);
  const nextPhotoKey = useRef(0);
  const photosRef = useRef<DraftPhoto[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const disabled = recovering || busy || !!processingMessage;

  function close() {
    if (recovering || submitLock.current || processingLock.current) return;
    // Dismissing the sheet leaves the unfinished registration in this tab.
    onClose();
  }
  useDialog(open, close, dialogRef);
  useEffect(() => () => photosRef.current.forEach(photo => URL.revokeObjectURL(photo.url)), []);

  useEffect(() => {
    let active = true;
    let receiptTimeout: ReturnType<typeof setTimeout> | undefined;
    if (!hasRegistrationDraftHint()) return;
    setRecovering(true);
    async function recover() {
      try {
        const draft = await restoreRegistrationDraft();
        if (!draft || !active) return;
        if (draft.requestId) {
          const receipt = await Promise.race([
            lookupRegistrationReceipt(draft.requestId).catch(() => null),
            new Promise<null>(resolve => { receiptTimeout = setTimeout(() => resolve(null), 3000); }),
          ]);
          if (!active) return;
          if (receipt) {
            clearRegistrationDraft();
            savedAction.current(receipt);
            return;
          }
        }
        unitRef.current = draft.unit;
        setUnit(draft.unit);
        requestId.current = draft.requestId;
        updatePhotos(draft.photos.map(photo => ({...photo, url: URL.createObjectURL(photo.blob), key: ++nextPhotoKey.current})));
        setDraftMessage(draft.missingPhotos || !draft.photos.length
          ? '입력한 매장호수를 복구했습니다. 촬영한 사진이 보이지 않으면 사진 선택에서 첨부해 주세요.'
          : '작성 중이던 호수와 사진을 복구했습니다.');
      } catch {
        if (active) setDraftMessage('작성 중인 사진을 복구할 수 없습니다. 사진 선택에서 다시 첨부해 주세요.');
      } finally {
        clearTimeout(receiptTimeout);
        if (active) setRecovering(false);
      }
    }
    void recover();
    return () => { active = false; clearTimeout(receiptTimeout); };
  }, []);

  function persist(changedPhotos = false) {
    return persistRegistrationDraft(unitRef.current, photosRef.current, requestId.current, changedPhotos);
  }
  function discardDraft() {
    clearRegistrationDraft();
    photosRef.current.forEach(photo => URL.revokeObjectURL(photo.url));
    updatePhotos([]);
    setFields({});
    setError('');
    setDraftMessage('');
    requestId.current = '';
    unitRef.current = '';
    setUnit('');
  }
  function cancelDraft() {
    const message = requestId.current
      ? '저장 요청을 보낸 등록입니다. 이 기기의 작성 내용을 지울까요? 이미 저장된 등록은 목록에서 확인할 수 있습니다.'
      : '작성 중인 매장호수와 사진을 이 기기에서 지울까요?';
    if (!window.confirm(message)) return;
    discardDraft();
    onClose();
  }
  function changeUnit(value: string) {
    unitRef.current = value;
    setUnit(value);
    changed('unit');
    void persist();
  }
  function changed(field: keyof FieldErrors) {
    // A previous request can still commit after a timeout. Reuse its ID until
    // this registration is confirmed or explicitly discarded.
    setError('');
    setFields(previous => ({...previous, [field]: undefined}));
  }
  function updatePhotos(next: DraftPhoto[]) {
    photosRef.current = next;
    setPhotos(next);
  }
  function showFieldErrors(next: FieldErrors) {
    setFields(next);
    const field = (['unit', 'photos'] as const).find(key => next[key]);
    if (!field) return;
    requestAnimationFrame(() => {
      const element = document.getElementById(`store-${field}`);
      element?.focus({preventScroll: true});
      element?.scrollIntoView({block: 'center', behavior: 'auto'});
    });
  }

  async function acceptFiles(event: ChangeEvent<HTMLInputElement>, replacementKey?: number) {
    const input = event.currentTarget;
    const incoming = Array.from(input.files || []);
    if (!incoming.length || submitLock.current || processingLock.current) return;
    processingLock.current = true;
    setProcessingMessage('사진을 준비하고 있습니다.');
    setFields(previous => ({...previous, photos: undefined}));
    const next = [...photosRef.current];
    const messages: string[] = [];
    let accepted = false;
    try {
      for (const file of incoming) {
        const replaceIndex = replacementKey === undefined ? -1 : next.findIndex(photo => photo.key === replacementKey);
        if (replaceIndex < 0 && next.length >= MAX_PHOTOS) {
          messages.push('사진은 최대 10장까지 등록할 수 있습니다.');
          break;
        }
        try {
          const prepared = await normalizeCapture(file, setProcessingMessage);
          const total = next.reduce((sum, photo) => sum + photo.blob.size, 0) - (next[replaceIndex]?.blob.size || 0) + prepared.blob.size;
          if (total > MAX_TOTAL_BYTES) {
            URL.revokeObjectURL(prepared.url);
            throw new Error('사진 전체 용량은 25MB 이하여야 합니다.');
          }
          const draft = {...prepared, key: ++nextPhotoKey.current};
          if (replaceIndex >= 0) {
            URL.revokeObjectURL(next[replaceIndex].url);
            next[replaceIndex] = draft;
          } else next.push(draft);
          accepted = true;
        } catch (cause) {
          const reason = cause instanceof Error ? cause.message : '사진을 준비할 수 없습니다. 다시 선택해 주세요.';
          messages.push(`${file.name || '촬영 사진'} · ${reason}`);
        }
      }
    } finally {
      if (accepted) {
        changed('photos');
        updatePhotos(next);
        const stored = await persist(true);
        setDraftMessage(stored ? '' : '이 브라우저에서는 작성 중인 사진을 임시 보관할 수 없습니다. 등록을 마칠 때까지 이 화면을 열어 두세요.');
      }
      if (messages.length) setFields(previous => ({...previous, photos: messages.join(' ')}));
      input.value = '';
      processingLock.current = false;
      setProcessingMessage('');
    }
  }

  function removePhoto(target: DraftPhoto) {
    if (processingLock.current || submitLock.current) return;
    URL.revokeObjectURL(target.url);
    updatePhotos(photosRef.current.filter(photo => photo.key !== target.key));
    changed('photos');
    void persist(true);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (recovering || submitLock.current || processingLock.current) return;
    const errors: FieldErrors = {};
    if (!unit.trim()) errors.unit = '매장호수를 입력해 주세요.';
    if (!photosRef.current.length) errors.photos = '매장 사진을 1장 이상 추가해 주세요.';
    if (Object.keys(errors).length) { showFieldErrors(errors); return; }
    submitLock.current = true;
    setBusy(true);
    setError('');
    try {
      if (!requestId.current) requestId.current = makeRequestId();
      await persist();
      const form = new FormData();
      form.set('requestId', requestId.current);
      form.set('unit', unit.trim());
      photosRef.current.forEach(photo => form.append('photos', photo.blob, photo.name));
      const result = await uploadRegistration(form);
      if (!result.item) {
        if (result.fields) showFieldErrors(result.fields);
        throw new Error(result.error || '저장을 확인할 수 없습니다. 다시 시도해 주세요.');
      }
      discardDraft();
      onSaved(result.item);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '저장에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      submitLock.current = false;
      setBusy(false);
    }
  }

  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
    <div className="registration-drawer registration-sheet" role="dialog" aria-modal="true" aria-labelledby="registration-title" ref={dialogRef}>
      <header className="drawer-header"><h2 id="registration-title">새 매장 등록</h2><button className="icon-button" type="button" onClick={close} disabled={disabled} aria-label="등록 창 닫기"><X size={23}/></button></header>
      <form className="drawer-body registration-scroll" onSubmit={save} noValidate>
        {recovering && <p className="processing-text" role="status">작성 중이던 내용을 확인하고 있습니다.</p>}
        {!recovering && draftMessage && <p className="registration-hint" role="status">{draftMessage}</p>}
        <div className="field-group"><label htmlFor="store-unit">매장호수 <span>필수</span></label><input id="store-unit" maxLength={60} required value={unit} disabled={busy || recovering} placeholder="예: A동 2층 204호 또는 A-204" autoComplete="off" onChange={event => changeUnit(event.target.value)} aria-invalid={!!fields.unit} aria-describedby={fields.unit ? 'unit-error' : undefined}/>{fields.unit && <p className="field-error" id="unit-error">{fields.unit}</p>}</div>
        <section className="registration-photos" aria-labelledby="registration-photos-label">
          <div className="photo-field-heading"><h3 id="registration-photos-label">매장 사진 <em>필수</em></h3><span>{photos.length} / {MAX_PHOTOS}장</span></div>
          <div className="registration-pickers">
            <label className="native-picker camera-action"><Camera size={25}/><strong>사진 촬영</strong><input id="store-photos" type="file" accept="image/*" capture="environment" aria-label="사진 촬영" aria-describedby="photo-hint photo-error" onChange={event => acceptFiles(event)} disabled={disabled || photos.length >= MAX_PHOTOS} onClick={() => { void persist(); }}/></label>
            <label className="native-picker"><Upload size={25}/><strong>사진 선택</strong><input type="file" accept="image/*,.heic,.heif" multiple aria-label="사진 선택" aria-describedby="photo-hint photo-error" onChange={event => acceptFiles(event)} disabled={disabled || photos.length >= MAX_PHOTOS} onClick={() => { void persist(); }}/></label>
          </div>
          <p className="registration-hint" id="photo-hint">JPG · PNG · WebP · HEIC/HEIF. 원본은 32MB까지 선택할 수 있고, HEIC/HEIF와 10MB를 넘는 사진은 JPG로 변환합니다. 등록 용량은 전체 25MB까지입니다.</p>
          {processingMessage && <p className="processing-text" role="status"><LoaderCircle className="spin" size={16}/>{processingMessage}</p>}
          {fields.photos && <p id="photo-error" className="field-error photo-error" role="alert"><CircleAlert size={15}/>{fields.photos}</p>}
          {!!photos.length && <><div className="preview-heading"><strong>선택한 사진</strong><span>{bytesLabel(photos.reduce((sum, photo) => sum + photo.blob.size, 0))} / 25 MB</span></div><div className="draft-photos">{photos.map((photo, index) => <div className="draft-photo" key={photo.key}>
            <div className="draft-image"><img src={photo.url} alt={`등록 예정 사진 ${index + 1}`}/>{index === 0 && <span className="cover-label">대표 사진</span>}<button type="button" onClick={() => removePhoto(photo)} disabled={disabled} aria-label={`사진 ${index + 1} 삭제`}><X size={15}/></button></div>
            <div className="draft-photo-info"><span title={photo.name}>{photo.name}</span><label className="replace-picker"><RefreshCw size={12}/>교체<input type="file" accept="image/*,.heic,.heif" aria-label={`사진 ${index + 1} 교체`} disabled={disabled} onChange={event => acceptFiles(event, photo.key)}/></label></div>
          </div>)}</div></>}
        </section>
        {error && <div className="save-error" role="alert"><CircleAlert size={18}/><div><strong>등록 결과를 확인해 주세요.</strong><p>{error}</p></div></div>}
        {busy && <div className="save-progress" role="status"><div><LoaderCircle size={17} className="spin"/><strong>매장 정보와 사진을 저장하고 있습니다…</strong></div></div>}
        <div className="registration-submit"><p>매장 정보와 사진은 공개 목록에 표시되고 공개 GitHub 저장소에 보관됩니다. 목록에서 삭제해도 이전 커밋에 남을 수 있습니다.</p><button type="submit" className="button primary" disabled={disabled}>{busy ? <LoaderCircle size={18} className="spin"/> : <Check size={18}/>} {busy ? '저장 중…' : '등록 완료'}</button>{(unit || photos.length > 0 || requestId.current) && <button type="button" className="text-button" onClick={cancelDraft} disabled={disabled}>작성 취소</button>}</div>
      </form>
    </div>
  </div>;
}
