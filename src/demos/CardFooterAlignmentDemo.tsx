import { useState } from 'react';
import type { Settings } from '../types.ts';
const cards = [{title:'配置の案',description:'一覧と本文を近づけます。'},{title:'配色の案',description:'背景と文字の明るさを比べ、状態は色だけに頼らず言葉でも示します。主操作が迷わず見つかるかを確かめます。'}];
export function CardFooterAlignmentDemo({ settings }: { settings: Settings }) {
  const [long, setLong] = useState(false); const [selected,setSelected] = useState('');
  return <div className="expanded-demo final-layout-demo"><span className="demo-kicker">ALIGN THE CARD ACTIONS</span><h1>文章量が違うカードの操作位置</h1><p className="demo-muted">同じ行のカードで、操作を下端へ揃えるか文章の直後へ置くか比べます。</p><button className="demo-secondary" aria-pressed={long} onClick={() => setLong(!long)}>説明を追加・解除</button><div className={`footer-card-grid footer-card-${settings.alignment === 'bottom'?'bottom':'natural'} footer-card-${settings.density === 'compact'?'compact':'comfortable'}`}>{cards.map((card,index)=><article key={card.title}><h2>{card.title}</h2><p>{card.description}{long&&index===0?' 見出し、本文、補足の順に内容を読み、必要な操作へ進みます。列の幅が狭まると文章の行数も変わります。':''}</p><footer><button className="demo-primary" aria-pressed={selected===card.title} onClick={()=>setSelected(selected===card.title?'':card.title)}>{card.title}を選ぶ</button></footer></article>)}</div><p role="status">{selected?`${selected}を選択中。`:'まだ選択していません。'}追加説明は{long?'表示中':'非表示'}です。</p></div>;
}
