import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
export function MediaObjectDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(false); const [chosen, setChosen] = useState(false); const identifier = useId();
  return <div className="expanded-demo composition-demo"><span className="demo-kicker">MEDIA WITH ITS DESCRIPTION</span><h1>図と本文をひとまとまりに</h1><p className="demo-muted">装飾図形と説明の組み合わせです。狭い枠では図、本文の順に並びます。</p>
    <button className="demo-secondary" aria-expanded={long} aria-controls={identifier} onClick={() => setLong(!long)}>{long ? '本文を短くする' : '本文を長くする'}</button>
    <div className="media-object-container"><article className={`media-object media-${settings.side === 'end' ? 'end' : 'start'} media-${settings.size === 'large' ? 'large' : 'small'}`}>
<div className="media-object-art" aria-hidden="true"><i /><b /><span /></div><div className="media-object-copy"><span className="note-label">LAYOUT NOTE</span><h2>余白のスケッチ</h2><p>図の隣に題名と説明をまとめます。図は装飾なので読み上げから除きます。</p><div id={identifier} hidden={!long}><p>本文が長いときも、文章の高さに合わせてカードが伸びます。左右の設定は見た目だけに使い、操作できる要素は本文のボタン一つに限定します。小さな画面でも本文を省略せずに読み進められます。</p></div><button className="demo-primary" aria-pressed={chosen} onClick={() => setChosen(!chosen)}>{chosen ? '選択を解除' : 'この案を選ぶ'}</button></div>
    </article></div><p role="status">{chosen ? '余白のスケッチを選択中。' : 'まだ選択していません。'}本文は{long ? '長文' : '短文'}です。</p></div>;
}
