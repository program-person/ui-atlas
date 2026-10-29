import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ObjectFitDemo({ settings }: { settings: Settings }) {
const [left,setLeft]=useState(false);
const source='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180"><rect width="360" height="180" fill="#e1e8dc"/><circle cx="60" cy="90" r="35" fill="#a24f31"/><rect x="150" y="40" width="60" height="100" fill="#235b46"/><path d="M300 30L340 150H260Z" fill="#385b8a"/></svg>');
return <div className="growth2-demo"><h1>画像を枠に収める</h1><button onClick={()=>setLeft(value=>!value)}>位置を切り替える</button><p role="status">{left?'左寄せ':'中央寄せ'} / {settings.mode}</p><img src={source} alt="左に円、中央に四角、右に三角が並ぶ自作図" style={{width:200,height:200,maxWidth:'100%',objectFit:settings.mode==='cover'?'cover':'contain',objectPosition:left?'left center':'center',background:'#f3e2ce',border:'1px solid #81998a'}}/><p>背景色の部分が余白です。</p></div>;
}
