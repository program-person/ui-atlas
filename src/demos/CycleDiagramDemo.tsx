import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CycleDiagramDemo({ settings }: { settings: Settings }) {
const [step,setStep]=useState(0);const names=['観察','制作','確認'];const direction=settings.mode==='reverse'?2:1;const next=(step+direction)%3;const coordinates=[[180,40],[280,150],[80,150]];
return <div className="growth2-demo"><h1>繰り返す手順の図</h1><button onClick={()=>setStep(next)}>次の手順</button><p role="status">現在：{names[step]} / 次：{names[next]}</p><svg viewBox="0 0 360 210" style={{width:'100%'}} aria-hidden="true"><path d="M180 40L280 150H80Z" fill="none" stroke="#52685c"/>{names.map((name,index)=><g key={name}><circle cx={coordinates[index][0]} cy={coordinates[index][1]} r="35" fill={index===step?'#d7e6df':'white'} stroke="#235b46" strokeWidth={index===step?4:1}/><text x={coordinates[index][0]} y={coordinates[index][1]+5} textAnchor="middle">{name}</text></g>)}</svg><p>進む順：{settings.mode==='reverse'?'観察 → 確認 → 制作 → 観察':'観察 → 制作 → 確認 → 観察'}</p></div>;
}
