import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

const TASKS = [{ id: 0, name: '処理A', priority: 2 }, { id: 1, name: '処理B', priority: 1 }, { id: 2, name: '処理C', priority: 3 }];
export function QueueControlsDemo({ settings }: { settings: Settings }) {
  const order = settings.order === 'priority' ? [1, 0, 2] : [0, 1, 2];
  const [completed, setCompleted] = useState<number[]>([]);
  const [running, setRunning] = useState(settings.initial === 'running');
  const next = order.find(id => !completed.includes(id));
  function advance() { if (!running || next === undefined) return; setCompleted(current => [...current, next]); }
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">QUEUE CONTROLS</span><h1>待機中の処理を進める</h1><p>架空の処理を手動で進めます。実際のジョブ送信はありません。</p><div className="final-actions"><button className="demo-secondary" aria-disabled={next === undefined} onClick={() => { if (next !== undefined) setRunning(!running); }}>{running ? '一時停止' : '再開'}</button><button className="demo-secondary" aria-disabled={!running || next === undefined} onClick={advance}>次の処理を完了</button></div><p role="status">{next === undefined ? 'すべて完了' : running ? '進行中' : '一時停止中'}。完了 {completed.length} / 3件。</p><ol className="final-list">{order.map(id => { const task = TASKS[id]; return <li key={id}>{task.name}（優先順位 {task.priority}）：{completed.includes(id) ? '完了' : running && next === id ? '実行中' : '待機中'}</li>; })}</ol></div>;
}
