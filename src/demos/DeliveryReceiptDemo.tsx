import { useState } from 'react';
import type { Settings } from '../types.ts';

export function DeliveryReceiptDemo({ settings }: { settings: Settings }) {
const [step,setStep]=useState(0);const [failed,setFailed]=useState(false);const [attempted,setAttempted]=useState(false);const labels=['未送信','送信済み','到達済み','既読'];
return <div className="growth2-demo"><h1>送信・到達・既読を分ける</h1><p className="g2-panel">架空のメッセージ：配置の確認をお願いします。</p><button disabled={step===3} onClick={()=>{if(settings.mode==='failure'&&!attempted){setAttempted(true);setFailed(true);}else{setFailed(false);setStep(value=>Math.min(3,value+1));}}}>次の状態へ</button><p role="status">{failed?'送信失敗・同じボタンで再試行できます':labels[step]}</p><p>手動の模擬状態です。実際の送信は行いません。</p></div>;
}
