import { useState } from 'react';
import type { Settings } from '../types.ts';
import {DataFigure} from './DataFigure.tsx';
export function SankeyDiagramDemo({ settings }: { settings: Settings }) {
const [changed,setChanged]=useState(false);const values=changed?[3,9]:settings.mode==='equal'?[6,6]:[8,4];
return <div className="growth2-demo"><h1>量の流れを太さで示す図</h1><button onClick={()=>setChanged(value=>!value)}>分配を切り替える</button><p role="status">入力 12件 → A {values[0]}件 / B {values[1]}件</p><DataFigure caption="流量・1件あたり線幅3px" headers={['入力','行き先','件数']} rows={values.map((value,index)=>['入力',index===0?'A':'B',value])}><svg viewBox="0 0 360 200" aria-hidden="true"><path d={"M70 "+(100-values[1]*1.5)+" C160 "+(100-values[1]*1.5)+" 180 45 270 45"} fill="none" stroke="#235b46" strokeWidth={values[0]*3}/><path d={"M70 "+(100+values[0]*1.5)+" C160 "+(100+values[0]*1.5)+" 180 150 270 150"} fill="none" stroke="#a24f31" strokeWidth={values[1]*3}/><rect x="50" y="82" width="20" height="36" fill="#52685c"/><text x="5" y="65">入力12</text><text x="280" y="50">A {values[0]}</text><text x="280" y="155">B {values[1]}</text></svg></DataFigure></div>;
}
