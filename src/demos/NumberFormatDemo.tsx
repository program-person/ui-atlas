import { useState } from 'react';
import type { Settings } from '../types.ts';

export function NumberFormatDemo({ settings }: { settings: Settings }) {
const [value,setValue]=useState('1234.567');const valid=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)&&Number.isFinite(Number(value));const formatted=valid?new Intl.NumberFormat('ja-JP',settings.mode==='percent'?{style:'percent',maximumFractionDigits:1}:{maximumFractionDigits:2}).format(Number(value)):'';
return <div className="growth2-demo"><h1>数値を表示用に整える</h1><label>半角の数値<input inputMode="decimal" value={value} onChange={event=>setValue(event.target.value)} aria-invalid={!valid} aria-describedby="number-format-message"/></label><button onClick={()=>setValue('0.125')}>比率の例を入れる</button><p role="status">入力値：{value||'空欄'}</p><p id="number-format-message" role={valid?'status':'alert'}>{valid?'表示：'+formatted:'半角の十進数を入力してください（桁区切りなし）'}</p></div>;
}
