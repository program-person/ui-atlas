import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function SlopeChartDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const pairs = alternate ? [[30,70],[80,40],[50,50]] : [[80,50],[50,70],[20,40]];
return <div className="growth2-demo"><h1>スロープチャート</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="スロープチャート・架空のデータ" headers={['分類', '前回（点）', '今回（点）']} rows={pairs.map((pair,index) => ['ABC'[index], ...pair])}><svg viewBox="0 0 360 200" aria-hidden="true"><text x="45" y="15">前回</text><text x="270" y="15">今回</text><text x="135" y="190">共通軸 0〜100点</text>{pairs.map(([before,after],index) => <g key={index} stroke={["#235b46","#a24f31","#385b8a"][index]}><line x1="90" x2="270" y1={170-before*1.4} y2={170-after*1.4} strokeWidth="2"/><text x="5" y={174-before*1.4} stroke="none">{"ABC"[index]} {before}</text><text x="280" y={174-after*1.4} stroke="none">{"ABC"[index]} {after}</text></g>)}</svg></DataFigure></div>;
}
