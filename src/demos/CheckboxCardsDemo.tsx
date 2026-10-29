import { useState } from 'react';
import type { Settings } from '../types.ts';
function Content({ settings }: { settings: Settings }) { const [selected,setSelected]=useState<string[]>(settings.initial==='sample'?['赤']:[]); return <><fieldset><legend>選択肢</legend>{['青','赤'].map(item=><label className="exinput-card" key={item}><input type="checkbox" checked={selected.includes(item)} onChange={e=>setSelected(e.target.checked?[...selected,item]:selected.filter(value=>value!==item))}/>{item}</label>)}</fieldset><p role="status">{selected.length?'選択中：'+selected.join('、'):'未選択'}</p></>; }
export function CheckboxCardsDemo({ settings }: { settings: Settings }) { return <section className={`exinput-demo exinput-${settings.layout}`}><h1>チェックボックスカード</h1><Content settings={settings}/></section>; }
