import { useState } from 'react';
import type { Settings } from '../types.ts';

export function HistogramDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [30, 60, 40, 20] : [20, 40, 60, 30];
  return <div className="exchart-demo"><h1>ヒストグラム</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="ヒストグラム。正確な値は下の表に表示"><title>ヒストグラム</title>{values.map((value,index) => <rect key={index} x={index * 50} y={100-value} width="49" height={value} fill="#28736d" />)}{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">所要時間（分）</th><th scope="col">件数</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["0以上10未満", "10以上20未満", "20以上30未満", "30以上40未満"][index]}</th><td>{value}</td></tr>)}</tbody></table></div>;
}
