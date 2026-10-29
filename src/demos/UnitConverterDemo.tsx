import { useState } from 'react';
import type { Settings } from '../types.ts';
function Content({ settings }: { settings: Settings }) { const [value,setValue]=useState(settings.initial==='sample'?'1':''); const [result,setResult]=useState(''); return <><label>長さ（m）<input type="number" value={value} onChange={e=>{setValue(e.target.value);setResult('');}}/></label><button onClick={()=>setResult(value!==''&&Number.isFinite(Number(value)*100)?Number(value)*100+' cm':'換算できる数値を入力してください')}>換算する</button><p role="status">{result}</p></>; }
export function UnitConverterDemo({ settings }: { settings: Settings }) { return <section className={`exinput-demo exinput-${settings.layout}`}><h1>単位変換</h1><Content settings={settings}/></section>; }
