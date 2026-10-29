import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function OverflowMenuDemo({ settings }: { settings: Settings }) {
  const id = useId(); const trigger = useRef<HTMLButtonElement>(null); const [open, setOpen] = useState(false); const [result, setResult] = useState('操作を選んでください');
  const actions = settings.actions === 'three' ? ['固定する', '複製する', '情報を見る'] : ['固定する', '情報を見る'];
  return <div className="expanded-demo exlayout" onKeyDown={(event) => { if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } }}><h1>追加操作をまとめる</h1><div className={`exlayout-overflow ${settings.align === 'end' ? 'align-end' : ''}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><button ref={trigger} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>その他の操作</button><div id={id} hidden={!open} className="exlayout-action-list" role="group" aria-label="追加操作">{actions.map((action) => <button key={action} onClick={() => { setResult(`${action}を選択しました`); setOpen(false); trigger.current?.focus(); }}>{action}</button>)}</div></div><p role="status">{result}</p><p>通常のボタンをTabで巡回し、Escで閉じます。</p></div>;
}
