import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/analytics-demos.css';

const DATA = { a: [{ label: 'A', x: 2, y: 3 }, { label: 'B', x: 4, y: 7 }, { label: 'C', x: 8, y: 5 }], b: [{ label: 'A', x: 1, y: 8 }, { label: 'B', x: 5, y: 4 }, { label: 'C', x: 9, y: 2 }] };
export function ScatterPlotDemo({ settings }: { settings: Settings }) {
  const [sample, setSample] = useState<'a' | 'b'>(settings.initial === 'b' ? 'b' : 'a');
  const id = useId();
  const points = DATA[sample];
  const x = (value: number) => 50 + value * 30;
  const y = (value: number) => 180 - value * 16;
  return <div className="expanded-demo workflow-demo analytics-chart"><span className="demo-kicker">TWO VARIABLES</span><h1>2つの数値を点で見る</h1><p className="demo-muted">架空の作業時間と件数。点の並びだけで因果関係は判断できません。</p><button className="demo-secondary" onClick={() => setSample(sample === 'a' ? 'b' : 'a')}>サンプル{sample === 'a' ? 'B' : 'A'}を表示</button>
    <figure className="chart-figure"><svg viewBox="0 0 400 225" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}><title id={`${id}-title`}>サンプル{sample.toUpperCase()}の散布図</title>{[0,5,10].map(tick => <g key={tick}><line className="axis-grid" x1="50" x2="350" y1={y(tick)} y2={y(tick)} /><text x="40" y={y(tick)+4} textAnchor="end">{tick}</text><text x={x(tick)} y="198" textAnchor="middle">{tick}</text></g>)}{points.map(point => <g key={point.label}><circle cx={x(point.x)} cy={y(point.y)} r="6" fill="#235de5" />{settings.labels !== 'hide' && <text x={x(point.x)+9} y={y(point.y)-7}>{point.label}</text>}</g>)}<text x="200" y="220" textAnchor="middle">作業時間（時間）</text><text x="5" y="12">件</text></svg><figcaption id={`${id}-summary`}>横軸は時間、縦軸は件数。各点の値は表にあります。</figcaption></figure>
    <table className="chart-table"><caption>サンプル{sample.toUpperCase()}の架空データ</caption><thead><tr><th scope="col">点</th><th scope="col">作業時間</th><th scope="col">件数</th></tr></thead><tbody>{points.map(point => <tr key={point.label}><th scope="row">{point.label}</th><td>{point.x}時間</td><td>{point.y}件</td></tr>)}</tbody></table><p role="status">サンプル{sample.toUpperCase()}を表示中。</p></div>;
}
