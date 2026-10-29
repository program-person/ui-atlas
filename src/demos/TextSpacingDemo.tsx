import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TextSpacingDemo({ settings }: { settings: Settings }) {
const [loose,setLoose]=useState(false);
return <div className="growth2-demo"><h1>文字間隔を調整する</h1><button onClick={()=>setLoose(value=>!value)}>行間を切り替える</button><p role="status">行間 {loose?'2.2':'1.6'}</p><p className="g2-panel" style={{letterSpacing:settings.mode==='wide'?'.12em':'normal',lineHeight:loose?2.2:1.6}}>朝の図書室で、窓から届く光を眺めながらノートを開く。短い見出しと余白を整えると、読み進める場所を確かめやすい。文章と図の間には、ひと呼吸できる空間を残した。</p></div>;
}
