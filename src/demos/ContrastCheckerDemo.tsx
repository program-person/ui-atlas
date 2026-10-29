import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ContrastCheckerDemo({ settings }: { settings: Settings }) {
const [muted,setMuted]=useState(false); const color=muted?'#80958a':'#235b46'; const channels=[1,3,5].map(index=>parseInt(color.slice(index,index+2),16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4); const luminance=channels[0]*.2126+channels[1]*.7152+channels[2]*.0722; const ratio=1.05/(luminance+.05); const threshold=settings.mode==='large'?3:4.5;
return <div className="growth2-demo"><h1>文字と背景のコントラスト</h1><button onClick={()=>setMuted(value=>!value)}>配色を切り替える</button><p role="status">色 {color} / 比率 {ratio.toFixed(2)} : 1 / {ratio>=threshold?'基準以上':'基準未満'}</p><p>判定基準：{threshold} : 1</p><p className="g2-panel" style={{color,background:'#fff',fontSize:settings.mode==='large'?24:16,fontWeight:400}}>白い紙に文字を並べる。</p><p>この判定は上の文字と背景の組だけが対象です。</p></div>;
}
