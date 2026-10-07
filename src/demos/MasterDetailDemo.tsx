import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';
import '../styles/expanded-demos.css';

const detailNotes = ['検索の入口', 'カードの余白', '入力の説明', 'ボタンの反応', 'エラーの案内', 'スマホの配置', '戻る操作', '読み込みの状態'];
export function MasterDetailDemo({ settings }: { settings: Settings }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listScroll = useRef(0);
  const previousIndex = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (selectedIndex !== null) { headingRef.current?.focus(); return; }
    if (previousIndex.current !== null) {
      triggerRefs.current[previousIndex.current]?.focus({ preventScroll: true });
      if (listRef.current) listRef.current.scrollTop = listScroll.current;
    }
  }, [selectedIndex]);
  return <div className={`expanded-demo master-demo density-${settings.density}`}><span className="demo-kicker">KEEP YOUR PLACE</span><h1>選んで読む、元へ戻る。</h1><p className="demo-muted">一覧の位置を残しながら詳細を開く。</p>
    <div className={`master-panes ${selectedIndex !== null ? 'show-detail' : ''}`}>
      <div ref={listRef} className="master-list" role="region" aria-label="ノート一覧">{detailNotes.map((note, index) => <button key={note} ref={(element) => { triggerRefs.current[index] = element; }} aria-current={selectedIndex === index ? 'true' : undefined} onClick={() => {
        listScroll.current = listRef.current?.scrollTop ?? 0; previousIndex.current = index; setSelectedIndex(index);
      }}><small>NOTE {String(index + 1).padStart(2, '0')}</small><span>{note}</span></button>)}</div>
      <section className="master-content" aria-label="ノート詳細">{selectedIndex === null ? <p className="demo-muted">一覧からノートを選んでください。</p> : <><button className="demo-secondary" onClick={() => setSelectedIndex(null)}>一覧に戻る</button><h2 ref={headingRef} tabIndex={-1}>{detailNotes[selectedIndex]}</h2><p>これは架空のノートです。画面の構成を小さく試して、操作しやすさを確認します。</p><span className="sample-pill">検討中</span></>}</section>
    </div>
  </div>;
}
