import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
const sample = '画面の情報を整理するときは、まず目的と次の操作を近くに置きます。余白を少し広げると、内容のまとまりを確かめやすくなります。見出しには内容を予想できる言葉を使い、補足は読みたい人がたどれる位置へ置きます。長い文章を一覧へ載せる場合は、すべてを同じ高さで読ませる必要があるかを考えます。省略する場合も、重要な条件や操作の結果が隠れないようにします。続きがあることと、全文を開く操作をはっきり示します。狭い画面では折り返しが増えるので、幅を変えて確認します。これは文章の省略と展開を比べるための架空のメモです。';
export function TextTruncationDemo({ settings }: { settings: Settings }) {
  const [expanded, setExpanded] = useState(settings.initial === 'expanded'); const textId = useId();
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">A PREVIEW WITH A WAY BACK</span><h1>長い文章を必要な分だけ読む</h1><p className="demo-muted">見た目の行数を抑え、操作で全文を表示します。</p><article className="continuation-panel"><h2>画面を整理するメモ</h2><p id={textId} className={expanded ? 'truncation-text' : 'truncation-text truncated'} style={expanded ? undefined : {WebkitLineClamp:Number(settings.lines),maxHeight:`${Number(settings.lines) * 1.7}em`}}>{sample}</p><button className="demo-secondary" aria-controls={textId} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? '折りたたむ' : '全文を表示'}</button></article><p role="status">{expanded ? '全文を表示しています。' : `見た目を${settings.lines}行までに省略しています。`}</p></div>;
}
