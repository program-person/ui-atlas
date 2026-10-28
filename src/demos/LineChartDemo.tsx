import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/analytics-demos.css';

const DATA = { week: [4, 8, 6, 12], month: [10, 0, 15, 18] };
export function LineChartDemo({ settings }: { settings: Settings }) {
  const [period, setPeriod] = useState<'week' | 'month'>(settings.initial === 'month' ? 'month' : 'week');
  const id = useId();
  const values = DATA[period];
  const periodName = period === 'week' ? '週間' : '月間';
  const x = (index: number) => 60 + index * 95;
  const y = (value: number) => 180 - value * 8;
  return <div className="expanded-demo workflow-demo analytics-chart"><span className="demo-kicker">CHANGE OVER TIME</span><h1>時間による件数の変化</h1><p className="demo-muted">固定の架空データ。縦軸は両期間とも0〜20件です。</p><button className="demo-secondary" onClick={() => setPeriod(period === 'week' ? 'month' : 'week')}>{period === 'week' ? '月間を表示' : '週間を表示'}</button>
    <figure className="chart-figure"><svg viewBox="0 0 400 225" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}><title id={`${id}-title`}>{periodName}の架空件数の折れ線グラフ</title>{[0,10,20].map(tick => <g key={tick}><line className="axis-grid" x1="45" x2="370" y1={y(tick)} y2={y(tick)} /><text x="37" y={y(tick)+4} textAnchor="end">{tick}</text></g>)}<polyline points={values.map((value,index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke="#235de5" strokeWidth="3" />{values.map((value,index) => <g key={index}>{settings.markers !== 'hide' && <circle cx={x(index)} cy={y(value)} r="5" fill="#235de5" />}<text x={x(index)} y="199" textAnchor="middle">{index+1}</text></g>)}<text x="200" y="220" textAnchor="middle">{period === 'week' ? '日' : '週'}</text><text x="5" y="12">件</text></svg><figcaption id={`${id}-summary`}>横軸は{period === 'week' ? '日' : '週'}、縦軸は件数です。正確な値は表にあります。</figcaption></figure>
    <table className="chart-table"><caption>{periodName}の架空データ</caption><thead><tr><th scope="col">{period === 'week' ? '日' : '週'}</th><th scope="col">件数</th></tr></thead><tbody>{values.map((value,index) => <tr key={index}><th scope="row">{index+1}</th><td>{value}件</td></tr>)}</tbody></table><p role="status">{periodName}：{values.join('、')}件。</p></div>;
}
