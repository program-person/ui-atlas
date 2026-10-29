import { useLayoutEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const MAX_ROWS=5;
export function RepeatableFieldsDemo({settings}:{settings:Settings}) {
 const [rows,setRows]=useState([{id:1,value:settings.initial==='sample'?'ノート':''}]);const [next,setNext]=useState(2);const inputs=useRef(new Map<number,HTMLInputElement>());const focusId=useRef<number|null>(null);
 useLayoutEffect(()=>{if(focusId.current!==null){inputs.current.get(focusId.current)?.focus();focusId.current=null;}},[rows]);
 function remove(index:number){focusId.current=rows[index+1]?.id??rows[index-1]?.id??null;setRows(rows.filter((_,i)=>i!==index));}
 return <section className={`exinput-demo exinput-${settings.layout}`}><h1>繰り返し入力欄</h1><div>{rows.map((row,index)=><div key={row.id}><label>項目 {index+1}<input ref={element=>{if(element)inputs.current.set(row.id,element);else inputs.current.delete(row.id);}} value={row.value} onChange={e=>setRows(rows.map(item=>item.id===row.id?{...item,value:e.target.value}:item))}/></label>{rows.length>1&&<button aria-label={'項目 '+(index+1)+'を外す'} onClick={()=>remove(index)}>外す</button>}</div>)}</div><button aria-disabled={rows.length>=MAX_ROWS} onClick={()=>{if(rows.length>=MAX_ROWS)return;setRows([...rows,{id:next,value:''}]);setNext(next+1);}}>行を追加</button><p>{rows.length} / {MAX_ROWS}行</p></section>;
}
