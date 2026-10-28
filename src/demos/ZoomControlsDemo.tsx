import { useState } from 'react';
import type { Settings } from '../types.ts';

const MIN_ZOOM = 50; const MAX_ZOOM = 200;
export function ZoomControlsDemo({ settings }: { settings: Settings }) {
  const initial = settings.initial === '150' ? 150 : 100;
  const step = settings.step === '25' ? 25 : 50;
  const [zoom, setZoom] = useState(initial);
  return <div className="expanded-demo final-collection"><span className="demo-kicker">ZOOM CONTROLS</span><h1>図の縮尺を変える</h1><p>架空の図を50〜200%で拡大・縮小します。</p><div className="final-zoom-controls"><button aria-disabled={zoom === MIN_ZOOM} onClick={() => setZoom(value => Math.max(MIN_ZOOM, value - step))}>縮小</button><button onClick={() => setZoom(initial)}>リセット</button><button aria-disabled={zoom === MAX_ZOOM} onClick={() => setZoom(value => Math.min(MAX_ZOOM, value + step))}>拡大</button></div><p role="status">表示倍率：{zoom}%</p><div className="final-zoom-viewport" role="region" aria-label="拡大した図" tabIndex={0}><svg viewBox="0 0 240 130" role="img" aria-label="3つの四角形を線でつないだ架空の図" style={{ width: `${zoom}%` }}><path d="M65 65 H175 M120 65 V105" stroke="#235de5" strokeWidth="4"/><rect x="20" y="40" width="45" height="50" rx="6" fill="#bfd0ff"/><rect x="175" y="40" width="45" height="50" rx="6" fill="#bfd0ff"/><rect x="95" y="100" width="50" height="25" rx="6" fill="#bfd0ff"/></svg></div></div>;
}
