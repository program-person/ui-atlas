import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function ConflictResolutionDemo({ settings }: { settings: Settings }) {
  const [choice,setChoice]=useState(settings.mode==='remote'?'remote':'local');const [resolved,setResolved]=useState(false);useEffect(()=>{setChoice(settings.mode==='remote'?'remote':'local');setResolved(false)},[settings.mode]);return <div className="exflow-demo"><h1>変更の競合解決</h1><p>異なる内容を見比べ、残す変更を選ぶ。</p><p>同じメモに異なる変更があります。</p><fieldset><legend>残す内容</legend><label><input type="radio" name="conflict" checked={choice==='local'} onChange={()=>{setChoice('local');setResolved(false)}}/> 自分：青いメモ</label><label><input type="radio" name="conflict" checked={choice==='remote'} onChange={()=>{setChoice('remote');setResolved(false)}}/> 別の変更：赤いメモ</label></fieldset>{settings.view==='selected'&&<p>選択中：{choice==='local'?'青いメモ':'赤いメモ'}</p>}<button onClick={()=>setResolved(true)}>選択を確定</button>{resolved&&<p role="status">確定：{choice==='local'?'青いメモ':'赤いメモ'}</p>}</div>
}
