import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ColorMixDemo({ settings }: { settings: Settings }) {
const [strong,setStrong]=useState(false); const amount=strong?75:25; const color='color-mix(in '+settings.mode+', #235b46 '+amount+'%, white)';
return <div className="growth2-demo"><h1>基準色から中間色を作る</h1><button onClick={()=>setStrong(value=>!value)}>割合を切り替える</button><p role="status">基準色 {amount}%</p><div className="g2-panel" role="img" aria-label={'基準色'+amount+'%の色見本'} style={{height:120,background:color}}/><code>{color}</code></div>;
}
