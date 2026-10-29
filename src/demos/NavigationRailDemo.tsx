import { useState } from 'react';
import type { Settings } from '../types.ts';
export function NavigationRailDemo({ settings }: { settings: Settings }) {
  const [page, setPage] = useState('概要'); const entries = ['概要', '記録', '資料'];
  return <div className="expanded-demo exlayout"><h1>幅を抑えた移動レール</h1><div className={`exlayout-rail-shell ${settings.side === 'end' ? 'rail-end' : ''}`}><nav aria-label="ナビゲーションレール">{entries.map((entry, index) => <button key={entry} aria-label={entry} title={entry} aria-current={page === entry ? 'page' : undefined} onClick={() => setPage(entry)}><span aria-hidden="true">{index + 1}</span>{settings.labels === 'visible' && <small>{entry}</small>}</button>)}</nav><section><h2>{page}</h2><p role="status">移動先：{page}</p><p>展開・折りたたみを使わず、少数の移動先を細い列に置きます。</p></section></div></div>;
}
