import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ColumnReorderDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(settings.initial === 'second');
  return <div className={`exchart-demo exchart-${settings.density}`}><h1>列の順序</h1><button onClick={() => setActive(!active)}>列順を入れ替える</button><p role="status">{active ? '記録数、道具の順' : '道具、記録数の順'}</p><table><caption>架空の道具</caption><thead><tr>{active ? <><th scope="col">記録数</th><th scope="col">道具</th></> : <><th scope="col">道具</th><th scope="col">記録数</th></>}</tr></thead><tbody>{[['道具A','10'],['道具B','20']].map(row => <tr key={row[0]}>{active ? <><td>{row[1]}</td><th scope="row">{row[0]}</th></> : <><th scope="row">{row[0]}</th><td>{row[1]}</td></>}</tr>)}</tbody></table></div>;
}
