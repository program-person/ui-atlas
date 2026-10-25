import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function InputAdornmentDemo({ settings }: { settings: Settings }) {
  const [value, setValue] = useState('32'); const [error, setError] = useState(''); const [result, setResult] = useState('まだ確定していません。');
  const fieldId = useId(); const fieldRef = useRef<HTMLInputElement>(null);
  const unit = settings.unit === 'pixels' ? 'px' : '%'; const valid = /^\d{1,3}$/.test(value) && Number(value) <= 100;
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">A VALUE WITH ITS UNIT</span><h1>数値と単位を分けて表示する</h1><p className="demo-muted">単位は固定表示で、入力値には含めません。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!valid) { setError('半角数字で0〜100の整数を入力してください。'); fieldRef.current?.focus(); return; } setResult(`幅を${Number(value)}${unit}に確定しました。`); }}>
      <label className="exploration-field" htmlFor={fieldId}>サンプルの幅（{unit}）<span className="adorned-field">{settings.prefix === 'show' && <span className="adornment" aria-hidden="true">幅</span>}<input ref={fieldRef} id={fieldId} inputMode="numeric" value={value} aria-invalid={!!error || undefined} aria-describedby={`${fieldId}-help ${fieldId}-error`} onChange={(event) => { setValue(event.target.value); setError(''); setResult('まだ確定していません。'); }} /><span className="adornment" aria-hidden="true">{unit}</span></span></label>
      <p id={`${fieldId}-help`} className="demo-muted">半角数字の0〜100。単位は{unit}です。</p><p id={`${fieldId}-error`} className="exploration-error">{error}</p><button type="submit" className="demo-primary">幅を確定</button>
    </form><div className="adornment-preview" aria-label="幅のプレビュー">{valid && <span style={{width:`${Number(value)}${unit}`}} />}</div><p role="status">{result}</p></div>;
}
