import { useState } from 'react';
import type { Settings } from '../types.ts';
import {useRef} from 'react';
export function AnchorOffsetDemo({ settings }: { settings: Settings }) {
const target=useRef<HTMLHeadingElement>(null);const [moved,setMoved]=useState(false);
return <div className="growth2-demo"><h1>固定見出しを避けて移動する</h1><button onClick={()=>{target.current?.scrollIntoView({block:'start',behavior:'instant'});target.current?.focus({preventScroll:true});setMoved(true);}}>2番目の見出しへ</button><p role="status">{moved?'2番目へ移動しました':'未移動'}</p><div className="g2-panel" role="region" aria-label="固定見出し付き本文" tabIndex={0} style={{height:260,overflowY:'auto',padding:0}}><div style={{position:'sticky',top:0,height:44,boxSizing:'border-box',padding:10,background:'#235b46',color:'white',zIndex:1}}>固定の見出し</div><section style={{padding:12,minHeight:270}}><h2>1番目</h2><p>本文の最初の段落です。</p></section><section style={{padding:12,minHeight:320}}><h2 ref={target} tabIndex={-1} style={{scrollMarginTop:Number(settings.mode)}}>2番目</h2><p>移動先の見出しを確認します。</p></section></div></div>;
}
