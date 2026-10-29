import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function BubbleChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [[20,70,9],[60,30,36],[80,80,16]] : [[20,30,16],[50,70,36],[80,50,9]];
return <div className="growth2-demo"><h1>バブルチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="バブルチャート・架空のデータ" headers={['道具', '重さ（g）', '容量（点）', '記録数（件）']} rows={values.map((row,index) => ['道具' + (index+1), ...row])}><svg viewBox="0 0 360 200" aria-hidden="true"><path d="M40 15V165H340" className="g2-axis"/><text x="45" y="15">容量 0〜100点</text><text x="220" y="195">重さ 0〜100g</text>{values.map(([x,y,size],index) => <g key={index}><circle cx={40+x*2.8} cy={165-y*1.4} r={Math.sqrt(size)*3} fill="#235b4640" stroke="#235b46"/><text x={40+x*2.8} y={170-y*1.4} textAnchor="middle">{index+1}</text></g>)}</svg></DataFigure></div>;
}
