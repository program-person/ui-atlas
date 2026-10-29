import { useState } from 'react';
import type { Settings } from '../types.ts';

export function FloatingLabelDemo({ settings }: { settings: Settings }) {
const [value,setValue]=useState(settings.mode==='sample'?'架空のメモ':'');
return <div className="growth2-demo"><h1>入力後も残る浮動ラベル</h1><div className="g2-floating-field"><input id="floating-note" value={value} placeholder=" " onChange={event=>setValue(event.target.value)}/><label htmlFor="floating-note">架空のメモ</label></div><button onClick={()=>setValue('架空のメモ')}>例を入れる</button><p role="status">{value?'入力済み：'+value:'空欄'}</p></div>;
}
