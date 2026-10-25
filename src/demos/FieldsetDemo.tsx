import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
export function FieldsetDemo({ settings }: { settings: Settings }) {
  const [enabled, setEnabled] = useState(settings.availability === 'enabled');
  const [grid, setGrid] = useState(settings.initial === 'guides'); const [gap, setGap] = useState(settings.initial === 'guides' ? '16' : '8'); const groupId = useId();
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">RELATED FIELDS TOGETHER</span><h1>関連する設定をひとまとめにする</h1><p className="demo-muted">グループの利用可否を変えても、選んだ値は保持します。</p>
    <button className="demo-secondary" aria-controls={groupId} onClick={() => setEnabled(!enabled)}>{enabled ? '補助設定を無効にする' : '補助設定を有効にする'}</button>
    <fieldset id={groupId} className="sample-fieldset" disabled={!enabled}><legend>表示の補助設定</legend><label className="fieldset-check"><input type="checkbox" checked={grid} onChange={(event) => setGrid(event.target.checked)} />補助グリッド</label>
      <label className="exploration-field">カードの間隔<select value={gap} onChange={(event) => setGap(event.target.value)}><option value="8">8px</option><option value="16">16px</option></select></label></fieldset>
    <div className={`fieldset-preview ${grid ? 'with-grid' : ''}`} style={{gap:Number(gap)}} aria-label="設定のプレビュー"><span>配置の案</span><span>配色の案</span></div>
    <p role="status">設定は{enabled ? '操作可能' : '利用不可'}。グリッド{grid ? 'あり' : 'なし'} / 間隔{gap}px。</p></div>;
}
