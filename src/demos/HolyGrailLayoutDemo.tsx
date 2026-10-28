import { useState } from 'react';
import type { Settings } from '../types.ts';
const contents = [{title:'配置の案',text:'見出しと主操作を近づけ、本文の読み始めを揃える。'},{title:'配色の案',text:'背景の明るさを揃えて、状態は文字でも伝える。'}];
export function HolyGrailLayoutDemo({ settings }: { settings: Settings }) {
  const [selected, setSelected] = useState(0); const [supplement, setSupplement] = useState(settings.supplement !== 'hidden');
  return <div className="expanded-demo composition-demo"><span className="demo-kicker">HEADER / NAV / CONTENT / ASIDE</span><h1>役割を分けて画面を組む</h1><p className="demo-muted">枠が640px以上で3列、それ未満は元の文書順の1列になります。</p><button className="demo-secondary" aria-pressed={supplement} onClick={() => setSupplement(!supplement)}>{supplement ? '補足を隠す' : '補足を表示'}</button>
    <div className="holy-layout-container"><div className={`holy-layout ${supplement ? '' : 'without-supplement'} ${settings.proportion === 'wide' ? 'wide-navigation' : ''}`}>
      <header className="holy-header">架空のノート画面</header><nav className="holy-navigation" aria-label="デモのノート選択"><h2>一覧</h2>{contents.map((content,index) => <button key={content.title} className="demo-secondary" aria-current={selected === index ? 'true' : undefined} onClick={() => setSelected(index)}>{content.title}</button>)}</nav>
      <section className="holy-content" aria-label="選択したノート"><span className="note-label">CONTENT</span><h2>{contents[selected].title}</h2><p>{contents[selected].text}</p></section>{supplement && <aside className="holy-aside" aria-label="補足"><h2>補足</h2><p>左から一覧、本文、補足。狭い枠では上から同じ順に並びます。</p></aside>}<footer className="holy-footer">架空データだけの画面です。</footer>
    </div></div><p role="status">選択中：{contents[selected].title}。補足は{supplement ? '表示中' : '非表示'}です。</p></div>;
}
