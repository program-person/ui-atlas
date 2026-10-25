import { useId, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
const choices = [{value:'sketch',label:'配置スケッチ'},{value:'color',label:'配色ノート'},{value:'outline',label:'要点メモ'},{value:'audio',label:'音声ラベル（準備中）',disabled:true}];
export function MultiSelectDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState<string[]>(settings.initial === 'one' ? ['sketch'] : []);
  const [error, setError] = useState(''); const [result, setResult] = useState('まだ確定していません。');
  const fieldRef = useRef<HTMLSelectElement>(null); const inputId = useId(); const limit = Number(settings.limit);
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">CHOOSE MORE THAN ONE</span><h1>リストから複数選ぶ</h1><p className="demo-muted">標準の複数選択欄です。操作方法は端末によって変わります。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (!selected.length || selected.length > limit) { setError(!selected.length ? '1つ以上選んでください。' : `${limit}個以内で選んでください。`); fieldRef.current?.focus(); return; } setResult(`確定：${choices.filter((choice) => selected.includes(choice.value)).map((choice) => choice.label).join('、')}`); }}>
      <label className="continuation-field" htmlFor={inputId}>試す道具<select id={inputId} ref={fieldRef} multiple size={4} value={selected} aria-describedby={`${inputId}-help ${inputId}-error`} aria-invalid={!!error || undefined} onChange={(event) => { setSelected(Array.from(event.currentTarget.selectedOptions, (option) => option.value)); setError(''); setResult('まだ確定していません。'); }}>{choices.map((choice) => <option key={choice.value} value={choice.value} disabled={choice.disabled}>{choice.label}</option>)}</select></label>
      <p id={`${inputId}-help`} className="demo-muted">1〜{limit}個。PCではCtrl / Commandとクリック、Shiftで範囲選択。キーボード操作はOSに従います。</p><p id={`${inputId}-error`} className="continuation-error">{error}</p><button className="demo-primary" type="submit">選択を確定</button>
    </form><p aria-live="polite">{selected.length}個選択</p><p role="status">{result}</p></div>;
}
