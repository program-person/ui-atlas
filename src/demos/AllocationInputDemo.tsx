import { useState } from 'react';
import type { Settings } from '../types.ts';

export function AllocationInputDemo({ settings }: { settings: Settings }) {
  const total = Number(settings.mode);
  const [values, setValues] = useState(['0', '0', '0']);
  const [confirmed, setConfirmed] = useState(false);
  const valid = values.every(value => /^\d{1,3}$/.test(value) && Number(value) <= total);
  const sum = valid ? values.reduce((amount, value) => amount + Number(value), 0) : 0;
  const message = !valid ? '各項目に0〜' + total + 'の半角整数を入力してください' : sum < total ? '未配分 ' + (total - sum) + '点' : sum > total ? '超過 ' + (sum - total) + '点' : '配分が揃いました';
  function distribute() { const base = Math.floor(total / 3); const remainder = total % 3; setValues([0, 1, 2].map(index => String(base + (index < remainder ? 1 : 0)))); setConfirmed(false); }
  return <div className="cont3-demo"><h1>合計を持つ配分入力</h1><p>架空の{total}点を配分します。</p>{['文章', '図', '確認'].map((name, index) => <label key={name}>{name}<input inputMode="numeric" value={values[index]} aria-describedby="allocation-result" aria-invalid={!valid} onChange={event => { setValues(current => current.map((value, item) => item === index ? event.target.value : value)); setConfirmed(false); }} /></label>)}<div className="cont3-actions"><button onClick={distribute}>均等に配分</button><button disabled={!valid || sum !== total} onClick={() => setConfirmed(true)}>配分を確定</button></div><p id="allocation-result" role={valid ? 'status' : 'alert'}>{message}{confirmed ? '・確定済み' : ''}</p><p>現在の合計：{valid ? sum + ' / ' + total + '点' : '計算できません'}</p></div>;
}
