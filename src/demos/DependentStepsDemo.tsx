import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function DependentStepsDemo({ settings }: { settings: Settings }) {
  const [step,setStep]=useState(1); const [choice,setChoice]=useState(false); const last=settings.mode==='detail'&&choice?3:2; return <div className="exflow-demo"><h1>条件で変わる手順</h1><p>選択に応じて後続の手順を切り替える。</p><p>手順 {step} / {last}</p>{step===1?<label><input type="checkbox" checked={choice} onChange={event=>setChoice(event.target.checked)}/> 詳細を追加</label>:<p>{step===2&&last===3?'詳細を確認':'内容を確認'}</p>}<button disabled={step===1} onClick={()=>{setStep(step-1);if(settings.returning==='reset')setChoice(false)}}>戻る</button><button disabled={step===last} onClick={()=>setStep(step+1)}>次へ</button></div>
}
