import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TreemapDemo({ settings }: { settings: Settings }) {
  const [alternate, setAlternate] = useState(settings.initial === 'second');
  const values = alternate ? [60, 24, 16] : [50, 30, 20];
  return <div className="exchart-demo"><h1>ツリーマップ</h1><button onClick={() => setAlternate(!alternate)}>{alternate ? '元の系列を表示' : '別の系列を表示'}</button><p role="status">{alternate ? '系列Bを表示中' : '系列Aを表示中'}</p><svg className="exchart-svg" viewBox="0 0 200 110" role="img" aria-label="ツリーマップ。正確な値は下の表に表示"><title>ツリーマップ</title><rect x="0" y="0" width={values[0]*2} height="100" fill="#28736d" /><rect x={values[0]*2} y="0" width={200-values[0]*2} height="60" fill="#75a9a0" /><rect x={values[0]*2} y="60" width={200-values[0]*2} height="40" fill="#c87558" />{settings.labels === 'shown' && <text x="2" y="108">{values.join(' / ')}</text>}</svg><table><caption>架空のデータ</caption><thead><tr><th scope="col">項目</th><th scope="col">値</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{["文章", "図", "音声"][index]}</th><td><span aria-hidden="true" className={`exchart-key exchart-key-${index}`} />{value}%</td></tr>)}</tbody></table></div>;
}
