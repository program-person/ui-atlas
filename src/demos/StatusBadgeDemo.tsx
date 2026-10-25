import { useState } from 'react';
import type { Settings } from '../types.ts';
const states = [{label:'未着手',tone:'neutral',symbol:'○'},{label:'進行中',tone:'active',symbol:'◐'},{label:'完了',tone:'complete',symbol:'✓'}];
export function StatusBadgeDemo({ settings }: { settings: Settings }) {
  const [index, setIndex] = useState(settings.initial === 'complete' ? 2 : 0);
  const current = states[index];
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">A STATE AT A GLANCE</span><h1>短い状態を添える</h1><p className="demo-muted">色に加えて、常に文字でも状態を示します。</p>
    <article className="continuation-panel"><span className="note-label">SAMPLE NOTE</span><h2>配置の確認</h2><span className={`state-badge tone-${current.tone}`}>{settings.symbol === 'show' && <span aria-hidden="true">{current.symbol} </span>}{current.label}</span><p>一覧と詳細の間隔を比べる架空の作業です。</p></article>
    <button className="demo-secondary" onClick={() => setIndex((index + 1) % states.length)}>次の状態を試す</button><p role="status">現在の状態：{current.label}</p></div>;
}
