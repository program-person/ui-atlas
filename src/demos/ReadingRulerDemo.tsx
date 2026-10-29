import { useState, useRef } from 'react';
import type { Settings } from '../types.ts';

export function ReadingRulerDemo({ settings }: { settings: Settings }) {
  const [current, setCurrent] = useState(0);
  const paragraphs = ['朝の机にノートを置き、今日見る図を一つ選ぶ。余白を残すと、後から気付いたことを書き足せる。', '図の大きさを少し変えて、本文との関係を比べる。同じ内容でも、並べる順序によって読み進める場所が変わる。', '最後に見出しを確かめ、短い記録を残す。次に開くときに、どこを見たか分かるようにしておく。'];
  const sections = useRef<(HTMLDivElement | null)[]>([]);
  function choose(index: number) {
    if (index < 0 || index >= paragraphs.length) return;
    setCurrent(index);
    sections.current[index]?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  return <div className="cont3-demo"><h1>読む段落を示すガイド</h1>
    <div className="cont3-actions"><button aria-disabled={current === 0} onClick={() => choose(current - 1)}>前の段落</button><button aria-disabled={current === 2} onClick={() => choose(current + 1)}>次の段落</button></div>
    <p role="status">現在：段落{current + 1}</p>
    <div className="cont3-scroll" role="region" aria-label="段落ごとの読み物" tabIndex={0}>
      {paragraphs.map((paragraph, index) => <div key={paragraph} ref={node => { sections.current[index] = node; }} className="cont3-panel" style={{ borderWidth: current === index ? 3 : 1, background: settings.mode === 'dim' && current !== index ? '#edf0e9' : '#fff' }}>
        <button aria-pressed={current === index} onClick={() => choose(index)}>段落{index + 1}を選ぶ</button><p>{paragraph}</p>{current === index && <strong>現在の段落</strong>}
      </div>)}
    </div>
  </div>;
}
