import { useState } from 'react';
import type { Settings } from '../types.ts';
export function DescriptionListDemo({ settings }: { settings: Settings }) {
  const [second, setSecond] = useState(settings.initial === 'layout');
  const entries = second ? [['題名','配置のスケッチ'],['種類','レイアウト'],['状態','検討中'],['補足','一覧と詳細の位置関係を比較するための架空の記録です。']] : [['題名','余白の記録'],['種類','見た目'],['状態','確認済み'],['補足','カードの余白を比較するための架空の記録です。']];
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">LABELS AND THEIR VALUES</span><h1>項目と値を対応させる</h1><p className="demo-muted">1件の記録を、ラベルと値の組で読みます。</p><button className="demo-secondary" onClick={() => setSecond(!second)}>別のサンプルを見る</button>
    <dl className={`sample-description description-${settings.layout}`}>{entries.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p role="status">表示中：{entries[0][1]}</p></div>;
}
