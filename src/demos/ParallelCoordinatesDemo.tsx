import { useState } from 'react';
import type { Settings } from '../types.ts';
import {DataFigure} from './DataFigure.tsx';
export function ParallelCoordinatesDemo({ settings }: { settings: Settings }) {
const [showB,setShowB]=useState(settings.mode==='both');const series=[{name:'A',values:[80,30,60]},...(showB?[{name:'B',values:[40,80,30]}]:[])];
return <div className="growth2-demo"><h1>平行座標の比較図</h1><button aria-pressed={showB} onClick={()=>setShowB(value=>!value)}>Bの表示を切り替える</button><p role="status">表示：A{showB?'・B':''}</p><DataFigure caption="すべて0〜100点・上ほど高い" headers={['道具','速さ','容量','軽さ']} rows={series.map(row=>[row.name,...row.values])}><svg viewBox="0 0 360 210" aria-hidden="true">{['速さ','容量','軽さ'].map((name,index)=><g key={name}><line x1={60+index*120} x2={60+index*120} y1="30" y2="170" className="g2-axis"/><text x={60+index*120} y="20" textAnchor="middle">{name}</text><text x={45+index*120} y="45">100</text><text x={50+index*120} y="190">0</text></g>)}{series.map(row=><polyline key={row.name} points={row.values.map((value,index)=>(60+index*120)+","+(170-value*1.4)).join(' ')} stroke={row.name==='A'?'#235b46':'#a24f31'} strokeWidth="3" strokeDasharray={row.name==='B'?'5 4':undefined} fill="none"/>)}</svg></DataFigure></div>;
}
