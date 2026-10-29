import { useState } from 'react';
import type { Settings } from '../types.ts';

export function DropCapDemo({ settings }: { settings: Settings }) {
const [second,setSecond]=useState(false);
return <div className="growth2-demo"><h1>段落の先頭文字を大きくする</h1><button onClick={()=>setSecond(value=>!value)}>文章を切り替える</button><p role="status">{second?'別の文章':'最初の文章'}</p><p className={settings.mode==='drop'?'g2-drop g2-panel':'g2-panel'}>{second?'夕方の机に、読み終えた本を並べた。見出しを付けて記録すると、気になった一節を探しやすい。次の読書に向けて、短いメモを一つ残す。':"朝の図書室で、窓から届く光を眺めながらノートを開く。短い見出しと余白を整えると、読み進める場所を確かめやすい。文章と図の間には、ひと呼吸できる空間を残した。"}</p></div>;
}
