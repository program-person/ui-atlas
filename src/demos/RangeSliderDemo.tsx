import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const MIN_SPACING = 8;
const MAX_SPACING = 40;
export function RangeSliderDemo({ settings }: { settings: Settings }) {
  const inputId = useId();
  const [spacing, setSpacing] = useState(Number(settings.initial));
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">ADJUST A VALUE</span><h1>余白をつまみで調整する</h1><p className="demo-muted">ドラッグや矢印キーで、数値を変えられます。</p>
    <label className="growth-field" htmlFor={inputId}>カードの余白<input id={inputId} type="range" min={MIN_SPACING} max={MAX_SPACING} step={settings.step} value={spacing} aria-valuetext={`${spacing}px`} onChange={(event) => setSpacing(Number(event.target.value))} /></label>
    <output htmlFor={inputId}>{spacing}px</output>
    <section className="growth-panel" style={{ padding: spacing }}><span className="note-label">SPACING PREVIEW</span><h2>小さな画面案</h2><p>余白の大きさを比較できます。</p></section>
    <p className="demo-status">範囲：8〜40px。Homeで最小、Endで最大。</p></div>;
}
