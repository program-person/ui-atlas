import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TimelineScrubberDemo({ settings }: { settings: Settings }) {
  const [seconds, setSeconds] = useState(0);
  const frame = seconds < 10 ? 0 : seconds < 20 ? 1 : 2;
  const names = ['余白', '配色', '文章'];
  return <div className="cont3-demo"><h1>時刻からプレビューを選ぶ</h1><label>プレビューの位置<input type="range" min="0" max="30" step={Number(settings.mode)} value={seconds} onChange={event => setSeconds(Number(event.target.value))} /></label><div className="cont3-actions"><button disabled={seconds === 0} onClick={() => setSeconds(value => Math.max(0, value - 5))}>5秒戻る</button><button disabled={seconds === 30} onClick={() => setSeconds(value => Math.min(30, value + 5))}>5秒進む</button></div><p role="status">位置 00:{String(seconds).padStart(2, '0')} / 図：{names[frame]}</p><svg viewBox="0 0 320 160" style={{ width: '100%', maxHeight: 220 }} role="img" aria-label={names[frame] + 'の自作図'}><rect width="320" height="160" fill="#edf0e9" />{frame === 0 ? <rect x="50" y="30" width="220" height="100" fill="white" stroke="#235b46" /> : frame === 1 ? ['#235b46', '#a24f31', '#385b8a'].map((color, index) => <rect key={color} x={30 + index * 95} y="35" width="70" height="90" fill={color} />) : [0, 1, 2, 3].map(index => <rect key={index} x="35" y={30 + index * 26} width={index === 3 ? 140 : 250} height="8" fill="#235b46" />)}</svg><p>静止画の位置指定のデモです。動画や音声は読み込みません。</p></div>;
}
