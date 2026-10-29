import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TabularNumbersDemo({ settings }: { settings: Settings }) {
const [large,setLarge]=useState(false);
return <div className="growth2-demo"><h1>数字の幅を揃える</h1><button onClick={()=>setLarge(value=>!value)}>数値を切り替える</button><div className="g2-panel"><output role="status" style={{fontSize:38,fontFamily:'Arial, sans-serif',fontVariantNumeric:settings.mode==='tabular'?'tabular-nums':'normal'}}>{large?'88,888':'11,111'}</output><p>フォントの対応によって見た目が変わります。</p></div></div>;
}
