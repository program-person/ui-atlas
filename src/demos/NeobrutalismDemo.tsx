import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

export function NeobrutalismDemo({ settings }: { settings: Settings }) {
  const [saved, setSaved] = useState(false);
  return <div className={`expanded-demo brutal-demo accent-${settings.accent}`} style={{ '--hard-shadow': `${settings.shadow}px` } as CSSProperties}>
    <span className="demo-kicker">BOLD & DIRECT</span><h1>輪郭を、はっきり。</h1><p className="demo-muted">太い枠とずれた影で、面を強調する。</p>
    <article className="brutal-note"><span className="note-label">IDEA / 01</span><h2>小さく作って、試す。</h2><p>はっきりした文字と、押せることが伝わるボタン。</p><button aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? '保存済み' : 'ノートを保存'}</button></article>
    <p className="demo-status" role="status">{saved ? '架空のノートを保存済みにしました。' : 'TabとEnterでもボタンを試せます。'}</p>
  </div>;
}
