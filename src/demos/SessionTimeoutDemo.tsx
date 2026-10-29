import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function SessionTimeoutDemo({ settings }: { settings: Settings }) {
  const [remaining,setRemaining]=useState(settings.mode==='long'?12:8);const [ended,setEnded]=useState<'expired'|'manual'|null>(null);const maximum=settings.mode==='long'?12:8;useEffect(()=>{setRemaining(maximum);setEnded(null)},[maximum]);useEffect(()=>{if(ended)return;const timer=window.setInterval(()=>setRemaining(value=>Math.max(0,value-1)),1000);return()=>window.clearInterval(timer)},[ended]);useEffect(()=>{if(remaining===0)setEnded(current=>current??'expired')},[remaining]);const warning=remaining<=(settings.warning==='late'?2:5);return <div className="exflow-demo"><h1>セッション期限の警告</h1><p>期限前に警告し、継続または終了を選ぶ。</p><p role="status">{ended==='manual'?'利用を終了しました':ended==='expired'?'期限が切れました':warning?'まもなく期限が切れます':'利用中'}（残り {remaining} 秒）</p><button aria-disabled={!!ended} onClick={()=>{if(!ended)setRemaining(maximum)}}>利用を延長</button><button aria-disabled={!!ended} onClick={()=>{if(!ended){setEnded('manual');setRemaining(0)}}}>終了する</button></div>
}
