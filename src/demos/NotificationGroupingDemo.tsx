import { useState } from 'react';
import type { Settings } from '../types.ts';

export function NotificationGroupingDemo({ settings }: { settings: Settings }) {
const [notices,setNotices]=useState([{id:1,kind:'設定'},{id:2,kind:'処理'},{id:3,kind:'設定'}]);const ordered=[...notices].reverse();
return <div className="growth2-demo"><h1>関連する通知をまとめる</h1><button disabled={notices.length>=6} onClick={()=>setNotices(current=>[...current,{id:current.length+1,kind:'設定'}])}>設定の通知を追加</button><p role="status">通知 {notices.length}件 / 上限6件</p>{settings.mode==='group'?['設定','処理'].map(kind=><section className="g2-panel" key={kind}><h2>{kind}・{ordered.filter(notice=>notice.kind===kind).length}件</h2><ul>{ordered.filter(notice=>notice.kind===kind).map(notice=><li key={notice.id}>{kind}の通知{notice.id}</li>)}</ul></section>):<ol>{ordered.map(notice=><li key={notice.id}>{notice.kind}の通知{notice.id}</li>)}</ol>}</div>;
}
