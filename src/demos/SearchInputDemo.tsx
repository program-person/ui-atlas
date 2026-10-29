import { useState } from 'react';
import type { Settings } from '../types.ts';
const items = ['青いノート', '赤いペン', '青いペン'];
export function SearchInputDemo({ settings }: { settings: Settings }) {
 const [value,setValue]=useState(settings.initial==='sample'?'ノート':''); const [query,setQuery]=useState<string|null>(null); const matches=query?items.filter(item=>item.includes(query)):[];
 return <section className={`exinput-demo exinput-${settings.layout}`}><h1>検索入力</h1><form onSubmit={e=>{e.preventDefault();setQuery(value.trim());}}><label>検索語<input type="search" value={value} onChange={e=>setValue(e.target.value)}/></label><button type="submit">検索する</button></form>{query!==null&&<div role="status">{query?<><p>検索結果：{matches.length}件</p><ul>{matches.map(item=><li key={item}>{item}</li>)}</ul></>:<p>検索語を入力してください</p>}</div>}</section>;
}
