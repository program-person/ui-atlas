import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
const MIN_BODY_SIZE = 14; const MAX_BODY_SIZE = 20; const SIZE_STEP = 2;
export function TypographyScaleDemo({ settings }: { settings: Settings }) {
  const [base, setBase] = useState(Number(settings.initial)); const ratio = Number(settings.ratio); const inputId = useId();
  const titleSize = Math.round(base * ratio * ratio * 10) / 10; const sectionSize = Math.round(base * ratio * 10) / 10;
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">TYPE WITH A HIERARCHY</span><h1>文字の大きさに段階をつける</h1><p className="demo-muted">本文サイズを変えて、見出しとの関係を比較します。</p>
    <label className="continuation-field" htmlFor={inputId}>本文の文字サイズ：{base}px<input id={inputId} type="range" min={MIN_BODY_SIZE} max={MAX_BODY_SIZE} step={SIZE_STEP} value={base} aria-valuetext={`${base}px`} onChange={(event) => setBase(Number(event.target.value))} /></label>
    <article className="continuation-panel type-sample" style={{fontSize:base}}><span className="note-label">DESIGN NOTE</span><h2 style={{fontSize:titleSize}}>余白から考える</h2><p>情報を近づけたり離したりして、読み進める順番を確かめます。</p><h3 style={{fontSize:sectionSize}}>次の操作を近くへ</h3><p>同じ内容でも、文字の大きさで強調の差が変わります。</p></article><p role="status">本文{base}px / 小見出し{sectionSize}px / 大見出し{titleSize}px。倍率{ratio}。</p></div>;
}
