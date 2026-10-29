import { useState } from 'react';
import type { Settings } from '../types.ts';
export function BottomNavigationDemo({ settings }: { settings: Settings }) {
  const [page, setPage] = useState('ノート'); const entries = settings.items === 'four' ? ['ノート', '検索', '保存', '設定'] : ['ノート', '検索', '設定'];
  return <div className="expanded-demo exlayout"><h1>画面下の移動先</h1><div className="exlayout-phone"><section><h2>{page}</h2><p role="status">表示中：{page}</p><p>下部の操作と本文が重ならないように領域を確保します。</p></section><nav aria-label="画面下のナビゲーション" className={`exlayout-bottom ${settings.labels === 'compact' ? 'compact' : ''}`}>{entries.map((entry, index) => <button key={entry} aria-current={page === entry ? 'page' : undefined} onClick={() => setPage(entry)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{entry}</span></button>)}</nav></div></div>;
}
