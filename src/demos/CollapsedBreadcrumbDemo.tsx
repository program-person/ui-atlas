import { useState } from 'react';
import { useLayoutEffect, useRef } from 'react';
import type { Settings } from '../types.ts';

export function CollapsedBreadcrumbDemo({ settings }: { settings: Settings }) {
const [expanded,setExpanded]=useState(settings.mode==='expanded');const [current,setCurrent]=useState(4);const names=['ホーム','資料','見た目','文字','本文'];
const contentHeading = useRef<HTMLHeadingElement>(null);
const previousLocation = useRef(current);
useLayoutEffect(() => {
  if (previousLocation.current !== current) {
    contentHeading.current?.focus();
    previousLocation.current = current;
  }
}, [current]);
return <div className="growth2-demo"><h1>長いパンくずの中間を開く</h1><nav aria-label="架空の階層"><ol style={{display:'flex',gap:8,flexWrap:'wrap',listStyle:'none',padding:0}}>{names.slice(0,current+1).map((name,index)=>{if(index>0&&index<current&&!expanded)return index===1?<li key="toggle"><button aria-expanded={expanded} onClick={()=>setExpanded(true)}>中間の階層を表示</button></li>:null;return <li key={name}>{index===current?<span aria-current="page">{name}</span>:<button onClick={()=>setCurrent(index)}>{name}</button>}</li>;})}</ol></nav>{expanded&&current>1&&<button aria-expanded={expanded} onClick={()=>setExpanded(false)}>中間を折りたたむ</button>}<h2 ref={contentHeading} tabIndex={-1}>{names[current]}の内容</h2><p role="status">中間階層：{expanded?'表示中':'省略中'} / 現在地：{names[current]}</p><button onClick={()=>setCurrent(4)}>本文へ戻る</button></div>;
}
