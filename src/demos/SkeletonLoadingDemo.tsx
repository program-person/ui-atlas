import { useEffect, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

type LoadingPhase = 'idle' | 'loading' | 'success' | 'error';
const loadedNotes = ['画面のアイデア', '余白のメモ', '操作の確認'];
export function SkeletonLoadingDemo({ settings }: { settings: Settings }) {
  const [phase, setPhase] = useState<LoadingPhase>('idle');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (phase !== 'loading') return;
    const timeout = window.setTimeout(() => setPhase(settings.result === 'fail-first' && attempt === 1 ? 'error' : 'success'), Number(settings.delay));
    // リセットや項目の切り替え後に、前の読み込み結果を反映しない。
    return () => window.clearTimeout(timeout);
  }, [phase, attempt, settings.delay, settings.result]);
  function loadNotes() { setAttempt((current) => current + 1); setPhase('loading'); }
  return <div className="expanded-demo loading-demo"><span className="demo-kicker">WHILE YOU WAIT</span><h1>待っている間も、形を残す。</h1><p className="demo-muted">架空の読み込みで、完了と失敗を試す。</p>
    <button className="demo-primary" disabled={phase === 'loading'} onClick={loadNotes}>{phase === 'error' ? '再試行' : phase === 'success' ? 'もう一度読み込む' : '読み込みを始める'}</button>
    <p className="demo-status" role="status">{phase === 'loading' ? 'ノートを読み込み中…' : phase === 'success' ? '3件のノートを表示しました。' : ''}</p>
    <div className="loading-content" aria-busy={phase === 'loading'}>
      {phase === 'loading' && <div className="skeleton-list" aria-hidden="true">{loadedNotes.map((note) => <div className="skeleton-card" key={note}><i /><b /><b /></div>)}</div>}
      {phase === 'success' && <div className="loaded-list">{loadedNotes.map((note, index) => <article key={note}><span className="note-label">NOTE {index + 1}</span><h2>{note}</h2><p>架空のノートを読み込みました。</p></article>)}</div>}
      {phase === 'idle' && <p className="demo-muted">ボタンを押すと読み込みを始めます。</p>}
      {phase === 'error' && <p role="alert" className="loading-error">読み込めませんでした。もう一度試せます。</p>}
    </div>
  </div>;
}
