import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const undoNotes = ['画面のアイデア', '余白のメモ', '操作の確認'];
export function UndoFeedbackDemo({ settings }: { settings: Settings }) {
  const [hiddenNotes, setHiddenNotes] = useState<string[]>([]);
  const [pendingNote, setPendingNote] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const undoRef = useRef<HTMLButtonElement>(null);
  const restoredNote = useRef<string | null>(null);
  const moveAfterExpiry = useRef(false);
  useEffect(() => {
    if (!pendingNote || settings.window === 'manual') return;
    const timeout = window.setTimeout(() => {
      moveAfterExpiry.current = document.activeElement === undoRef.current;
      setPendingNote(null); setStatus('取り消しの受付が終了しました。リセットで元に戻せます。');
    }, Number(settings.window));
    return () => window.clearTimeout(timeout);
  }, [pendingNote, settings.window]);
  useEffect(() => {
    if (restoredNote.current) { buttonRefs.current[restoredNote.current]?.focus(); restoredNote.current = null; }
    if (moveAfterExpiry.current) {
      const visible = undoNotes.find((note) => !hiddenNotes.includes(note));
      if (visible) buttonRefs.current[visible]?.focus(); else undoRef.current?.parentElement?.focus();
      moveAfterExpiry.current = false;
    }
  }, [hiddenNotes, pendingNote]);
  return <div className="expanded-demo undo-demo"><span className="demo-kicker">ROOM TO CHANGE YOUR MIND</span><h1>操作のあとにも、戻れる。</h1><p className="demo-muted">架空のリストを一時的に非表示にします。</p>
    <div className="undo-list">{undoNotes.map((note) => !hiddenNotes.includes(note) && <div key={note}><span>{note}</span><button ref={(element) => { buttonRefs.current[note] = element; }} className="demo-secondary" disabled={!!pendingNote} aria-label={`${note}を非表示`} onClick={() => {
      setHiddenNotes((current) => [...current, note]); setPendingNote(note); setStatus(`「${note}」を非表示にしました。`);
    }}>非表示</button></div>)}</div>
    {hiddenNotes.length === undoNotes.length && <p className="demo-muted">表示するノートはありません。</p>}
    <div className="undo-notice" tabIndex={-1}><p role="status">{status || '非表示にしたあと、取り消しを試せます。'}</p><button ref={undoRef} className="demo-secondary" disabled={!pendingNote} onClick={() => {
      if (!pendingNote) return;
      restoredNote.current = pendingNote;
      setHiddenNotes((current) => current.filter((note) => note !== pendingNote));
      setStatus(`「${pendingNote}」を戻しました。`); setPendingNote(null);
    }}>取り消す</button></div>
    <p className="demo-status">{settings.window === 'manual' ? '取り消すかリセットするまで受付を続けます。' : '取り消しは5秒間受け付けます。'} 受付中は次の非表示操作を止めます。</p>
  </div>;
}
