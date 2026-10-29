import { useState, useRef } from 'react';
import type { Settings } from '../types.ts';

export function FootnoteLinksDemo({ settings }: { settings: Settings }) {
  const [message, setMessage] = useState('本文の参照リンクを選べます');
  const reference = useRef<HTMLAnchorElement>(null);
  const footnote = useRef<HTMLHeadingElement>(null);
  function jump(target: HTMLElement | null, message: string) { target?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); target?.focus({ preventScroll: true }); setMessage(message); }
  return <div className="cont3-demo"><h1>脚注へ移動して戻る</h1><p role="status">{message}</p><div className={settings.mode === 'aside' ? 'cont3-columns' : undefined}><article className="cont3-panel"><h2>本文</h2><p>文章の周りに余白を残すと、後から補足を書き足せます。<sup><a ref={reference} id="sample-reference" href="#sample-footnote" aria-label="脚注1を読む" onClick={event => { event.preventDefault(); jump(footnote.current, '脚注へ移動しました'); }}>[1]</a></sup></p><p style={{ minHeight: 180 }}>ここには読み物の続きが入ります。図と文章を並べるときも、間に空間を残すことを試します。</p></article><aside className="cont3-panel"><h2 ref={footnote} id="sample-footnote" tabIndex={-1}>補足：余白の意味</h2><p>ここでは文章の外側と図の間の空間を指しています。</p><a href="#sample-reference" aria-label="本文の参照元1へ戻る" onClick={event => { event.preventDefault(); jump(reference.current, '参照元へ戻りました'); }}>本文の参照元1へ戻る</a></aside></div></div>;
}
