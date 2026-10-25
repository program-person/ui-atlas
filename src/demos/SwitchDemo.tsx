import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

export function SwitchDemo({ settings }: { settings: Settings }) {
  const [enabled, setEnabled] = useState(settings.initial === 'on');
  const labelId = useId();
  const helpId = useId();
  const disabled = settings.availability === 'disabled';

  return <div className="expanded-demo choice-demo">
    <span className="demo-kicker">DISPLAY PREFERENCES</span><h1>ノートの表示を整える</h1>
    <p className="demo-muted">切り替えた結果を、その場で確認できます。</p>
    <div className="switch-setting">
      <div><strong id={labelId}>補助グリッド</strong><p id={helpId}>{disabled ? '閲覧モードでは変更できません。' : 'ノートの背景に方眼を表示します。'}</p></div>
      <div className="switch-with-state"><button type="button" role="switch" className="sample-switch"
        aria-checked={enabled} aria-labelledby={labelId} aria-describedby={helpId} disabled={disabled}
        onClick={() => setEnabled(!enabled)}><span /></button><span aria-hidden="true">{enabled ? 'オン' : 'オフ'}</span></div>
    </div>
    <section className={`choice-preview ${enabled ? 'with-grid' : ''}`} aria-label="表示結果">
      <span className="note-label">IDEA NOTE</span><h2>余白から考える</h2><p>カードの配置を、小さく試す。</p>
    </section>
    <p className="demo-status" role="status">補助グリッド：{enabled ? 'オン' : 'オフ'}</p>
  </div>;
}
