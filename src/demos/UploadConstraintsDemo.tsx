import { useState } from 'react';
import type { Settings } from '../types.ts';

export function UploadConstraintsDemo({ settings }: { settings: Settings }) {
const [sample,setSample]=useState<{name:string;size:number}|null>(null);const limit=Number(settings.mode);const typeOK=sample?/\.(txt|md)$/.test(sample.name):false;const sizeOK=sample?sample.size<=limit:false;
return <div className="growth2-demo"><h1>取り込み条件を先に示す</h1><p>固定サンプルだけで試せます。形式：txt・md / 容量：{limit}KB以下</p><div className="g2-actions">{[{name:'note.txt',size:2},{name:'draft.md',size:8},{name:'diagram.svg',size:3}].map(value=><button key={value.name} onClick={()=>setSample(value)}>{value.name}の例</button>)}</div>{sample?<div role="status"><p>{sample.name}・{sample.size}KB</p><p>{typeOK?'形式は対象内':'この形式は対象外'}</p><p>{sizeOK?'容量は上限内':'容量が上限を超えています'}</p><strong>{typeOK&&sizeOK?'候補にできます':'候補にできません'}</strong></div>:<p role="status">未選択</p>}</div>;
}
