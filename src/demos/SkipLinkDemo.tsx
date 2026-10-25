import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function SkipLinkDemo({ settings }: { settings: Settings }) {
  const [status, setStatus] = useState('Tabで最初のリンク、Enterで内容へ移動できます。');
  const noteRef = useRef<HTMLHeadingElement>(null); const checklistRef = useRef<HTMLHeadingElement>(null); const rootId = useId();
  const checklist = settings.target === 'checklist'; const targetId = `${rootId}-${checklist ? 'checklist' : 'note'}`;
  return <div className="expanded-demo exploration-demo"><a className={`demo-skip-link ${settings.visibility === 'focus' ? 'skip-on-focus' : ''}`} href={`#${targetId}`} onClick={(event) => { event.preventDefault(); (checklist ? checklistRef : noteRef).current?.focus(); setStatus(checklist ? 'チェックリストへ移動しました。' : '本文へ移動しました。'); }}>{checklist ? 'チェックリストへ移動' : '本文へ移動'}</a>
    <span className="demo-kicker">BYPASS REPEATED CONTROLS</span><h1>操作群を飛ばして内容へ進む</h1><p className="demo-muted">リンクはデモ内の見出しへ移動します。</p><nav aria-label="サンプルの移動先" className="exploration-actions">{['概要','記録','補足'].map((label) => <button key={label} className="demo-secondary" onClick={() => setStatus(`${label}の操作を試しました。`)}>{label}</button>)}</nav>
    <section className="exploration-panel"><h2 ref={noteRef} id={`${rootId}-note`} tabIndex={-1}>ノートの本文</h2><p>検索と一覧を近くに置く架空のメモです。</p><button className="demo-secondary" onClick={() => setStatus('本文を確認しました。')}>本文を確認</button></section>
    <section className="exploration-panel"><h2 ref={checklistRef} id={`${rootId}-checklist`} tabIndex={-1}>確認のチェックリスト</h2><p>幅・余白・文字の順に確認します。</p><button className="demo-secondary" onClick={() => setStatus('チェックリストを確認しました。')}>チェックリストを確認</button></section><p role="status">{status}</p></div>;
}
