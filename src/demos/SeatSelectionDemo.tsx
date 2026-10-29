import { useState } from 'react';
import type { Settings } from '../types.ts';

export function SeatSelectionDemo({ settings }: { settings: Settings }) {
const [selected,setSelected]=useState<string[]>([]);const seats=['A','B','C'].flatMap(row=>[1,2,3,4].map(column=>row+column));const unavailable=['A2','B3'];
return <div className="growth2-demo"><h1>配置図から場所を選ぶ</h1><p>空き・選択中・予約済みを表示します。予約は確定しません。</p><div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:6,maxWidth:420}}>{seats.map(seat=>{const active=selected.includes(seat);const reserved=unavailable.includes(seat);return <button key={seat} disabled={reserved} aria-pressed={active} onClick={()=>setSelected(current=>active?current.filter(value=>value!==seat):settings.mode==='single'?[seat]:[...current,seat].sort())}>{seat} {reserved?'予約済み':active?'選択中':'空き'}</button>;})}</div><p role="status">選択：{selected.join('・')||'なし'}</p></div>;
}
