import { useId, useLayoutEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

function digits(value: string) { return value.normalize('NFKC').replace(/[^0-9]/g, '').slice(0, 6); }
function format(value: string) { const clean = digits(value); return clean.length > 3 ? `${clean.slice(0, 3)}-${clean.slice(3)}` : clean; }
export function InputMaskDemo({ settings }: { settings: Settings }) {
  const id = useId(); const input = useRef<HTMLInputElement>(null); const composing = useRef(false); const selection = useRef<[number, number] | null>(null);
  const [value, setValue] = useState(settings.initial === 'sample' ? '123-456' : '');
  useLayoutEffect(() => { if (selection.current && input.current) { input.current.setSelectionRange(...selection.current); selection.current = null; } }, [value]);
  function update(element: HTMLInputElement) {
    const raw = element.value; const start = digits(raw.slice(0, element.selectionStart ?? raw.length)).length; const end = digits(raw.slice(0, element.selectionEnd ?? raw.length)).length;
    const next = format(raw); const position = (count: number) => Math.min(count + (count > 3 ? 1 : 0), next.length);
    selection.current = [position(start), position(end)]; setValue(next);
    if (next === value) { element.setSelectionRange(...selection.current); selection.current = null; }
  }
  return <div className="expanded-demo final-input-demo"><span className="demo-kicker">FORMAT WHILE TYPING</span><h1>架空の整理コード</h1><p>6桁の数字を3桁ずつ区切ります。実際の番号は入力しないでください。</p>
    <label htmlFor={id}>整理コード<input ref={input} id={id} type="text" inputMode="numeric" value={value} placeholder={settings.guide === 'example' ? '123-456' : '000-000'} aria-describedby={`${id}-help`} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={(event) => { composing.current = false; update(event.currentTarget); }} onChange={(event) => { if (composing.current) setValue(event.target.value); else update(event.currentTarget); }} /></label>
    <p id={`${id}-help`}>全角数字も入力できます。6桁まで、数字以外は除きます。選択範囲は整形後の数字の位置に合わせます。</p><p role="status">{digits(value).length === 6 ? '入力完了' : `入力途中：${digits(value).length} / 6桁`}</p></div>;
}
