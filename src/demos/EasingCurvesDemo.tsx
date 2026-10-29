import { useState } from 'react';
import type { Settings } from '../types.ts';

export function EasingCurvesDemo({ settings }: { settings: Settings }) {
const [right,setRight]=useState(false);
return <div className="growth2-demo"><h1>動きの速さの変化を比べる</h1><button onClick={()=>setRight(value=>!value)}>位置を切り替える</button><p role="status">位置：{right?'右端':'左端'} / 200ms・{settings.mode}</p><div className="g2-motion-track"><div className="g2-motion-marker" style={{transform:right?'translateX(calc(100cqi - 24px))':'translateX(0)',transitionTimingFunction:settings.mode}}/></div><p>動きを減らす設定では即時に移動します。</p></div>;
}
