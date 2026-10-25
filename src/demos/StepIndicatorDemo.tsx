import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const steps = ['分類', '見た目', '確認'];
export function StepIndicatorDemo({ settings }: { settings: Settings }) {
  const [step, setStep] = useState(settings.initial === 'second' ? 1 : 0);
  const [category, setCategory] = useState('ノート');
  const [color, setColor] = useState('青');
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef(false);
  useEffect(() => { if (pendingFocus.current) { headingRef.current?.focus(); pendingFocus.current = false; } }, [step, done]);
  function move(next: number) { pendingFocus.current = true; setStep(next); }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">ONE STEP AT A TIME</span><h1>設定を手順に分ける</h1><p className="demo-muted">戻っても、選んだ値を保持します。</p>
    <ol className={`growth-steps steps-${settings.layout}`}>{steps.map((label, index) => <li key={label} aria-current={!done && step === index ? 'step' : undefined}><strong>{index + 1}. {label}</strong><small>{done || index < step ? '完了' : step === index ? '現在' : '未着手'}</small></li>)}</ol>
    <section className="growth-panel"><h2 tabIndex={-1} ref={headingRef}>{done ? '設定が完了しました' : `${step + 1} / 3 · ${steps[step]}`}</h2>
      {!done && step === 0 && <label className="growth-field">ノートの分類<select value={category} onChange={(event) => setCategory(event.target.value)}><option>ノート</option><option>スケッチ</option></select></label>}
      {!done && step === 1 && <label className="growth-field">アクセントの色<select value={color} onChange={(event) => setColor(event.target.value)}><option>青</option><option>緑</option></select></label>}
      {(done || step === 2) && <p>{category} / {color}</p>}
      {!done && <div className="growth-actions"><button className="demo-secondary" disabled={step === 0} onClick={() => move(step - 1)}>前の手順</button><button className="demo-primary" onClick={() => { if (step < steps.length - 1) move(step + 1); else { pendingFocus.current = true; setDone(true); } }}>{step === steps.length - 1 ? '設定を完了' : '次の手順'}</button></div>}
    </section><p role="status">{done ? '架空の設定を完了しました。' : `全3手順の${step + 1}番目です。`}</p></div>;
}
