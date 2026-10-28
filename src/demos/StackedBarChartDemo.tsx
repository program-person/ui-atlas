import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/analytics-demos.css';

const SAMPLE = [{ label: 'A', first: 4, second: 6 }, { label: 'B', first: 8, second: 4 }, { label: 'C', first: 0, second: 0 }];
export function StackedBarChartDemo({ settings }: { settings: Settings }) {
  const [sample, setSample] = useState(settings.initial !== 'empty');
  const [percent, setPercent] = useState(settings.view === 'percent');
  const id = useId();
  const rows = SAMPLE.map(row => sample ? row : { ...row, first: 0, second: 0 });
  const max = percent ? 100 : 20;
  const toWidth = (value: number) => value / max * 270;
  return <div className="expanded-demo workflow-demo analytics-chart"><span className="demo-kicker">PARTS AND TOTALS</span><h1>内訳を積み重ねて比べる</h1><p className="demo-muted">架空の分類別件数。合計0件では割合を算出しません。</p><button className="demo-secondary" onClick={() => setPercent(!percent)}>{percent ? '件数を表示' : '割合を表示'}</button>{' '}<button className="demo-secondary" onClick={() => setSample(!sample)}>{sample ? '0件データを表示' : 'サンプルを表示'}</button>
    <figure className="chart-figure"><svg viewBox="0 0 400 220" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}><title id={`${id}-title`}>分類別の内訳：{percent ? '割合' : '件数'}</title>{[0,max/2,max].map(tick => <g key={tick}><line className="axis-grid" x1={80+toWidth(tick)} x2={80+toWidth(tick)} y1="20" y2="180" /><text x={80+toWidth(tick)} y="200" textAnchor="middle">{tick}</text></g>)}{rows.map((row,index) => { const total = row.first + row.second; const first = percent ? (total ? row.first / total * 100 : 0) : row.first; const second = percent ? (total ? row.second / total * 100 : 0) : row.second; const y = 35 + index * 50; return <g key={row.label}><text x="65" y={y+17} textAnchor="end">{row.label}</text><rect x="80" y={y} width={toWidth(first)} height="25" fill="#235de5" /><rect x={80+toWidth(first)} y={y} width={toWidth(second)} height="25" fill="#e08b31" />{total === 0 && <text x="85" y={y+17}>0件</text>}</g>; })}<text x="215" y="219" textAnchor="middle">{percent ? '割合（%）' : '件数（件）'}</text></svg><figcaption id={`${id}-summary`}>青は作成、橙は確認。{percent ? '各分類の合計を100%とします。0件は割合なし。' : '各分類の合計と内訳を件数で示します。'}</figcaption></figure><p className="legend"><span>作成</span><span>確認</span></p>
    <table className="chart-table"><caption>架空の内訳と合計</caption><thead><tr><th scope="col">分類</th><th scope="col">作成</th><th scope="col">確認</th><th scope="col">合計</th></tr></thead><tbody>{rows.map(row => { const total = row.first+row.second; const display = (value: number) => percent ? total ? `${(value / total * 100).toFixed(1)}%` : '割合なし' : `${value}件`; return <tr key={row.label}><th scope="row">{row.label}</th><td>{display(row.first)}</td><td>{display(row.second)}</td><td>{total}件</td></tr>; })}</tbody></table><p role="status">{sample ? 'サンプル' : '0件データ'}、{percent ? '割合' : '件数'}を表示中。</p></div>;
}
