import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function CopyButtonDemo({ settings }: { settings: Settings }) {
  const id = useId(); const input = useRef<HTMLTextAreaElement>(null); const [message, setMessage] = useState(''); const value = settings.snippet === 'color' ? '#276B59' : 'display: grid;';
  async function copy() { try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(value); setMessage('コピーしました。'); } catch { setMessage('コピーできませんでした。下の文字列を選択して手動でコピーしてください。'); } }
  return <div className="expanded-demo final-input-demo"><span className="demo-kicker">COPY A SAMPLE</span><h1>固定の文字列をコピー</h1><p>表示するのは公開できる架空のサンプルです。</p><label htmlFor={id}>サンプル<textarea id={id} ref={input} readOnly value={value} rows={2} onFocus={(event) => event.currentTarget.select()} /></label>
    <div className="final-actions"><button className="demo-primary" type="button" onClick={copy} aria-label="サンプルをコピー">{settings.mode === 'icon' ? <><span aria-hidden="true">▣</span><span className="final-visually-hidden">コピー</span></> : 'コピー'}</button><button className="demo-secondary" type="button" onClick={() => { input.current?.focus(); input.current?.select(); }}>文字列を選択</button></div><p role="status">{message}</p></div>;
}
