import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const bentoCards = [
  { title: '今週のノート', value: '08', description: 'ひらめきを、ひとつの場所へ。' },
  { title: 'アイデア', value: '03', description: '次に試したいこと' },
  { title: '進行中', value: '02', description: '小さく作って確認' },
  { title: 'ツール', value: '05', description: '使いたい道具' },
] as const;
export function BentoGridDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<string>('今週のノート');
  return <div className="expanded-demo bento-demo"><span className="demo-kicker">A PLACE FOR EACH IDEA</span><h1>大小のカードで、まとめる。</h1><p className="demo-muted">情報の重さに合わせて面積を変える。</p>
    <div className={`bento-cards emphasis-${settings.emphasis}`}>{bentoCards.map((card, index) => <button key={card.title} className={`bento-card bento-card-${index}`} aria-pressed={selected === card.title} onClick={() => setSelected(card.title)}><span>{card.title}</span><strong>{card.value}</strong><small>{card.description}</small></button>)}</div>
    <p className="demo-status" role="status">「{selected}」を選択中。カードはTabとEnterでも選べます。</p>
  </div>;
}
