import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
type Phase = 'idle' | 'busy' | 'success' | 'error';
export function LoadingButtonDemo({ settings }: { settings: Settings }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [attempts, setAttempts] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); const running = useRef(false);
  useEffect(() => () => { clearTimeout(timer.current); running.current = false; }, []);
  function run() { if (running.current) return; running.current = true; setAttempts((value) => value + 1); setPhase('busy'); timer.current = setTimeout(() => { running.current = false; setPhase(settings.result === 'success' ? 'success' : 'error'); }, Number(settings.delay)); }
  const status = phase === 'busy' ? 'サンプルを確認中です。' : phase === 'success' ? 'サンプルの確認が完了しました。' : phase === 'error' ? '確認に失敗しました。もう一度試せます。' : 'ボタンから疑似処理を始められます。';
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">ONE REQUEST AT A TIME</span><h1>処理中の操作を伝える</h1><p className="demo-muted">通信しない、タイマーだけの疑似処理です。</p><div className="continuation-panel" aria-busy={phase === 'busy'}><h2>画面サンプルの確認</h2><p>実行回数：{attempts}回</p><button className="demo-primary" aria-disabled={phase === 'busy'} onClick={run}>{phase === 'busy' ? '確認中…' : phase === 'error' ? 'もう一度確認する' : 'サンプルを確認する'}</button></div><p role="status">{status}</p></div>;
}
