import { useState } from 'react';
import type { Settings } from '../types.ts';

export function PinnedColumnsDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(settings.initial !== 'second');
  return <div className={`exchart-demo exchart-${settings.density}`}><h1>列の固定</h1><button onClick={() => setActive(!active)}>{active ? '固定を解除' : '先頭列を固定'}</button><p role="status">{active ? '先頭列を固定中' : '固定なし'}。表を横にスクロールできます。</p><div className="exchart-scroll" tabIndex={0} aria-label="横スクロールできる表"><table className={active ? 'exchart-pinned' : ''}><caption>架空の道具</caption><thead><tr><th scope="col">道具</th><th scope="col">春</th><th scope="col">夏</th><th scope="col">秋</th><th scope="col">冬</th></tr></thead><tbody><tr><th scope="row">道具A</th><td>10</td><td>12</td><td>14</td><td>16</td></tr><tr><th scope="row">道具B</th><td>20</td><td>18</td><td>16</td><td>14</td></tr></tbody></table></div></div>;
}
