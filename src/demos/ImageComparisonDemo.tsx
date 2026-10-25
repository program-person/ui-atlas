import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
function ComparisonArt({ after, green }: { after: boolean; green: boolean }) {
  const accent = after ? green ? '#257554' : '#285db7' : '#8c97a8';
  return <svg viewBox="0 0 400 220" aria-hidden="true"><rect width="400" height="220" fill={after ? '#f1f6ff' : '#eceef2'} /><rect x="24" y="24" width="352" height="40" rx="6" fill={accent} /><rect x="24" y="82" width="160" height="114" rx="7" fill={after ? green ? '#cce9d9' : '#c9dafa' : '#d9dfe7'} /><rect x="202" y="82" width="174" height="12" rx="4" fill={accent} /><rect x="202" y="108" width="150" height="10" rx="4" fill="#9aaac2" /><rect x="202" y="132" width="174" height="10" rx="4" fill="#9aaac2" /><circle cx="104" cy="138" r="27" fill={accent} /><rect x="202" y="164" width="90" height="32" rx="5" fill={accent} /></svg>;
}
export function ImageComparisonDemo({ settings }: { settings: Settings }) {
  const [position, setPosition] = useState(Number(settings.initial)); const sliderId = useId(); const green = settings.palette === 'green';
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">REVEAL THE DIFFERENCE</span><h1>同じ図を重ねて比較する</h1><p className="demo-muted">左側が変更後、右側が変更前。自作SVGの配色だけを比べます。</p>
    <div className="comparison-frame" role="img" aria-label={`架空の配色比較。左側は${green ? '緑' : '青'}の変更後、右側は灰色の変更前。`}><ComparisonArt after={false} green={green} /><div className="comparison-after" style={{clipPath:`inset(0 ${100-position}% 0 0)`}}><ComparisonArt after green={green} /></div><span className="comparison-divider" aria-hidden="true" style={{left:`${position}%`}} /></div>
    <label className="exploration-field" htmlFor={sliderId}>比較の境界：{position}%<input id={sliderId} type="range" min={0} max={100} step={5} value={position} aria-valuetext={`変更後を${position}%表示`} onChange={(event) => setPosition(Number(event.target.value))} /></label><p role="status">変更後を{position}%、変更前を{100-position}%表示しています。</p></div>;
}
