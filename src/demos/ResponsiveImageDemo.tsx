import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ResponsiveImageDemo({ settings }: { settings: Settings }) {
const [rust,setRust]=useState(false);const [naturalWidth,setNaturalWidth]=useState(0);const createImage=(width:number)=>'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="180"><rect width="100%" height="100%" fill="#e4e9df"/><circle cx="'+width/2+'" cy="90" r="55" fill="'+(rust?'#a24f31':'#235b46')+'"/></svg>');
return <div className="growth2-demo"><h1>幅に応じて画像を選ぶ</h1><button onClick={()=>setRust(value=>!value)}>図の色を切り替える</button><p role="status">図の色：{rust?'赤系':'緑系'} / 読み込んだ幅 {naturalWidth}px</p><picture>{settings.mode==='responsive'&&<source media="(max-width: 500px)" srcSet={createImage(180)}/>}<img src={createImage(360)} onLoad={event=>setNaturalWidth(event.currentTarget.naturalWidth)} alt="中央に円を配置した自作図" style={{display:'block',maxWidth:'100%',height:'auto'}}/></picture></div>;
}
