import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const cards = [{ id: 'layout', title: '配置の案', summary: '一覧と詳細の距離を考える。', short: '狭い幅では縦に並べます。', full: '狭い幅では縦に並べます。一覧を先に表示して、詳細へ進む流れを検討します。' }, { id: 'color', title: '配色の案', summary: '情報の優先度を色で整理する。', short: '文字の読みやすさを確認します。', full: '文字の読みやすさを確認します。色だけに頼らず、見出しや文字でも違いを示します。' }] as const;
export function ExpandableCardDemo({ settings }: { settings: Settings }) {
  const prefix = useId();
  const [openIds, setOpenIds] = useState<string[]>(() => settings.initial === 'open' ? cards.map((card) => card.id) : []);
  return <div className="expanded-demo collection-demo"><span className="demo-kicker">EXPANDABLE CARDS</span><h1>概要を見て詳細を開く</h1><p>各カードの補足は独立して開閉します。</p><div className="collection-cards">{cards.map((card) => { const expanded = openIds.includes(card.id); const panelId = `${prefix}-${card.id}`; return <article className="collection-card" key={card.id}><h2>{card.title}</h2><p>{card.summary}</p><button className="demo-secondary" aria-expanded={expanded} aria-controls={panelId} aria-label={`${card.title}の詳細を${expanded ? '閉じる' : '開く'}`} onClick={() => setOpenIds((current) => expanded ? current.filter((id) => id !== card.id) : [...current, card.id])}>{expanded ? '詳細を閉じる' : '詳細を開く'}</button><div id={panelId} hidden={!expanded}><p>{settings.detail === 'full' ? card.full : card.short}</p></div></article>; })}</div></div>;
}
