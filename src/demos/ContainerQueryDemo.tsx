import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
const MIN_WIDTH = 240; const MAX_WIDTH = 560; const WIDTH_STEP = 40;
export function ContainerQueryDemo({ settings }: { settings: Settings }) {
  const [width, setWidth] = useState(Number(settings.initial)); const [selected, setSelected] = useState(false); const fieldId = useId();
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">RESPOND TO THE CONTAINER</span><h1>部品の置かれた幅で配置を変える</h1><p className="demo-muted">ブラウザ幅が同じでも、カードの親枠を狭めると縦配置へ変わります。</p>
    <label className="exploration-field" htmlFor={fieldId}>コンテナの指定幅：{width}px<input id={fieldId} type="range" min={MIN_WIDTH} max={MAX_WIDTH} step={WIDTH_STEP} value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
    <div className="query-container" style={{width}}><article className={`query-layout query-${settings.breakpoint}`}><div className="query-art" aria-hidden="true" /><div className="query-copy"><h2>配置のスケッチ</h2><p>同じカードを違う幅の枠へ置くサンプルです。</p><button className="demo-secondary" aria-pressed={selected} onClick={() => setSelected(!selected)}>{selected ? '選択を解除' : 'この案を選ぶ'}</button></div></article></div>
    <p role="status">指定幅{width}px。親枠に収まる範囲で表示。横配置の境界は{settings.breakpoint}px。</p></div>;
}
