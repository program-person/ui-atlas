import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const PANEL_GAP = 8;
const VIEWPORT_MARGIN = 12;

export function PopoverDemo({ settings }: { settings: Settings }) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [position, setPosition] = useState({ top: VIEWPORT_MARGIN, left: VIEWPORT_MARGIN });

  function placePanel() {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const bounds = trigger.getBoundingClientRect();
    const above = bounds.top - panel.offsetHeight - PANEL_GAP;
    const below = bounds.bottom + PANEL_GAP;
    const preferAbove = settings.placement === 'top';
    const top = preferAbove && above >= VIEWPORT_MARGIN ? above : below + panel.offsetHeight <= window.innerHeight - VIEWPORT_MARGIN ? below : above;
    setPosition({
      top: Math.max(VIEWPORT_MARGIN, Math.min(top, window.innerHeight - panel.offsetHeight - VIEWPORT_MARGIN)),
      left: Math.max(VIEWPORT_MARGIN, Math.min(bounds.left, window.innerWidth - panel.offsetWidth - VIEWPORT_MARGIN)),
    });
  }

  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', placePanel);
    window.addEventListener('scroll', placePanel, true);
    return () => { window.removeEventListener('resize', placePanel); window.removeEventListener('scroll', placePanel, true); };
  }, [open, settings.placement]);

  return <div className="expanded-demo popover-demo"><span className="demo-kicker">QUICK OPTIONS</span><h1>その場で、少しだけ調整</h1>
    <p className="demo-muted">背景を操作したまま、小さな設定を開く。</p>
    <div className={`popover-note ${compact ? 'is-compact' : ''}`}><span className="note-label">DESIGN NOTE</span><h2>画面のアイデア</h2><p>カードの情報量を調整できます。</p></div>
    <button ref={triggerRef} className="demo-secondary" popoverTarget="display-options" aria-expanded={open}>表示オプション</button>
    <div ref={panelRef} id="display-options" popover="auto" role="dialog" aria-label="表示の設定" className="options-popover" style={position as CSSProperties}
      onToggle={(event) => { const showing = event.newState === 'open'; setOpen(showing); if (showing) placePanel(); }}>
      <strong>表示の設定</strong><label><input type="checkbox" checked={compact} onChange={(event) => setCompact(event.target.checked)} />余白をコンパクトに</label>
      <button className="demo-secondary" onClick={() => { panelRef.current?.hidePopover(); triggerRef.current?.focus(); }}>閉じる</button>
    </div>
    <p className="demo-status" role="status">{compact ? 'コンパクト表示' : 'ゆったり表示'}。外側のクリック・Esc・閉じるボタンで閉じます。</p>
  </div>;
}
