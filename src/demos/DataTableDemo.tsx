import { useState } from 'react';
import type { Settings } from '../types.ts';

const notes = [{ name: '余白のメモ', count: 8, status: '検討中' }, { name: '色の比較', count: 2, status: '確認済み' }, { name: '操作の案', count: 12, status: '検討中' }, { name: '配置の記録', count: 5, status: '確認済み' }];
type SortColumn = 'name' | 'count';
export function DataTableDemo({ settings }: { settings: Settings }) {
  const [column, setColumn] = useState<SortColumn>(settings.sort === 'count' ? 'count' : 'name');
  const [ascending, setAscending] = useState(true);
  const rows = [...notes].sort((left, right) => (column === 'count' ? left.count - right.count : left.name.localeCompare(right.name, 'ja')) * (ascending ? 1 : -1));
  function sort(next: SortColumn) { setAscending(next === column ? !ascending : true); setColumn(next); }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">COMPARE ROWS</span><h1>表を並べ替えて比べる</h1><p className="demo-muted">列見出しを押すと、昇順と降順を切り替えます。</p>
    <table className={`growth-table table-${settings.density}`}><caption>架空のノート一覧</caption><thead><tr>
      {(['name', 'count'] as const).map((key) => <th key={key} scope="col" aria-sort={column === key ? ascending ? 'ascending' : 'descending' : undefined}><button onClick={() => sort(key)}>{key === 'name' ? 'ノート名' : '記録数'}<span aria-hidden="true">{column === key ? ascending ? ' ↑' : ' ↓' : ' ↕'}</span></button></th>)}<th scope="col">状態</th></tr></thead>
      <tbody>{rows.map((note) => <tr key={note.name}><th scope="row">{note.name}</th><td>{note.count}</td><td>{note.status}</td></tr>)}</tbody></table>
    <p role="status">{column === 'name' ? 'ノート名' : '記録数'}：{ascending ? '昇順' : '降順'}</p></div>;
}
