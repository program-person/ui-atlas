import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function BatchProgressDemo({ settings }: { settings: Settings }) {
  const [count,setCount]=useState(0);const [running,setRunning]=useState(false);const total=settings.mode==='five'?5:3;const failed=count>=2?1:0;const stopped=settings.failure==='stop'&&count===2;useEffect(()=>{if(!running)return;if(count>=total||stopped){setRunning(false);return;}const timer=window.setTimeout(()=>setCount(value=>value+1),500);return()=>window.clearTimeout(timer)},[running,count,total,stopped]);return <div className="exflow-demo"><h1>一括処理の進捗</h1><p>複数の処理の結果を確認する。</p><button aria-disabled={running} onClick={()=>{if(running)return;setCount(0);setRunning(true)}}>一括処理を開始</button><progress max={total} value={Math.min(count,total)} aria-label="処理の進捗"/><p role="status">{running?'処理中':stopped?'失敗により停止':count?'処理を終了':'待機中'}：処理済み {Math.min(count,total)} / {total} 件、成功 {Math.max(0,Math.min(count,total)-failed)} 件、失敗 {failed} 件</p></div>
}
