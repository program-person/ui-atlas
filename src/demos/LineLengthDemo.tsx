import { useState } from 'react';
import type { Settings } from '../types.ts';
export function LineLengthDemo({ settings }: { settings: Settings }) {
  const [language, setLanguage] = useState('ja');
  return <div className="expanded-demo exlayout"><h1>文章の一行の長さ</h1><button aria-pressed={language === 'en'} onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}>日本語・英語を切り替え</button><article lang={language} className="exlayout-measure" style={{ maxInlineSize: settings.measure === 'short' ? '28ch' : '52ch', lineHeight: settings.leading === 'loose' ? 2 : 1.5 }}>{language === 'ja' ? '文章の幅を変えると、一行の長さと折り返す位置が変わります。行間も合わせて比べ、読み進めるときの目の移動を確かめてください。字幅はフォントによって異なります。' : 'A reading column changes where each sentence wraps. Compare a short column with a wider column and observe how line height changes the space between lines. The ch unit uses the width of the zero glyph.'}</article><p role="status">本文：{language === 'ja' ? '日本語' : '英語'}</p></div>;
}
