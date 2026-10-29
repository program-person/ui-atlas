import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';
export function ScrollSnapDemo({ settings }: { settings: Settings }) {
  const strip = useRef<HTMLDivElement>(null); const [position, setPosition] = useState(1);
  return <div className="expanded-demo exlayout"><h1>区切りに収まるスクロール</h1><button onClick={() => {
    const target = strip.current?.children[1] as HTMLElement | undefined;
    if (target && strip.current) {
      const container = strip.current; const offset = settings.align === 'center' ? (container.clientWidth - target.clientWidth) / 2 : 0;
      container.scrollTo({ left: target.offsetLeft - offset, behavior: 'instant' });
    }
  }}>2枚目へ</button><div ref={strip} tabIndex={0} role="region" aria-label="横にスクロールする資料" className={`exlayout-snap ${settings.align === 'center' ? 'snap-center' : ''}`} style={{ scrollSnapType: settings.strength === 'mandatory' ? 'x mandatory' : 'x proximity' }} onScroll={(event) => {
    const element = event.currentTarget; const bounds = element.getBoundingClientRect();
    const anchor = settings.align === 'center' ? bounds.left + element.clientWidth / 2 : bounds.left;
    const distances = Array.from(element.children).map(child => { const rectangle = child.getBoundingClientRect(); return Math.abs((settings.align === 'center' ? rectangle.left + rectangle.width / 2 : rectangle.left) - anchor); });
    setPosition(distances.indexOf(Math.min(...distances)) + 1);
  }}>{['配置を観察', '配色を観察', '文章を観察'].map((label, index) => <section key={label}><h2>{index + 1}. {label}</h2><p>自動再生せず、スクロールの停止位置をCSSで調整します。</p></section>)}</div><p role="status">表示位置：{position}枚目</p></div>;
}
