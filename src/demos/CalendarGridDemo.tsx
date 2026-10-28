import { useState } from 'react';
import type { Settings } from '../types.ts';

export function CalendarGridDemo({ settings }: { settings: Settings }) {
  const [month, setMonth] = useState(settings.initial === 'nov' ? 10 : 9);
  const [selected, setSelected] = useState<string | null>(null);
  const monday = settings.weekStart === 'monday';
  const weekdays = monday ? ['月', '火', '水', '木', '金', '土', '日'] : ['日', '月', '火', '水', '木', '金', '土'];
  const offset = (new Date(Date.UTC(2026, month, 1)).getUTCDay() + (monday ? 6 : 0)) % 7;
  const count = new Date(Date.UTC(2026, month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, index) => index - offset + 1);
  function changeMonth(next: number) { setMonth(next); setSelected(null); }
  return <div className="expanded-demo final-collection"><span className="demo-kicker">CALENDAR GRID</span><h1>日付を選ぶ</h1><p>2026年10月と11月の架空のカレンダーです。</p><div className="final-calendar-controls"><button onClick={() => { if (month !== 9) changeMonth(9); }} aria-disabled={month === 9}>10月へ</button><button onClick={() => { if (month !== 10) changeMonth(10); }} aria-disabled={month === 10}>11月へ</button></div><table className="final-calendar"><caption>2026年{month + 1}月</caption><thead><tr>{weekdays.map(day => <th scope="col" key={day}>{day}</th>)}</tr></thead><tbody>{Array.from({ length: cells.length / 7 }, (_, week) => <tr key={week}>{cells.slice(week * 7, week * 7 + 7).map((day, index) => { const date = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; return <td key={index}>{day > 0 && day <= count && <button aria-label={date} aria-pressed={selected === date} onClick={() => setSelected(date)}>{day}</button>}</td>; })}</tr>)}</tbody></table><p role="status">{selected ? `${selected}を選択中` : '日付は未選択です。'}</p></div>;
}
