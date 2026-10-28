import { useState } from 'react';
import type { Settings } from '../types.ts';

const samples = [{ id: 'layout', name: '配置の図', color: '#b9caff' }, { id: 'color', name: '配色の図', color: '#b8dec8' }, { id: 'shape', name: '形の図', color: '#f3cba8' }];
function Illustration({ index }: { index: number }) { return <svg viewBox="0 0 180 100" aria-hidden="true"><rect width="180" height="100" rx="8" fill={samples[index].color}/><rect x="18" y="18" width={index === 0 ? 45 : 65} height="64" rx="6" fill="#fff"/><circle cx="130" cy="50" r={index === 2 ? 27 : 20} fill="#fff"/></svg>; }
export function ThumbnailGalleryDemo({ settings }: { settings: Settings }) {
  const [index, setIndex] = useState(settings.initial === 'color' ? 1 : 0);
  return <div className="expanded-demo final-collection"><span className="demo-kicker">THUMBNAIL GALLERY</span><h1>図を選んで見る</h1><p>架空の3つの図を選びます。</p><div className={`final-gallery final-gallery-${settings.position}`}><figure><Illustration index={index}/><figcaption>{samples[index].name}</figcaption></figure><div className="final-thumbnails" aria-label="図の選択">{samples.map((sample, sampleIndex) => <button key={sample.id} aria-label={sample.name} aria-pressed={index === sampleIndex} onClick={() => setIndex(sampleIndex)}><Illustration index={sampleIndex}/><span>{sample.name}</span></button>)}</div></div><p role="status">{samples[index].name}を表示中</p></div>;
}
