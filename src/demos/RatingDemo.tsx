import { useId, useState } from 'react';
import type { Settings } from '../types.ts';
export function RatingDemo({ settings }: { settings: Settings }) {
  const id = useId(); const [rating, setRating] = useState(settings.initial === 'three' ? 3 : 0);
  return <div className="expanded-demo final-input-demo"><span className="demo-kicker">ONE TO FIVE</span><h1>架空の案を評価する</h1><p>1〜5から1つ選び、未選択に戻せます。</p>
    <fieldset className="final-rating"><legend>評価</legend><div>{[1, 2, 3, 4, 5].map((number) => <label key={number}><input type="radio" name={id} value={number} checked={rating === number} onChange={() => setRating(number)} /><span>{settings.appearance === 'numbers' ? number : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.5-5.9-3.1-5.9 3.1 1.1-6.5L2.5 9 9 8z" /></svg>}<span className="final-visually-hidden">{settings.appearance === 'numbers' ? '' : `${number}点`}</span></span></label>)}</div></fieldset>
    <button className="demo-secondary" type="button" onClick={() => { if (rating) setRating(0); }} aria-disabled={!rating}>評価をクリア</button><p role="status">{rating ? `${rating} / 5点` : '未選択'}</p><p>矢印キーで選択できます。</p></div>;
}
