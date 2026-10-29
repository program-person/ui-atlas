import { useState } from 'react';
import type { Settings } from '../types.ts';
export function MasonryColumnsDemo({ settings }: { settings: Settings }) {
  const [extra, setExtra] = useState(false);
  const notes = ['余白の観察', '一覧を読む順序と、カードの高さを考える', '色のメモ', '情報量が異なる記録を並べる。列の上から下へ読む順序を保つ。', '操作の位置', ...(extra ? ['追加した長いメモ。本文の長さが異なってもカードの途中で列を分けない。'] : [])];
  return <div className="expanded-demo exlayout"><h1>高さの違うメモ</h1><p>カードを列の上から下へ並べます。</p><button onClick={() => setExtra(!extra)} aria-pressed={extra}>メモを追加・解除</button><ol className="exlayout-masonry" style={{ columns: settings.columns === 'three' ? '3 140px' : '2 180px', columnGap: settings.gap === 'wide' ? 24 : 12 }}>{notes.map((note, index) => <li key={note}><b>{index + 1}</b><p>{note}</p></li>)}</ol><p role="status">{notes.length}件のメモ</p></div>;
}
