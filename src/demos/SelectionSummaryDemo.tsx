import { useState } from 'react';
import type { Settings } from '../types.ts';

export function SelectionSummaryDemo({ settings }: { settings: Settings }) {
const [selected,setSelected]=useState<number[]>([]);const numbers=settings.mode==='count'?[2,3,4]:[10,20,30];const unit=settings.mode==='count'?'件':'点';const total=selected.reduce((sum,index)=>sum+numbers[index],0);
return <div className="growth2-demo"><h1>選んだ項目の合計</h1>{['ノート','カード','鉛筆'].map((name,index)=><label key={name}><input type="checkbox" checked={selected.includes(index)} onChange={event=>setSelected(current=>event.target.checked?[...current,index]:current.filter(value=>value!==index))}/>{name}・{numbers[index]}{unit}</label>)}<div className="g2-actions"><button onClick={()=>setSelected([0,1])}>先頭2件を選ぶ</button><button onClick={()=>setSelected([])}>全解除</button></div><output role="status">選択 {selected.length}件 / 合計 {total}{unit}</output></div>;
}
