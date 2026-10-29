import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function SelectionLimitDemo({ settings }: { settings: Settings }) {
  const [selected,setSelected]=useState<string[]>([]);const [message,setMessage]=useState('');const max=settings.mode==='three'?3:2;const toggle=(item:string)=>{if(selected.includes(item)){setSelected(selected.filter(value=>value!==item));setMessage('');return}if(selected.length>=max){setMessage('上限に達しました');return}setSelected([...selected,item]);setMessage('')};return <div className="exflow-demo"><h1>選択数の上限</h1><p>選択できる項目数を制限し、残りを示す。</p><fieldset><legend>項目を選択</legend>{['朝','昼','夜'].map(item=><label key={item}><input type="checkbox" checked={selected.includes(item)} disabled={settings.limitBehavior==='disable'&&selected.length>=max&&!selected.includes(item)} onChange={()=>toggle(item)}/>{item}</label>)}</fieldset><p role="status">{selected.length} / {max} 件 {message}</p></div>
}
