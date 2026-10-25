import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
export function FlipCardDemo({ settings }: { settings: Settings }) {
  const [back, setBack] = useState(settings.initial === 'back'); const cardId = useId();
  return <div className="expanded-demo exploration-demo"><span className="demo-kicker">TWO SIDES, ONE CARD</span><h1>表と裏を切り替える</h1><p className="demo-muted">ボタンで切り替えます。動きを減らす設定では回転を省きます。</p>
    <div id={cardId} className={`flip-scene ${settings.motion === 'instant' ? 'flip-instant' : ''}`}><div className={`flip-inner ${back ? 'is-back' : ''}`}><section className="flip-face flip-front" aria-hidden={back}><span className="note-label">FRONT / 問い</span><h2>何を近くに置く？</h2><p>画面の中で、関係のある内容を考えます。</p></section><section className="flip-face flip-back" aria-hidden={!back}><span className="note-label">BACK / 答えの例</span><h2>目的と次の操作</h2><p>目的を読んだ後、すぐに次の操作へ進めるようにします。</p></section></div></div>
    <button className="demo-primary" aria-controls={cardId} aria-pressed={back} onClick={() => setBack(!back)}>カードを裏返す</button><p role="status">{back ? '裏面を表示しています。' : '表面を表示しています。'}</p></div>;
}
