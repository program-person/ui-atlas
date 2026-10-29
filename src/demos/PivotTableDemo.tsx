import { useState } from 'react';
import type { Settings } from '../types.ts';

export function PivotTableDemo({ settings }: { settings: Settings }) {
const [extra,setExtra]=useState(false);const records=[['紙','青',2],['紙','青',3],['紙','赤',1],['筆記具','赤',4],...(extra?[['筆記具','青',5]]:[])];const aggregate=(group:string,color:string)=>records.filter(row=>(!group||row[0]===group)&&(!color||row[1]===color)).reduce((total,row)=>total+(settings.mode==='count'?1:Number(row[2])),0);
return <div className="growth2-demo"><h1>クロス集計表</h1><button onClick={()=>setExtra(value=>!value)}>追加例を切り替える</button><p role="status">元記録 {records.length}件 / {settings.mode==='count'?'記録件数':'数量の合計'}</p><table><caption>分類 × 色の集計</caption><thead><tr>{['分類','青','赤','合計'].map(label=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{['紙','筆記具'].map(group=><tr key={group}><th scope="row">{group}</th>{['青','赤',''].map(color=><td key={color}>{aggregate(group,color)}</td>)}</tr>)}</tbody><tfoot><tr><th scope="row">合計</th>{['青','赤',''].map(color=><td key={color}>{aggregate('',color)}</td>)}</tr></tfoot></table><details><summary>元の記録</summary><ul>{records.map((row,index)=><li key={index}>{row.join(' / ')}</li>)}</ul></details></div>;
}
