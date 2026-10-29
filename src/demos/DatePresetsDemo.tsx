import { useState } from 'react';
import type { Settings } from '../types.ts';
function Content({ settings }: { settings: Settings }) { const [range,setRange]=useState(settings.initial==='sample'?'2026-10-23 ～ 2026-10-29':'未選択'); return <><p>基準日：2026-10-29</p><button onClick={()=>setRange('2026-10-01 ～ 2026-10-31')}>今月</button><button onClick={()=>setRange('2026-10-23 ～ 2026-10-29')}>過去7日</button><p role="status">{range}</p></>; }
export function DatePresetsDemo({ settings }: { settings: Settings }) { return <section className={`exinput-demo exinput-${settings.layout}`}><h1>日付のプリセット</h1><Content settings={settings}/></section>; }
