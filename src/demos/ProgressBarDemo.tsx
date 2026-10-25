import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const COMPLETE_PERCENT = 100;
export function ProgressBarDemo({ settings }: { settings: Settings }) {
  const [percent, setPercent] = useState(0);
  const progressId = useId();
  const complete = percent === COMPLETE_PERCENT;
  const unknown = settings.mode === 'unknown' && !complete;
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">PROCESS STATUS</span><h1>処理の進み具合を伝える</h1><p className="demo-muted">架空の整理処理をボタンで進めます。</p>
    <section className="growth-panel"><label id={`${progressId}-label`} htmlFor={progressId}>ノートの整理</label>
      <progress id={progressId} aria-labelledby={`${progressId}-label`} max={COMPLETE_PERCENT} value={unknown ? undefined : percent} />
      <p role="status">{complete ? '整理が完了しました。' : unknown ? '処理中 · 進捗率は不明です。' : `${percent}% 完了`}</p>
      <button className="demo-primary" disabled={complete} onClick={() => setPercent(unknown ? COMPLETE_PERCENT : Math.min(COMPLETE_PERCENT, percent + Number(settings.step)))}>{unknown ? '処理を完了する' : '処理を進める'}</button>
    </section></div>;
}
