import { useEffect, useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const documentOptions = ['要点メモ', '配置スケッチ', '確認リスト'] as const;

export function CheckboxDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<boolean[]>(() => documentOptions.map((_, index) =>
    settings.initial === 'all' || (settings.initial === 'partial' && index === 0)));
  const parentRef = useRef<HTMLInputElement>(null);
  const summaryId = useId();
  const selectedCount = selected.filter(Boolean).length;
  const allSelected = selectedCount === documentOptions.length;
  const partiallySelected = selectedCount > 0 && !allSelected;

  useEffect(() => {
    // ネイティブの一部選択はHTML属性では表せないため、子の状態から同期する。
    if (parentRef.current) parentRef.current.indeterminate = partiallySelected;
  }, [partiallySelected, settings.selectAll]);

  return <div className="expanded-demo choice-demo">
    <span className="demo-kicker">BUILD A DOCUMENT SET</span><h1>必要な項目を組み合わせる</h1>
    <p className="demo-muted">0個でも、複数でも選べます。</p>
    <fieldset className="choice-fieldset"><legend>資料セットに入れる項目</legend>
      <div className="choice-options">
        {settings.selectAll === 'show' && <label className="choice-option parent-choice">
          <input type="checkbox" ref={parentRef} checked={allSelected} aria-describedby={summaryId}
            onChange={(event) => setSelected(documentOptions.map(() => event.target.checked))} />
          <span><strong>3項目をまとめて選ぶ</strong><small id={summaryId}>{partiallySelected ? '一部選択' : allSelected ? 'すべて選択' : '未選択'}</small></span>
        </label>}
        {documentOptions.map((option, index) => <label className="choice-option" key={option}>
          <input type="checkbox" checked={selected[index]} onChange={(event) => {
            const checked = event.target.checked;
            setSelected((current) => current.map((value, optionIndex) => optionIndex === index ? checked : value));
          }} /><span><strong>{option}</strong></span>
        </label>)}
      </div>
    </fieldset>
    <section className="choice-preview" aria-label="選択結果"><span className="note-label">YOUR DOCUMENT SET</span>
      <p className="choice-summary" role="status">{selectedCount} / {documentOptions.length}項目を選択</p>
      {selectedCount ? <ul>{documentOptions.filter((_, index) => selected[index]).map((option) => <li key={option}>{option}</li>)}</ul>
        : <p>まだ選んでいません</p>}
    </section>
    <p className="demo-status">Tabで移動し、Spaceで選択を切り替えられます。</p>
  </div>;
}
