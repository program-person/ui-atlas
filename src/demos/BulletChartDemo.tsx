import { useState } from 'react';
import type { Settings } from '../types.ts';

export function BulletChartDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [80, 75] : [60, 75];
  return <div className="exchart-demo"><h1>バレットチャート</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="バレットチャート。正確な値は下の表に表示"><title>バレットチャート</title><rect x="0" y="30" width="200" height="30" fill="#d8e2dc" /><rect x="0" y="38" width={values[0]*2} height="14" fill="#28736d" /><line x1="150" x2="150" y1="25" y2="65" stroke="#172f2d" strokeWidth="3" />{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["実績", "目標"][index]}</th><td>{value}</td></tr>)}</tbody></table></div>;
}
