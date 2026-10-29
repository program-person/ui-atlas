import { useState } from 'react';
import type { Settings } from '../types.ts';

export function WaterfallChartDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [40, 30, -10, 60] : [40, 20, -10, 50];
  return <div className="exchart-demo"><h1>ウォーターフォールチャート</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="ウォーターフォールチャート。正確な値は下の表に表示"><title>ウォーターフォールチャート</title><rect x="0" y="60" width="35" height="40" fill="#28736d" /><rect x="50" y={60-values[1]} width="35" height={values[1]} fill="#75a9a0" /><rect x="100" y={60-values[1]} width="35" height="10" fill="#c87558" /><rect x="150" y={100-values[3]} width="35" height={values[3]} fill="#214b49" />{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["開始", "増加", "減少", "合計"][index]}</th><td>{value}</td></tr>)}</tbody></table></div>;
}
