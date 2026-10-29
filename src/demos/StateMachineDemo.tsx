import { useState } from 'react';
import type { Settings } from '../types.ts';

export function StateMachineDemo({ settings }: { settings: Settings }) {
const [state,setState]=useState(0);const names=['待機','処理中',settings.mode==='failure'?'失敗':'完了'];
return <div className="growth2-demo"><h1>状態遷移図</h1><div className="g2-actions"><button disabled={state!==0} onClick={()=>setState(1)}>開始</button><button disabled={state!==1} onClick={()=>setState(2)}>終了</button><button disabled={state!==2} onClick={()=>setState(0)}>待機へ戻す</button></div><p role="status">現在：{names[state]}</p><svg viewBox="0 0 360 130" style={{width:'100%'}} aria-hidden="true">{names.map((name,index)=><g key={name}><circle cx={55+index*125} cy="60" r="40" fill={index===state?'#d7e6df':'white'} stroke="#235b46" strokeWidth={index===state?4:1}/><text x={55+index*125} y="66" textAnchor="middle">{name}</text>{index<2&&<text x={110+index*125} y="65">→</text>}{index===state&&<text x={55+index*125} y="120" textAnchor="middle">現在</text>}</g>)}</svg><p>待機 → 開始 → 処理中 → 終了 → {names[2]}。終了後は待機に戻せます。</p></div>;
}
