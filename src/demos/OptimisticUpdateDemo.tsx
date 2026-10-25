import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const CONFIRM_DELAY_MS = 1500;
export function OptimisticUpdateDemo({ settings }: { settings: Settings }) {
  const initial = settings.initial === 'on'; const [pinned, setPinned] = useState(initial); const [pending, setPending] = useState(false); const [attempts, setAttempts] = useState(0); const [status, setStatus] = useState('まだ操作していません。');
  const confirmed = useRef(initial); const running = useRef(false); const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { clearTimeout(timer.current); running.current = false; }, []);
  function toggle() { if (running.current) return; running.current = true; const previous = confirmed.current; const next = !previous; setPinned(next); setPending(true); setAttempts((count) => count + 1); setStatus('表示を先に変えました。疑似処理の結果を待っています。'); timer.current = setTimeout(() => { if (settings.result === 'success') { confirmed.current = next; setStatus('変更を確定しました。'); } else { setPinned(previous); setStatus('処理に失敗し、確定済みの状態へ戻しました。'); } running.current = false; setPending(false); }, CONFIRM_DELAY_MS); }
  return <div className="expanded-demo workflow-demo"><span className="demo-kicker">SHOW THE RESULT, THEN CONFIRM</span><h1>先に表示を変えて結果を待つ</h1><p className="demo-muted">通信なしの疑似処理です。失敗時は確定済みの状態へ戻ります。</p><article className="workflow-panel" aria-busy={pending}><h2>配置のアイデア</h2><p>表示中：{pinned ? '固定中' : '未固定'}</p><p>確定済み：{confirmed.current ? '固定中' : '未固定'}</p><p>試行回数：{attempts}回</p><button className="demo-secondary" aria-pressed={pinned} aria-disabled={pending} onClick={toggle}>ピン留め</button></article><p role="status">{status}</p></div>;
}
