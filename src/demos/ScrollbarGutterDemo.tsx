import { useState } from 'react';
import type { Settings } from '../types.ts';
import {useLayoutEffect,useRef} from 'react';
export function ScrollbarGutterDemo({ settings }: { settings: Settings }) {
const [long,setLong]=useState(false);const [width,setWidth]=useState(0);const container=useRef<HTMLDivElement>(null);useLayoutEffect(()=>{const node=container.current;if(!node)return;const observer=new ResizeObserver(()=>setWidth(node.clientWidth));observer.observe(node);setWidth(node.clientWidth);return()=>observer.disconnect();},[long]);
return <div className="growth2-demo"><h1>スクロールバーの場所を確保する</h1><button onClick={()=>setLong(value=>!value)}>文章量を切り替える</button><p role="status">{long?'長い文章':'短い文章'} / 本文幅 {width}px</p><div ref={container} className="g2-panel" tabIndex={0} role="region" aria-label="幅を比較する本文" style={{height:160,overflowY:'auto',scrollbarGutter:settings.mode==='stable'?'stable':'auto'}}>{Array.from({length:long?12:1},(_,index)=><p key={index}>余白を比べる文章 {index+1}</p>)}</div><p>オーバーレイ型のバーでは差が出ない場合があります。</p></div>;
}
