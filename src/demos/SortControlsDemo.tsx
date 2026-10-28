import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const entries = [
  { title: '青いノート', count: 4 }, { title: '森の記録', count: 2 },
  { title: '空のスケッチ', count: 4 }, { title: '街のメモ', count: 7 },
];
type SortKey = 'title' | 'count';
type Direction = 'asc' | 'desc';

export function SortControlsDemo({ settings }: { settings: Settings }) {
  const id = useId();
  const [sortKey, setSortKey] = useState<SortKey>(settings.sortKey === 'count' ? 'count' : 'title');
  const [direction, setDirection] = useState<Direction>(settings.direction === 'desc' ? 'desc' : 'asc');
  const sorted = entries.map((entry, index) => ({ ...entry, index })).sort((left, right) => {
    const difference = sortKey === 'count' ? left.count - right.count : left.title.localeCompare(right.title, 'ja');
    return difference === 0 ? left.index - right.index : difference * (direction === 'asc' ? 1 : -1);
  });
  return <div className="expanded-demo selection-demo">
    <span className="demo-kicker">ORDER THE LIST</span><h1>ノートを並べ替える</h1>
    <p className="demo-muted">項目と順序を別々に選べます。</p>
    <div className="selection-sort-controls">
      <label htmlFor={`${id}-key`}>並べ替える項目<select id={`${id}-key`} value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}><option value="title">タイトル</option><option value="count">記録数</option></select></label>
      <label htmlFor={`${id}-direction`}>順序<select id={`${id}-direction`} value={direction} onChange={(event) => setDirection(event.target.value as Direction)}><option value="asc">昇順</option><option value="desc">降順</option></select></label>
    </div>
    <p role="status">{sortKey === 'title' ? 'タイトル' : '記録数'}の{direction === 'asc' ? '昇順' : '降順'}で表示中</p>
    <ul className="selection-items">{sorted.map((entry) => <li key={entry.title}><strong>{entry.title}</strong><span>記録 {entry.count}件</span></li>)}</ul>
  </div>;
}
