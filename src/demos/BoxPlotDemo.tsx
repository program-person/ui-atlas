import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function BoxPlotDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [5,25,30,70,95] : [10,30,50,65,90];
return <div className="growth2-demo"><h1>箱ひげ図</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="箱ひげ図・架空のデータ" headers={['統計量', '値（点）']} rows={values.map((value,index) => [['最小','第1四分位','中央値','第3四分位','最大'][index],value])}><svg viewBox="0 0 360 200" aria-hidden="true"><line x1={30+values[0]*3} x2={30+values[4]*3} y1="90" y2="90" className="g2-line"/>{[values[0],values[4]].map(value => <line key={value} x1={30+value*3} x2={30+value*3} y1="65" y2="115" className="g2-line"/>)}<rect x={30+values[1]*3} y="50" width={(values[3]-values[1])*3} height="80" fill="#d7e6df" stroke="#235b46"/><line x1={30+values[2]*3} x2={30+values[2]*3} y1="50" y2="130" stroke="#235b46" strokeWidth="3"/><path d="M30 155H330" className="g2-axis"/>{[0,25,50,75,100].map(value => <text key={value} x={30+value*3} y="180" textAnchor="middle">{value}</text>)}</svg></DataFigure></div>;
}
