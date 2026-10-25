import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const notes = ['画面のアイデア', '余白の記録', '色の比較', '操作の確認'];
export function StickyHeaderDemo({ settings }: { settings: Settings }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  function scroll(end: boolean) { if (rootRef.current) rootRef.current.scrollTop = end ? rootRef.current.scrollHeight : 0; }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">KEEP THE HEADER NEARBY</span><h1>枠の中でヘッダーを追従させる</h1><p className="demo-muted">辞典本体とは独立した、スクロール枠です。</p>
    <div className="extension-actions"><button className="demo-secondary" onClick={() => scroll(true)}>末尾へ移動</button><button className="demo-secondary" onClick={() => scroll(false)}>先頭へ戻る</button></div>
    <div ref={rootRef} className="sticky-demo-frame" role="region" aria-label="ノートの一覧" tabIndex={0} onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}>
      <header className={`sticky-sample-header header-${settings.position}`} style={{ height: Number(settings.height) }}><strong>ノート一覧</strong><button className="demo-secondary" onClick={() => scroll(false)}>先頭へ</button></header>
      {notes.map((note, index) => <article key={note}><span className="note-label">NOTE {index + 1}</span><h2>{note}</h2><p>架空のノートです。枠をスクロールして見比べてください。</p></article>)}
    </div><p role="status">{scrolled ? '一覧をスクロールしています。' : '一覧の先頭です。'}</p></div>;
}
