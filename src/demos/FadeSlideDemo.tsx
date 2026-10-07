import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

export function FadeSlideDemo({ settings }: { settings: Settings }) {
  const [visible, setVisible] = useState(false);
  const [revision, setRevision] = useState(0);
  return <div className="expanded-demo fade-demo" style={{ '--motion-duration': `${settings.duration}ms`, '--motion-distance': `${settings.distance}px` } as CSSProperties}>
    <span className="demo-kicker">A QUIET ENTRANCE</span><h1>現れる動きを、調整する。</h1><p className="demo-muted">距離と時間を変えて再生できます。</p>
    <div className="motion-actions"><button className="demo-primary" onClick={() => setVisible(!visible)}>{visible ? '非表示にする' : '表示する'}</button><button className="demo-secondary" onClick={() => { setRevision((current) => current + 1); setVisible(true); }}>もう一度再生</button></div>
    <div className="motion-stage">{visible && <article key={revision} className="motion-card"><span className="note-label">DESIGN NOTE</span><h2>小さな気づき</h2><p>内容をそっと表示する。操作を待たせすぎない動きにします。</p></article>}</div>
    <p className="demo-status" role="status">{visible ? `表示中 · ${settings.duration}ms / ${settings.distance}px` : 'ボタンで表示できます。'} 非表示は即時。動きを減らす設定では、すぐに表示します。</p>
  </div>;
}
