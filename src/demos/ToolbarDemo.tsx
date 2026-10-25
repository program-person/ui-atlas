import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const formats = ['太字', '斜体', '下線'];
export function ToolbarDemo({ settings }: { settings: Settings }) {
  const [enabled, setEnabled] = useState([settings.initial === 'bold', false, false]);
  const [focused, setFocused] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = settings.orientation === 'vertical';
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">A GROUP OF CONTROLS</span><h1>関連する操作をまとめる</h1><p className="demo-muted">固定のサンプル文に、複数の書式を適用します。</p>
    <div className={`format-toolbar toolbar-${settings.orientation}`} role="toolbar" aria-label="文章の見た目" aria-orientation={vertical ? 'vertical' : 'horizontal'}>{formats.map((label, index) => <button key={label} ref={(element) => { refs.current[index] = element; }} tabIndex={focused === index ? 0 : -1} aria-pressed={enabled[index]} onFocus={() => setFocused(index)} onClick={() => setEnabled((current) => current.map((value, position) => position === index ? !value : value))} onKeyDown={(event) => {
      let next: number;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = formats.length - 1;
      else if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % formats.length;
      else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index - 1 + formats.length) % formats.length;
      else return;
      event.preventDefault(); refs.current[next]?.focus();
    }}>{label}</button>)}</div>
    <section className="extension-panel"><h2>書式のプレビュー</h2><p style={{ fontWeight: enabled[0] ? 700 : 400, fontStyle: enabled[1] ? 'italic' : 'normal', textDecoration: enabled[2] ? 'underline' : 'none' }}>小さく作って、操作を確かめる。</p></section>
    <p role="status">{formats.map((label, index) => `${label}：${enabled[index] ? 'オン' : 'オフ'}`).join(' / ')}</p></div>;
}
