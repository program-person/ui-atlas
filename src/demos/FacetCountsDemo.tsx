import { useState } from 'react';
import type { Settings } from '../types.ts';

export function FacetCountsDemo({ settings }: { settings: Settings }) {
const [blue,setBlue]=useState(false);const [category,setCategory]=useState('すべて');const records=[['紙','青'],['紙','青'],['紙','赤'],['筆記具','赤'],['筆記具','赤'],['布','青']];const colored=records.filter(row=>!blue||row[1]==='青');const filtered=colored.filter(row=>category==='すべて'||row[0]===category);const count=(name:string)=>name==='すべて'?colored.length:colored.filter(row=>row[0]===name).length;
return <div className="growth2-demo"><h1>絞り込み候補の件数</h1><button aria-pressed={blue} onClick={()=>setBlue(value=>!value)}>青だけにする</button><fieldset><legend>分類・件数は色の条件のみを反映</legend>{['すべて','紙','筆記具','布'].filter(name=>settings.mode==='show'||count(name)>0||category===name).map(name=><label key={name}><input type="radio" name="facet-category" checked={category===name} onChange={()=>setCategory(name)}/>{name}（{count(name)}件）</label>)}</fieldset><p role="status">該当 {filtered.length}件</p><ul>{filtered.map((row,index)=><li key={index}>{row.join('・')}の記録{index+1}</li>)}</ul>{!filtered.length&&<p>条件に合う記録はありません。</p>}</div>;
}
