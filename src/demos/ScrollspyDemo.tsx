import { useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const ARTICLE_HEIGHT = 260;
const ACTIVE_OFFSET = 24;
const sections = [{ title: '目的', text: '架空のノート画面を考えます。検索から必要な記録を探せるようにします。' }, { title: '構成', text: '検索欄、一覧、詳細の順に並べます。使う場面に合わせて表示幅を確認します。' }, { title: '確認', text: '操作、読みやすさ、キーボードでの移動を確かめます。' }];
export function ScrollspyDemo({ settings }: { settings: Settings }) {
  const [active, setActive] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  function jump(index: number) {
    const root = articleRef.current; const section = sectionRefs.current[index];
    const heading = section?.querySelector<HTMLHeadingElement>('h2');
    if (!root || !heading) return;
    root.scrollTop += heading.getBoundingClientRect().top - root.getBoundingClientRect().top;
    setActive(index);
    heading.focus({ preventScroll: true });
  }
  return <div className="expanded-demo growth-demo"><span className="demo-kicker">FOLLOW THE READING POSITION</span><h1>読んでいる場所を示す</h1><p className="demo-muted">記事の枠内をスクロールして試せます。</p>
    <div className={`scrollspy-layout spy-${settings.layout}`}><nav aria-label="記事の見出し" className="scrollspy-nav">{sections.map((section, index) => <button key={section.title} aria-current={active === index ? 'location' : undefined} onClick={() => jump(index)}>{section.title}</button>)}</nav>
      <div ref={articleRef} className="scrollspy-article" role="region" aria-label="デモの記事" tabIndex={0} style={{ height: ARTICLE_HEIGHT }} onScroll={(event) => {
        const root = event.currentTarget; const top = root.getBoundingClientRect().top;
        let next = 0;
        sectionRefs.current.forEach((section, index) => {
          const heading = section?.querySelector('h2');
          if (heading && heading.getBoundingClientRect().top <= top + ACTIVE_OFFSET) next = index;
        });
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 1) next = sections.length - 1;
        setActive(next);
      }}>{sections.map((section, index) => <section key={section.title} ref={(element) => { sectionRefs.current[index] = element; }} style={{ minHeight: settings.length === 'long' ? 440 : 300 }}><h2 tabIndex={-1}>{section.title}</h2><p>{section.text}</p><p className="demo-muted">続きの見出しは、この枠の下にあります。</p></section>)}</div>
    </div><p className="demo-status">現在：{sections[active].title}。スクロールでフォーカスは移動しません。</p></div>;
}
