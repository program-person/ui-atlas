import { useState } from 'react';
import type { Settings } from '../types.ts';

export function ShortcutHintsDemo({ settings }: { settings: Settings }) {
const [bold,setBold]=useState(false);
return <div className="growth2-demo"><h1>キー操作を画面に示す</h1><div className="g2-panel" role="region" aria-label="ショートカット操作の枠" tabIndex={0} onKeyDown={event=>{const target=event.target as HTMLElement;if(event.nativeEvent.isComposing||event.repeat||target.closest('input,textarea,select,[contenteditable="true"]'))return;if(event.altKey&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&event.key.toLowerCase()===settings.mode){event.preventDefault();setBold(value=>!value);}}}><p><kbd>Alt</kbd> + <kbd>{settings.mode.toUpperCase()}</kbd></p><button aria-pressed={bold} onClick={()=>setBold(value=>!value)}>書式を切り替える</button><p role="status">書式：{bold?'太字':'標準'}</p><p style={{fontWeight:bold?700:400}}>この枠の中だけで操作します。</p><label>入力を試す<input placeholder="架空の短いメモ"/></label></div></div>;
}
