import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function RadarChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [2,5,3,4] : [4,3,5,2]; const points = values.map((value,index) => { const angle = index*Math.PI/2-Math.PI/2; return `${180+Math.cos(angle)*value*14},${100+Math.sin(angle)*value*14}`; }).join(" ");
return <div className="growth2-demo"><h1>レーダーチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="レーダーチャート・架空のデータ" headers={['評価軸', '点（0〜5）']} rows={values.map((value,index) => [['速さ','軽さ','容量','静かさ'][index], value])}><svg viewBox="0 0 360 200" aria-hidden="true"><path d="M180 30L250 100L180 170L110 100Z M180 30V170 M110 100H250" className="g2-axis"/><polygon points={points} fill="#235b4633" stroke="#235b46" strokeWidth="2"/><text x="180" y="20" textAnchor="middle">速さ</text><text x="260" y="105">軽さ</text><text x="180" y="195" textAnchor="middle">容量</text><text x="50" y="105">静かさ</text></svg></DataFigure></div>;
}
