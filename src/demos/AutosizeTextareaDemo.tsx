import { useState } from 'react';
import type { Settings } from '../types.ts';
import {useLayoutEffect,useRef} from 'react';
export function AutosizeTextareaDemo({ settings }: { settings: Settings }) {
const [value,setValue]=useState('短いメモ');const textarea=useRef<HTMLTextAreaElement>(null);const container=useRef<HTMLDivElement>(null);const maximum=Number(settings.mode);const fit=()=>{const input=textarea.current;if(!input)return;input.style.height='auto';input.style.height=Math.min(maximum,Math.max(64,input.scrollHeight+2))+'px';};useLayoutEffect(fit,[value,maximum]);useLayoutEffect(()=>{const observer=new ResizeObserver(fit);if(container.current)observer.observe(container.current);return()=>observer.disconnect();},[]);
return <div className="growth2-demo"><h1>文章量に合わせて伸びる入力欄</h1><div ref={container}><label htmlFor="autosize-note">架空のメモ</label><textarea ref={textarea} id="autosize-note" value={value} style={{width:'100%',boxSizing:'border-box',minHeight:64,maxHeight:maximum,overflowY:'auto',resize:'none'}} onChange={event=>setValue(event.target.value)}/></div><div className="g2-actions"><button onClick={()=>setValue(Array.from({length:12},(_,index)=>'観察したこと '+(index+1)).join('\n'))}>長い例を入れる</button><button onClick={()=>setValue('短いメモ')}>短い例に戻す</button></div><p role="status">行数 {value.split('\n').length} / 上限 {maximum}px</p></div>;
}
