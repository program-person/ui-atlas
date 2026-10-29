import { useState } from 'react';
import type { Settings } from '../types.ts';
export function LogicalPropertiesDemo({ settings }: { settings: Settings }) {
  const [rtl, setRtl] = useState(settings.direction === 'rtl');
  return <div className="expanded-demo exlayout"><h1>読む方向に沿った余白</h1><button aria-pressed={rtl} onClick={() => setRtl(!rtl)}>読む方向を反転</button><div className="exlayout-logical" dir={rtl ? 'rtl' : 'ltr'} style={{ paddingInlineStart: settings.indent === 'wide' ? 48 : 16 }}><b lang="en">Start → End</b><p>開始側の余白</p><div className="exlayout-logical-marker">A</div></div><p role="status">方向：{rtl ? 'RTL' : 'LTR'}</p><p>方向の反転は翻訳を行いません。</p></div>;
}
