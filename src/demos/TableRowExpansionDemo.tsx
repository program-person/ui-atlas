import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TableRowExpansionDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(settings.initial === 'second');
  return <div className={`exchart-demo exchart-${settings.density}`}><h1>道具の一覧</h1><table><caption>架空の道具</caption><thead><tr><th scope="col">道具</th><th scope="col">記録数</th><th scope="col">詳細</th></tr></thead><tbody><tr><th scope="row">道具A</th><td>10</td><td><button aria-expanded={active} onClick={() => setActive(!active)}>{active ? '詳細を閉じる' : '詳細を開く'}</button></td></tr>{active && <tr><td colSpan={3}>補足：軽量な道具</td></tr>}<tr><th scope="row">道具B</th><td>20</td><td>詳細なし</td></tr></tbody></table></div>;
}
