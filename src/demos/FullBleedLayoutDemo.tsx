import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Settings } from '../types.ts';
export function FullBleedLayoutDemo({ settings }: { settings: Settings }) {
  const [accent, setAccent] = useState(false);
  return <div className="expanded-demo final-layout-demo"><span className="demo-kicker">NARROW COPY / WIDE SURFACE</span><h1>本文の幅と帯の幅を分ける</h1><p className="demo-muted">本文は中央の列、図の帯は親枠の端まで広げます。</p><button className="demo-secondary" aria-pressed={accent} onClick={() => setAccent(!accent)}>帯の配色を切り替え</button><article className={`bleed-layout ${settings.span === 'full' ? 'bleed-full' : ''} ${accent ? 'bleed-green' : ''}`} style={{'--copy-width':settings.measure === 'narrow'?'28ch':'46ch'} as CSSProperties}><header><span className="note-label">FICTIONAL ARTICLE</span><h2>余白から始める</h2><p>読みやすい本文幅と、図を見せる幅をそれぞれ決めます。</p></header><figure><div className="bleed-art" aria-hidden="true"><i/><b/><span/></div><figcaption>装飾図：3つの面の組み合わせ</figcaption></figure><section aria-label="記事の本文"><p>図を横へ広げても、本文は同じ中央の列へ戻ります。画面からはみ出す負の余白や固定幅を使わず、親枠の中に収めます。</p></section></article><p role="status">図の帯は{settings.span === 'full'?'枠全体':'本文幅'}、本文の最大幅は{settings.measure === 'narrow'?'28':'46'}ch。配色は{accent?'緑':'青'}です。</p></div>;
}
