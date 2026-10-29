import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function SavedFiltersDemo({ settings }: { settings: Settings }) {
  const [active,setActive]=useState<string[]>([]);const [saved,setSaved]=useState<string[][]>([]);const toggle=(item:string)=>setActive(current=>current.includes(item)?current.filter(value=>value!==item):[...current,item]);return <div className="exflow-demo"><h1>条件の一時保存</h1><p>絞り込み条件を保存して呼び戻す。</p><fieldset><legend>絞り込み</legend>{['青','小'].map(item=><label key={item}><input type="checkbox" checked={active.includes(item)} onChange={()=>toggle(item)}/>{item}</label>)}</fieldset><button onClick={()=>setSaved(current=>[...current,active].slice(-(settings.mode==='two'?2:1)))}>条件を保存</button><button onClick={()=>setActive([])}>条件を解除</button>{saved.map((group,index)=><button key={index} onClick={()=>setActive(current=>settings.apply==='merge'?[...new Set([...current,...group])]:group)}>保存条件 {index+1} を適用</button>)}<p role="status">保存済み：{saved.length}件 / 選択：{active.join('、')||'なし'}</p></div>
}
