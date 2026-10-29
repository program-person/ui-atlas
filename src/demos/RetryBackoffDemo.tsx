import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function RetryBackoffDemo({ settings }: { settings: Settings }) {
  const [count,setCount]=useState(0); const [running,setRunning]=useState(false); const limit=settings.limit==='three'?3:2; const delay=(settings.mode==='backoff'?2**count:1)*500; useEffect(()=>{if(!running)return; if(count>=limit){setRunning(false);return;} const timer=window.setTimeout(()=>setCount(value=>value+1),delay);return()=>window.clearTimeout(timer);},[running,count,limit,delay]); return <div className="exflow-demo"><h1>再試行と待機</h1><p>失敗後に間隔を設けて再試行する。</p><button aria-disabled={running} onClick={()=>{if(running)return;setCount(0);setRunning(true)}}>再試行を開始</button><p role="status">{running?'再試行を待機中':count>=limit?'再試行の上限に到達':'待機中'}：{count}回</p>{running&&count<limit&&<p>次の試行まで：{delay / 1000}秒</p>}</div>
}
