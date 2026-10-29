import { useState } from 'react';
import type { Settings } from '../types.ts';

export function AttachmentListDemo({ settings }: { settings: Settings }) {
const samples=[{name:'draft.txt',size:2},{name:'diagram.svg',size:8},{name:'notes.md',size:4}];const [included,setIncluded]=useState<string[]>([]);const limit=Number(settings.mode);const next=samples.find(sample=>!included.includes(sample.name));
return <div className="growth2-demo"><h1>添付候補を一覧で確認する</h1><p>固定の架空サンプルです。実ファイルは読み込みません。</p><button disabled={included.length>=limit||!next} onClick={()=>{if(next&&included.length<limit)setIncluded(current=>[...current,next.name]);}}>サンプルを追加</button><ul>{samples.filter(sample=>included.includes(sample.name)).map(sample=><li key={sample.name}>{sample.name} / {sample.size}KB <button onClick={()=>setIncluded(current=>current.filter(name=>name!==sample.name))}>{sample.name}を対象から外す</button></li>)}</ul><p role="status">添付候補 {included.length}件 / 上限{limit}件 / 合計 {samples.filter(sample=>included.includes(sample.name)).reduce((sum,sample)=>sum+sample.size,0)}KB</p></div>;
}
