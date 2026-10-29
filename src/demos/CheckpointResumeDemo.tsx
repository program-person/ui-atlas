import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function CheckpointResumeDemo({ settings }: { settings: Settings }) {
  const [step,setStep]=useState(1);const [text,setText]=useState('');const [saved,setSaved]=useState<{step:number; text:string}|null>(null); const [paused,setPaused]=useState(false);return <div className="exflow-demo"><h1>途中から再開</h1><p>作業の途中位置を一時的に記録し再開する。</p><p>手順 {step} / 3</p><label>メモ<input value={text} readOnly={paused} onChange={event=>setText(event.target.value)}/></label><button aria-disabled={paused} onClick={()=>{if(!paused)setStep(Math.min(3,step+1))}}>次へ</button><button aria-disabled={paused} onClick={()=>{if(paused)return;setSaved({step,text:settings.mode==='content'?text:''});setPaused(true);setStep(1);setText('')}}>中断して記録</button><button aria-disabled={!paused||!saved} onClick={()=>{if(paused&&saved){setStep(settings.resume==='start'?1:saved.step);setText(saved.text);setPaused(false)}}}>記録から再開</button><p role="status">{paused?'途中位置を記録しました':'作業中'}</p></div>
}
