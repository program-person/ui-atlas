import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import { MAX_NOTE_LABEL_LENGTH, validateNoteLabel } from './demo-logic.ts';
import '../styles/expanded-demos.css';

export function InlineValidationDemo({ settings }: { settings: Settings }) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [status, setStatus] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const showValidation = touched || (settings.timing === 'input' && interacted);
  const error = showValidation ? validateNoteLabel(value) : '';
  return <div className="expanded-demo validation-demo"><span className="demo-kicker">HELP AT THE RIGHT PLACE</span><h1>入力の近くで、直せる案内。</h1><p className="demo-muted">架空のノートのラベルで試してください。</p>
    <form noValidate onSubmit={(event) => { event.preventDefault(); setTouched(true); const problem = validateNoteLabel(value); setStatus(problem ? '' : '架空のノートのラベルを確認しました。'); if (problem) inputRef.current?.focus(); }}>
      <label className="demo-field">ノートのラベル（必須）<input ref={inputRef} value={value} required aria-invalid={!!error} aria-describedby="label-help label-validation" onBlur={() => setTouched(true)} onChange={(event) => { setValue(event.target.value); setInteracted(true); setStatus(''); }} placeholder="例：画面のアイデア" /></label>
      <p id="label-help" className="validation-help">1〜{MAX_NOTE_LABEL_LENGTH}文字。空白だけでは登録できません。個人情報は入力しないでください。</p>
      <p id="label-validation" className={`validation-message ${error ? 'has-error' : ''}`} role="status">{error || (showValidation && value.trim() ? '入力できます。' : '入力すると、ここに確認結果が出ます。')}</p>
      <button className="demo-primary" type="submit">ラベルを確認</button><p className="demo-status" role="status">{status}</p>
    </form>
  </div>;
}
