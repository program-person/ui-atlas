import { useState } from 'react';
import type { Settings } from '../types.ts';

export function RuleChecklistDemo({ settings }: { settings: Settings }) {
  const [value, setValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const length = Array.from(value).length;
  const rules = [{ label: '2文字以上', passed: length >= 2 }, { label: '8文字以下', passed: length <= 8 }, { label: settings.mode === 'letters' ? '半角英字のみ' : '半角英数字のみ', passed: (settings.mode === 'letters' ? /^[A-Za-z]+$/ : /^[A-Za-z0-9]+$/).test(value) }];
  const passed = rules.filter(rule => rule.passed).length;
  function edit(next: string) { setValue(next); setConfirmed(false); }
  return <div className="cont3-demo"><h1>入力条件のチェックリスト</h1><label>架空の整理コード<input value={value} aria-describedby="rules-result" onChange={event => edit(event.target.value)} /></label><ul>{rules.map(rule => <li key={rule.label}>{rule.passed ? '達成' : '未達'}：{rule.label}</li>)}</ul><div className="cont3-actions"><button onClick={() => edit(settings.mode === 'letters' ? 'ABCD' : 'AB12')}>有効な例を入れる</button><button disabled={passed !== 3} onClick={() => setConfirmed(true)}>内容を確定</button></div><p id="rules-result" role="status">{passed} / 3条件を満たしています{confirmed ? '・確定済み' : ''}</p></div>;
}
