import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function SearchHistoryDemo({ settings }: { settings: Settings }) {
  const [query,setQuery]=useState('ノート');const [history,setHistory]=useState<string[]>([]);const [result,setResult]=useState('');const [error,setError]=useState('');const search=(value:string)=>{const next=value.trim();if(!next){setError('検索語を入力してください');return;}setError('');setResult(next);setHistory(current=>[next,...current.filter(item=>item!==next)].slice(0,settings.mode==='five'?5:3))};return <div className="exflow-demo"><h1>検索履歴</h1><p>直前に検索した言葉を再利用する。</p><label>検索<input value={query} onChange={event=>setQuery(event.target.value)}/></label><button onClick={()=>search(query)}>検索</button><p role="status">{error||result&&'検索：'+result}</p><p>履歴</p><ul>{(settings.order==='oldest'?[...history].reverse():history).map(item=><li key={item}><button onClick={()=>{setQuery(item);search(item)}}>{item}</button></li>)}</ul><button onClick={()=>setHistory([])}>履歴を消去</button></div>
}
