import { useState } from 'react';
import type { Settings } from '../types.ts';
import {useId} from 'react';
export function VennDiagramDemo({ settings }: { settings: Settings }) {
const [union,setUnion]=useState(settings.mode==='union');const clipId=useId();const result=union?[1,2,3,4,5,6,7,8,9]:[4,5];
return <div className="growth2-demo"><h1>集合の重なりを示す図</h1><button onClick={()=>setUnion(value=>!value)}>集合を切り替える</button><p role="status">{union?'和集合':'共通部分'}：{result.join('・')}</p><svg viewBox="0 0 360 210" style={{width:'100%'}} aria-hidden="true"><defs><clipPath id={clipId}><circle cx="220" cy="105" r="80"/></clipPath></defs>{union?<><circle cx="140" cy="105" r="80" fill="#d7e6df"/><circle cx="220" cy="105" r="80" fill="#d7e6df"/></>:<circle cx="140" cy="105" r="80" fill="#d7e6df" clipPath={'url(#'+clipId+')'}/>}<circle cx="140" cy="105" r="80" fill="none" stroke="#235b46" strokeWidth="2"/><circle cx="220" cy="105" r="80" fill="none" stroke="#a24f31" strokeWidth="2"/><text x="100" y="105">A</text><text x="250" y="105">B</text></svg><p>A：1・2・3・4・5 / B：4・5・6・7・8・9</p><p>円の面積は件数の比率を表しません。</p></div>;
}
