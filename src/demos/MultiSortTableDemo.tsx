import { useState } from 'react';
import type { Settings } from '../types.ts';

export function MultiSortTableDemo({ settings }: { settings: Settings }) {
const [descending,setDescending]=useState(false);const rows=[{name:'道具A',group:'紙',count:20},{name:'道具B',group:'紙',count:10},{name:'道具C',group:'筆記具',count:30},{name:'道具D',group:'筆記具',count:10}].sort((a,b)=>a.group.localeCompare(b.group,'ja')*(settings.mode==='desc'?-1:1)||(a.count-b.count)*(descending?-1:1)||a.name.localeCompare(b.name,'ja'));const order='1.分類 '+(settings.mode==='desc'?'降順':'昇順')+' → 2.件数 '+(descending?'降順':'昇順');
return <div className="growth2-demo"><h1>複数の条件で並べ替える表</h1><button onClick={()=>setDescending(value=>!value)}>件数順を切り替える</button><p role="status">{order}</p><table><caption>{order}</caption><thead><tr>{['道具','分類','件数'].map(label=><th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row.name}><th scope="row">{row.name}</th><td>{row.group}</td><td>{row.count}</td></tr>)}</tbody></table></div>;
}
