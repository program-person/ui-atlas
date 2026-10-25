import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

export function EmptyStateDemo({ settings }: { settings: Settings }) {
  const [ready, setReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstUse = settings.reason === 'first';
  useEffect(() => { if (ready) headingRef.current?.focus(); }, [ready]);
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">A USEFUL STARTING POINT</span><h1>何もない時の次の一歩</h1><p className="demo-muted">空になった理由に合う操作を案内します。</p>
    {ready ? <section className="growth-panel"><h2 tabIndex={-1} ref={headingRef}>ノート一覧</h2><ul><li>画面のアイデア</li>{!firstUse && <li>余白の記録</li>}</ul></section>
      : <section className={`growth-panel empty-${settings.alignment}`}><span className="empty-mark" aria-hidden="true">＋</span><h2>{firstUse ? '最初のノートを作ろう' : '条件に合うノートがありません'}</h2><p>{firstUse ? 'ここには、作成したノートが並びます。' : '現在の条件：保存済み。条件を外すと2件のノートが見られます。'}</p><button className="demo-primary" onClick={() => setReady(true)}>{firstUse ? 'サンプルを追加' : '条件を解除'}</button></section>}
    <p role="status">{ready ? firstUse ? '架空のサンプルを1件追加しました。' : '条件を解除し、2件を表示しました。' : '表示するノートは0件です。'}</p></div>;
}
