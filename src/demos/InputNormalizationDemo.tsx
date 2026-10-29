import { useState, useRef } from 'react';
import type { Settings } from '../types.ts';

export function InputNormalizationDemo({ settings }: { settings: Settings }) {
  const [source, setSource] = useState('ＡＢＣ１２３');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const composing = useRef(false);
  function confirm() {
    if (composing.current) return;
    if (!source.trim()) { setError('空白以外の文字を入力してください'); setResult(null); return; }
    const normalized = source.normalize('NFKC');
    setResult(settings.mode === 'trim' ? normalized.trim() : normalized); setError('');
  }
  return <div className="cont3-demo"><h1>原文を残した入力の正規化</h1><label>架空のコード<input value={source} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }} aria-describedby="normalization-result" aria-invalid={Boolean(error)} onChange={event => { setSource(event.target.value); setResult(null); setError(''); }} /></label>
    <button onClick={confirm}>変換結果を確認</button><p>入力中の文字は置き換えません。</p>
    <div className="cont3-panel"><p style={{ whiteSpace: 'pre-wrap' }}>原文：{source}</p><p id="normalization-result" role={error ? 'alert' : 'status'} style={{ whiteSpace: 'pre-wrap' }}>{error || (result === null ? '変換結果は未確定' : '変換後：' + result)}</p></div>
  </div>;
}
