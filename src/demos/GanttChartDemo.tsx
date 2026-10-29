import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function GanttChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const ranges = alternate ? [[2,3],[3,5],[6,7]] : [[1,2],[2,4],[5,7]];
return <div className="growth2-demo"><h1>ガントチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="ガントチャート・架空のデータ" headers={['作業', '開始日', '終了日（含む）']} rows={ranges.map(([start,end],index) => [['調査','制作','確認'][index], '10/' + start, '10/' + end])}><svg viewBox="0 0 360 200" aria-hidden="true">{Array.from({length:7},(_,index) => <g key={index}><text x={100+index*32} y="20" textAnchor="middle">{index+1}日</text><line x1={84+index*32} x2={84+index*32} y1="30" y2="170" className="g2-grid"/></g>)}{ranges.map(([start,end],index) => <g key={index}><text x="5" y={58+index*45}>{["調査","制作","確認"][index]}</text><rect x={84+(start-1)*32} y={40+index*45} width={(end-start+1)*32-2} height="27" className="g2-fill"/></g>)}<text x="90" y="193">2026年10月・終了日を含む</text></svg></DataFigure></div>;
}
