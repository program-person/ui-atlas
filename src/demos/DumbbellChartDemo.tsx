import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function DumbbellChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const pairs = alternate ? [[60,30],[20,20],[40,80]] : [[20,60],[40,70],[60,50]];
return <div className="growth2-demo"><h1>ダンベルチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="ダンベルチャート・架空のデータ" headers={['分類', '前（件）', '後（件）']} rows={pairs.map((pair,index) => ['分類' + (index+1), ...pair])}><svg viewBox="0 0 360 200" aria-hidden="true"><text x="10" y="15">○ 前　■ 後 / 0〜100件</text>{pairs.map(([before,after],index) => <g key={index}><text x="5" y={55+index*50}>分類{index+1}</text><line x1={70+before*2.5} x2={70+after*2.5} y1={50+index*50} y2={50+index*50} className="g2-line"/><circle cx={70+before*2.5} cy={50+index*50} r="6" fill="white" stroke="#235b46" strokeWidth="2"/><rect x={65+after*2.5} y={45+index*50} width="10" height="10" className="g2-fill"/></g>)}<path d="M70 170H320" className="g2-axis"/><text x="70" y="190">0</text><text x="300" y="190">100件</text></svg></DataFigure></div>;
}
