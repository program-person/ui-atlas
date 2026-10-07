import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const splitNotes = ['検索画面', 'ノート画面', '設定画面'];
export function SplitViewDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState(splitNotes[0]);
  const [editing, setEditing] = useState(false);
  return <div className="expanded-demo split-demo"><span className="demo-kicker">TWO WORKING AREAS</span><h1>一覧と作業を、並べる。</h1>
    <p className="demo-muted">幅の配分を変えて、両方の使いやすさを試す。</p>
    <div className="split-panes" style={{ '--list-share': settings.ratio } as CSSProperties}>
      <nav aria-label="画面のノート"><h2>ノート</h2>{splitNotes.map((note) => <button key={note} aria-current={selected === note ? 'true' : undefined} onClick={() => { setSelected(note); setEditing(false); }}>{note}</button>)}</nav>
      <section className="split-editor" aria-label="作業領域"><span className="note-label">WORKSPACE</span><h2>{selected}</h2><p>{editing ? '見出しの位置と余白を検討しています。' : '左で選んだノートを、ここで確認できます。'}</p>
        <button className="demo-secondary" aria-pressed={editing} onClick={() => setEditing(!editing)}>{editing ? '確認に戻る' : '検討を始める'}</button></section>
    </div>
  </div>;
}
