import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function TimeInputDemo({ settings }: { settings: Settings }) {
  const id = useId(); const input = useRef<HTMLInputElement>(null); const [time, setTime] = useState(settings.initial === 'sample' ? '09:00' : ''); const [error, setError] = useState(''); const [result, setResult] = useState('未確定'); const step = settings.step === 'thirty' ? 30 : 15;
  return <div className="expanded-demo final-input-demo"><span className="demo-kicker">A TIME OF DAY</span><h1>架空の時刻を選ぶ</h1><p>09:00〜18:00、{step}分刻み。タイムゾーンは扱いません。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!time || !input.current?.validity.valid) { setError(`09:00〜18:00の${step}分刻みで選んでください。`); input.current?.focus(); return; } setError(''); setResult(`${time}に確定`); }}><label htmlFor={id}>時刻<input ref={input} id={id} type="time" min="09:00" max="18:00" step={step * 60} required value={time} aria-describedby={`${id}-error`} aria-invalid={!!error || undefined} onChange={(event) => { setTime(event.target.value); setError(''); setResult('未確定'); }} /></label><p id={`${id}-error`} className="final-error" role="alert">{error}</p><button className="demo-primary">時刻を確定</button></form><p role="status">{result}</p></div>;
}
