import { useState } from 'react';
import type { Settings } from '../types.ts';
function Content({ settings }: { settings: Settings }) { const [value,setValue]=useState(settings.initial==='sample'?'青い空':''); const count=Array.from(value).length; return <><label>文章<textarea value={value} onChange={e=>setValue(e.target.value)}/></label><button onClick={()=>setValue('青い空')}>例を入力</button><p role="status">{count>20?'上限を超えています':'残り：'+(20-count)+'文字'}</p></>; }
export function CharacterCounterDemo({ settings }: { settings: Settings }) { return <section className={`exinput-demo exinput-${settings.layout}`}><h1>文字数カウンター</h1><Content settings={settings}/></section>; }
