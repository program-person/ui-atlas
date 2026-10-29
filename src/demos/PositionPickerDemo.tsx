import { useState } from 'react';
import type { Settings } from '../types.ts';

export function PositionPickerDemo({ settings }: { settings: Settings }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  return <div className="cont3-demo"><h1>平面上の位置を選ぶ</h1><p>左上が原点です。</p><label>横の位置<input type="range" min="0" max="100" step={Number(settings.mode)} value={position.x} onChange={event => setPosition(current => ({ ...current, x: Number(event.target.value) }))} /></label><label>縦の位置<input type="range" min="0" max="100" step={Number(settings.mode)} value={position.y} onChange={event => setPosition(current => ({ ...current, y: Number(event.target.value) }))} /></label><div className="cont3-actions"><button onClick={() => setPosition({ x: 50, y: 50 })}>中央へ</button><button onClick={() => setPosition({ x: 100, y: 100 })}>右下へ</button></div><p role="status">横 {position.x}% / 縦 {position.y}%</p><div className="cont3-position-plane" role="img" aria-label={'印の位置：横' + position.x + '%・縦' + position.y + '%'}><div style={{ position: 'absolute', inset: 12 }}><span className="cont3-position-dot" style={{ left: position.x + '%', top: position.y + '%' }} /></div></div></div>;
}
