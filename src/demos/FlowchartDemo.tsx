import { useState } from 'react';
import type { Settings } from '../types.ts';

export function FlowchartDemo({ settings }: { settings: Settings }) {
const [yes,setYes]=useState(settings.mode==='yes');
return <div className="growth2-demo"><h1>条件分岐のフローチャート</h1><button onClick={()=>setYes(value=>!value)}>答えを切り替える</button><p role="status">{yes?'はい → 確認':'いいえ → 補足'}</p><svg viewBox="0 0 360 240" style={{width:'100%'}} role="img" aria-label={'開始から条件へ。'+(yes?'はいで確認へ進む':'いいえで補足へ進む')}><rect x="130" y="5" width="100" height="35" rx="5" fill="#d7e6df"/><text x="180" y="28" textAnchor="middle">開始</text><text x="180" y="62" textAnchor="middle">↓</text><path d="M180 65L270 115L180 165L90 115Z" fill="#e9edde" stroke="#52685c"/><text x="180" y="120" textAnchor="middle" fontSize="13">内容は揃った？</text><path d="M90 115H55V190" fill="none" stroke="#235b46" strokeWidth={yes?4:1}/><path d="M270 115H305V190" fill="none" stroke="#a24f31" strokeWidth={yes?1:4}/><text x="20" y="173">はい ↓</text><text x="280" y="173">いいえ ↓</text><rect x="5" y="193" width="100" height="35" fill="#d7e6df"/><text x="55" y="217" textAnchor="middle">確認</text><rect x="255" y="193" width="100" height="35" fill="#f0e1d4"/><text x="305" y="217" textAnchor="middle">補足</text></svg></div>;
}
