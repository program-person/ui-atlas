import { useLayoutEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const titles = ['配置を考える', '色を選ぶ', '文章を整える'];
const columns = ['待機', '作業中', '完了'];
export function KanbanBoardDemo({ settings }: { settings: Settings }) {
  const [positions, setPositions] = useState<number[]>(() => settings.initial === 'mixed' ? [0, 1, 2] : [0, 0, 0]);
  const headings = useRef<(HTMLElement | null)[]>([]);
  const movedIndex = useRef<number | null>(null);
  useLayoutEffect(() => { if (movedIndex.current !== null) { headings.current[movedIndex.current]?.focus({ preventScroll: true }); movedIndex.current = null; } }, [positions]);
  function move(index: number, direction: number) {
    const next = positions[index] + direction;
    if (next < 0 || next >= columns.length) return;
    movedIndex.current = index;
    setPositions(current => current.map((value, itemIndex) => itemIndex === index ? next : value));
  }
  return <div className="expanded-demo final-collection"><span className="demo-kicker">KANBAN BOARD</span><h1>作業の状態を見渡す</h1><p>架空の3件をボタンで隣の列へ移動します。</p><div className={`final-kanban final-kanban-${settings.view}`}>{columns.map((column, columnIndex) => <section key={column}><h2>{column}（{positions.filter(value => value === columnIndex).length}件）</h2><ul>{titles.map((title, index) => positions[index] === columnIndex && <li key={title}><strong tabIndex={-1} ref={element => { headings.current[index] = element; }}>{title}</strong><div>{columnIndex > 0 && <button aria-label={`${title}を${columns[columnIndex - 1]}へ`} onClick={() => move(index, -1)}>戻す</button>}{columnIndex < 2 && <button aria-label={`${title}を${columns[columnIndex + 1]}へ`} onClick={() => move(index, 1)}>進める</button>}</div></li>)}</ul></section>)}</div><p role="status">合計 {positions.length}件</p></div>;
}
