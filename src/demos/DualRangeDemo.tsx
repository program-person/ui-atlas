import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
const MIN_SCORE = 0; const MAX_SCORE = 100;
const scores = [0,20,40,60,80,100];
export function DualRangeDemo({ settings }: { settings: Settings }) {
  const [lower, setLower] = useState(settings.initial === 'narrow' ? 40 : 20); const [upper, setUpper] = useState(settings.initial === 'narrow' ? 60 : 80); const inputId = useId(); const step = Number(settings.step);
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">TWO ENDS OF A RANGE</span><h1>下限と上限で範囲を選ぶ</h1><p className="demo-muted">独立した2つの標準スライダーを使います。下限は上限を越えません。</p>
    <label className="exploration-field" htmlFor={`${inputId}-lower`}>下限：{lower}点<input id={`${inputId}-lower`} type="range" min={MIN_SCORE} max={upper} step={step} value={lower} aria-valuetext={`${lower}点`} onChange={(event) => setLower(Math.min(upper,Number(event.target.value)))} /></label>
    <label className="exploration-field" htmlFor={`${inputId}-upper`}>上限：{upper}点<input id={`${inputId}-upper`} type="range" min={lower} max={MAX_SCORE} step={step} value={upper} aria-valuetext={`${upper}点`} onChange={(event) => setUpper(Math.max(lower,Number(event.target.value)))} /></label>
    <div className="dual-range-track" aria-hidden="true"><span style={{left:`${lower}%`,width:`${upper-lower}%`}} /></div><p role="status">選択範囲：{lower}〜{upper}点。{step}点刻み。</p>
    <ul className="score-list" aria-label="範囲内のサンプル">{scores.filter((score) => score >= lower && score <= upper).map((score) => <li key={score}>{score}点の記録</li>)}</ul>{!scores.some((score) => score >= lower && score <= upper) && <p>範囲内のサンプルはありません。</p>}</div>;
}
