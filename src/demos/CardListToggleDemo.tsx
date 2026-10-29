import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CardListToggleDemo({ settings }: { settings: Settings }) {
const [grid,setGrid]=useState(settings.mode==='grid');const [selected,setSelected]=useState('余白');const names=['余白','配色','文章'];
return <div className="growth2-demo"><h1>カードとリストを切り替える</h1><button onClick={()=>setGrid(value=>!value)}>表示形式を切り替える</button><p role="status">形式：{grid?'カード':'リスト'} / 選択：{selected}</p><ul className={grid?'g2-view-grid':'g2-view-list'}>{names.map((name,index)=><li key={name} className="g2-panel"><div><h2>{name}</h2><p>記録{index+1}・見た目の観察</p></div><button aria-pressed={selected===name} onClick={()=>setSelected(name)}>{name}を選ぶ</button></li>)}</ul></div>;
}
