import { useState } from 'react';
import type { Settings } from '../types.ts';

export function WritingModeDemo({ settings }: { settings: Settings }) {
const [long,setLong]=useState(false);
return <div className="growth2-demo"><h1>縦書きと横書き</h1><button onClick={()=>setLong(value=>!value)}>本文量を切り替える</button><p role="status">{long?'長い本文':'短い本文'}</p><div className="g2-panel" role="region" aria-label="組版の本文" tabIndex={0} style={{height:240,overflow:'auto'}}><p style={{writingMode:settings.mode==='vertical'?'vertical-rl':'horizontal-tb',height:settings.mode==='vertical'?'100%':undefined,margin:0}}>{"朝の図書室で、窓から届く光を眺めながらノートを開く。短い見出しと余白を整えると、読み進める場所を確かめやすい。文章と図の間には、ひと呼吸できる空間を残した。".repeat(long?6:1)}</p></div></div>;
}
