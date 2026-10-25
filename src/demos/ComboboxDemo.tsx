import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Settings } from '../types.ts';
import { normalizeSearch } from '../catalog/logic.ts';

const choices = ['スケッチボード', 'カラーパレット', 'コードノート', 'CSSプレビュー', 'メモボード'];
export function ComboboxDemo({ settings }: { settings: Settings }) {
  const inputId = useId(); const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const composing = useRef(false);
  const [query, setQuery] = useState(settings.initial === 'first' ? choices[0] : '');
  const [selected, setSelected] = useState(settings.initial === 'first' ? choices[0] : '');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const term = normalizeSearch(query);
  const results = choices.filter((choice) => settings.matching === 'prefix' ? normalizeSearch(choice).startsWith(term) : normalizeSearch(choice).includes(term));
  function choose(value: string) { setQuery(value); setSelected(value); setOpen(false); setActive(-1); inputRef.current?.focus(); }
  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing || composing.current) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); setOpen(true);
      setActive((current) => !results.length ? -1 : !open || current < 0 ? event.key === 'ArrowDown' ? 0 : results.length - 1 : Math.max(0, Math.min(results.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Enter' && open && results[active]) { event.preventDefault(); choose(results[active]); }
    else if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); setActive(-1); }
    else if (event.key === 'Tab') { setOpen(false); setActive(-1); }
  }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">TYPE TO FIND A CHOICE</span><h1>入力しながら候補を選ぶ</h1><p className="demo-muted">矢印で候補へ移動し、Enterで確定します。</p>
    <div className="growth-field"><label htmlFor={inputId}>ノート用の道具</label><div className="combo-input-row"><input ref={inputRef} id={inputId} role="combobox" autoComplete="off" spellCheck={false} value={query} aria-autocomplete="list" aria-expanded={open && results.length > 0} aria-controls={listId} aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
      onClick={() => setOpen(true)} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }} onKeyDown={handleKey} onBlur={() => { setOpen(false); setActive(-1); }} onChange={(event) => { setQuery(event.target.value); setSelected(''); setOpen(true); setActive(-1); }} />
      <button className="demo-secondary" aria-label={open ? '候補を閉じる' : '候補を開く'} onMouseDown={(event) => event.preventDefault()} onClick={() => { setOpen(!open); setActive(-1); inputRef.current?.focus(); }}>⌄</button></div>
    </div><ul id={listId} role="listbox" aria-label="道具の候補" hidden={!open || !results.length} className="combo-options">{results.map((choice, index) => <li id={`${listId}-${index}`} key={choice} role="option" aria-selected={active === index} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(choice)}>{choice}</li>)}</ul>
    <p role="status">{open ? `候補${results.length}件。` : ''}{selected ? `確定：${selected}` : 'まだ確定していません。'}</p><p className="demo-status">Escは入力を残して閉じます。0件の時は確定しません。</p></div>;
}
