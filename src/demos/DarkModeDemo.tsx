import { useState } from 'react';
import type { Settings } from '../types.ts';

export function DarkModeDemo({ settings }: { settings: Settings }) {
  const [dark, setDark] = useState(settings.initial === 'dark');
  const [selected, setSelected] = useState(false);
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">THE SAME CONTENT, TWO PALETTES</span><h1>明るい配色と暗い配色を比べる</h1><p className="demo-muted">デモのカードだけを切り替えます。</p>
    <button className="demo-secondary" onClick={() => setDark(!dark)}>{dark ? 'ライト配色を試す' : 'ダーク配色を試す'}</button>
    <section className={`theme-demo-card ${dark ? 'dark-theme' : 'light-theme'} accent-${settings.accent}`}><span className="theme-meta">SAMPLE NOTE</span><h2>余白から考える</h2><p>同じ内容でも、背景・文字・枠線を組み合わせて読みやすさを保ちます。</p><p className="theme-meta">背景だけを黒くせず、補足や操作の色も揃えています。</p><button aria-pressed={selected} onClick={() => setSelected(!selected)}>メモを選ぶ</button></section>
    <p role="status">{dark ? 'ダーク配色' : 'ライト配色'} / メモは{selected ? '選択中' : '未選択'}</p></div>;
}
