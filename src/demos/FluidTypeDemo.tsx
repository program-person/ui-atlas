import { useState } from 'react';
import type { Settings } from '../types.ts';

export function FluidTypeDemo({ settings }: { settings: Settings }) {
const [wide,setWide]=useState(false);
return <div className="growth2-demo"><h1>幅に応じて変わる文字サイズ</h1><button onClick={()=>setWide(value=>!value)}>枠幅を切り替える</button><p role="status">{wide?'広い枠':'狭い枠'}</p><div className="g2-panel" style={{width:wide?480:220,maxWidth:'100%',containerType:'inline-size',boxSizing:'border-box'}}><h2 style={{fontSize:settings.mode==='fluid'?'clamp(20px, 6cqi, 40px)':28,margin:0,lineHeight:1.4}}>読む場所に合わせる見出し</h2><p>上下限を持つ文字サイズを比べます。</p></div></div>;
}
