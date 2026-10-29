import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ColumnVisibilityDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(settings.initial !== 'second');
  return <div className={`exchart-demo exchart-${settings.density}`}><h1>列の表示</h1><label><input type="checkbox" checked={active} onChange={event => setActive(event.target.checked)} /> 記録数を表示</label><p role="status">{active ? '記録数を表示中' : '記録数を非表示'}</p><table><caption>架空の道具</caption><thead><tr><th scope="col">道具</th>{active && <th scope="col">記録数</th>}</tr></thead><tbody>{[['道具A','10'],['道具B','20']].map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{active && <td>{row[1]}</td>}</tr>)}</tbody></table></div>;
}
