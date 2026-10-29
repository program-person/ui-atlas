import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function LollipopChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [70, 30, 50] : [30, 60, 80];
return <div className="growth2-demo"><h1>ロリポップチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="ロリポップチャート・架空のデータ" headers={['道具', '件数']} rows={values.map((value, index) => ['道具' + (index + 1), value])}><svg viewBox="0 0 360 200" aria-hidden="true"><path d="M70 15V165H330" className="g2-axis" />{[0,50,100].map(value => <text key={value} x={70 + value * 2.5} y="190" textAnchor="middle">{value}件</text>)}{values.map((value, index) => <g key={index}><text x="5" y={44 + index * 50}>道具{index + 1}</text><line x1="70" x2={70 + value * 2.5} y1={40 + index * 50} y2={40 + index * 50} className="g2-line" /><circle cx={70 + value * 2.5} cy={40 + index * 50} r="6" className="g2-fill" /></g>)}</svg></DataFigure></div>;
}
