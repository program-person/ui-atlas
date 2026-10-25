import { useEffect, useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function ErrorSummaryDemo({ settings }: { settings: Settings }) {
  const [title, setTitle] = useState(settings.initial === 'sample' ? '余白の記録' : ''); const [kind, setKind] = useState(settings.initial === 'sample' ? 'layout' : '');
  const [attempt, setAttempt] = useState(0); const [result, setResult] = useState('まだ確定していません。');
  const rootId = useId(); const titleId = `${rootId}-title`; const kindId = `${rootId}-kind`; const summaryId = `${rootId}-summary`;
  const titleRef = useRef<HTMLInputElement>(null); const kindRef = useRef<HTMLSelectElement>(null); const summaryRef = useRef<HTMLDivElement>(null);
  const limit = Number(settings.limit);
  const problems: { id: string; message: string }[] = [];
  if (!title.trim()) problems.push({id:titleId,message:'題名を入力してください。'});
  else if (Array.from(title).length > limit) problems.push({id:titleId,message:`題名を${limit}文字以内で入力してください。`});
  if (!kind) problems.push({id:kindId,message:'種類を選んでください。'});
  const shown = attempt > 0 ? problems : [];
  useEffect(() => { if (attempt > 0 && problems.length) summaryRef.current?.focus(); }, [attempt]);
  function editing() { setResult('まだ確定していません。'); }
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">FIND EVERY PROBLEM</span><h1>問題のある欄へ案内する</h1><p className="demo-muted">架空の記録の題名と種類を確定します。</p>
    {shown.length > 0 && <div className="form-error-summary" ref={summaryRef} role="alert" tabIndex={-1} aria-labelledby={summaryId}><h2 id={summaryId}>入力内容を確認してください</h2><ul>{shown.map((problem) => <li key={problem.id}><a href={`#${problem.id}`} onClick={(event) => { event.preventDefault(); (problem.id === titleId ? titleRef.current : kindRef.current)?.focus(); }}>{problem.message}</a></li>)}</ul></div>}
    <form noValidate onSubmit={(event) => { event.preventDefault(); setAttempt((value) => value + 1); setResult(problems.length ? '入力を修正してください。' : '記録の内容を確定しました。'); }}>
      <label className="continuation-field" htmlFor={titleId}>題名<input id={titleId} ref={titleRef} value={title} aria-invalid={shown.some((problem) => problem.id === titleId) || undefined} aria-describedby={`${titleId}-help ${titleId}-error`} onChange={(event) => { setTitle(event.target.value); editing(); }} /></label><p id={`${titleId}-help`} className="demo-muted">空白だけは不可。{limit}コードポイント以内。</p><p id={`${titleId}-error`} className="continuation-error">{shown.find((problem) => problem.id === titleId)?.message}</p>
      <label className="continuation-field" htmlFor={kindId}>種類<select id={kindId} ref={kindRef} value={kind} aria-invalid={shown.some((problem) => problem.id === kindId) || undefined} aria-describedby={`${kindId}-error`} onChange={(event) => { setKind(event.target.value); editing(); }}><option value="">選んでください</option><option value="layout">レイアウト</option><option value="style">見た目</option></select></label><p id={`${kindId}-error`} className="continuation-error">{shown.find((problem) => problem.id === kindId)?.message}</p><button className="demo-primary" type="submit">内容を確定</button>
    </form><p role="status">{result}</p></div>;
}
