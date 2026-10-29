import { useState, useId } from 'react';
import type { Settings } from '../types.ts';
function renderRestrictedMarkup(source: string) {
  const output = [];
  let items: string[] = [];
  function flushList() {
    if (items.length) { output.push(<ul key={'list-' + output.length}>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>); items = []; }
  }
  for (const line of source.split(/\r?\n/)) {
    if (line.startsWith('- ')) { items.push(line.slice(2)); continue; }
    flushList();
    if (line.startsWith('## ')) output.push(<h4 key={output.length}>{line.slice(3)}</h4>);
    else if (line.startsWith('# ')) output.push(<h3 key={output.length}>{line.slice(2)}</h3>);
    else if (line.trim()) output.push(<p key={output.length}>{line}</p>);
  }
  flushList();
  return output;
}
export function MarkdownPreviewDemo({ settings }: { settings: Settings }) {
  const [source, setSource] = useState('短いメモ');
  const [preview, setPreview] = useState('短いメモ');
  const labelId = useId();
  const tooLong = Array.from(source).length > 2000;
  function change(value: string) { setSource(value); if (settings.mode === 'live' && Array.from(value).length <= 2000) setPreview(value); }
  function sample() { const value = '# 配置のメモ\n- 余白を残す\n- 見出しを揃える\n## 補足\nHTMLは文字として表示します。'; setSource(value); setPreview(value); }
  return <div className="cont3-demo"><h1>限定した記法のプレビュー</h1><p>#・##の見出しと、-の箇条書きだけに対応します。</p>
    <div className="cont3-columns"><div><label htmlFor={labelId}>原文</label><textarea id={labelId} rows={6} value={source} aria-invalid={tooLong} aria-describedby={labelId + '-status'} onChange={event => change(event.target.value)} /></div><section className="cont3-panel" aria-label="記法のプレビュー">{preview.trim() ? renderRestrictedMarkup(preview) : <p>プレビューなし</p>}</section></div>
    <div className="cont3-actions"><button onClick={sample}>例の文章を表示</button><button disabled={tooLong} onClick={() => setPreview(source)}>プレビューを更新</button></div>
    <p id={labelId + '-status'} role={tooLong ? 'alert' : 'status'}>{tooLong ? '2,000文字以内にしてください。前の表示を保持しています。' : '原文 ' + Array.from(source).length + ' / 2000文字'}</p>
  </div>;
}
