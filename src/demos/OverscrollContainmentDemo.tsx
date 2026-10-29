import { useState } from 'react';
import type { Settings } from '../types.ts';
import {useRef} from 'react';
export function OverscrollContainmentDemo({ settings }: { settings: Settings }) {
const inner=useRef<HTMLDivElement>(null);const [bottom,setBottom]=useState(false);const [outerTop,setOuterTop]=useState(0);
return <div className="growth2-demo"><h1>スクロールを枠の中に留める</h1><button onClick={()=>{if(inner.current)inner.current.scrollTop=inner.current.scrollHeight;setBottom(true);}}>内側の末尾へ</button><p role="status">{bottom?'内側は末尾':'内側を操作できます'} / 外側 {Math.round(outerTop)}px</p><div tabIndex={0} role="region" aria-label="外側の本文枠" onScroll={event=>setOuterTop(event.currentTarget.scrollTop)} style={{height:260,overflowY:'auto',border:'1px solid #81998a',padding:12}}><p>この中に別の一覧があります。</p><div ref={inner} tabIndex={0} role="region" aria-label="内側の一覧" onScroll={event=>setBottom(event.currentTarget.scrollTop+event.currentTarget.clientHeight>=event.currentTarget.scrollHeight-1)} style={{height:140,overflowY:'auto',overscrollBehaviorY:settings.mode==='contain'?'contain':'auto',background:'#e4eddf',padding:8}}>{Array.from({length:10},(_,index)=><p key={index}>内側の記録 {index+1}</p>)}</div><p style={{minHeight:250}}>外側にも続きの文章があります。</p></div></div>;
}
