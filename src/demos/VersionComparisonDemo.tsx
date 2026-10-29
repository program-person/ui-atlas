import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expansion-flow-demos.css';

export function VersionComparisonDemo({ settings }: { settings: Settings }) {
  const [show,setShow]=useState(false);return <div className="exflow-demo"><h1>版の比較</h1><p>前後の版を比較し、変更箇所を確認する。</p><button onClick={()=>setShow(!show)}>{show?'比較を閉じる':'変更を比較'}</button>{show&&<div className={settings.view==='side'?'exflow-compare':''}><section><h2>{settings.mode==='first'?'初版':'前の版'}</h2><p>{settings.mode==='first'?'草案':'青いノート'}</p></section><section><h2>現在の版</h2><p>赤いノート</p></section><p>{settings.mode==='first'?'変更：草案から赤いノートに変更':'変更：色を赤に変更'}</p></div>}</div>
}
