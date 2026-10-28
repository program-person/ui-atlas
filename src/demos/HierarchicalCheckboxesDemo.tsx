import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const groups = [{ name: '見た目', children: ['余白', '配色'] }, { name: '構成', children: ['一覧', '詳細'] }];
function ParentCheckbox({ name, checked, partial, onChange }: { name: string; checked: boolean; partial: boolean; onChange: () => void }) { const ref = useRef<HTMLInputElement>(null); useEffect(() => { if (ref.current) ref.current.indeterminate = partial; }, [partial]); return <label><input ref={ref} type="checkbox" checked={checked} onChange={onChange}/> {name}をまとめて選択</label>; }
export function HierarchicalCheckboxesDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<string[]>(() => settings.initial === 'partial' ? ['余白'] : []);
  function toggleLeaf(child: string) { setSelected(current => current.includes(child) ? current.filter(value => value !== child) : [...current, child]); }
  function toggleGroup(children: string[]) { setSelected(current => children.every(child => current.includes(child)) ? current.filter(value => !children.includes(value)) : [...current.filter(value => !children.includes(value)), ...children]); }
  return <div className="expanded-demo final-collection"><span className="demo-kicker">HIERARCHICAL SELECTION</span><h1>まとめて選択する</h1><p>架空の項目をグループ単位または個別に選びます。</p><div className={`final-check-groups final-check-${settings.layout}`}>{groups.map(group => { const count = group.children.filter(child => selected.includes(child)).length; return <fieldset key={group.name}><legend>{group.name}</legend><ParentCheckbox name={group.name} checked={count === group.children.length} partial={count > 0 && count < group.children.length} onChange={() => toggleGroup(group.children)}/>{group.children.map(child => <label className="final-child" key={child}><input type="checkbox" checked={selected.includes(child)} onChange={() => toggleLeaf(child)}/> {child}</label>)}</fieldset>; })}</div><button onClick={() => setSelected([])}>すべて解除</button><p role="status">{selected.length} / 4項目を選択中</p></div>;
}
