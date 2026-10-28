import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

type Color = 'blue' | 'green' | 'purple';
const names: Record<Color, string> = { blue: '青', green: '緑', purple: '紫' };
export function HistoryControlsDemo({ settings }: { settings: Settings }) {
  const initial: Color[] = settings.initial === 'seeded' ? ['blue', 'green'] : ['blue'];
  const capacity = settings.capacity === '5' ? 5 : 3;
  const [history, setHistory] = useState<Color[]>(initial);
  const [index, setIndex] = useState(initial.length - 1);
  const color = history[index];
  function choose(next: Color) { if (next === color) return; const entries = [...history.slice(0, index + 1), next].slice(-capacity); setHistory(entries); setIndex(entries.length - 1); }
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">UNDO AND REDO</span><h1>配色の履歴をたどる</h1><p>架空の配色変更を最大{capacity}件保持します。保存や実データの削除はありません。</p><div className={`final-color final-color-${color}`}>現在の配色：{names[color]}</div><div className="final-actions">{(['blue', 'green', 'purple'] as const).map(item => <button key={item} className="demo-secondary" onClick={() => choose(item)}>{names[item]}にする</button>)}</div><div className="final-actions"><button className="demo-secondary" aria-disabled={index === 0} onClick={() => { if (index > 0) setIndex(index - 1); }}>元に戻す</button><button className="demo-secondary" aria-disabled={index === history.length - 1} onClick={() => { if (index < history.length - 1) setIndex(index + 1); }}>やり直す</button></div><p role="status">{names[color]}、履歴 {index + 1} / {history.length}。</p><p>戻した後に別の色を選ぶと、その先の履歴は更新されます。</p></div>;
}
