import type { DemoId } from '../types.ts';

export function Thumbnail({ id }: { id: DemoId }) {
  return <div className={`thumbnail thumbnail-${id}`} aria-hidden="true">
    {id === 'sidebar' && <div className="mini-window"><div className="mini-sidebar"><i /><i /><i /><i /></div><div className="mini-content"><b /><div><i /><i /></div><b /></div></div>}
    {id === 'drawer' && <div className="mini-window"><div className="mini-content"><b /><b /><b /></div><div className="mini-drawer"><span /><b /><b /><i /></div></div>}
    {id === 'modal' && <div className="mini-window mini-modal-window"><div className="mini-dialog"><span /><b /><b /><i /></div></div>}
    {id === 'hover-feedback' && <div className="mini-hover">試してみる <span>↗</span></div>}
    {id === 'search-filter' && <div className="mini-window mini-search-window"><div className="mini-search" /><div className="mini-chips"><i /><i /><i /></div><b /><b /></div>}
    {id === 'tabs' && <div className="mini-tabs"><div><span>概要</span><span>メモ</span><span>履歴</span></div><b /><b /><b /></div>}
    {id === 'accordion' && <div className="mini-accordion"><span>何を作る？ <i>−</i></span><div><b /><b /></div><span>配置は？ <i>+</i></span><span>操作は？ <i>+</i></span></div>}
  </div>;
}
