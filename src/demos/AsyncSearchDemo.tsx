import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function AsyncSearchDemo({ settings }: { settings: Settings }) {
  const [query,setQuery]=useState('');const [result,setResult]=useState('');useEffect(()=>{if(!query.trim()){setResult('');return;}setResult('検索中');const timer=window.setTimeout(()=>setResult(query.includes('青')?'青いノート':'一致なし'),settings.mode==='long'?1500:600);return()=>window.clearTimeout(timer)},[query,settings.mode]);return <div className="exflow-demo"><h1>非同期検索</h1><p>入力後に検索し、古い結果が表示されないようにする。</p><label>検索<input value={query} onChange={event=>setQuery(event.target.value)} /></label><p role="status">{result&&(settings.display==='count'&&result==='青いノート'?'1件':result)}</p><button onClick={()=>setQuery('青')}>青を検索</button></div>
}
