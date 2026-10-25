import { useState } from 'react';
import type { Settings } from '../types.ts';
const rows = ['配置の案','配色の案','余白の案','要点メモ'];
export function BulkActionsDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<number[]>(settings.initial === 'two' ? [0,1] : []); const [states, setStates] = useState(rows.map(() => '未確認')); const [result, setResult] = useState('まだ一括操作をしていません。');
  const target = settings.action === 'complete' ? '確認済み' : '保留';
  function execute() { if (!selected.length) return; setStates(states.map((state,index) => selected.includes(index) ? target : state)); setResult(`${selected.length}件を${target}にしました。`); setSelected([]); }
  return <div className="expanded-demo workflow-demo"><span className="demo-kicker">ACT ON A SELECTION</span><h1>選んだ項目へまとめて操作する</h1><p className="demo-muted">4件の架空メモの状態だけを変えます。</p><div className="workflow-actions" role="group" aria-label="一括操作"><button className="demo-secondary" onClick={() => setSelected(rows.map((_,index) => index))}>すべて選択</button><button className="demo-secondary" onClick={() => setSelected([])}>選択を解除</button><button className="demo-primary" aria-disabled={!selected.length} onClick={execute}>選択を{target}にする</button></div><p aria-live="polite">{selected.length}件を選択中</p>
    <ul className="bulk-list">{rows.map((label,index) => <li key={label}><label className="workflow-check"><input type="checkbox" checked={selected.includes(index)} onChange={(event) => setSelected(event.target.checked ? [...selected,index] : selected.filter((value) => value !== index))} />{label}</label><span>{states[index]}</span></li>)}</ul><p role="status">{result}</p></div>;
}
