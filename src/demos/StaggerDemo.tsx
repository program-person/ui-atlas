import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const STAGGER_DURATION_MS = 300;
const staggerNotes = ['アイデアを集める', '小さく配置する', '操作を試す', '気づきを残す'];
export function StaggerDemo({ settings }: { settings: Settings }) {
  const [revision, setRevision] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const totalDuration = STAGGER_DURATION_MS + (staggerNotes.length - 1) * Number(settings.delay);
  return <div className="expanded-demo stagger-demo" style={{ '--motion-duration': `${STAGGER_DURATION_MS}ms`, '--motion-distance': '12px' } as CSSProperties}>
    <span className="demo-kicker">ONE AFTER ANOTHER</span><h1>順番に、姿を見せる。</h1><p className="demo-muted">遅延を足すほど、全体の待ち時間も長くなる。</p>
    <button className="demo-primary" onClick={() => { setVisible(true); setRevision((current) => current + 1); setSelected(''); }}>{visible ? '再生し直す' : '順番に表示'}</button>
    <div key={revision} className="stagger-cards">{visible && staggerNotes.map((note, index) => <button key={note} className="motion-card" style={{ animationDelay: `${index * Number(settings.delay)}ms` }} aria-pressed={selected === note} onClick={() => setSelected(note)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{note}</strong></button>)}</div>
    <p className="demo-status" role="status">{selected ? `「${selected}」を選択中。` : `各項目${STAGGER_DURATION_MS}ms、項目間${settings.delay}ms、全体${totalDuration}ms。`} 動きを減らす設定では、全件を即時表示します。</p>
  </div>;
}
