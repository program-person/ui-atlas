import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function OfflineFallbackDemo({ settings }: { settings: Settings }) {
  const [online,setOnline]=useState(true);const [shown,setShown]=useState(true);return <div className="exflow-demo"><h1>オフライン時の代替表示</h1><p>接続できないときの代替表示と再試行を示す。</p><button onClick={()=>{setOnline(false);setShown(false)}}>接続を切る</button><button onClick={()=>{setOnline(true);if(settings.recovery==='auto')setShown(true)}}>接続を戻す</button>{!online?<p role="status">オフラインです。{settings.mode==='cached'?'前回の内容：青いノート':'接続後に再試行してください。'}</p>:shown?<p role="status">最新の内容：赤いノート</p>:<p role="status">接続が戻りました。再試行してください。</p>}<button disabled={!online} onClick={()=>setShown(true)}>再試行</button></div>
}
