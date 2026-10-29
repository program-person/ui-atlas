import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ScheduleConflictDemo({ settings }: { settings: Settings }) {
const [adjacent,setAdjacent]=useState(settings.mode==='adjacent');const start=adjacent?11:10;const overlaps=Math.max(9,start)<Math.min(11,start+2);
return <div className="growth2-demo"><h1>時間帯の重なりを確認する</h1><button onClick={()=>setAdjacent(value=>!value)}>時間帯を切り替える</button><p role="status">{overlaps?'1時間の重複あり':'重複なし・終了と開始が同時刻'}</p><svg viewBox="0 0 360 160" style={{width:'100%'}} aria-hidden="true">{[9,10,11,12,13].map(hour=><text key={hour} x={60+(hour-9)*65} y="20">{hour}:00</text>)}<rect x="60" y="40" width="130" height="30" fill="#235b46"/><rect x={60+(start-9)*65} y="90" width="130" height="30" fill="#a24f31"/></svg><ul><li>予定A：09:00〜11:00</li><li>予定B：{start}:00〜{start+2}:00</li></ul><p>開始を含み、終了は含みません。架空の同日・日本時間です。</p></div>;
}
