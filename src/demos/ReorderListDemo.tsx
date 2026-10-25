import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const items = [{ id: 'purpose', label: '目的のメモ' }, { id: 'layout', label: '配置の案' }, { id: 'check', label: '確認リスト' }];
export function ReorderListDemo({ settings }: { settings: Settings }) {
  const [order, setOrder] = useState(() => settings.initial === 'reverse' ? items.map((item) => item.id).reverse() : items.map((item) => item.id));
  const [announcement, setAnnouncement] = useState('上下ボタンで順序を変えられます。');
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);
  useEffect(() => { if (pendingFocus.current) { buttons.current.get(pendingFocus.current)?.focus(); pendingFocus.current = null; } }, [order]);
  function move(id: string, direction: number) {
    const index = order.indexOf(id); const target = index + direction;
    if (index < 0 || target < 0 || target >= order.length) return;
    const next = [...order]; [next[index], next[target]] = [next[target], next[index]];
    pendingFocus.current = `${id}-${target === 0 ? 'down' : target === order.length - 1 ? 'up' : direction < 0 ? 'up' : 'down'}`;
    setOrder(next);
    setAnnouncement(`${items.find((item) => item.id === id)?.label}を${target + 1}番目に移動しました。`);
  }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">CHANGE THE ORDER</span><h1>項目の順序を入れ替える</h1><p className="demo-muted">ドラッグを使わず、上下ボタンで操作できます。</p>
    <ol className={`reorder-list reorder-${settings.density}`}>{order.map((id, index) => { const label = items.find((item) => item.id === id)!.label; return <li key={id}>
      <strong>{index + 1}. {label}</strong><div className="growth-actions">{(['up', 'down'] as const).map((direction) => <button className="demo-secondary" key={direction} ref={(element) => { if (element) buttons.current.set(`${id}-${direction}`, element); }} disabled={direction === 'up' ? index === 0 : index === order.length - 1} aria-label={`${label}を${direction === 'up' ? '上' : '下'}へ`} onClick={() => move(id, direction === 'up' ? -1 : 1)}>{direction === 'up' ? '↑ 上へ' : '↓ 下へ'}</button>)}</div>
    </li>; })}</ol><p role="status">{announcement}</p></div>;
}
