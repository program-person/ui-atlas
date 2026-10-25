import { useState } from 'react';
import type { Settings } from '../types.ts';
const INITIAL_CARDS = 4; const EXPANDED_CARDS = 7;
export function ResponsiveGridDemo({ settings }: { settings: Settings }) {
  const [count, setCount] = useState(INITIAL_CARDS);
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">EQUAL CARDS, FLEXIBLE COLUMNS</span><h1>幅に合わせて列数を変える</h1><p className="demo-muted">同じ大きさのカードを、利用できる幅に並べます。</p><button className="demo-secondary" onClick={() => setCount(count === INITIAL_CARDS ? EXPANDED_CARDS : INITIAL_CARDS)}>{count === INITIAL_CARDS ? 'カードを増やす' : '4枚に戻す'}</button>
    <ul className="equal-card-grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${settings.minimum}px), 1fr))`, gap: Number(settings.gap) }}>{Array.from({length:count}, (_,index) => <li key={index}><article><span className="note-label">CARD {index + 1}</span><h2>画面の案 {index + 1}</h2><p>余白と配置を比べるサンプルです。</p></article></li>)}</ul><p role="status">{count}枚。最小幅の目安{settings.minimum}px / 間隔{settings.gap}px。</p></div>;
}
