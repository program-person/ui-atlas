import { useEffect, useId, useState } from 'react';
import type { Settings } from '../types.ts';

const TOOLTIP_DESCRIPTION = 'ノートの要点をこの画面に表示します。';

export function TooltipDemo({ settings }: { settings: Settings }) {
  const tooltipId = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    if (!hovered && !focused) {
      setVisible(false);
      setDismissed(false);
      return;
    }
    if (dismissed) { setVisible(false); return; }
    const timer = window.setTimeout(() => setVisible(true), Number(settings.delay));
    return () => window.clearTimeout(timer);
  }, [hovered, focused, dismissed, settings.delay]);

  useEffect(() => {
    if (!visible) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setDismissed(true);
      setVisible(false);
    }
    // ホバーだけで開いた場合も、デモ内のEscで閉じられるようにする。
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [visible]);

  return <div className="expanded-demo navigation-demo tooltip-demo">
    <span className="demo-kicker">A LITTLE EXPLANATION</span><h1>操作に短い補足を添える</h1>
    <p className="demo-muted">ボタンにポインターを置くか、Tabで移動してください。</p>
    <div className="tooltip-stage"><span className="tooltip-target"
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}>
      <button type="button" className="demo-primary" aria-describedby={tooltipId}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onClick={() => setReviewed(true)}>要点を表示</button>
      <span id={tooltipId} role="tooltip" hidden={!visible} className={`sample-tooltip tooltip-${settings.placement}`}>
        <span className="tooltip-bubble">{TOOLTIP_DESCRIPTION}</span>
      </span>
    </span></div>
    <p className="tooltip-permanent-help"><strong>操作の説明</strong>{TOOLTIP_DESCRIPTION}</p>
    <p className="tooltip-result" role="status">{reviewed ? 'ノートの要点：カードを並べて比較する画面を考えています。' : 'まだ要点を表示していません。'}</p>
    <p className="demo-status">Escで補足を閉じられます。フォーカスはそのままです。</p>
  </div>;
}
