import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

export function ToastDemo({ settings }: { settings: Settings }) {
  const [notification, setNotification] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!visible || hovered || focused || settings.duration === 'manual') return;
    const timer = window.setTimeout(() => setVisible(false), Number(settings.duration));
    return () => window.clearTimeout(timer);
  }, [visible, hovered, focused, notification, settings.duration]);
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">QUIET FEEDBACK</span><h1>結果を短く知らせる</h1><p className="demo-muted">通知は1件だけ表示し、直前の結果も本文に残します。</p>
    <button ref={triggerRef} className="demo-primary" onClick={() => { setNotification((value) => value + 1); setVisible(true); }}>通知を出す</button>
    <div className="toast-stage"><p>この領域はそのまま操作できます。</p><div className={`growth-toast toast-${settings.placement}`} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <p role="status">{visible ? `${notification}回目：表示設定を適用しました。` : ''}</p>
      <button className="demo-secondary" hidden={!visible} onClick={() => { setVisible(false); triggerRef.current?.focus(); }}>通知を閉じる</button>
    </div></div>
    <p className="growth-panel">{notification ? `直前の結果：${notification}回目の設定適用が完了しました。` : 'まだ通知はありません。'}</p>
    <p className="demo-status">自動非表示では、ホバー・フォーカス中は待ち時間を止めます。</p></div>;
}
