import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { Settings } from '../types.ts';

const notebookHierarchy = [
  { id: 'home', label: 'ホーム', description: 'ノートの入口です。' },
  { id: 'workspace', label: '作業スペース', description: '作業ごとのノートをまとめています。' },
  { id: 'notes', label: 'ノート', description: '画面のアイデアを残しています。' },
  { id: 'sketch', label: '画面案', description: 'カードを並べて、検索結果を比較する画面です。' },
] as const;

export function BreadcrumbDemo({ settings }: { settings: Settings }) {
  const hierarchy = notebookHierarchy.filter((node) => settings.depth === '4' || node.id !== 'workspace');
  // 補助パラメーターもデモのハッシュ内に収め、辞典の画面遷移と分離する。
  const requestedLevel = new URLSearchParams(window.location.hash.split('?')[1]).get('level');
  const foundIndex = hierarchy.findIndex((node) => node.id === requestedLevel);
  const currentIndex = foundIndex >= 0 ? foundIndex : hierarchy.length - 1;
  const current = hierarchy[currentIndex];
  const child = hierarchy[currentIndex + 1];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigationPending = useRef(false);

  useEffect(() => {
    if (navigationPending.current) {
      headingRef.current?.focus();
      navigationPending.current = false;
    }
  }, [current.id]);

  function focusAfterNavigation(event: MouseEvent<HTMLAnchorElement>) {
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) navigationPending.current = true;
  }

  const destination = (level: string) => `#/demo/breadcrumb?${new URLSearchParams({ ...settings, level })}`;

  return <div className="expanded-demo navigation-demo">
    <span className="demo-kicker">FIND YOUR PLACE</span><h1>階層をたどる</h1>
    <p className="demo-muted">上の階層へ戻り、そこから下へ進めます。</p>
    <nav aria-label="パンくずリスト" className="sample-breadcrumb"><ol>
      {hierarchy.slice(0, currentIndex + 1).map((node, index) => <li key={node.id}>
        {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">{settings.separator === 'slash' ? '/' : '›'}</span>}
        {index === currentIndex ? <span aria-current="page">{node.label}</span>
          : <a href={destination(node.id)} onClick={focusAfterNavigation}>{node.label}</a>}
      </li>)}
    </ol></nav>
    <section className="navigation-content" aria-label="現在のページ">
      <span className="note-label">NOTE LIBRARY</span><h2 tabIndex={-1} ref={headingRef}>{current.label}</h2>
      <p>{current.description}</p>
      {child ? <a className="demo-secondary" href={destination(child.id)} onClick={focusAfterNavigation}>{child.label}へ進む</a>
        : <p className="demo-status">この階層の下にページはありません。</p>}
    </section>
  </div>;
}
