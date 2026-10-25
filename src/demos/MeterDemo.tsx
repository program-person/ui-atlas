import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const MAX_USAGE = 100;
const LOW_USAGE = 50;
const OPTIMUM_USAGE = 20;
const INPUT_STEP = 5;
export function MeterDemo({ settings }: { settings: Settings }) {
  const [usage, setUsage] = useState(Number(settings.initial));
  const meterId = useId(); const inputId = useId(); const high = Number(settings.high);
  const state = usage <= LOW_USAGE ? '余裕あり' : usage <= high ? '注意' : '上限に近い';
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">A MEASURED AMOUNT</span><h1>現在の量を範囲で読む</h1><p className="demo-muted">処理の完了率ではなく、架空の使用率を表します。</p>
    <section className="extension-panel"><label id={`${meterId}-label`} htmlFor={meterId}>サンプルの使用率</label><meter className="extension-meter" id={meterId} aria-labelledby={`${meterId}-label`} min={0} max={MAX_USAGE} low={LOW_USAGE} high={high} optimum={OPTIMUM_USAGE} value={usage}>{usage}%</meter><p role="status">{usage}% 使用 · {state}</p></section>
    <label className="extension-field" htmlFor={inputId}>使用率を試す<input id={inputId} type="range" min={0} max={MAX_USAGE} step={INPUT_STEP} value={usage} aria-valuetext={`${usage}%`} onChange={(event) => setUsage(Number(event.target.value))} /></label>
    <p className="demo-status">50%以下は余裕あり、{high}%以下は注意、それより上は上限に近い状態です。</p></div>;
}
