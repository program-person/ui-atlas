import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const colors = { vivid: ['#235de5', '#176c52', '#7544af'], pastel: ['#c9d9ff', '#bde6cf', '#dcc8f4'] };
const names = ['青', '緑', '紫'];
export function ColorPickerDemo({ settings }: { settings: Settings }) {
  const palette = settings.palette === 'pastel' ? colors.pastel : colors.vivid;
  const [color, setColor] = useState(palette[settings.initial === 'green' ? 1 : 0]);
  const inputId = useId();
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">PICK AN ACCENT</span><h1>アクセント色を試す</h1><p className="demo-muted">色面と枠線に反映し、文字の背景は白に保ちます。</p>
    <label className="extension-field" htmlFor={inputId}>アクセント色<input id={inputId} className="color-well" type="color" value={color} onInput={(event) => { if (/^#[0-9a-f]{6}$/i.test(event.currentTarget.value)) setColor(event.currentTarget.value); }} onChange={(event) => { if (/^#[0-9a-f]{6}$/i.test(event.target.value)) setColor(event.target.value); }} /></label>
    <div className="extension-actions">{palette.map((value, index) => <button className="demo-secondary color-choice" key={value} aria-pressed={color === value} onClick={() => setColor(value)}><i aria-hidden="true" style={{ background: value }} />{names[index]}を選ぶ</button>)}</div>
    <section className="extension-panel" style={{ borderLeft: `6px solid ${color}` }}><div className="accent-sample" aria-hidden="true" style={{ background: color }} /><h2>配色のプレビュー</h2><p>色の値：<code>{color}</code></p></section>
    <p role="status">選択色：{color}</p></div>;
}
