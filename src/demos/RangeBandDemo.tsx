import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function RangeBandDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [[20,40,60],[30,50,90],[10,30,70]] : [[10,30,50],[20,60,80],[40,70,90]]; const upper = values.map((row,index) => `${60+index*120},${170-row[2]*1.4}`).join(" "); const lower = [...values].reverse().map((row,index) => `${300-index*120},${170-row[0]*1.4}`).join(" ");
return <div className="growth2-demo"><h1>範囲帯付きの折れ線</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="範囲帯付きの折れ線・架空のデータ" headers={['時点', '最小（点）', '中央値（点）', '最大（点）']} rows={values.map((row,index) => ['時点' + (index+1), ...row])}><svg viewBox="0 0 360 200" aria-hidden="true"><path d="M40 20V170H330" className="g2-axis"/><polygon points={upper+" "+lower} fill="#d7e6df"/><polyline points={values.map((row,index) => `${60+index*120},${170-row[1]*1.4}`).join(" ")} fill="none" stroke="#235b46" strokeWidth="3"/>{values.map((row,index) => <text key={index} x={60+index*120} y="193" textAnchor="middle">時点{index+1}</text>)}<text x="45" y="15">0〜100点・帯は最小〜最大</text></svg></DataFigure></div>;
}
