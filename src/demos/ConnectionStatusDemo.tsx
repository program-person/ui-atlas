import { useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/final-state-demos.css';

export function ConnectionStatusDemo({ settings }: { settings: Settings }) {
  const [online, setOnline] = useState(settings.initial !== 'offline');
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  function toggleConnection() { const next = !online; setOnline(next); if (next && pending && settings.recovery === 'auto') { setPending(false); setConfirmed(true); } }
  function send() { if (!pending || !online) return; setPending(false); setConfirmed(true); }
  return <div className="expanded-demo workflow-demo final-state-demo"><span className="demo-kicker">CONNECTION AND SYNC</span><h1>接続と送信状態</h1><p>接続も送信も架空の状態で、実通信はありません。</p><div className="final-actions"><button className="demo-secondary" onClick={toggleConnection}>{online ? 'オフラインにする' : 'オンラインにする'}</button><button className="demo-secondary" onClick={() => { setPending(true); setConfirmed(false); }}>変更を作る</button><button className="demo-secondary" aria-disabled={!pending || !online} onClick={send}>保留中の変更を送信</button></div><p role="status">接続：{online ? 'オンライン' : 'オフライン'}。変更：{pending ? '送信待ち' : confirmed ? '送信確認済み（架空）' : '変更なし'}。</p><p>{settings.recovery === 'auto' ? 'オンラインへの復帰時に待機中の変更を送信したことにします。' : '復帰後に送信ボタンを押します。'}</p></div>;
}
