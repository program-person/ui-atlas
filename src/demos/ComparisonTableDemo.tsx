import { useState } from 'react';
import type { Settings } from '../types.ts';

const rows = [{ feature: '共有', values: ['あり', 'あり', 'あり'] }, { feature: 'オフライン', values: ['あり', 'なし', 'あり'] }, { feature: '履歴', values: ['なし', 'あり', 'あり'] }];
export function ComparisonTableDemo({ settings }: { settings: Settings }) {
  const [differences, setDifferences] = useState(settings.mode === 'differences');
  return <div className="expanded-demo final-collection"><span className="demo-kicker">COMPARE FEATURES</span><h1>道具の特徴を比べる</h1><p>3つの架空の道具を属性ごとに比べます。</p><button onClick={() => setDifferences(!differences)}>{differences ? 'すべての項目を表示' : '違いのある項目だけ表示'}</button><table className={`final-comparison final-density-${settings.density}`}><caption>{differences ? '違いのある属性' : 'すべての属性'}</caption><thead><tr><th scope="col">属性</th><th scope="col">道具A</th><th scope="col">道具B</th><th scope="col">道具C</th></tr></thead><tbody>{rows.filter(row => !differences || new Set(row.values).size > 1).map(row => <tr key={row.feature}><th scope="row">{row.feature}</th>{row.values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table><p role="status">{differences ? '違いのある2項目' : '全3項目'}を表示中</p></div>;
}
