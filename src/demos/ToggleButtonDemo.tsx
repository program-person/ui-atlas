import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ToggleButtonDemo({ settings }: { settings: Settings }) {
const [bold,setBold]=useState(settings.mode==='bold');
return <div className="growth2-demo"><h1>押した状態を保つボタン</h1><button aria-pressed={bold} onClick={()=>setBold(value=>!value)}>太字</button><p role="status">太字：{bold?'オン':'オフ'}</p><p className="g2-panel" style={{fontWeight:bold?700:400}}>余白と文字で、読みやすさを整える。</p></div>;
}
