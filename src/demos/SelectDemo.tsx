import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const tools = [{ id: 'sketch', label: 'スケッチボード', group: 'デザイン' }, { id: 'palette', label: 'カラーパレット', group: 'デザイン' }, { id: 'preview', label: 'CSSプレビュー', group: '開発' }];
export function SelectDemo({ settings }: { settings: Settings }) {
  const inputId = useId();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selected, setSelected] = useState(settings.initial === 'first' ? 'sketch' : '');
  const [error, setError] = useState(false);
  const [result, setResult] = useState('');
  const options = (group?: string) => tools.filter((tool) => !group || tool.group === group).map((tool) => <option key={tool.id} value={tool.id}>{tool.label}</option>);
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">CHOOSE FROM A LIST</span><h1>候補を選択欄にまとめる</h1><p className="demo-muted">候補の選択後に、確定ボタンを押します。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!selected) { setError(true); selectRef.current?.focus(); return; } setResult(`選択：${tools.find((tool) => tool.id === selected)?.label}`); }}>
      <label className="growth-field" htmlFor={inputId}>使う道具<select id={inputId} ref={selectRef} required value={selected} aria-invalid={error || undefined} aria-describedby={`${inputId}-help ${inputId}-error`} onChange={(event) => { setSelected(event.target.value); setError(false); setResult(''); }}>
        <option value="">選んでください</option>{settings.grouping === 'grouped' ? ['デザイン', '開発'].map((group) => <optgroup key={group} label={group}>{options(group)}</optgroup>) : options()}
        <option value="archive" disabled>アーカイブ（準備中）</option>
      </select></label><p id={`${inputId}-help`} className="demo-muted">準備中の道具は選べません。</p><p id={`${inputId}-error`} className="growth-error">{error ? '道具を1つ選んでください。' : ''}</p>
      <button className="demo-primary" type="submit">選択を確定</button></form><p role="status">{result || 'まだ確定していません。'}</p></div>;
}
