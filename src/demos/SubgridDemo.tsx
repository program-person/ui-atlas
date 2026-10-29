import { useState } from 'react';
import type { Settings } from '../types.ts';
export function SubgridDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(false);
  return <div className="expanded-demo exlayout"><h1>内側の行を揃える</h1><button aria-pressed={long} onClick={() => setLong(!long)}>説明を長くする</button><div className={`exlayout-subgrid ${settings.align === 'shared' ? 'shared' : ''}`} style={{ gap: settings.gap === 'wide' ? 24 : 12 }}>{['配置の案', '配色の案'].map((title, index) => <article key={title}><h2>{title}</h2><p>{index === 0 && long ? '操作の順序を見直し、説明文と補足の位置を親のグリッドの行に合わせます。文章量の違いを比べてください。' : '画面を観察する。'}</p><p className="exlayout-subgrid-meta">観察メモ {index + 1}</p></article>)}</div><p role="status">説明：{long ? '長文' : '短文'}</p></div>;
}
