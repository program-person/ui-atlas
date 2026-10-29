import { useState } from 'react';
import type { Settings } from '../types.ts';
import { DataFigure } from './DataFigure.tsx';
export function PastePreviewDemo({ settings }: { settings: Settings }) {
const separator=settings.mode==='comma'?',':'\t';const [source,setSource]=useState('ノート'+separator+'2\nカード'+separator+'5');const [confirmed,setConfirmed]=useState(false);const rows=source.trim()?source.trim().split(/\r?\n/).map(row=>row.split(separator).map(cell=>cell.trim())):[];const error=!rows.length?'内容を入力してください':rows.length>5?'5行以内にしてください':rows.some(row=>row.length!==2||!row[0]||!/^\d{1,3}$/.test(row[1])||Number(row[1])>100)?'各行を道具名と0〜100の整数の2列にしてください':'';
return <div className="growth2-demo"><h1>取り込む前に表を確認する</h1><label>架空の2列表現<textarea rows={5} value={source} aria-invalid={Boolean(error)} aria-describedby="paste-message" onChange={event=>{setSource(event.target.value);setConfirmed(false);}}/></label><p id="paste-message" role={error?'alert':'status'}>{error||'プレビュー '+rows.length+'行'}</p>{!error&&<DataFigure caption="確定前の内容" headers={['道具','件数']} rows={rows}><span/></DataFigure>}<button disabled={Boolean(error)||confirmed} onClick={()=>setConfirmed(true)}>内容を確定する</button><p role="status">{confirmed?rows.length+'行を確定しました':'未確定・外部への保存は行いません'}</p></div>;
}
