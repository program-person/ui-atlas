import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

export function ActivityFeedDemo({ settings }: { settings: Settings }) {
  const [events, setEvents] = useState<number[]>(settings.initial === 'empty' ? [] : [1, 2]);
  const [nextId, setNextId] = useState(settings.initial === 'empty' ? 1 : 3);
  const [newest, setNewest] = useState(settings.sort !== 'oldest');
  const ordered = newest ? [...events].reverse() : events;
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">ACTIVITY FEED</span><h1>活動を順番に見る</h1><p>ボタンを押すたびに架空イベントが1件増えます。自動更新や通信はありません。</p><div className="final-actions"><button className="demo-secondary" onClick={() => { setEvents(current => [...current, nextId]); setNextId(value => value + 1); }}>イベントを追加</button><button className="demo-secondary" onClick={() => setNewest(!newest)}>{newest ? '古い順にする' : '新しい順にする'}</button></div><p role="status">{events.length}件、{newest ? '新しい順' : '古い順'}。</p>{ordered.length ? <ol className="final-list">{ordered.map(id => <li key={id}>架空イベント {id}</li>)}</ol> : <p>まだイベントはありません。</p>}</div>;
}
