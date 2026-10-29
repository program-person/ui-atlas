import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CursorPaginationDemo({ settings }: { settings: Settings }) {
const size=Number(settings.mode);const positions=['start','cedar','birch','elm'];const [history,setHistory]=useState(['start']);const cursor=history[history.length-1];const offset=positions.indexOf(cursor)*size;const values=Array.from({length:7},(_,index)=>'メモ'+(index+1));const visible=values.slice(offset,offset+size);const hasNext=offset+size<values.length;
return <div className="growth2-demo"><h1>次の位置をたどるページ送り</h1><ul>{visible.map(value=><li key={value}>{value}</li>)}</ul><div className="g2-actions"><button disabled={history.length===1} onClick={()=>setHistory(current=>current.slice(0,-1))}>前の位置へ</button><button disabled={!hasNext} onClick={()=>{if(hasNext)setHistory(current=>[...current,positions[positions.indexOf(cursor)+1]]);}}>次の位置へ</button></div><p role="status">表示：{visible.join('・')} / {hasNext?'続きあり':'末尾'}</p></div>;
}
