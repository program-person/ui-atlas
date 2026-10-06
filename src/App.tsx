import { useEffect, useRef, useState } from 'react';
import type { Category, Pattern, Settings } from './types.ts';
import { CATEGORIES } from './types.ts';
import { catalogRepository } from './catalog/repository.ts';
import { buildPrompt, defaultSettings, searchPatterns } from './catalog/logic.ts';
import { Icon } from './components/Icon.tsx';
import { Thumbnail } from './components/Thumbnail.tsx';
import { Demo } from './demos/Demos.tsx';

function useCatalog() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    catalogRepository.list().then((catalog) => { if (!cancelled) { setPatterns(catalog); setError(''); } })
      .catch(() => { if (!cancelled) setError('項目を読み込めませんでした。もう一度試してください。'); });
    return () => { cancelled = true; };
  }, [attempt]);
  return { patterns, error, retry: () => setAttempt(attempt + 1) };
}

function useHash(): string {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => { const update = () => setHash(window.location.hash); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  return hash;
}

function parseId(hash: string, prefix: string): string | null {
  if (!hash || hash === '#/' || hash === '#') return prefix === '#/patterns/' ? 'drawer' : null;
  if (!hash.startsWith(prefix)) return null;
  try { return decodeURIComponent(hash.slice(prefix.length).split('?')[0]); } catch { return null; }
}

function PatternDetail({ pattern, relatedPatterns }: { pattern: Pattern; relatedPatterns: Pattern[] }) {
  const [settings, setSettings] = useState<Settings>(() => defaultSettings(pattern));
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [revision, setRevision] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prompt = buildPrompt(pattern, settings);
  const parameters = new URLSearchParams(settings).toString();
  const demoUrl = `${window.location.pathname}#/demo/${encodeURIComponent(pattern.id)}?${parameters}`;
  async function copyPrompt() {
    try { if (!navigator.clipboard) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(prompt); setCopyStatus('コピーしました'); }
    catch { setCopyStatus('コピーできなかったため、下の指示文を選択しました。手動でコピーしてください。'); textareaRef.current?.focus(); textareaRef.current?.select(); }
  }
  return <article className="pattern-detail" aria-labelledby="pattern-title">
    <div className="detail-header"><div><span className="eyebrow">PATTERN EXPLORER</span><h2 id="pattern-title">{pattern.nameJa}</h2><p>{pattern.nameEn}</p></div><span className="category-badge">{pattern.category}</span></div>
    <div className="preview-toolbar"><span className="preview-label"><i />LIVE PREVIEW</span><div className="preview-actions"><div className="segmented" aria-label="デモの表示幅"><button aria-pressed={viewport === 'desktop'} onClick={() => setViewport('desktop')}><Icon name="monitor" size={15} /><span>PC</span></button><button aria-pressed={viewport === 'mobile'} onClick={() => setViewport('mobile')}><Icon name="phone" size={15} /><span>スマホ</span></button></div><button className="icon-button" aria-label="デモをリセット" title="デモをリセット" onClick={() => setRevision(revision + 1)}><Icon name="reset" size={16} /></button></div></div>
    <div className={`preview-canvas ${viewport === 'mobile' ? 'mobile-preview' : ''}`}><iframe key={`${pattern.id}-${parameters}-${revision}`} src={demoUrl} title={`${pattern.nameJa}の操作デモ`} className="demo-frame" /></div>
    <div className="preview-note">デモの中で操作できます。{viewport === 'mobile' ? '幅375pxを上限に表示。' : '表示領域に合わせたPC幅。'} <span>リセットで初期状態に戻ります。</span></div>
    <section className="settings-section" aria-labelledby="settings-title"><h3 id="settings-title">挙動を調整する</h3><div className="settings-grid">{pattern.controls.map((control) => <label key={control.id} className="setting-field"><span>{control.label}</span><select value={settings[control.id]} onChange={(event) => { setSettings({ ...settings, [control.id]: event.target.value }); setCopyStatus(''); }}>{control.options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select><small>{control.help}</small></label>)}</div></section>
    <section className="prompt-section" aria-labelledby="prompt-title"><div className="section-heading"><div><span className="eyebrow">READY TO PROMPT</span><h3 id="prompt-title">このUIを、AIに伝える</h3></div><button className="primary-button" onClick={copyPrompt}><Icon name="copy" size={16} />指示文をコピー</button></div><textarea ref={textareaRef} aria-label="AIへの指示文" readOnly value={prompt} /><p className="copy-status" role="status">{copyStatus || '選んだ設定が、そのまま指示文に反映されます。'}</p></section>
    <section className="explanation-section"><h3>どんなパターン？</h3><p>{pattern.description}</p><div className="usage-grid"><div><h4><Icon name="check" size={16} />向いている用途</h4><ul>{pattern.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>使う前に考えること</h4><ul>{pattern.cautions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      {!!relatedPatterns.length && <div className="related-patterns"><span>似たパターンも見る</span>{relatedPatterns.map((related) => <a href={`#/patterns/${related.id}`} key={related.id}>{related.nameJa}<Icon name="arrow" size={14} /></a>)}</div>}
      <div className="references"><span>参考資料</span>{pattern.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">{reference.title}<Icon name="link" size={14} /></a>)}<small>デモ確認日：{pattern.verifiedAt}</small></div>
    </section>
  </article>;
}

export function App() {
  const hash = useHash();
  const { patterns, error, retry } = useCatalog();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'すべて'>('すべて');
  const demoRoute = hash.startsWith('#/demo/');
  const requestedId = parseId(hash, demoRoute ? '#/demo/' : '#/patterns/');
  const selected = patterns.find((pattern) => pattern.id === requestedId);
  useEffect(() => { document.title = selected ? `${selected.nameJa} — UI Atlas` : 'UI Atlas — 触って選べるUI/UX辞典'; }, [selected]);
  if (demoRoute) {
    if (error) return <div className="demo-root"><p role="alert">{error}</p><button onClick={retry}>再試行</button></div>;
    if (!patterns.length) return <p role="status">デモを読み込み中…</p>;
    if (!selected) return <p role="alert">デモが見つかりません。</p>;
    const parameters = new URLSearchParams(hash.split('?')[1] ?? '');
    const settings = defaultSettings(selected);
    for (const control of selected.controls) { const requested = parameters.get(control.id); if (requested && control.options.some((option) => option.value === requested)) settings[control.id] = requested; }
    return <div className="demo-root"><Demo pattern={selected} settings={settings} /></div>;
  }
  const visible = searchPatterns(patterns, query, category);
  const categoryIcons = { '見た目': 'palette', 'レイアウト': 'sidebar', '部品': 'layers', '動き': 'motion', 'UXの流れ': 'flow' } as const;
  return <div className="app-shell"><a href="#catalog" className="skip-link" onClick={(event) => { event.preventDefault(); document.getElementById('catalog')?.focus(); }}>パターン一覧へ移動</a>
    <aside className="app-sidebar"><a href="#/" className="brand"><span className="brand-mark"><Icon name="grid" size={20} /></span><span>UI Atlas<small>INTERFACE FIELD GUIDE</small></span></a>
      <div className="sidebar-label">LIBRARY</div><nav aria-label="パターンの分類"><button className={category === 'すべて' ? 'selected' : ''} aria-pressed={category === 'すべて'} onClick={() => setCategory('すべて')}><Icon name="grid" /><span>すべてのパターン</span><small>{patterns.length}</small></button>
      {CATEGORIES.map((value) => { const count = patterns.filter((pattern) => pattern.category === value).length; return <button key={value} className={category === value ? 'selected' : ''} disabled={!count} aria-pressed={category === value} onClick={() => setCategory(value)}><Icon name={categoryIcons[value]} /><span>{value}</span><small>{count}</small></button>; })}</nav>
      <div className="sidebar-bottom"><div className="field-guide-mark"><Icon name="layers" size={28} /></div><strong>見て、触って、言葉にする。</strong><p>つくりたいUIの<br />名前と挙動を見つけよう。</p><span className="version-tag">FIRST EDITION · {patterns.length} PATTERNS</span></div>
    </aside>
    <div className="app-content"><header className="topbar"><span>ライブラリ <span className="breadcrumb-divider">/</span> パターンを探す</span><span className="topbar-note"><span className="status-dot" />ブラウザで試せる辞典</span></header>
      <main id="catalog" tabIndex={-1} className="main-content"><div className="page-heading"><div><span className="eyebrow">THE INTERFACE COLLECTION</span><h1>つくりたいUIを、見つけよう。</h1><p>動くデモで確かめて、AIへの具体的な指示に。</p></div><span className="edition-badge">01 <small>/ FIRST EDITION</small></span></div>
      <div className="workspace-grid"><section className="catalog-panel" aria-labelledby="catalog-title"><label className="catalog-search"><Icon name="search" size={19} /><span className="sr-only">名前・用途でパターンを検索</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="名前・用途で探す" />{query && <button aria-label="検索語を消す" onClick={() => setQuery('')}><Icon name="close" size={16} /></button>}</label>
      <div className="catalog-heading"><h2 id="catalog-title">{category === 'すべて' ? 'すべてのパターン' : category}</h2><span role="status">{visible.length}件</span></div>
      {error ? <div className="catalog-empty"><p role="alert">{error}</p><button className="secondary-button" onClick={retry}>再試行</button></div> : !patterns.length ? <p role="status">項目を読み込み中…</p> : <div className="pattern-grid">{visible.map((pattern) => <a href={`#/patterns/${pattern.id}`} className={`pattern-card ${selected?.id === pattern.id ? 'is-selected' : ''}`} aria-current={selected?.id === pattern.id ? 'true' : undefined} key={pattern.id} onClick={(event) => { if (!event.ctrlKey && !event.metaKey && window.matchMedia('(max-width: 670px)').matches) document.querySelector('.pattern-detail')?.scrollIntoView({ block: 'start' }); }}><Thumbnail id={pattern.demoId} /><div className="card-body"><span className="card-category">{pattern.category}</span><h3>{pattern.nameJa}<Icon name="arrow" size={15} /></h3><p>{pattern.summary}</p><span className="card-english">{pattern.nameEn}</span></div></a>)}</div>}
      {!!patterns.length && !visible.length && <div className="catalog-empty"><Icon name="search" size={28} /><h3>見つかりませんでした</h3><p>キーワードや分類を変えてみてください。</p><button className="secondary-button" onClick={() => { setQuery(''); setCategory('すべて'); }}>条件を解除</button></div>}
      <div className="catalog-footnote"><Icon name="check" size={14} />掲載中のすべての項目に、操作デモと指示文があります。</div></section>
      {selected ? <PatternDetail key={selected.id} pattern={selected} relatedPatterns={patterns.filter((candidate) => selected.relatedIds.includes(candidate.id))} /> : !!patterns.length && <section className="pattern-detail missing-pattern"><h2>項目が見つかりません</h2><p>URLを確認するか、一覧からパターンを選んでください。</p><a href="#/patterns/drawer" className="secondary-button">ドロワーを見る</a></section>}
      </div></main><footer className="app-footer"><span>UI Atlas · 触って選べるUI/UX辞典</span><span>少しずつ、使えるパターンを増やす。</span></footer>
    </div></div>;
}
