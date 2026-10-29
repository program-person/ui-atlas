import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TableFooterDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(settings.initial === 'second');
  return <div className={`exchart-demo exchart-${settings.density}`}><h1>表の集計</h1><button onClick={() => setActive(!active)}>{active ? '合計を表示' : '平均を表示'}</button><table><caption>架空の道具の記録数</caption><thead><tr><th scope="col">道具</th><th scope="col">記録数</th></tr></thead><tbody><tr><th scope="row">道具A</th><td>10</td></tr><tr><th scope="row">道具B</th><td>20</td></tr></tbody><tfoot><tr><th scope="row">{active ? '平均' : '合計'}</th><td>{active ? '15' : '30'}</td></tr></tfoot></table><p role="status">{active ? '平均 15' : '合計 30'}</p></div>;
}
