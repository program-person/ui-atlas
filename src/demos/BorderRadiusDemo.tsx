import { useState } from 'react';
import type { Settings } from '../types.ts';

export function BorderRadiusDemo({ settings }: { settings: Settings }) {
const [roomy,setRoomy]=useState(false); const [selected,setSelected]=useState(false);
return <div className="growth2-demo"><h1>角の丸みを使い分ける</h1><button onClick={()=>setRoomy(value=>!value)}>余白を切り替える</button><p role="status">余白 {roomy?24:12}px</p><div className="g2-panel" style={{borderRadius:Number(settings.mode),padding:roomy?24:12}}><h2>余白のメモ</h2><p>角の形と内側の空間を比べます。</p><button style={{borderRadius:Number(settings.mode)}} aria-pressed={selected} onClick={()=>setSelected(value=>!value)}>{selected?'選択中':'選択する'}</button></div></div>;
}
