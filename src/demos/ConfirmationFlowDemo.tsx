import { useEffect, useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function ConfirmationFlowDemo({ settings }: { settings: Settings }) {
  const [state, setState] = useState(settings.initial === 'review' ? '確認中' : '下書き');
  const [checking, setChecking] = useState(false); const [message, setMessage] = useState('まだ変更していません。');
  const target = settings.action === 'adopt' ? '採用' : '保留'; const headingId = useId();
  const startRef = useRef<HTMLButtonElement>(null); const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (checking) cancelRef.current?.focus(); }, [checking]);
  function close(confirm: boolean) { if (confirm) { setState(target); setMessage(`状態を「${target}」に変更しました。`); } else setMessage('変更をやめました。'); setChecking(false); startRef.current?.focus(); }
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">CHECK BEFORE YOU COMMIT</span><h1>変更内容を確かめて実行する</h1><p className="demo-muted">架空の記録の状態だけを変更します。</p><article className="continuation-panel"><h2>配置のアイデア</h2><p>現在の状態：{state}</p></article>
    <button ref={startRef} className="demo-secondary" aria-disabled={checking || state === target} onClick={() => { if (checking || state === target) return; setMessage('内容を確認してください。'); setChecking(true); }}>{target}への変更を確認</button>
    {checking && <section className="continuation-panel confirmation-panel" aria-labelledby={headingId}><h2 id={headingId}>この内容で変更しますか？</h2><dl><dt>対象</dt><dd>配置のアイデア</dd><dt>状態</dt><dd>{state} → {target}</dd></dl><p>このデモ内の表示だけに反映します。</p><div className="continuation-actions"><button ref={cancelRef} className="demo-secondary" onClick={() => close(false)}>戻って見直す</button><button className="demo-primary" onClick={() => close(true)}>{target}に変更する</button></div></section>}
    <p role="status">{message}</p></div>;
}
