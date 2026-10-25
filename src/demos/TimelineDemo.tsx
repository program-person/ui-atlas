import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const events = [{ id: 'plan', date: '2026-10-01', title: '設計', state: '完了', text: '検索から詳細を開ける画面案を決めました。' }, { id: 'create', date: '2026-10-08', title: '制作', state: '完了', text: '架空のノートカードを作りました。' }, { id: 'review', date: '2026-10-15', title: '確認', state: '進行中', text: '操作と画面幅を確認しています。' }];
export function TimelineDemo({ settings }: { settings: Settings }) {
  const prefix = useId();
  const [opened, setOpened] = useState<string[]>(settings.details === 'first' ? ['plan'] : []);
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">EVENTS IN ORDER</span><h1>出来事を時系列で並べる</h1><p className="demo-muted">架空の制作記録です。各出来事の詳細を開けます。</p>
    <ol className={`sample-timeline timeline-${settings.orientation}`}>{events.map((event) => <li key={event.id}><time dateTime={event.date}>{event.date}</time><h2>{event.title}</h2><span className="timeline-state">{event.state}</span>
      <button className="demo-secondary" aria-label={`${event.title}の詳細`} aria-expanded={opened.includes(event.id)} aria-controls={`${prefix}-${event.id}`} onClick={() => setOpened((current) => current.includes(event.id) ? current.filter((value) => value !== event.id) : [...current, event.id])}>{opened.includes(event.id) ? '詳細を閉じる' : '詳細を開く'}</button>
      <p id={`${prefix}-${event.id}`} hidden={!opened.includes(event.id)}>{event.text}</p></li>)}</ol></div>;
}
