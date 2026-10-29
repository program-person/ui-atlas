import { useState } from 'react';
import type { Settings } from '../types.ts';

export function WaffleChartDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [70, 30] : [60, 40];
  return <div className="exchart-demo"><h1>ワッフルチャート</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="ワッフルチャート。正確な値は下の表に表示"><title>ワッフルチャート</title>{Array.from({length:100},(_,index) => <rect key={index} x={(index%10)*11} y={Math.floor(index/10)*10} width="9" height="8" fill={index < values[0] ? "#28736d" : "#d8e2dc"} />)}{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["完了", "残り"][index]}</th><td>{value}%</td></tr>)}</tbody></table></div>;
}
