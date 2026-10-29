import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function DivergingBarDemo({ settings }: { settings: Settings }) {
const [alternate, setAlternate] = useState(settings.mode === 'alternate');
const values = alternate ? [-30, 10, 0] : [20, -15, 35];
return <div className="growth2-demo"><h1>左右に分かれる棒グラフ</h1><button onClick={() => setAlternate(value => !value)}>例を切り替える</button><p role="status">{alternate ? '別の例' : '標準の例'}</p><DataFigure caption="左右に分かれる棒グラフ・架空のデータ" headers={['項目', '増減（件）']} rows={values.map((value, index) => ['項目' + (index + 1), value > 0 ? '+' + value : value])}><svg viewBox="0 0 360 200" aria-hidden="true"><line x1="180" x2="180" y1="15" y2="165" className="g2-axis" /><text x="20" y="190">−40件</text><text x="180" y="190" textAnchor="middle">0</text><text x="300" y="190">+40件</text>{values.map((value, index) => <g key={index}><rect x={180 + Math.min(0, value) * 3.5} y={25 + index * 50} width={Math.abs(value) * 3.5} height="24" fill={value < 0 ? "#a24f31" : "#235b46"} /><text x={value < 0 ? 185 : 140} y={42 + index * 50}>{value > 0 ? "+" : ""}{value}</text></g>)}</svg></DataFigure></div>;
}
