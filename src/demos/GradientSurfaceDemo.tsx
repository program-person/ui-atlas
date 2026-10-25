import { useState } from 'react';
import type { Settings } from '../types.ts';
const palettes = { blue: ['#dce9ff','#eae1ff'], green: ['#d9f2e5','#e7f1ff'] } as const;
export function GradientSurfaceDemo({ settings }: { settings: Settings }) {
  const [reversed, setReversed] = useState(false); const colors = palettes[settings.palette === 'green' ? 'green' : 'blue']; const start = colors[reversed ? 1 : 0]; const end = colors[reversed ? 0 : 1];
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">A SURFACE BETWEEN TWO COLORS</span><h1>色の移り変わりを面に使う</h1><p className="demo-muted">淡い2色の面で、方向と色の並びを比較します。</p><article className="gradient-sample" style={{backgroundImage:`linear-gradient(${settings.angle}deg, ${start}, ${end})`}}><span className="note-label">SAMPLE NOTE</span><h2>余白から広がる</h2><p>同じ内容を、異なる色の移り変わりで見比べます。</p></article>
    <button className="demo-secondary" aria-pressed={reversed} onClick={() => setReversed(!reversed)}>色の順序を反転</button><p role="status">角度{settings.angle}度。始点{start} / 終点{end}。</p></div>;
}
