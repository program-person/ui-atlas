import { useState } from 'react';
import type { Settings } from '../types.ts';

const items = [{ title: '余白の案', kind: '見た目', status: '検討中' }, { title: '一覧の案', kind: '配置', status: '確認済み' }, { title: '色の案', kind: '見た目', status: '確認済み' }, { title: '詳細の案', kind: '配置', status: '検討中' }] as const;
export function GroupedListDemo({ settings }: { settings: Settings }) {
  const [sample, setSample] = useState(settings.initial === 'all');
  const field = settings.groupBy === 'status' ? 'status' : 'kind';
  const groups = field === 'kind' ? ['見た目', '配置'] : ['検討中', '確認済み'];
  return <div className="expanded-demo collection-demo"><span className="demo-kicker">GROUPED LIST</span><h1>まとまりごとに探す</h1><p>架空の記録を{field === 'kind' ? '種類' : '状態'}別にまとめます。</p><button className="demo-secondary" onClick={() => setSample(!sample)}>{sample ? '空にする' : 'サンプルを表示'}</button>
    {sample ? <div className="collection-groups">{groups.map((group) => { const members = items.filter((item) => item[field] === group); return <section key={group}><h2>{group} <span>（{members.length}件）</span></h2><ul>{members.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.kind}・{item.status}</span></li>)}</ul></section>; })}</div> : <p role="status">記録がありません。サンプルを表示できます。</p>}
  </div>;
}
