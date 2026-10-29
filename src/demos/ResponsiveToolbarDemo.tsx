import { useState, useLayoutEffect, useRef } from 'react';
import type { Settings } from '../types.ts';

export function ResponsiveToolbarDemo({ settings }: { settings: Settings }) {
  const [wide, setWide] = useState(false);
  const [narrow, setNarrow] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('操作はまだ選んでいません');
  const probe = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);
  const origin = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLButtonElement>(null);
  const previousWidth = useRef(true);
  const priorities = settings.mode === 'view' ? ['表示', '説明', '作成', '複製'] : ['作成', '複製', '表示', '説明'];
  useLayoutEffect(() => {
    const node = probe.current; if (!node) return;
    const observer = new ResizeObserver(entries => {
      const nextNarrow = entries[0].contentRect.width < 380;
      if (nextNarrow !== previousWidth.current) {
        const focusedInside = toolbar.current?.contains(document.activeElement);
        previousWidth.current = nextNarrow; setNarrow(nextNarrow); setOpen(false);
        if (focusedInside) first.current?.focus();
      }
    });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  function action(name: string) { setMessage(name + 'を選びました（模擬操作）'); }
  return <div className="cont3-demo"><h1>幅に応じて操作をまとめる</h1><button onClick={() => setWide(value => !value)}>{wide ? '枠を狭める' : '枠を広げる'}</button><p role="status">{wide ? '広い枠' : '狭い枠'} / {message}</p>
    <div style={{ width: wide ? 520 : 260, maxWidth: '100%' }}><div ref={probe} style={{ height: 0 }} aria-hidden="true" /><div ref={toolbar} className="cont3-panel" role="group" aria-label="幅に応じた操作" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); origin.current?.focus(); } }}>
      <div className="cont3-actions">{priorities.slice(0, narrow ? 2 : 4).map((name, index) => <button key={name} ref={index === 0 ? first : undefined} onClick={() => action(name)}>{name}</button>)}{narrow && <button ref={origin} aria-expanded={open} aria-controls="responsive-actions" onClick={() => setOpen(value => !value)}>その他の操作</button>}</div>
      {narrow && <div id="responsive-actions" hidden={!open} className="cont3-actions">{priorities.slice(2).map(name => <button key={name} onClick={() => action(name)}>{name}</button>)}</div>}
    </div></div>
  </div>;
}
