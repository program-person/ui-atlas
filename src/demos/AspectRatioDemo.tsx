import { useState } from 'react';
import type { Settings } from '../types.ts';
export function AspectRatioDemo({ settings }: { settings: Settings }) {
  const [green, setGreen] = useState(false);
  return <div className="expanded-demo continuation-demo"><span className="demo-kicker">A FRAME WITH PROPORTION</span><h1>枠の縦横比を揃える</h1><p className="demo-muted">自作の図形で、枠と内容の収まりを比べます。</p>
    <div className="ratio-sample" style={{ aspectRatio: settings.ratio }}><svg viewBox="0 0 320 180" preserveAspectRatio={settings.fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'} role="img" aria-label={green ? '緑の山と丸い月の図' : '青い山と丸い月の図'}><rect width="320" height="180" fill={green ? '#dff1e5' : '#e4ecff'} /><circle cx="260" cy="38" r="22" fill="#c07f21" /><path d="M0 180 L90 40 L180 180Z" fill={green ? '#438d69' : '#6086cb'} /><path d="M110 180 L220 65 L320 180Z" fill={green ? '#1e6143' : '#2b4d91'} /></svg></div>
    <div className="continuation-actions"><button className="demo-secondary" onClick={() => setGreen(!green)}>別の図形を見る</button></div><p role="status">枠の比率：{settings.ratio === '16 / 9' ? '16:9' : '1:1'} / {settings.fit === 'cover' ? '枠を埋める・必要なら切り取る' : '図全体を収める・余白を許可'}</p></div>;
}
