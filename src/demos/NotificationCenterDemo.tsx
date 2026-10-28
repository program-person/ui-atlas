import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

const NOTICES = ['新しい記録があります', '一覧の準備ができました', 'メモを確認できます'];
export function NotificationCenterDemo({ settings }: { settings: Settings }) {
  const [read, setRead] = useState<number[]>(settings.initial === 'mixed' ? [0] : []);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const filterRef = useRef<HTMLButtonElement>(null);
  const unread = NOTICES.length - read.length;
  const items = NOTICES.map((text, index) => ({ text, index })).filter(item => !unreadOnly || !read.includes(item.index));
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">NOTIFICATION CENTER</span><h1>通知を確認する</h1><p>架空の通知です。操作はこの画面内だけに反映されます。</p><div className="final-actions"><button ref={filterRef} className="demo-secondary" onClick={() => setUnreadOnly(!unreadOnly)}>{unreadOnly ? 'すべて表示' : '未読のみ表示'}</button><button className="demo-secondary" aria-disabled={unread === 0} onClick={() => { if (unread) setRead([0, 1, 2]); }}>すべて既読にする</button></div><p role="status">未読 {unread}件。{unreadOnly ? '未読のみ' : 'すべて'}を表示中。</p>{items.length ? <ul className={`final-list ${settings.density === 'compact' ? 'final-compact' : ''}`}>{items.map(item => <li key={item.index}><span>{item.text}（{read.includes(item.index) ? '既読' : '未読'}）</span><button className="demo-secondary" aria-disabled={read.includes(item.index)} onClick={() => { if (!read.includes(item.index)) { if (unreadOnly) filterRef.current?.focus(); setRead(current => [...current, item.index]); } }}>{item.text}を既読にする</button></li>)}</ul> : <p>未読の通知はありません。</p>}</div>;
}
