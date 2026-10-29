import { useState } from 'react';
import type { Settings } from '../types.ts';

export function OrganizationChartDemo({ settings }: { settings: Settings }) {
const [open,setOpen]=useState(settings.mode==='open');
return <div className="growth2-demo"><h1>階層の構成図</h1><button aria-expanded={open} onClick={()=>setOpen(value=>!value)}>下位の区画を切り替える</button><p role="status">下位：{open?'表示中':'省略中'}</p><svg viewBox="0 0 360 220" style={{width:'100%'}} aria-hidden="true"><path d="M180 40V65H90V90M180 65H270V90" className="g2-axis"/>{open&&<path d="M90 120V145H45V170M90 145H135V170" className="g2-axis"/>}{[{x:130,y:5,name:'統括'},{x:40,y:90,name:'制作'},{x:220,y:90,name:'確認'},...(open?[{x:5,y:170,name:'文章'},{x:105,y:170,name:'図'}]:[])].map(node=><g key={node.name}><rect x={node.x} y={node.y} width={node.name==='統括'?100:80} height="35" fill="#d7e6df" stroke="#52685c"/><text x={node.x+(node.name==='統括'?50:40)} y={node.y+23} textAnchor="middle">{node.name}</text></g>)}</svg><ul><li>統括<ul><li>制作{open&&<ul><li>文章</li><li>図</li></ul>}</li><li>確認</li></ul></li></ul></div>;
}
