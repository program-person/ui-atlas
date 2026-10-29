import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ThreadedCommentsDemo({ settings }: { settings: Settings }) {
const [open,setOpen]=useState(false);
return <div className="growth2-demo"><h1>返信を階層で読む</h1><ul style={{paddingInlineStart:0,listStyle:'none'}}><li className="g2-panel"><h2>コメント1</h2><p>図の説明を先に置く案です。</p><button aria-expanded={open} aria-controls="thread-replies" onClick={()=>setOpen(value=>!value)}>返信2件</button><ul id="thread-replies" hidden={!open} style={{paddingInlineStart:settings.mode==='indent'?16:0,listStyle:'none'}}><li><h3>返信1</h3><p>コメント1への返信：本文の前に置くと探しやすそうです。</p></li><li><h3>返信2</h3><p>コメント1への返信：狭い画面の並びも確認します。</p></li></ul></li></ul><p role="status">{open?'返信を表示中':'返信は折りたたみ中'}</p></div>;
}
