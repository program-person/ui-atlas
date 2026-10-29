import { useState } from 'react';
import type { Settings } from '../types.ts';

export function TableTransposeDemo({ settings }: { settings: Settings }) {
const [columns,setColumns]=useState(settings.mode==='columns');const names=['道具A','道具B','道具C'];const counts=[10,20,30];const sizes=[2,5,4];
return <div className="growth2-demo"><h1>表の行と列を入れ替える</h1><button onClick={()=>setColumns(value=>!value)}>行列を入れ替える</button><p role="status">{columns?'道具を列':'道具を行'}</p><table><caption>架空の道具・{columns?'道具を列':'道具を行'}</caption><thead><tr><th scope="col">{columns?'属性':'道具'}</th>{(columns?names:['件数','容量']).map(name=><th key={name} scope="col">{name}</th>)}</tr></thead><tbody>{columns?[['件数',...counts],['容量',...sizes]].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((value,index)=><td key={index}>{value}</td>)}</tr>):names.map((name,index)=><tr key={name}><th scope="row">{name}</th><td>{counts[index]}</td><td>{sizes[index]}</td></tr>)}</tbody></table></div>;
}
