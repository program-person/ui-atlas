import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

export function MinimalDemo({ settings }: { settings: Settings }) {
  const [saved, setSaved] = useState(false);
  return <div className={`expanded-demo minimal-demo spacing-${settings.spacing} divider-${settings.divider}`}>
    <span className="demo-kicker">LESS, WITH PURPOSE</span><h1>必要なものを、静かに。</h1><p className="demo-muted">余白・文字・細い線で整理する。</p>
    <article className="minimal-note"><span className="note-label">01 / NOTE</span><h2>小さなアイデア</h2><p>色を増やす前に、情報の順番と余白を整える。</p><div className="minimal-meta"><span>下書き</span><span>3つのメモ</span></div>
      <button className="demo-primary" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? '保存済み' : 'ノートを保存'}</button></article>
    <p className="demo-status" role="status">{saved ? '架空のノートを保存済みにしました。' : 'ボタンで保存状態を切り替えられます。'}</p>
  </div>;
}
