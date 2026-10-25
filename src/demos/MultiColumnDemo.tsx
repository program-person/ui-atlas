import { useState } from 'react';
import type { Settings } from '../types.ts';
const paragraphs = ['画面を考えるときは、まず読む順番を確かめます。見出しと本文を近くへ置き、関係がある情報をまとめます。','文章の段組みでは、左の段を上から下へ読み、その後に右の段へ進みます。カードを横一列に並べる読み方とは異なります。','段を細くしすぎると折り返しが増えます。画面が狭いときは段数を減らし、読みやすい行の長さを確保します。','区切り線は段の境界を示す補助です。線をなくしても、余白で内容のまとまりを読めるようにします。','文章を追加すると、各段へ入る範囲が変わります。同じ文章を読む途中で大きく配置を変えないことも考えます。','補足の量が多いときは、その内容が今すぐ必要かを見直します。段組みだけで情報量の問題を解決しようとしません。','重要な操作や入力欄は、この例の段組みには含めません。文字の読み方を比較するための架空の記事です。','最後まで読んだあとで、段の数と余白を変えて比べられます。幅を変えたときの読み順も確かめてください。'];
export function MultiColumnDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(false);
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">TEXT FLOWS DOWN, THEN ACROSS</span><h1>文章を段に流し込む</h1><p className="demo-muted">左の段の下へ読み進め、次の段へ移ります。</p><button className="demo-secondary" onClick={() => setLong(!long)}>{long ? '元の長さに戻す' : '文章を増やす'}</button>
    <article className="exploration-panel"><h2>読み順を考えるメモ</h2><div className="column-article" style={{columnCount:Number(settings.columns),columnRule:settings.rule === 'show' ? '1px solid #aabbd8' : 'none'}}>{paragraphs.slice(0,long ? paragraphs.length : 4).map((paragraph,index) => <p key={paragraph}>{index + 1}. {paragraph}</p>)}</div></article><p role="status">最大{settings.columns}段。段幅の目安160px。{long ? 8 : 4}段落を表示しています。</p></div>;
}
