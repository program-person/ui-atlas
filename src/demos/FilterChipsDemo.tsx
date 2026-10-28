import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const filters = ['自然', '街', '夜'] as const;
type Filter = typeof filters[number];
const entries: { title: string; tags: Filter[] }[] = [
  { title: '森の散歩', tags: ['自然'] }, { title: '街の灯り', tags: ['街', '夜'] },
  { title: '昼の広場', tags: ['街'] }, { title: '月の観察', tags: ['自然', '夜'] },
];

export function FilterChipsDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<Filter[]>(settings.initial === 'filtered' ? ['自然'] : []);
  const checkboxRefs = useRef<Partial<Record<Filter, HTMLInputElement | null>>>({});
  const results = entries.filter((entry) => selected.every((filter) => entry.tags.includes(filter)));
  function toggle(filter: Filter) {
    setSelected((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  }
  function remove(filter: Filter) {
    setSelected((current) => current.filter((item) => item !== filter));
    checkboxRefs.current[filter]?.focus();
  }
  return <div className="expanded-demo selection-demo">
    <span className="demo-kicker">ACTIVE FILTERS</span><h1>条件をチップで確認</h1>
    <p className="demo-muted">選んだ条件をすべて含む記録を表示します。</p>
    <fieldset className="selection-filter-options"><legend>条件</legend>{filters.map((filter) => <label key={filter}><input ref={(element) => { checkboxRefs.current[filter] = element; }} type="checkbox" checked={selected.includes(filter)} onChange={() => toggle(filter)} />{filter}</label>)}</fieldset>
    <div className="selection-active"><strong>適用中の条件</strong><div className={`selection-chips selection-chips-${settings.presentation}`}>
      {selected.length ? selected.map((filter) => <button type="button" key={filter} aria-label={`${filter}の条件を解除`} onClick={() => remove(filter)}>{filter} <span aria-hidden="true">×</span></button>) : <span>条件なし</span>}
    </div><button type="button" onClick={() => { setSelected([]); checkboxRefs.current[filters[0]]?.focus(); }} disabled={!selected.length}>すべて解除</button></div>
    <p role="status">{results.length}件</p>
    {results.length ? <ul className="selection-items">{results.map((entry) => <li key={entry.title}><strong>{entry.title}</strong><span>{entry.tags.join('・')}</span></li>)}</ul> : <p>該当する記録がありません。条件を解除してください。</p>}
  </div>;
}
