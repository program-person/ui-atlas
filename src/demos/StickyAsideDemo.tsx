import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function StickyAsideDemo({ settings }: { settings: Settings }) {
  const scroll = useRef<HTMLDivElement>(null); const [position, setPosition] = useState(0);
  return <div className="expanded-demo exlayout"><h1>本文に添える補足</h1><button onClick={() => scroll.current?.scrollTo({ top: 180, behavior: 'instant' })}>本文の途中へ</button><p role="status">スクロール位置：{position}px</p><div ref={scroll} tabIndex={0} role="region" aria-label="記事と補足のスクロール領域" onScroll={(event) => setPosition(Math.round(event.currentTarget.scrollTop))} className="exlayout-scroll"><div className={`exlayout-aside-grid ${settings.side === 'start' ? 'aside-start' : ''}`}><article>{Array.from({ length: 7 }, (_, index) => <section key={index}><h2>観察 {index + 1}</h2><p>本文を読みながら、補足の位置を確かめます。狭い枠では本文のあとに補足を表示します。</p></section>)}</article><aside style={{ top: settings.offset === 'roomy' ? 32 : 8 }}><b>観察の手引き</b><p>目的・順序・次の操作</p></aside></div></div></div>;
}
