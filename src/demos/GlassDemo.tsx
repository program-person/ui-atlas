import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

export function GlassDemo({ settings }: { settings: Settings }) {
  const [saved, setSaved] = useState(false);
  return <div className={`expanded-demo glass-demo background-${settings.background}`} style={{ '--glass-opacity': settings.opacity } as CSSProperties}>
    <span className="demo-kicker">LAYERS OF LIGHT</span><h1>背景が、少し透ける。</h1><p className="demo-muted">透過度を変えて、文字の読みやすさを確かめる。</p>
    <article className="glass-note"><span className="note-label">DESIGN NOTE</span><h2>ひらめきを残す</h2><p>ぼかした背景と半透明の面を重ねる。文字は濃い色で保ちます。</p>
      <button className="demo-primary" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? '保存済み' : 'ノートを保存'}</button></article>
    <p className="demo-status" role="status">{saved ? '架空のノートを保存済みにしました。' : '背景と面の重なりを試せます。'}</p>
  </div>;
}
