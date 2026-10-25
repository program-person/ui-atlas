import { useEffect, useId, useState } from 'react';
import type { Settings } from '../types.ts';
const INITIAL_LABEL = '余白のメモ'; const MAX_LABEL_LENGTH = 12;
type SavePhase = 'saved' | 'waiting' | 'composing' | 'invalid' | 'error';
export function AutosaveFeedbackDemo({ settings }: { settings: Settings }) {
  const [draft, setDraft] = useState(INITIAL_LABEL); const [saved, setSaved] = useState(INITIAL_LABEL); const [phase, setPhase] = useState<SavePhase>('saved'); const [composing, setComposing] = useState(false); const [revision, setRevision] = useState(0); const inputId = useId();
  useEffect(() => { const value = draft.trim(); if (composing) { setPhase('composing'); return; } if (!value || Array.from(value).length > MAX_LABEL_LENGTH) { setPhase('invalid'); return; } if (value === saved) { setPhase('saved'); return; } setPhase('waiting'); const timer = setTimeout(() => { if (settings.result === 'success') { setSaved(value); setPhase('saved'); } else setPhase('error'); }, Number(settings.delay)); return () => clearTimeout(timer); }, [draft,saved,composing,revision,settings.delay,settings.result]);
  const status = phase === 'saved' ? 'このデモ内では疑似保存済みです。' : phase === 'waiting' ? '入力が止まるのを待っています。' : phase === 'composing' ? '文字の変換中です。' : phase === 'invalid' ? '1〜12文字の架空ラベルを入力してください。' : '疑似保存に失敗しました。前の値を保持しています。';
  return <div className="expanded-demo workflow-demo"><span className="demo-kicker">FEEDBACK AFTER TYPING PAUSES</span><h1>入力が止まった後に結果を伝える</h1><p className="demo-muted">実際には保存しません。状態はメモリ内だけで、再読み込みすると消えます。</p>
    <label className="workflow-field" htmlFor={inputId}>架空のラベル<input id={inputId} value={draft} aria-invalid={phase === 'invalid' || undefined} aria-describedby={`${inputId}-status`} onChange={(event) => setDraft(event.target.value)} onCompositionStart={() => setComposing(true)} onCompositionEnd={(event) => { setDraft(event.currentTarget.value); setComposing(false); }} /></label><p id={`${inputId}-status`} role="status">{status}</p>
    <div className="workflow-panel"><p>疑似保存済み：{saved}</p><p>待ち時間：{settings.delay}ms</p></div><button className="demo-secondary" aria-disabled={phase !== 'error'} onClick={() => { if (phase === 'error') setRevision((value) => value + 1); }}>疑似保存を再試行</button></div>;
}
