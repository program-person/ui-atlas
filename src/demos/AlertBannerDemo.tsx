import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';

export function AlertBannerDemo({ settings }: { settings: Settings }) {
  const [visible, setVisible] = useState(settings.initial === 'visible');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const warning = settings.severity === 'warning';
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">PERSISTENT GUIDANCE</span><h1>作業の近くに案内を残す</h1><p className="demo-muted">自動では消えない、架空の案内です。</p>
    <button ref={triggerRef} className="demo-primary" onClick={() => setVisible(true)}>案内を表示</button>
    <div className={`growth-banner ${warning ? 'banner-warning' : 'banner-info'}`}>
      <p role={warning ? 'alert' : 'status'}>{visible ? warning ? '要確認：デモの共有設定を確認してください。' : 'お知らせ：このノートはデモ用のサンプルです。' : ''}</p>
      <button hidden={!visible} className="demo-secondary" onClick={() => { setVisible(false); triggerRef.current?.focus(); }}>案内を閉じる</button>
    </div><section className="growth-panel"><h2>いつもの作業領域</h2><p>案内を表示しても、ここでの作業を続けられます。</p></section></div>;
}
