import { useState } from 'react';
import type { Settings } from '../types.ts';
export function TextWrapDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(false);
  return <div className="expanded-demo exlayout"><h1>見出しの折り返し</h1><button aria-pressed={long} onClick={() => setLong(!long)}>長い見出しに切り替え</button><div className="exlayout-measure" style={{ maxInlineSize: settings.width === 'narrow' ? '22ch' : '34ch' }}><h2 style={{ textWrap: settings.wrap === 'balance' ? 'balance' : 'wrap' }}>{long ? '観察の記録を並べながら次の画面をじっくり考える' : '余白から画面の使い方を考える'}</h2><p>本文の省略は行いません。表示幅を変えて行末を比べます。</p></div><p role="status">見出し：{long ? '長文' : '短文'}</p></div>;
}
