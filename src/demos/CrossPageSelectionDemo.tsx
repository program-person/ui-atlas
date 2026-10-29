import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CrossPageSelectionDemo({ settings }: { settings: Settings }) {
const [page,setPage]=useState(Number(settings.mode));const [selected,setSelected]=useState<number[]>([]);const visible=[page*2+1,page*2+2];
return <div className="growth2-demo"><h1>ページをまたいで選ぶ</h1>{visible.map(id=><label key={id}><input type="checkbox" checked={selected.includes(id)} onChange={event=>setSelected(current=>event.target.checked?[...current,id]:current.filter(value=>value!==id))}/>メモ{id}</label>)}<div className="g2-actions"><button onClick={()=>setSelected(current=>Array.from(new Set([...current,...visible])))}>今の2件を選ぶ</button><button onClick={()=>setSelected([1,2,3,4,5,6])}>全6件を選ぶ</button><button onClick={()=>setSelected([])}>全解除</button></div><div className="g2-actions"><button disabled={page===0} onClick={()=>setPage(value=>value-1)}>前へ</button><span>{page+1} / 3</span><button disabled={page===2} onClick={()=>setPage(value=>value+1)}>次へ</button></div><p role="status">全体の選択 {selected.length}件 / このページ {visible.filter(id=>selected.includes(id)).length}件</p></div>;
}
