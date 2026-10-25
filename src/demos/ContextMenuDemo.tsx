import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const MENU_WIDTH = 180;
const MENU_HEIGHT = 152;
const EDGE_GAP = 12;
const actions = ['ピン留めを切り替え', 'ラベルを確認', '余白を切り替え'];
export function ContextMenuDemo({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState({ x: EDGE_GAP, y: EDGE_GAP });
  const [pinned, setPinned] = useState(false);
  const [compact, setCompact] = useState(false);
  const [status, setStatus] = useState('メニューから操作を選べます。');
  const stageRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function close(restore = true) { setOpen(false); if (restore) invokerRef.current?.focus(); }
  function show(invoker: HTMLElement, client?: { x: number; y: number }) {
    const stage = stageRef.current; if (!stage) return;
    const bounds = stage.getBoundingClientRect(); invokerRef.current = invoker;
    const centered = settings.placement === 'center';
    const x = centered ? (stage.clientWidth - MENU_WIDTH) / 2 : client ? client.x - bounds.left : EDGE_GAP;
    const y = centered ? (stage.clientHeight - MENU_HEIGHT) / 2 : client ? client.y - bounds.top : EDGE_GAP;
    setPoint({ x: Math.max(EDGE_GAP, Math.min(stage.clientWidth - MENU_WIDTH - EDGE_GAP, x)), y: Math.max(EDGE_GAP, Math.min(stage.clientHeight - MENU_HEIGHT - EDGE_GAP, y)) }); setOpen(true);
  }
  useEffect(() => {
    if (!open) return;
    itemRefs.current[settings.initialFocus === 'last' ? actions.length - 1 : 0]?.focus();
    function outside(event: PointerEvent) { if (!menuRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, settings.initialFocus]);
  function execute(index: number) {
    if (index === 0) { setPinned(!pinned); setStatus(pinned ? 'ピン留めを解除しました。' : 'ノートをピン留めしました。'); }
    if (index === 1) setStatus('ラベル：画面のアイデア。');
    if (index === 2) { setCompact(!compact); setStatus(compact ? '余白を広くしました。' : '余白を狭くしました。'); }
    close();
  }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">ACTIONS IN CONTEXT</span><h1>ノートの近くで操作を開く</h1><p className="demo-muted">枠を右クリック、またはShift+F10で開けます。</p>
    <button className="demo-primary" onClick={(event) => show(event.currentTarget)}>メニューを開く</button>
    <div ref={stageRef} className="context-stage" role="region" aria-label="サンプルノート" tabIndex={0}
      onContextMenu={(event) => { event.preventDefault(); event.currentTarget.focus(); show(event.currentTarget, { x: event.clientX, y: event.clientY }); }}
      onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))) { event.preventDefault(); show(event.currentTarget); } }}>
      <article className={`extension-panel ${compact ? 'context-compact' : ''}`}><span className="note-label">SAMPLE NOTE</span><h2>画面のアイデア</h2><p>{pinned ? '固定中' : '未固定'}</p><p>検索と一覧を近くに置く。</p></article>
      {open && <div ref={menuRef} className="context-menu" role="menu" aria-label="ノートの操作" style={{ left: point.x, top: point.y }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(false); }} onKeyDown={(event) => {
        const index = itemRefs.current.findIndex((element) => element === event.target);
        let next: number | undefined;
        if (event.key === 'ArrowDown') next = (index + 1) % actions.length;
        else if (event.key === 'ArrowUp') next = (index - 1 + actions.length) % actions.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = actions.length - 1;
        else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
        else if (event.key === 'Tab') close();
        if (next !== undefined) { event.preventDefault(); itemRefs.current[next]?.focus(); }
      }}>{actions.map((label, index) => <button key={label} role="menuitem" tabIndex={-1} ref={(element) => { itemRefs.current[index] = element; }} onClick={() => execute(index)}>{label}</button>)}</div>}
    </div><p role="status">{status}</p></div>;
}
