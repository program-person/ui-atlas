import { useState } from 'react';
import type { Settings } from '../types.ts';
const softShadows = ['none','0 2px 6px #25364e22','0 6px 16px #25364e2e','0 14px 30px #25364e38'];
const crispShadows = ['none','3px 3px 0 #b6c5dd','6px 6px 0 #9aafd0','9px 9px 0 #849cc2'];
export function ElevationDemo({ settings }: { settings: Settings }) {
  const [raised, setRaised] = useState(false); const level = Number(settings.initial) + (raised ? 1 : 0); const shadows = settings.style === 'soft' ? softShadows : crispShadows;
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">A SENSE OF ELEVATION</span><h1>影で面の奥行きを比べる</h1><p className="demo-muted">影は見た目だけを変え、内容の意味や操作順は変えません。</p>
    <div className="elevation-stage"><article className="elevation-card" style={{boxShadow:shadows[level]}}><span className="note-label">SAMPLE CARD</span><h2>配置のアイデア</h2><p>同じカードの影だけを比べています。</p></article></div>
    <button className="demo-secondary" aria-pressed={raised} onClick={() => setRaised(!raised)}>カードを持ち上げる</button><p role="status">影の段階：{level} / {settings.style === 'soft' ? 'ぼかした影' : 'ぼかさない影'}。</p></div>;
}
