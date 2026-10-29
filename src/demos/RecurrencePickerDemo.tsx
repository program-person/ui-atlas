import { useState } from 'react';
import type { Settings } from '../types.ts';

export function RecurrencePickerDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState([0, 2, 4]);
  const weekdays = ['月', '火', '水', '木', '金', '土', '日'];
  const candidates = Array.from({ length: 56 }, (_, offset) => offset).filter(offset => Math.floor(offset / 7) % Number(settings.mode) === 0 && selected.includes(offset % 7)).slice(0, 4).map(offset => new Date(Date.UTC(2026, 10, 2 + offset)).toISOString().slice(0, 10));
  return <div className="cont3-demo"><h1>繰り返す曜日を選ぶ</h1><p>架空の基準日：2026-11-02（月）・当日を含む</p><fieldset><legend>曜日</legend><div className="cont3-actions">{weekdays.map((name, index) => <label key={name}><input type="checkbox" checked={selected.includes(index)} onChange={event => setSelected(current => event.target.checked ? [...current, index].sort((a, b) => a - b) : current.filter(value => value !== index))} />{name}</label>)}</div></fieldset><div className="cont3-actions"><button onClick={() => setSelected([0, 1, 2, 3, 4])}>平日すべてを選ぶ</button><button onClick={() => setSelected([])}>全解除</button></div><p role="status">曜日：{selected.map(index => weekdays[index]).join('・') || '未選択'}</p>{candidates.length ? <ol>{candidates.map(date => <li key={date}><time dateTime={date}>{date}</time></li>)}</ol> : <p>曜日を1つ以上選んでください。</p>}<p>祝日・例外日は考慮しません。実際の予定は作りません。</p></div>;
}
