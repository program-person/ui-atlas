import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const entries = [
  { title: '余白の研究', description: '画面の間隔を試す' },
  { title: '色の記録', description: '配色を比べる' },
  { title: '動きのメモ', description: '切り替えを観察する' },
];
type View = 'cards' | 'list';

export function SegmentedControlDemo({ settings }: { settings: Settings }) {
  const groupId = useId();
  const [view, setView] = useState<View>(settings.initial === 'list' ? 'list' : 'cards');
  return <div className="expanded-demo selection-demo">
    <span className="demo-kicker">CHANGE THE VIEW</span><h1>一覧の見え方を選ぶ</h1>
    <p className="demo-muted">同じ記録をカードまたはリストで表示します。</p>
    <fieldset className="selection-segment"><legend>表示形式</legend><div>
      {([['cards', 'カード'], ['list', 'リスト']] as const).map(([value, label]) => <label key={value}><input type="radio" name={groupId} value={value} checked={view === value} onChange={() => setView(value)} /><span>{label}</span></label>)}
    </div></fieldset>
    <p role="status">{view === 'cards' ? 'カード' : 'リスト'}表示</p>
    <ul className={`selection-view selection-view-${view} selection-density-${settings.density}`}>
      {entries.map((entry) => <li key={entry.title}><strong>{entry.title}</strong><span>{entry.description}</span></li>)}
    </ul>
    <p className="demo-status">矢印キーでも表示形式を切り替えられます。</p>
  </div>;
}
