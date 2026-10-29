import { useState } from 'react';
import type { Settings } from '../types.ts';
const items=[{name:'青いノート',color:'青',kind:'ノート'},{name:'赤いペン',color:'赤',kind:'ペン'},{name:'青いペン',color:'青',kind:'ペン'}];
export function QueryBuilderDemo({settings}:{settings:Settings}) {
 const [color,setColor]=useState(settings.initial==='sample'?'青':'赤'); const [kind,setKind]=useState('ノート'); const [operator,setOperator]=useState('AND'); const [result,setResult]=useState<string[]|null>(null);
 function apply(){setResult(items.filter(item=>operator==='AND'?item.color===color&&item.kind===kind:item.color===color||item.kind===kind).map(item=>item.name));}
 return <section className={`exinput-demo exinput-${settings.layout}`}><h1>検索条件ビルダー</h1><label>色<select value={color} onChange={e=>setColor(e.target.value)}><option>青</option><option>赤</option></select></label><label>結合方法<select value={operator} onChange={e=>setOperator(e.target.value)}><option>AND</option><option>OR</option></select></label><label>種類<select value={kind} onChange={e=>setKind(e.target.value)}><option>ノート</option><option>ペン</option></select></label><button onClick={apply}>条件を適用</button>{result&&<div role="status"><p>検索結果：{result.length}件</p><ul>{result.map(item=><li key={item}>{item}</li>)}</ul></div>}</section>;
}
