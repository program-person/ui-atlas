import { useState } from 'react';
import type { Settings } from '../types.ts';

export function SwimlaneDemo({ settings }: { settings: Settings }) {
const [step,setStep]=useState(0);const lanes=['受付','制作','確認'];const tasks=['内容を受ける','形を作る','内容を点検する'];
return <div className="growth2-demo"><h1>担当範囲ごとの工程図</h1><button disabled={step===2} onClick={()=>setStep(value=>Math.min(2,value+1))}>工程を進める</button><p role="status">現在：{lanes[step]} / 工程{step+1}</p><ol className={settings.mode==='horizontal'?'g2-lanes g2-lanes-horizontal':'g2-lanes'}>{lanes.map((lane,index)=><li key={lane} className="g2-panel" aria-current={index===step?'step':undefined} style={{borderWidth:index===step?3:1}}><h2>{index+1}. {lane}</h2><p>{tasks[index]}</p>{index===step&&<strong>現在の工程</strong>}</li>)}</ol></div>;
}
