import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

export function TextareaDemo({ settings }: { settings: Settings }) {
  const limit = Number(settings.limit);
  const [value, setValue] = useState(settings.initial === 'sample' ? '余白を広くする。\n操作を近くにまとめる。' : '');
  const [error, setError] = useState('');
  const [result, setResult] = useState('まだ確定していません。');
  const inputId = useId(); const fieldRef = useRef<HTMLTextAreaElement>(null);
  const length = Array.from(value).length;
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">ROOM FOR A THOUGHT</span><h1>複数行で考えを残す</h1><p className="demo-muted">架空の画面メモだけで試してください。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!value.trim() || length > limit) { setError(!value.trim() ? 'メモを入力してください。' : `${limit}文字以内で入力してください。`); fieldRef.current?.focus(); return; } setResult('このデモ内でメモを確定しました。'); }}>
      <label className="continuation-field" htmlFor={inputId}>画面のメモ<textarea id={inputId} ref={fieldRef} rows={4} value={value} aria-describedby={`${inputId}-help ${inputId}-error`} aria-invalid={!!error || undefined} onChange={(event) => { setValue(event.target.value); setError(''); setResult('まだ確定していません。'); }} /></label>
      <p id={`${inputId}-help`} className="demo-muted">{length} / {limit}文字（改行を含むUnicodeコードポイント）。Enterは改行です。</p><p id={`${inputId}-error`} className="continuation-error">{error}</p><button className="demo-primary" type="submit">メモを確定</button>
    </form><p role="status">{result}</p><p className="preserved-lines">{value || '入力したメモがここに表示されます。'}</p></div>;
}
