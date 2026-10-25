import { useEffect, useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const notes = ['目的の整理','余白の比較','配色の案','配置の確認','見出しの強弱','操作の距離','結果の案内','狭い画面の確認','仕上げの記録'];
export function LoadMoreDemo({ settings }: { settings: Settings }) {
  const batch = Number(settings.batch); const initial = settings.initial === 'near-end' ? notes.length - 1 : batch;
  const [count, setCount] = useState(initial); const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const previousCount = useRef(initial); const listId = useId();
  useEffect(() => { if (count > previousCount.current) headingRefs.current[previousCount.current]?.focus(); previousCount.current = count; }, [count]);
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">KEEP THE PREVIOUS ITEMS</span><h1>一覧の続きだけを追加する</h1><p className="demo-muted">全9件の架空ノートです。通信は行いません。</p><ul id={listId} className="load-more-list">{notes.slice(0,count).map((note,index) => <li key={note}><article className="continuation-panel"><h2 tabIndex={-1} ref={(element) => { headingRefs.current[index] = element; }}>{index + 1}. {note}</h2><p>画面を考えるためのサンプルです。</p></article></li>)}</ul>
    <button className="demo-primary" aria-controls={listId} disabled={count === notes.length} onClick={() => setCount(Math.min(notes.length,count + batch))}>{count === notes.length ? 'すべて表示済み' : '続きを表示する'}</button><p role="status">{notes.length}件中{count}件を表示しています。</p></div>;
}
