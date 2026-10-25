import { useState } from 'react';
import type { Settings } from '../types.ts';

const slides = [{ title: '余白から考える', text: '必要な情報の周りに余白を置く。', color: '#e8efff' }, { title: '色を比べる', text: '操作と状態を文字でも区別する。', color: '#e7f3ed' }, { title: '並びを試す', text: '見比べたい内容を近くに置く。', color: '#fff0df' }];
export function CarouselDemo({ settings }: { settings: Settings }) {
  const [index, setIndex] = useState(settings.initial === 'last' ? slides.length - 1 : 0);
  const loop = settings.loop === 'yes';
  function move(direction: number) { setIndex((current) => (current + direction + slides.length) % slides.length); }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">ONE SLIDE IN VIEW</span><h1>内容を1枚ずつ見せる</h1><p className="demo-muted">自動では進まず、ボタンで切り替わります。</p>
    <section aria-label="画面づくりのヒント" aria-roledescription="カルーセル">
      <div className="growth-slide" role="group" aria-roledescription="スライド" aria-label={`${index + 1} / ${slides.length}`} style={{ background: slides[index].color }}><span className="note-label">TIP {index + 1}</span><h2>{slides[index].title}</h2><p>{slides[index].text}</p></div>
      <div className="growth-actions"><button className="demo-secondary" disabled={!loop && index === 0} onClick={() => move(-1)}>前のスライド</button><button className="demo-primary" disabled={!loop && index === slides.length - 1} onClick={() => move(1)}>次のスライド</button></div>
      <div className="growth-actions" aria-label="スライドを選ぶ">{slides.map((slide, slideIndex) => <button className="slide-picker" key={slide.title} aria-label={`${slideIndex + 1}枚目へ`} aria-current={index === slideIndex ? 'true' : undefined} onClick={() => setIndex(slideIndex)}>{slideIndex + 1}</button>)}</div>
      <p role="status">{index + 1} / {slides.length}枚目：{slides[index].title}</p>
    </section></div>;
}
