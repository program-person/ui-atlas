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
    {id === 'popover' && <div className="mini-popover"><b>表示設定</b><div>✓ 余白を調整</div><span>オプション ⋯</span></div>}
    {id === 'minimal' && <div className="mini-style"><span>01 / NOTE</span><strong>小さなアイデア</strong><b /><i>保存</i></div>}
    {id === 'glassmorphism' && <div className="mini-style mini-glass"><span>GLASS NOTE</span><strong>ひらめきを残す</strong><b /><i>保存</i></div>}
    {id === 'neobrutalism' && <div className="mini-style mini-brutal"><span>IDEA / 01</span><strong>小さく作って、試す。</strong><i>保存</i></div>}
    {id === 'split-view' && <div className="mini-layout"><div>ノート<b /><b /></div><section>作業領域<b /><b /></section></div>}
    {id === 'bento-grid' && <div className="mini-bento"><i /><i /><i /></div>}
    {id === 'master-detail' && <div className="mini-layout"><div>一覧<b /><b /><b /></div><section>詳細<b /><b /><span>← 戻る</span></section></div>}
    {id === 'inline-validation' && <div className="mini-validation">ノートのラベル<b>長いラベルを入力…</b><span>12文字以内で入力してください</span></div>}
    {id === 'skeleton-loading' && <div className="mini-skeleton"><div><b /><b /></div><div><b /><b /></div></div>}
    {id === 'undo-feedback' && <div className="mini-undo"><b /><b /><div>非表示にしました　↶ 取り消す</div></div>}
    {id === 'command-palette' && <div className="mini-command"><div>⌕ 操作を検索　Ctrl K</div><span>ノートを開く　↵</span><span>検索を開く</span></div>}
    {id === 'fade-slide' && <div className="mini-fade"><b /><span>↑</span></div>}
    {id === 'stagger' && <div className="mini-stagger"><i /><i /><i /></div>}
  </div>;
}
