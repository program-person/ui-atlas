import { useState, useLayoutEffect, useRef } from 'react';
import type { Settings } from '../types.ts';

export function LogTailDemo({ settings }: { settings: Settings }) {
  const [count, setCount] = useState(8);
  const [following, setFollowing] = useState(settings.mode === 'follow');
  const container = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { if (following && container.current) container.current.scrollTop = container.current.scrollHeight; }, [count, following]);
  return <div className="cont3-demo"><h1>ログの末尾へ追従</h1>
    <div className="cont3-actions"><button aria-pressed={following} onClick={() => setFollowing(value => !value)}>末尾へ追従</button><button aria-disabled={count === 20} onClick={() => setCount(value => Math.min(20, value + 1))}>架空ログを追加</button></div>
    <p role="status">ログ {count} / 20件・{following ? '追従中' : '位置を保持'}</p>
    <div ref={container} className="cont3-scroll" style={{ height: 200 }} role="region" aria-label="架空の処理ログ" tabIndex={0} onScroll={event => {
      const node = event.currentTarget;
      if (following && node.scrollTop + node.clientHeight < node.scrollHeight - 1) setFollowing(false);
    }}><ol>{Array.from({ length: count }, (_, index) => <li key={index} style={{ minHeight: 44 }}>記録{index + 1}：配置の確認を記録しました。</li>)}</ol></div>
  </div>;
}
