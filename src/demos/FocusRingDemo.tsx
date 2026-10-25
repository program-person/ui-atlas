import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
export function FocusRingDemo({ settings }: { settings: Settings }) {
  const [focused, setFocused] = useState(0); const [selected, setSelected] = useState(0);
  const width = Number(settings.width); const offset = settings.placement === 'outer' ? 2 : -width;
  const style = {'--sample-focus-width':`${width}px`,'--sample-focus-offset':`${offset}px`} as CSSProperties;
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">SEE WHERE THE KEYBOARD IS</span><h1>操作位置を見えるようにする</h1><p className="demo-muted">Tabで移動し、EnterかSpaceで選択します。フォーカスと選択は別の状態です。</p>
    <div className="focus-samples" role="group" aria-label="フォーカスのサンプル" style={style} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(0); }}>{[1,2,3].map((index) => <button key={index} aria-pressed={selected === index} onFocus={() => setFocused(index)} onClick={() => setSelected(selected === index ? 0 : index)}>案{index}</button>)}</div>
    <p role="status">フォーカス：{focused ? `案${focused}` : 'なし'} / 選択：{selected ? `案${selected}` : 'なし'}。</p><p className="demo-muted">枠線{width}px・{settings.placement === 'outer' ? '外側へ2px離す' : '内側へ重ねる'}。ポインターとキーボードでは枠線の表示条件が異なる場合があります。</p></div>;
}
