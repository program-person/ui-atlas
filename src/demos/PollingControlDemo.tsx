import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

export function PollingControlDemo({ settings }: { settings: Settings }) {
  const [running, setRunning] = useState(settings.initial === 'running');
  const [ticks, setTicks] = useState(0);
  const interval = settings.interval === '2000' ? 2000 : 1000;
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setTicks(current => current + 1), interval); return () => window.clearInterval(timer); }, [running, interval]);
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">PERIODIC UPDATE</span><h1>定期更新を操作する</h1><p>{interval / 1000}秒ごとに架空の数値を増やします。実際の取得や通信はありません。</p><button className="demo-secondary" onClick={() => setRunning(!running)}>{running ? '一時停止' : '開始'}</button><p role="status">{running ? '更新中' : '停止中'}。</p><p>更新回数：{ticks}回</p><p>架空の件数：{10 + ticks}件</p></div>;
}
