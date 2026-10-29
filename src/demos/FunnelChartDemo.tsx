import { useState } from 'react';
import type { Settings } from '../types.ts';

export function FunnelChartDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [80, 60, 40, 20] : [90, 70, 50, 30];
  return <div className="exchart-demo"><h1>ファネルチャート</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="ファネルチャート。正確な値は下の表に表示"><title>ファネルチャート</title>{values.map((value,index) => <rect key={index} x={(200-value*2)/2} y={index*24} width={value*2} height="20" fill={index%2 ? "#75a9a0" : "#28736d"} />)}{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["閲覧", "選択", "確認", "完了"][index]}</th><td>{value}</td></tr>)}</tbody></table></div>;
}
