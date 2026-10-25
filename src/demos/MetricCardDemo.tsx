import { useState } from 'react';
import type { Settings } from '../types.ts';
const metrics = { notes:{label:'作成メモ数',week:[12,9],month:[30,32]}, reviews:{label:'確認した項目数',week:[8,8],month:[20,15]} } as const;
export function MetricCardDemo({ settings }: { settings: Settings }) {
  const [month, setMonth] = useState(settings.initial === 'month'); const metric = metrics[settings.metric === 'reviews' ? 'reviews' : 'notes']; const [current,previous] = month ? metric.month : metric.week; const difference = current - previous; const days = month ? 30 : 7;
  return <div className="expanded-demo workflow-demo"><span className="demo-kicker">A NUMBER WITH ITS CONTEXT</span><h1>指標に期間と比較を添える</h1><p className="demo-muted">固定の架空データです。実際の記録を取得しません。</p><button className="demo-secondary" onClick={() => setMonth(!month)}>{month ? '週間を表示' : '月間を表示'}</button><article className="metric-card"><span className="note-label">直近{days}日間 / 架空データ</span><h2>{metric.label}</h2><data className="metric-value" value={current}>{current}件</data><p>その前の{days}日間：{previous}件</p><p className="metric-difference">{difference === 0 ? '前の期間と同じ件数' : difference > 0 ? `前の期間より${difference}件多い` : `前の期間より${Math.abs(difference)}件少ない`}</p></article><p role="status">{metric.label}：直近{days}日間は{current}件、前の同じ長さの期間は{previous}件。</p></div>;
}
