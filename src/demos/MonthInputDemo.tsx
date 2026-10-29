import { useState } from 'react';
import type { Settings } from '../types.ts';

export function MonthInputDemo({ settings }: { settings: Settings }) {
const [value,setValue]=useState('2026-10');const minimum=settings.mode==='autumn'?'2026-09':'2026-01';const maximum=settings.mode==='autumn'?'2026-11':'2026-12';const valid=/^2026-(0[1-9]|1[0-2])$/.test(value)&&value>=minimum&&value<=maximum;
return <div className="growth2-demo"><h1>年月だけを入力する</h1><label>対象の年月<input type="month" min={minimum} max={maximum} value={value} aria-describedby="month-message" aria-invalid={!valid} onChange={event=>setValue(event.target.value)}/></label><p>許可範囲：{minimum}〜{maximum}</p><button onClick={()=>setValue('2026-11')}>11月の例を入れる</button><p id="month-message" role={valid?'status':'alert'}>{valid?'選択：'+value:'許可範囲内の年月を入力してください'}</p></div>;
}
