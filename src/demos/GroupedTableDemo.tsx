import { useState } from 'react';
import type { Settings } from '../types.ts';

export function GroupedTableDemo({ settings }: { settings: Settings }) {
const [paper,setPaper]=useState(settings.mode==='open');const [pen,setPen]=useState(settings.mode==='open');const [message,setMessage]=useState('分類ごとの内訳を開閉できます');
const groups=[{name:'紙',open:paper,set:setPaper,rows:[['ノート',10],['カード',5]],total:15},{name:'筆記具',open:pen,set:setPen,rows:[['鉛筆',8],['ペン',2]],total:10}];
return <div className="growth2-demo"><h1>分類別にまとまった表</h1><p role="status">{message}</p><table><caption>分類別の架空記録</caption><thead><tr><th scope="col">分類・道具</th><th scope="col">件数</th></tr></thead>{groups.map(group=><tbody key={group.name}><tr><th scope="rowgroup"><button aria-expanded={group.open} onClick={()=>{group.set(value=>!value);setMessage(group.name+'の内訳を'+(group.open?'非表示':'表示'));}}>{group.name}の内訳</button></th><td>小計 {group.total}</td></tr>{group.open&&group.rows.map(row=><tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td></tr>)}</tbody>)}<tfoot><tr><th scope="row">全体</th><td>25</td></tr></tfoot></table></div>;
}
