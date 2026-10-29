import { useState } from 'react';
import type { Settings } from '../types.ts';
function Content({ settings }: { settings: Settings }) { const [value,setValue]=useState(settings.initial==='sample'?'青':''); const [selected,setSelected]=useState(''); return <><label>項目<input value={value} onChange={e=>{setValue(e.target.value);setSelected('');}}/></label><p>候補</p>{['青いノート','赤いペン'].filter(item=>item.includes(value)).map(item=><button key={item} onClick={()=>{setValue(item);setSelected(item);}}>{item}</button>)}<p role="status">{selected&&'選択：'+selected}</p></>; }
export function InputSuggestionsDemo({ settings }: { settings: Settings }) { return <section className={`exinput-demo exinput-${settings.layout}`}><h1>入力候補</h1><Content settings={settings}/></section>; }
