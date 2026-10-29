import { useState } from 'react';
import type { Settings } from '../types.ts';
import { useLayoutEffect, useRef } from 'react';
export function ScrollShadowDemo({ settings }: { settings: Settings }) {
const ref=useRef<HTMLDivElement>(null); const [edges,setEdges]=useState({above:false,below:settings.mode==='long'}); const update=()=>{const box=ref.current;if(box)setEdges({above:box.scrollTop>1,below:box.scrollTop+box.clientHeight<box.scrollHeight-1});}; useLayoutEffect(()=>{update();const observer=new ResizeObserver(update);if(ref.current)observer.observe(ref.current);return ()=>observer.disconnect();},[]);
return <div className="growth2-demo"><h1>スクロールの続きの手がかり</h1><button onClick={()=>{if(ref.current){ref.current.scrollTop=ref.current.scrollHeight;update();}}}>末尾へ移動</button><p style={{borderTop:edges.above?'3px solid #235b46':'3px solid transparent'}}>{edges.above?'上に続く':'上の続きなし'}</p><div ref={ref} onScroll={update} tabIndex={0} role="region" aria-label="架空の記録一覧" className="g2-panel" style={{height:180,overflowY:'auto'}}>{Array.from({length:settings.mode==='long'?12:2},(_,index)=><p key={index}>記録{index+1}：余白と配置の観察</p>)}</div><p role="status" style={{borderBottom:edges.below?'3px solid #235b46':'3px solid transparent'}}>{edges.below?'下に続く':'下の続きなし'}</p></div>;
}
