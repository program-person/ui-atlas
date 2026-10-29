import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CrossFieldValidationDemo({ settings }: { settings: Settings }) {
const [minimum,setMinimum]=useState(settings.mode==='invalid'?'8':'2');const [maximum,setMaximum]=useState(settings.mode==='invalid'?'2':'8');const validNumber=(value:string)=>/^\d{1,3}$/.test(value)&&Number(value)<=100;const error=!validNumber(minimum)||!validNumber(maximum)?'両方に0〜100の整数を入力してください':Number(minimum)>Number(maximum)?'最小は最大以下にしてください':'';
return <div className="growth2-demo"><h1>入力欄どうしの整合性を確かめる</h1><label>最小件数<input inputMode="numeric" value={minimum} aria-invalid={Boolean(error)} aria-describedby="range-message" onChange={event=>setMinimum(event.target.value)}/></label><label>最大件数<input inputMode="numeric" value={maximum} aria-invalid={Boolean(error)} aria-describedby="range-message" onChange={event=>setMaximum(event.target.value)}/></label><button onClick={()=>{setMinimum(maximum);setMaximum(minimum);}}>範囲を反転する</button><p id="range-message" role={error?'alert':'status'}>{error||minimum+'〜'+maximum+'件の有効な範囲'}</p></div>;
}
