import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const FIRST_DATE = '2026-10-01';
const SAMPLE_DATE = '2026-10-25';
export function DatePickerDemo({ settings }: { settings: Settings }) {
  const [date, setDate] = useState(settings.initial === 'sample' ? SAMPLE_DATE : '');
  const [error, setError] = useState(''); const [result, setResult] = useState('まだ日付を確定していません。');
  const inputId = useId(); const inputRef = useRef<HTMLInputElement>(null);
  const lastDate = settings.window === 'october' ? '2026-10-31' : '2026-11-30';
  function edit(value: string) { setDate(value); setError(''); setResult('まだ日付を確定していません。'); }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">A DATE WITHOUT A TIME</span><h1>架空の予定日を選ぶ</h1><p className="demo-muted">実際の予定やカレンダーへは登録しません。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!date || date < FIRST_DATE || date > lastDate || !inputRef.current?.validity.valid) { setError(!date ? '予定日を選んでください。' : `${FIRST_DATE}〜${lastDate}の範囲で選んでください。`); inputRef.current?.focus(); return; } const [year, month, day] = date.split('-').map(Number); setResult(`${year}年${month}月${day}日に確定しました。`); }}>
      <label className="extension-field" htmlFor={inputId}>デモの予定日<input id={inputId} ref={inputRef} type="date" min={FIRST_DATE} max={lastDate} required value={date} aria-describedby={`${inputId}-help ${inputId}-error`} aria-invalid={!!error || undefined} onInput={(event) => edit(event.currentTarget.value)} onChange={(event) => edit(event.target.value)} /></label>
      <p id={`${inputId}-help`} className="demo-muted">選べる範囲：{FIRST_DATE}〜{lastDate}</p><p className="extension-error" id={`${inputId}-error`}>{error}</p><button className="demo-primary" type="submit">日付を確定</button>
    </form><p role="status">{result}</p><p className="demo-status">入力値：{date || '未選択'}。時刻への変換は行いません。</p></div>;
}
