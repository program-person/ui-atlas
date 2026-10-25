import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const MIN_SHARE = 20;
const MAX_SHARE = 80;
const TOTAL_SHARE = 100;
const HANDLE_WIDTH = 44;
function clamp(value: number) { return Math.max(MIN_SHARE, Math.min(MAX_SHARE, Math.round(value))); }
export function ResizablePanelDemo({ settings }: { settings: Settings }) {
  const initial = Number(settings.initial);
  const [share, setShare] = useState(initial);
  const previousShare = useRef(initial);
  const rootRef = useRef<HTMLDivElement>(null); const paneId = useId(); const labelId = useId();
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">MAKE ROOM FOR THE WORK</span><h1>境界を動かして幅を変える</h1><p className="demo-muted">境界をドラッグするか、Tabで移動して左右キーを押します。</p>
    <div ref={rootRef} className="resizable-demo-grid" style={{ gridTemplateColumns: `${share}fr ${HANDLE_WIDTH}px ${TOTAL_SHARE - share}fr` }}>
      <section id={paneId}><h2 id={labelId}>ノート一覧</h2><p>画面案</p><p>色の記録</p></section>
      <div className="resize-handle" role="separator" tabIndex={0} aria-orientation="vertical" aria-labelledby={labelId} aria-controls={paneId} aria-valuemin={MIN_SHARE} aria-valuemax={MAX_SHARE} aria-valuenow={share} aria-valuetext={`左側${share}%`}
        onPointerDown={(event) => { event.preventDefault(); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={(event) => { const root = rootRef.current; if (!root || !event.currentTarget.hasPointerCapture(event.pointerId)) return; const width = root.clientWidth - HANDLE_WIDTH; if (width <= 0) return; setShare(clamp((event.clientX - root.getBoundingClientRect().left - root.clientLeft - HANDLE_WIDTH / 2) / width * TOTAL_SHARE)); }}
        onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onPointerCancel={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') setShare(clamp(share - Number(settings.step)));
          else if (event.key === 'ArrowRight') setShare(clamp(share + Number(settings.step)));
          else if (event.key === 'Home') setShare(MIN_SHARE);
          else if (event.key === 'End') setShare(MAX_SHARE);
          else if (event.key === 'Enter') { if (share === MIN_SHARE) setShare(previousShare.current); else { previousShare.current = share; setShare(MIN_SHARE); } }
          else return;
          event.preventDefault();
        }}><span aria-hidden="true">⋮</span></div>
      <section><h2>内容</h2><p>カードを並べて比較する画面案です。</p></section>
    </div><p role="status">有効領域の比率：{share}% / {TOTAL_SHARE - share}%</p><p className="demo-status">Home・Endは20%と80%。Enterで最小幅と元の幅を切り替えます。</p></div>;
}
