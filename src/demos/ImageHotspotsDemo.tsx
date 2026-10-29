import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ImageHotspotsDemo({ settings }: { settings: Settings }) {
const [selected,setSelected]=useState(Number(settings.mode));const names=['見出し','本文','操作'];const descriptions=['内容の題名を示す領域','文章や図を読む領域','次の行動を選ぶ領域'];
return <div className="growth2-demo"><h1>図の印から説明を開く</h1><div className="g2-panel" style={{position:'relative',height:220,padding:20}}><div style={{height:35,background:'#d7e6df',marginBottom:15}}/><div style={{height:70,background:'#e4e9df',marginBottom:15}}/><div style={{width:'50%',height:30,background:'#c3d4c6'}}/>{[1,2,3].map((number,index)=><button key={number} aria-label={'図の'+number+' '+names[index]} aria-pressed={selected===number} style={{position:'absolute',top:[16,90,163][index],right:20}} onClick={()=>setSelected(number)}>{number}</button>)}</div><div className="g2-actions">{names.map((name,index)=><button key={name} aria-pressed={selected===index+1} onClick={()=>setSelected(index+1)}>{index+1} {name}</button>)}</div><p role="status">{names[selected-1]}：{descriptions[selected-1]}</p></div>;
}
