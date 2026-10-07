import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Settings } from '../types.ts';

const notebookTabs = [
  { id: 'overview', label: '概要', title: '画面のアイデア', content: '検索と一覧をひとつの画面に。必要な情報へすぐ移動できる構成を考えます。' },
  { id: 'notes', label: 'メモ', title: '検討中のメモ', content: 'カードの余白を広めにし、見出しと本文の強弱を付けます。' },
  { id: 'history', label: '履歴', title: 'これまでの変更', content: '下書き → 配置の検討 → 操作の確認。架空のノートの作業履歴です。' },
] as const;

export function TabsDemo({ settings }: { settings: Settings }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight': nextIndex = (index + 1) % notebookTabs.length; break;
      case 'ArrowLeft': nextIndex = (index - 1 + notebookTabs.length) % notebookTabs.length; break;
      case 'Home': nextIndex = 0; break;
      case 'End': nextIndex = notebookTabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
    if (settings.activation === 'automatic') setSelectedIndex(nextIndex);
  }

  return <div className="tabs-demo">
    <span className="demo-kicker">NOTEBOOK SECTIONS</span><h1>ノートの中を切り替える</h1>
    <p className="demo-muted">同じ場所で、必要な内容をひとつずつ。</p>
    <div className="notebook-tabs" role="tablist" aria-label="ノートの内容" onBlur={(event) => {
      // 手動選択で別のタブへ移動しても、再入場時は選択中のタブから始める。
      if (!event.currentTarget.contains(event.relatedTarget)) setFocusedIndex(selectedIndex);
    }}>
      {notebookTabs.map((tab, index) => <button key={tab.id} ref={(element) => { buttonRefs.current[index] = element; }}
        id={`tab-${tab.id}`} role="tab" aria-selected={selectedIndex === index} aria-controls={`panel-${tab.id}`}
        tabIndex={focusedIndex === index ? 0 : -1} onFocus={() => setFocusedIndex(index)}
        onKeyDown={(event) => moveFocus(event, index)} onClick={() => setSelectedIndex(index)}>{tab.label}</button>)}
    </div>
    {notebookTabs.map((tab, index) => <section key={tab.id} className="notebook-panel" id={`panel-${tab.id}`}
      role="tabpanel" aria-labelledby={`tab-${tab.id}`} tabIndex={0} hidden={selectedIndex !== index}>
      <span className="note-label">DESIGN NOTE</span><h2>{tab.title}</h2><p>{tab.content}</p>
    </section>)}
    <p className="demo-status">{settings.activation === 'automatic' ? '← → / Home / Endでフォーカスと内容を切り替えます。' : '← → / Home / Endで移動し、EnterまたはSpaceで内容を切り替えます。'} Tabで本文へ移動できます。</p>
  </div>;
}
