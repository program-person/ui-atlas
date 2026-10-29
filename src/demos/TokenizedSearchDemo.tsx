import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const items=['青いノート','赤いペン','青いペン'];
export function TokenizedSearchDemo({settings}:{settings:Settings}) {
 const input=useRef<HTMLInputElement>(null);
 const [value,setValue]=useState(settings.initial==='sample'?'青':''); const [tokens,setTokens]=useState<string[]>([]); const [notice,setNotice]=useState(''); const matches=items.filter(item=>tokens.every(token=>item.includes(token)));
 function add(){const token=value.trim();if(!token){setNotice('検索語を入力してください');return;}if(tokens.includes(token)){setNotice('同じ条件は追加できません');return;}setTokens([...tokens,token]);setValue('');setNotice('');}
 return <section className={`exinput-demo exinput-${settings.layout}`}><h1>検索語のトークン化</h1><form onSubmit={e=>{e.preventDefault();add();}}><label>検索語<input ref={input} value={value} onChange={e=>setValue(e.target.value)}/></label><button type="submit">条件を追加</button></form><p role="status">{notice}</p><ul aria-label="検索条件">{tokens.map(token=><li key={token}>条件：{token} <button aria-label={token+'を外す'} onClick={()=>{setTokens(tokens.filter(item=>item!==token));setNotice('');input.current?.focus();}}>外す</button></li>)}</ul><p>検索結果：{matches.length}件</p><ul aria-label="検索結果">{matches.map(item=><li key={item}>{item}</li>)}</ul></section>;
}
