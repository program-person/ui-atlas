import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function RequestCancellationDemo({ settings }: { settings: Settings }) {
  const [state,setState]=useState('待機中'); useEffect(()=>{if(state!=='処理中')return; const timer=window.setTimeout(()=>setState(settings.finish==='message'?'完了':'結果：3件'),settings.mode==='long'?4000:2000);return()=>window.clearTimeout(timer)},[state,settings.mode,settings.finish]); return <div className="exflow-demo"><h1>処理のキャンセル</h1><p>待機中の処理を取り消し、結果の反映を止める。</p><button onClick={()=>setState('処理中')}>処理を開始</button><button disabled={state!=='処理中'} onClick={()=>setState('キャンセルしました')}>キャンセル</button><p role="status">{state}</p></div>
}
