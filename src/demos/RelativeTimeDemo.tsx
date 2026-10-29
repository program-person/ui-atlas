import { useState } from 'react';
import type { Settings } from '../types.ts';

export function RelativeTimeDemo({ settings }: { settings: Settings }) {
const [minutes,setMinutes]=useState(0);const reference=new Date('2026-10-29T12:30:00+09:00');const timestamp=new Date(new Date('2026-10-29T12:00:00+09:00').getTime()+minutes*60000);const relative=new Intl.RelativeTimeFormat('ja-JP',{numeric:'auto'}).format(Math.round((timestamp.getTime()-reference.getTime())/60000),'minute');const absolute=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(timestamp);
return <div className="growth2-demo"><h1>相対時刻と日時を切り替える</h1><p>架空の基準：2026/10/29 12:30 日本時間</p><button disabled={minutes===30} onClick={()=>setMinutes(value=>Math.min(30,value+5))}>記録を5分進める</button><p role="status"><time dateTime={timestamp.toISOString()} title={absolute}>{settings.mode==='absolute'?absolute:relative}</time></p><p>同じ記録の日時：{absolute} 日本時間</p></div>;
}
