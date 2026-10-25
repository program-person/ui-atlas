import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
const multipliers = [1,2,4];
export function SpacingScaleDemo({ settings }: { settings: Settings }) {
  const [level, setLevel] = useState(Number(settings.initial)); const [selected, setSelected] = useState(false); const inputId = useId();
  const unit = Number(settings.unit); const multiplier = multipliers[level-1]; const space = unit * multiplier;
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">SPACE IN RELATED STEPS</span><h1>余白を共通の単位で揃える</h1><p className="demo-muted">枠の内側と項目間隔に、同じ段階の値を使います。</p>
    <label className="exploration-field" htmlFor={inputId}>余白の段階：{level}<input id={inputId} type="range" min={1} max={3} step={1} value={level} aria-valuetext={`段階${level}、${space}px`} onChange={(event) => setLevel(Number(event.target.value))} /></label>
    <article className="spacing-sample" style={{padding:space,gap:space}}><h2>画面のアイデア</h2><p>見出し・説明・操作の間隔を比べます。</p><div className="spacing-row">同じ内容を保って比較</div><button className="demo-secondary" aria-pressed={selected} onClick={() => setSelected(!selected)}>{selected ? '選択を解除' : 'この余白を選ぶ'}</button></article><p role="status">単位{unit}px × {multiplier} = {space}px（枠の内側・項目間隔）。</p></div>;
}
