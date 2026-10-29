import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ResponsiveTableDemo({ settings }: { settings: Settings }) {
const [wide,setWide]=useState(false);const rows=[['道具A','紙','10件','2点'],['道具B','筆記具','20件','5点'],['道具C','紙','30件','4点']];
return <div className="growth2-demo"><h1>狭い枠で表の表示を変える</h1><button onClick={()=>setWide(value=>!value)}>枠幅を切り替える</button><p role="status">{wide?'広い枠':'狭い枠'}</p><div style={{width:wide?560:320,maxWidth:'100%'}}>{settings.mode==='stack'?rows.map(row=><article className="g2-panel" key={row[0]}><h2>{row[0]}</h2><dl>{row.slice(1).map((value,index)=><div key={index}><dt>{['分類','記録数','容量'][index]}</dt><dd>{value}</dd></div>)}</dl></article>):<div className="g2-table-scroll" role="region" aria-label="道具の表・横スクロール" tabIndex={0}><table style={{minWidth:520}}><caption>架空の道具一覧</caption><thead><tr>{['道具','分類','記録数','容量'].map(label=><th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((value,index)=><td key={index}>{value}</td>)}</tr>)}</tbody></table></div>}</div></div>;
}
