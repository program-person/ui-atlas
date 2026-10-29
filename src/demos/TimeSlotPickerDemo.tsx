import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TimeSlotPickerDemo({ settings }: { settings: Settings }) {
const [selected,setSelected]=useState<number|null>(null);const interval=Number(settings.mode);const format=(minutes:number)=>String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');const slots=Array.from({length:180/interval},(_,index)=>540+index*interval);
return <div className="growth2-demo"><h1>空いている時間帯を選ぶ</h1><p>架空の2026年10月29日・日本時間</p><div className="g2-actions">{slots.map(start=><button key={start} disabled={start===600} aria-pressed={selected===start} onClick={()=>setSelected(start)}>{format(start)} {start===600?'利用不可':'空き'}</button>)}</div><p role="status">{selected===null?'未選択':'選択：'+format(selected)+'〜'+format(selected+interval)}</p></div>;
}
