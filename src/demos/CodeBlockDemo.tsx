import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CodeBlockDemo({ settings }: { settings: Settings }) {
const [highlight,setHighlight]=useState(false);const lines=['const notes = [','  { title: "余白の観察", description: "本文と図の間に、読み進めるための空間を残す長めの説明です。" },','];'];
return <div className="growth2-demo"><h1>コードの表示と折り返し</h1><button aria-pressed={highlight} onClick={()=>setHighlight(value=>!value)}>2行目の強調を切り替える</button><p role="status">強調：{highlight?'2行目':'なし'}</p><pre tabIndex={0} aria-label="実行しないサンプルコード" className="g2-panel" style={{whiteSpace:settings.mode==='wrap'?'pre-wrap':'pre',overflowX:'auto',overflowWrap:settings.mode==='wrap'?'anywhere':'normal'}}><code>{lines.map((line,index)=><span key={index} style={{display:'block',background:highlight&&index===1?'#e0edd7':undefined}}>{line}</span>)}</code></pre></div>;
}
