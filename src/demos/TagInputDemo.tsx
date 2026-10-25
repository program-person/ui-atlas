import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import { normalizeSearch } from '../catalog/logic.ts';

const MAX_TAG_LENGTH = 12;
export function TagInputDemo({ settings }: { settings: Settings }) {
  const [tags, setTags] = useState<string[]>(settings.initial === 'one' ? ['画面'] : []);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); const composing = useRef(false); const inputId = useId();
  const limit = Number(settings.limit);
  function add() {
    const value = input.trim();
    const problem = !value ? 'タグを入力してください。' : Array.from(value).length > MAX_TAG_LENGTH ? 'タグは12文字以内にしてください。' : tags.some((tag) => normalizeSearch(tag) === normalizeSearch(value)) ? '同じタグは追加できません。' : tags.length >= limit ? `追加できるのは${limit}個までです。` : '';
    if (problem) { setError(problem); inputRef.current?.focus(); return; }
    setTags([...tags, value]); setInput(''); setError(''); inputRef.current?.focus();
  }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">LABEL AN IDEA</span><h1>短いタグを組み合わせる</h1><p className="demo-muted">架空のラベルだけで試してください。</p>
    <ul className="input-tags" aria-label="追加したタグ">{tags.map((tag) => <li key={tag}><span>{tag}</span><button type="button" aria-label={`${tag}を外す`} onClick={() => { setTags(tags.filter((candidate) => candidate !== tag)); setError(''); inputRef.current?.focus(); }}><span aria-hidden="true">×</span></button></li>)}</ul>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!composing.current) add(); }}><label className="extension-field" htmlFor={inputId}>追加するタグ<input id={inputId} ref={inputRef} value={input} placeholder="例：余白" aria-describedby={`${inputId}-help ${inputId}-error`} aria-invalid={!!error || undefined} onChange={(event) => { setInput(event.target.value); setError(''); }} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }} onKeyDown={(event) => { if (event.key === 'Enter' && (composing.current || event.nativeEvent.isComposing)) event.preventDefault(); }} /></label><p id={`${inputId}-help`} className="demo-muted">1タグ12文字以内（Unicodeコードポイント）。最大{limit}個。</p><p id={`${inputId}-error`} className="extension-error">{error}</p><button className="demo-primary" type="submit">タグを追加</button></form>
    <p role="status">{tags.length} / {limit}個のタグ</p></div>;
}
