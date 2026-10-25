import { useId, useState } from 'react';
import type { Settings } from '../types.ts';

const workDurations = [
  { id: 'short', label: '15分', description: '小さな見直し' },
  { id: 'medium', label: '30分', description: 'ひとつの作業' },
  { id: 'long', label: '45分', description: 'じっくり試す' },
] as const;

export function RadioGroupDemo({ settings }: { settings: Settings }) {
  const groupId = useId();
  const [selected, setSelected] = useState(settings.initial === 'first' ? workDurations[0].id : '');
  const duration = workDurations.find((option) => option.id === selected);

  return <div className="expanded-demo choice-demo">
    <span className="demo-kicker">ONE AT A TIME</span><h1>今回の作業時間を選ぶ</h1>
    <p className="demo-muted">候補は3つ。選べるのは1つです。</p>
    <fieldset className="choice-fieldset"><legend>作業時間</legend>
      <div className={`choice-options radio-layout-${settings.layout}`}>
        {workDurations.map((option) => <label className="choice-option" key={option.id}>
          <input type="radio" name={groupId} value={option.id} checked={selected === option.id}
            aria-describedby={`${groupId}-${option.id}`} onChange={() => setSelected(option.id)} />
          <span><strong>{option.label}</strong><small id={`${groupId}-${option.id}`}>{option.description}</small></span>
        </label>)}
      </div>
    </fieldset>
    <section className="choice-preview" aria-label="選択結果"><span className="note-label">WORK SESSION</span>
      <h2 role="status">{duration ? `${duration.label}の作業` : '作業時間を選んでください'}</h2>
      <p>{duration ? duration.description : '上の候補から1つ選ぶと、ここに反映されます。'}</p>
    </section>
    <p className="demo-status">Tabで出入りし、矢印キーで選択を切り替えられます。</p>
  </div>;
}
