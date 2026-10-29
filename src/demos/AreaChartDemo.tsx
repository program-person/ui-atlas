import { useState } from 'react';
import type { Settings } from '../types.ts';

export function AreaChartDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [30, 20, 50, 70] : [20, 40, 30, 60];
  const points = values.map((value, index) => `${index * (200 / (values.length - 1))},${100 - value}`).join(' ');
  return <div className="exchart-demo"><h1>面グラフ</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="面グラフ。正確な値は下の表に表示"><title>面グラフ</title><polygon points={`0,100 ${points} 200,100`} fill="#9ecac4" /><polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" />{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["1週", "2週", "3週", "4週"][index]}</th><td>{value}</td></tr>)}</tbody></table></div>;
}
