import { useState } from 'react';
import type { Settings } from '../types.ts';

export function PermissionMatrixDemo({ settings }: { settings: Settings }) {
const [values,setValues]=useState([[false,false],[false,false]]);const dependent=settings.mode==='dependent';
return <div className="growth2-demo"><h1>権限を表で選ぶ</h1><p>{dependent?'編集には閲覧が必要です。編集を外しても閲覧は残ります。':'閲覧と編集は独立した選択です。'}</p><table><caption>架空の権限設定</caption><thead><tr><th scope="col">対象</th><th scope="col">閲覧</th><th scope="col">編集</th></tr></thead><tbody>{['ノート','図'].map((name,row)=><tr key={name}><th scope="row">{name}</th>{[0,1].map(column=><td key={column}><label><input type="checkbox" aria-label={name+'を'+(column===0?'閲覧':'編集')} checked={values[row][column]} disabled={dependent&&column===0&&values[row][1]} onChange={event=>setValues(current=>current.map((pair,index)=>index===row?(column===1&&event.target.checked&&dependent?[true,true]:pair.map((checked,cell)=>cell===column?event.target.checked:checked)):pair))}/>{values[row][column]?'あり':'なし'}</label></td>)}</tr>)}</tbody></table><div role="status">{values.map((pair,index)=><p key={index}>{['ノート','図'][index]}：{pair.map((checked,column)=>checked?['閲覧','編集'][column]:'').filter(Boolean).join('・')||'なし'}</p>)}</div></div>;
}
