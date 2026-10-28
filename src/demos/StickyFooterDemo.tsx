import { useState } from 'react';
import type { Settings } from '../types.ts';
const LONG_PARAGRAPHS = 5;
export function StickyFooterDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(settings.initial === 'long');
  return <div className="expanded-demo composition-demo"><span className="demo-kicker">FOOTER AFTER THE CONTENT</span><h1>短い本文でも下端を揃える</h1><p className="demo-muted">サンプルのページ枠の最小高さを保ちます。長い本文ではフッターが本文の後ろへ押し下がります。</p><button className="demo-secondary" onClick={() => setLong(!long)}>{long ? '短い本文を表示' : '長い本文を表示'}</button>
    <div className={`sticky-footer-page ${settings.height === 'tall' ? 'footer-tall' : ''}`}><header>架空のメモページ</header><section aria-label="サンプルの本文"><h2>配置を見直す</h2>{Array.from({length:long ? LONG_PARAGRAPHS : 1},(_,index) => <p key={index}>メモ{index+1}：見出しと本文、最後の案内を順に読みます。本文が増えても案内が文章に重ならないようにします。</p>)}</section><footer>ページの終わり / 本文の後ろに配置</footer></div><p role="status">{long ? '長い本文' : '短い本文'}を表示中。枠の最小高さは{settings.height === 'tall' ? 420 : 300}pxです。</p></div>;
}
