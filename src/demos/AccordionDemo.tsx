import { useState } from 'react';
import type { Settings } from '../types.ts';

const notebookSections = [
  { id: 'purpose', title: '何を作る？', content: 'アイデアを整理する架空のノート画面です。必要な情報を見出しから開いて確認します。' },
  { id: 'layout', title: '配置はどうする？', content: '検索欄を一覧の近くに置き、カードには見出しと短い説明を載せます。' },
  { id: 'interaction', title: 'どんな操作が必要？', content: 'ノートを選ぶ、内容を確認する、元の一覧に戻る。この流れを短く保ちます。' },
] as const;

export function AccordionDemo({ settings }: { settings: Settings }) {
  const [expandedIds, setExpandedIds] = useState<string[]>(() => settings.initialState === 'first' ? [notebookSections[0].id] : []);

  function toggleSection(id: string) {
    setExpandedIds((current) => {
      if (current.includes(id)) return current.filter((expandedId) => expandedId !== id);
      return settings.expansion === 'multiple' ? [...current, id] : [id];
    });
  }

  return <div className="accordion-demo">
    <span className="demo-kicker">DESIGN QUESTIONS</span><h1>見出しから、必要な情報へ</h1>
    <p className="demo-muted">ノートの設計を、項目ごとに確認する。</p>
    <div className="notebook-accordion">{notebookSections.map((section) => {
      const expanded = expandedIds.includes(section.id);
      return <section className="accordion-section" key={section.id}>
        <h2><button id={`heading-${section.id}`} aria-expanded={expanded} aria-controls={`section-${section.id}`} onClick={() => toggleSection(section.id)}>
          <span>{section.title}</span><span className="accordion-indicator" aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button></h2>
        <div className="accordion-panel" id={`section-${section.id}`} role="region" aria-labelledby={`heading-${section.id}`} hidden={!expanded}><p>{section.content}</p></div>
      </section>;
    })}</div>
    <p className="demo-status">{settings.expansion === 'multiple' ? '複数の項目を同時に開けます。' : '別の項目を開くと、前の項目は閉じます。'} 同じ見出しを押すと閉じます。Tabで見出しを移動し、Enter・Spaceで開閉できます。</p>
  </div>;
}
