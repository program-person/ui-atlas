import { useState } from 'react';
import type { Settings } from '../types.ts';

export function SettingsDependencyDemo({ settings }: { settings: Settings }) {
const [enabled,setEnabled]=useState(settings.mode==='on');const [interval,setIntervalValue]=useState('30');
return <div className="growth2-demo"><h1>関連する設定の有効・無効</h1><button aria-pressed={enabled} onClick={()=>setEnabled(value=>!value)}>通知を有効にする</button><p id="dependency-help">{enabled?'通知間隔を変更できます。':'通知が無効のため、間隔は変更できません。値は保持します。'}</p><fieldset disabled={!enabled} aria-describedby="dependency-help"><legend>通知の詳細</legend><label>間隔<select value={interval} onChange={event=>setIntervalValue(event.target.value)}>{['10','30','60'].map(value=><option key={value} value={value}>{value}分</option>)}</select></label></fieldset><p role="status">通知：{enabled?'有効':'無効'} / 保持中：{interval}分</p></div>;
}
