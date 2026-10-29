import { useState } from 'react';
import type { Settings } from '../types.ts';

export function VariantPickerDemo({ settings }: { settings: Settings }) {
  const [color, setColor] = useState('青');
  const [size, setSize] = useState(settings.mode);
  const [message, setMessage] = useState('色とサイズを選べます');
  function chooseColor(next: string) { setColor(next); if (next === '赤' && size === 'L') { setSize('S'); setMessage('赤はLに対応しないため、Sへ変更しました'); } else setMessage('色を変更しました'); }
  return <div className="cont3-demo"><h1>有効な組み合わせから選ぶ</h1><fieldset><legend>色</legend>{['青', '赤'].map(value => <label key={value}><input type="radio" name="variant-color" checked={color === value} onChange={() => chooseColor(value)} />{value}</label>)}</fieldset><fieldset><legend>サイズ</legend>{['S', 'L'].map(value => <label key={value}><input type="radio" name="variant-size" checked={size === value} disabled={color === '赤' && value === 'L'} onChange={() => { setSize(value); setMessage('サイズを変更しました'); }} />{value}</label>)}</fieldset><p>赤はLサイズに対応しません。Sサイズは両色で選べます。</p><p role="status">選択：{color}・{size} / {message}</p></div>;
}
