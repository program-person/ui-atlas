import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import { normalizeSearch } from '../catalog/logic.ts';
import '../styles/expanded-demos.css';

const sampleCommands = [
  { id: 'notes', label: 'ノートを開く', aliases: 'note メモ', type: 'navigation', message: 'ノートの一覧を表示しています。' },
  { id: 'search', label: '検索を開く', aliases: 'search 探す', type: 'navigation', message: '検索の作業領域を表示しています。' },
  { id: 'display', label: '表示を切り替える', aliases: 'display theme テーマ', type: 'action', message: '表示の確認モードに切り替えました。' },
];

export function CommandPaletteDemo({ settings }: { settings: Settings }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('コマンドを選ぶと、この作業領域に結果が出ます。');
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const matches = sampleCommands.filter((command) => (settings.scope === 'all' || command.type === 'navigation') && terms.every((term) => normalizeSearch(`${command.label} ${command.aliases}`).includes(term)));
  function openPalette() {
    if (!dialogRef.current || dialogRef.current.open) return;
    setQuery(''); setActiveIndex(0); dialogRef.current.showModal(); inputRef.current?.focus();
  }
  function executeCommand(index: number) {
    const command = matches[index];
    if (!command) return;
    setStatus(command.message); dialogRef.current?.close();
  }
  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !event.isComposing) { event.preventDefault(); openPalette(); }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);
  return <div className="expanded-demo command-demo"><span className="demo-kicker">FIND AN ACTION</span><h1>操作の名前から、すぐ実行。</h1><p className="demo-muted">このデモ内でCtrl+K / ⌘Kも試せます。</p>
    <button ref={triggerRef} className="demo-primary" onClick={openPalette}>コマンドを探す</button><div className="command-workspace"><span className="note-label">WORKSPACE</span><p role="status">{status}</p></div>
    <dialog ref={dialogRef} className="command-dialog" aria-labelledby="command-title" onClose={() => triggerRef.current?.focus()} onClick={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) event.currentTarget.close();
    }} onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input, button:not([tabindex="-1"])'));
      const first = elements[0]; const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="dialog-heading"><h2 id="command-title">コマンドを探す</h2><button className="demo-icon-button" aria-label="コマンドを閉じる" onClick={() => dialogRef.current?.close()}>×</button></div>
      <label className="demo-field">コマンド検索<input ref={inputRef} role="combobox" value={query} aria-autocomplete="list" aria-expanded="true" aria-controls="command-list" aria-activedescendant={matches[activeIndex] ? `command-${matches[activeIndex].id}` : undefined} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => {
        if (event.nativeEvent.isComposing) return;
        if (event.key === 'Enter') { event.preventDefault(); executeCommand(activeIndex); }
        if (!matches.length) return;
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((current) => (current + 1) % matches.length); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((current) => (current - 1 + matches.length) % matches.length); }
      }} placeholder="例：note / 検索" /></label>
      <div id="command-list" role="listbox" aria-label="コマンド候補">{matches.map((command, index) => <button key={command.id} id={`command-${command.id}`} role="option" aria-selected={activeIndex === index} tabIndex={-1} onMouseDown={(event) => event.preventDefault()} onClick={() => executeCommand(index)}>{command.label}<small>{command.type === 'navigation' ? '移動' : '操作'}</small></button>)}</div>
      <p className="demo-status" role="status">{matches.length ? `${matches.length}件 · ↑ ↓で選び、Enterで実行。Escで閉じる。` : '候補がありません。検索語を短くしてください。'}</p>
    </dialog>
  </div>;
}
