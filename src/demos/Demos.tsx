import { useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, KeyboardEvent } from 'react';
import type { Pattern, Settings } from '../types.ts';
import { Icon } from '../components/Icon.tsx';
import { normalizeSearch } from '../catalog/logic.ts';

function isBackdropClick(event: MouseEvent<HTMLDialogElement>): boolean {
  if (event.target !== event.currentTarget) return false;
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
}

function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>): void {
  if (event.key !== 'Tab') return;
  const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
  const first = elements[0]; const last = elements.at(-1);
  // iframeの外へTabが出る前に、デモ内のダイアログで循環させる。
  if (event.shiftKey && event.currentTarget.ownerDocument.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && event.currentTarget.ownerDocument.activeElement === last) { event.preventDefault(); first?.focus(); }
}

function DialogDemo({ drawer, settings }: { drawer: boolean; settings: Settings }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState('');
  const title = drawer ? 'デザインノート' : 'ラベルを付ける';
  return <div className="demo-workspace">
    <div className="demo-kicker">SAMPLE WORKSPACE</div><h1>アイデアのノート</h1><p className="demo-muted">背景を残しながら、補助的な操作を開く。</p>
    <div className="sample-note"><span className="note-label">DESIGN</span><h2>次の画面を考える</h2><p>検索と一覧をひとつの画面に。</p><button ref={triggerRef} className="demo-primary" onClick={() => { setStatus(''); if (dialogRef.current) { dialogRef.current.returnValue = ''; dialogRef.current.showModal(); } }}>
      {drawer ? '詳細を開く' : 'ラベルを付ける'}<Icon name="arrow" size={16} /></button></div>
    <p className="demo-status" role="status">{status || 'ボタンを押して、開く・閉じるを試せます。'}</p>
    <dialog ref={dialogRef} className={drawer ? `drawer-shell from-${settings.direction}` : 'modal-shell'} aria-labelledby="dialog-title" onKeyDown={trapDialogFocus}
      style={{ '--demo-duration': `${settings.duration ?? '200'}ms` } as CSSProperties}
      onClick={(event) => { if (isBackdropClick(event) && (drawer || settings.dismiss === 'allow')) dialogRef.current?.close('cancel'); }}
      onClose={() => { if (dialogRef.current?.returnValue === 'confirm') setStatus(drawer ? 'ノートの確認が完了しました。' : '「アイデア」ラベルを付けました。'); triggerRef.current?.focus(); }}>
      <div className="dialog-heading"><span className="demo-kicker">{drawer ? 'NOTE DETAILS' : 'CONFIRMATION'}</span><button className="demo-icon-button" aria-label="閉じる" autoFocus onClick={() => dialogRef.current?.close('cancel')}><Icon name="close" /></button></div>
      <h2 id="dialog-title">{title}</h2>
      <p>{drawer ? '一覧の位置を保ったまま、選んだノートの詳細を確認しています。' : 'このノートに「アイデア」ラベルを付けます。元の画面にはそのまま戻れます。'}</p>
      {drawer && <div className="detail-note"><span>メモ</span><p>カードは余白を広めに。検索欄は一覧の近くに置く。</p><span>状態</span><p><span className="sample-pill">検討中</span></p></div>}
      <div className="dialog-actions"><button className="demo-secondary" onClick={() => dialogRef.current?.close('cancel')}>戻る</button><button className="demo-primary" onClick={() => dialogRef.current?.close('confirm')}>{drawer ? '確認できた' : 'ラベルを付ける'}</button></div>
    </dialog>
  </div>;
}

const navigationItems = ['概要', 'ノート', 'ツール'] as const;
function SidebarDemo({ settings }: { settings: Settings }) {
  const [collapsed, setCollapsed] = useState(settings.initialState === 'collapsed');
  const [selected, setSelected] = useState<string>('概要');
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const links = (mobile: boolean) => navigationItems.map((item, index) => <button key={item} title={item} aria-label={item} aria-current={selected === item ? 'page' : undefined}
    className={selected === item ? 'active' : ''} onClick={() => { setSelected(item); if (mobile) mobileDialogRef.current?.close(); }}>
    <Icon name={index === 0 ? 'grid' : index === 1 ? 'layers' : 'flow'} />{(!collapsed || mobile) && <span>{item}</span>}</button>);
  return <div className={`sidebar-demo ${collapsed ? 'collapsed' : ''}`}>
    <nav className="desktop-demo-sidebar" aria-label="ワークスペース"><div className="demo-brand"><Icon name="grid" />{!collapsed && 'Workspace'}</div>{links(false)}
      <button className="collapse-control" aria-label={collapsed ? 'サイドバーを展開' : 'サイドバーを折りたたむ'} aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}><Icon name="sidebar" />{!collapsed && <span>折りたたむ</span>}</button></nav>
    <main className="sidebar-demo-main"><div className="mobile-demo-header"><button ref={menuButtonRef} className="demo-secondary mobile-nav-trigger" onClick={() => mobileDialogRef.current?.showModal()}><Icon name="sidebar" />メニュー</button></div>
      <span className="demo-kicker">YOUR WORKSPACE</span><h1>{selected}</h1><p className="demo-muted">{selected === '概要' ? '今日の作業を、ひとつの場所に。' : selected === 'ノート' ? '考えを置いておく、小さなノート。' : '使いたい道具を、すぐ手元に。'}</p>
      <div className="sample-stat"><span>{selected === '概要' ? '進行中のアイデア' : selected === 'ノート' ? 'ノート' : 'ツール'}</span><strong>{selected === '概要' ? '03' : selected === 'ノート' ? '08' : '05'}</strong><i /></div>
      <div className="sample-placeholder"><i /><i /><i /></div></main>
    <dialog className="drawer-shell from-left mobile-navigation-dialog" ref={mobileDialogRef} aria-labelledby="navigation-title" onKeyDown={trapDialogFocus} onClose={() => menuButtonRef.current?.focus()} onClick={(event) => { if (isBackdropClick(event)) mobileDialogRef.current?.close(); }}>
      <div className="dialog-heading"><h2 id="navigation-title">メニュー</h2><button autoFocus className="demo-icon-button" aria-label="メニューを閉じる" onClick={() => mobileDialogRef.current?.close()}><Icon name="close" /></button></div><nav aria-label="スマホのワークスペース">{links(true)}</nav>
    </dialog>
  </div>;
}

function HoverDemo({ settings }: { settings: Settings }) {
  const [clicks, setClicks] = useState(0);
  return <div className="hover-demo" style={{ '--demo-duration': `${settings.duration}ms` } as CSSProperties}>
    <span className="demo-kicker">SMALL INTERACTIONS</span><h1>操作に、手応えを。</h1><p className="demo-muted">マウス・タッチ・Tabキーで試す。</p>
    <button className={`feedback-button effect-${settings.effect}`} onClick={() => setClicks(clicks + 1)}>試してみる<Icon name="arrow" /></button>
    <p className="demo-status" role="status">{clicks ? `${clicks}回押しました。` : 'ポインターを乗せるか、フォーカスしてください。'}</p>
    <div className="interaction-legend"><span>HOVER</span><span>FOCUS</span><span>PRESS</span></div>
  </div>;
}

const sampleTools = [
  { name: 'スケッチボード', category: 'デザイン', description: 'アイデアを描く design sketch' },
  { name: 'カラーパレット', category: 'デザイン', description: '色の組み合わせを探す design color' },
  { name: 'コードノート', category: '開発', description: 'コードのメモを残す code note' },
  { name: 'CSSプレビュー', category: '開発', description: 'スタイルを試す css design code' },
];
function SearchDemo({ settings }: { settings: Settings }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const matches = sampleTools.filter((tool) => {
    const searchable = normalizeSearch(`${tool.name} ${tool.description} ${tool.category}`);
    const termMatches = !terms.length || (settings.matching === 'any' ? terms.some((term) => searchable.includes(term)) : terms.every((term) => searchable.includes(term)));
    return termMatches && (category === 'すべて' || category === tool.category);
  });
  return <div className="search-demo"><span className="demo-kicker">TOOL COLLECTION</span><h1>使いたい道具を探す</h1>
    <label className="demo-field">キーワード<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：design code" aria-controls="tool-results" /></label>
    <fieldset className="filter-chips"><legend>分類</legend>{['すべて', 'デザイン', '開発'].map((value) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</fieldset>
    <div className="search-demo-count"><span role="status">{matches.length}件{query && ` · 「${query}」`}</span><button onClick={() => { setQuery(''); setCategory('すべて'); }}>条件を解除</button></div>
    <div id="tool-results" className="tool-results">{matches.map((tool) => <div key={tool.name} className="tool-result"><span>{tool.category}</span><strong>{tool.name}</strong><p>{tool.description.split(' ').filter((word) => !/^[a-z]+$/.test(word)).join(' ')}</p></div>)}</div>
    {!matches.length && <div className="demo-empty"><strong>見つかりませんでした</strong><p>キーワードや分類を変えてみてください。</p><button className="demo-secondary" onClick={() => { setQuery(''); setCategory('すべて'); }}>すべての道具を見る</button></div>}
  </div>;
}

export function Demo({ pattern, settings }: { pattern: Pattern; settings: Settings }) {
  switch (pattern.demoId) {
    case 'drawer': return <DialogDemo drawer settings={settings} />;
    case 'modal': return <DialogDemo drawer={false} settings={settings} />;
    case 'sidebar': return <SidebarDemo settings={settings} />;
    case 'hover-feedback': return <HoverDemo settings={settings} />;
    case 'search-filter': return <SearchDemo settings={settings} />;
  }
}
