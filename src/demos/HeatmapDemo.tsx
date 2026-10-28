import { useState } from 'react';
import type { Settings } from '../types.ts';

const rows = [{ name: '配置', values: [2, 5, 8] }, { name: '配色', values: [0, 3, 6] }, { name: '文章', values: [4, 7, 1] }];
const periods = ['午前', '午後', '夜'];
export function HeatmapDemo({ settings }: { settings: Settings }) {
  const [sample, setSample] = useState(settings.initial === 'sample');
  return <div className={`expanded-demo collection-demo heatmap-${settings.palette}`}><span className="demo-kicker">INTENSITY MATRIX</span><h1>分類と時間帯の件数</h1><p>架空の記録を色の濃さと数値で比べます。</p><button className="demo-secondary" onClick={() => setSample(!sample)}>{sample ? '空にする' : 'サンプルを表示'}</button>
    {sample ? <><table className="collection-heatmap"><caption>種類と時間帯ごとの記録件数</caption><thead><tr><th scope="col">種類</th>{periods.map((period) => <th scope="col" key={period}>{period}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{row.values.map((value, index) => <td key={periods[index]} className={`heat-level-${value <= 2 ? 'low' : value <= 5 ? 'mid' : 'high'}`}>{value}</td>)}</tr>)}</tbody></table><p className="collection-legend">凡例：薄い 0〜2件 / 中間 3〜5件 / 濃い 6〜8件</p></> : <p role="status">記録がありません。サンプルを表示できます。</p>}
  </div>;
}
