import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const MAX_DETAIL_LENGTH = 20;
export function ConditionalFieldsDemo({ settings }: { settings: Settings }) {
  const [detailed, setDetailed] = useState(settings.initial === 'detailed'); const [detail, setDetail] = useState(settings.initial === 'detailed' ? '余白を広くする' : ''); const [error, setError] = useState(''); const [result, setResult] = useState('まだ確定していません。');
  const inputId = useId(); const detailRef = useRef<HTMLInputElement>(null);
  function choose(next: boolean) { setDetailed(next); if (!next && settings.retention === 'reset') setDetail(''); setError(''); setResult('まだ確定していません。'); }
  return <div className="expanded-demo workflow-demo"><span className="demo-kicker">ASK ONLY WHEN NEEDED</span><h1>選択した時だけ補足を入力する</h1><p className="demo-muted">架空のメモの表示内容を選びます。隠した欄は確定結果に含めません。</p><form noValidate onSubmit={(event) => { event.preventDefault(); if (detailed && (!detail.trim() || Array.from(detail.trim()).length > MAX_DETAIL_LENGTH)) { setError('補足を1〜20文字で入力してください。'); detailRef.current?.focus(); return; } setResult(detailed ? `確定：基本と補足「${detail.trim()}」` : '確定：基本だけ'); }}>
    <fieldset className="workflow-fieldset"><legend>表示内容</legend><label className="workflow-check"><input type="radio" name={inputId} checked={!detailed} onChange={() => choose(false)} />基本だけ</label><label className="workflow-check"><input type="radio" name={inputId} checked={detailed} aria-controls={`${inputId}-details`} onChange={() => choose(true)} />補足も入力</label></fieldset>
    {detailed && <div id={`${inputId}-details`} className="conditional-panel"><label className="workflow-field" htmlFor={`${inputId}-input`}>表示する補足<input id={`${inputId}-input`} ref={detailRef} value={detail} required aria-invalid={!!error || undefined} aria-describedby={`${inputId}-error`} onChange={(event) => { setDetail(event.target.value); setError(''); setResult('まだ確定していません。'); }} /></label><p id={`${inputId}-error`} className="workflow-error">{error}</p></div>}
    <button className="demo-primary" type="submit">表示内容を確定</button></form><p role="status">{result}</p><p className="demo-muted">欄を隠すと入力値を{settings.retention === 'keep' ? '保持します' : '空欄に戻します'}。</p></div>;
}
