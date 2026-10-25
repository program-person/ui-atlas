import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const MIN_CARDS = 1;
const MAX_CARDS = 9;
export function NumberInputDemo({ settings }: { settings: Settings }) {
  const [input, setInput] = useState(settings.initial);
  const [error, setError] = useState('');
  const [result, setResult] = useState('まだ確定していません。');
  const inputId = useId(); const inputRef = useRef<HTMLInputElement>(null);
  const count = Number(input); const step = Number(settings.step);
  const valid = input.trim() !== '' && Number.isInteger(count) && count >= MIN_CARDS && count <= MAX_CARDS && (count - MIN_CARDS) % step === 0;
  function change(value: string) { setInput(value); setError(''); setResult('まだ確定していません。'); }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">AN EXACT QUANTITY</span><h1>枚数を数値で指定する</h1><p className="demo-muted">入力と増減ボタンで、正確な枚数を決めます。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!valid) { setError(!input.trim() ? '枚数を入力してください。' : `1〜9の整数を、1から${step}刻みで入力してください。`); inputRef.current?.focus(); return; } setResult(`${count}枚のカードに確定しました。`); }}>
      <label className="extension-field" htmlFor={inputId}>カードの枚数<input ref={inputRef} id={inputId} type="number" min={MIN_CARDS} max={MAX_CARDS} step={step} value={input} aria-invalid={!!error || undefined} aria-describedby={`${inputId}-help ${inputId}-error`} onChange={(event) => change(event.target.value)} /></label>
      <p id={`${inputId}-help`} className="demo-muted">範囲：1〜9枚。刻み：{step}。</p><p id={`${inputId}-error`} className="extension-error">{error}</p>
      <div className="extension-actions"><button type="button" className="demo-secondary" disabled={!valid || count === MIN_CARDS} onClick={() => change(String(count - step))}>枚数を減らす</button><button type="button" className="demo-secondary" disabled={!valid || count === MAX_CARDS} onClick={() => change(String(count + step))}>枚数を増やす</button><button className="demo-primary" type="submit">枚数を確定</button></div>
    </form><div className="number-cards" aria-label="枚数のプレビュー">{valid ? Array.from({ length: count }, (_, index) => <span key={index}>カード{index + 1}</span>) : <p>有効な枚数を入力すると表示します。</p>}</div><p role="status">{result}</p></div>;
}
