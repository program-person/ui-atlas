import { Continuation3Thumbnail } from './Continuation3Thumbnail.tsx';
import { Growth2Thumbnail } from './Growth2Thumbnail.tsx';
import { ExpansionThumbnail } from './ExpansionThumbnail.tsx';
import type { DemoId } from '../types.ts';

export function Thumbnail({ id }: { id: DemoId }) {
  return <div className={`thumbnail thumbnail-${id}`} aria-hidden="true">
    <Continuation3Thumbnail id={id} />
    <Growth2Thumbnail id={id} />
    <ExpansionThumbnail id={id} />
    {id === 'input-mask' && <div className="mini-workflow"><span>整理コード</span><b>123-456</b><span>6桁で入力完了</span></div>}
    {id === 'rating' && <div className="mini-workflow"><span>評価を選ぶ</span><b>1　2　3　4　5</b><span>未選択に戻せる</span></div>}
    {id === 'date-range' && <div className="mini-workflow"><span>開始日　→　終了日</span><b>2026-10-05〜12</b><span>期間を検証</span></div>}
    {id === 'time-input' && <div className="mini-workflow"><span>時刻を選ぶ</span><b>09:00　15分刻み</b><span>範囲と刻みを検証</span></div>}
    {id === 'copy-button' && <div className="mini-workflow"><span>GRID-GUIDE</span><b>サンプルをコピー</b><span>失敗時は手動選択</span></div>}
    {id === 'form-review' && <div className="mini-workflow"><span>編集 → 確認 → 完了</span><b>内容を見直す</b><span>戻って修正できる</span></div>}
    {id === 'notification-center' && <div className="mini-workflow"><span>通知センター</span><b>未読3件</b><span>個別・すべて既読</span></div>}
    {id === 'connection-status' && <div className="mini-workflow"><span>オフライン</span><b>保留中　2件</b><span>接続後に送信</span></div>}
    {id === 'activity-feed' && <div className="mini-workflow"><span>操作の記録</span><b>新しい順 ↑</b><span>イベントを追加</span></div>}
    {id === 'polling-control' && <div className="mini-workflow"><span>1秒ごとに更新</span><b>更新回数：2回</b><span>一時停止・再開</span></div>}
    {id === 'queue-controls' && <div className="mini-workflow"><span>待機 → 作業中 → 完了</span><b>3件の処理</b><span>進行を手動で確認</span></div>}
    {id === 'history-controls' && <div className="mini-workflow"><span>青 → 緑 → 紫</span><b>元に戻す │ やり直す</b><span>変更履歴をたどる</span></div>}
    {id === 'calendar-grid' && <div className="mini-workflow"><span>2026年10月</span><b>日 月 火 水 木 金 土</b><span>日付を選択</span></div>}
    {id === 'kanban-board' && <div className="mini-workflow"><span>待機 │ 作業中 │ 完了</span><b>3件の架空カード</b><span>隣の列へ移動</span></div>}
    {id === 'comparison-table' && <div className="mini-workflow"><span>架空の道具を比較</span><b>オフライン ○ │ ×</b><span>違いのある行だけ</span></div>}
    {id === 'zoom-controls' && <div className="mini-workflow"><span>表示を拡大・縮小</span><b>−　100%　＋</b><span>50〜200%</span></div>}
    {id === 'thumbnail-gallery' && <div className="mini-workflow"><span>主表示とサムネイル</span><b>配置 │ 配色 │ 文章</b><span>選択して切り替え</span></div>}
    {id === 'hierarchical-checkboxes' && <div className="mini-workflow"><span>見た目　[一部選択]</span><b>☑ 余白　□ 配色</b><span>親子の選択状態</span></div>}
    {id === 'full-bleed-layout' && <div className="mini-workflow"><span>本文は中央の列</span><b>図の帯は端まで</b><span>幅の使い分け</span></div>}
    {id === 'card-footer-alignment' && <div className="mini-workflow"><span>文章量の違うカード</span><b>操作の位置を揃える</b><span>同じ行の下端へ</span></div>}
    {id === 'reading-progress' && <div className="mini-workflow"><span>文章のスクロール位置</span><b>━━━ 45% ───</b><span>作業の完了とは別</span></div>}
    {id === 'back-to-top' && <div className="mini-workflow"><span>長い文章の途中</span><b>この文章の先頭へ ↑</b><span>見出しへフォーカス</span></div>}
    {id === 'media-object' && <div className="mini-workflow"><span>◼　余白のスケッチ</span><b>図と本文をまとめる</b><span>狭い枠では縦へ</span></div>}
    {id === 'holy-grail-layout' && <div className="mini-workflow"><b>ヘッダー</b><span>一覧 │ 本文 │ 補足</span><b>フッター</b></div>}
    {id === 'sticky-footer' && <div className="mini-workflow" style={{minHeight:100}}><b>メモページ</b><span>短い本文</span><span style={{marginTop:25}}>ページの終わり</span></div>}
    {id === 'line-chart' && <div className="mini-workflow"><svg viewBox="0 0 180 60" style={{width:"100%",height:60}}><polyline points="10,45 60,30 110,38 165,10" fill="none" stroke="#235de5" strokeWidth="3" /></svg><span>4 → 8 → 6 → 12件</span></div>}
    {id === 'stacked-bar-chart' && <div className="mini-workflow"><div style={{display:"flex",height:16}}><i style={{width:"40%",background:"#235de5"}}/><i style={{width:"60%",background:"#e08b31"}}/></div><b>内訳と合計</b><span>件数 ⇄ 割合</span></div>}
    {id === 'scatter-plot' && <div className="mini-workflow"><svg viewBox="0 0 180 60" style={{width:"100%",height:60}}><circle cx="30" cy="45" r="5" fill="#235de5"/><circle cx="75" cy="15" r="5" fill="#235de5"/><circle cx="145" cy="30" r="5" fill="#235de5"/></svg><span>2つの数値を点へ</span></div>}
    {id === 'sort-controls' && <div className="mini-workflow"><b>記録数 │ 昇順</b><span>森の記録　2件</span><span>青いノート　4件</span></div>}
    {id === 'filter-chips' && <div className="mini-workflow"><b>自然 ×　夜 ×</b><span>適用中の条件を個別に解除</span><span>1件 / 月の観察</span></div>}
    {id === 'segmented-control' && <div className="mini-workflow"><b>カード │ リスト</b><span>同じ3件の表示形式</span><span>一つだけ選択</span></div>}
    {id === 'heatmap' && <div className="mini-workflow"><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3}}>{[2,5,8,0,3,6,4,7,1].map((n,i)=><span key={i} style={{background:n>5?"#3366c5":"#e1eaff",color:n>5?"white":"#17233c",textAlign:"center"}}>{n}</span>)}</div></div>}
    {id === 'grouped-list' && <div className="mini-workflow"><b>見た目（2件）</b><span>余白の案 / 色の案</span><b>配置（2件）</b></div>}
    {id === 'expandable-card' && <div className="mini-workflow"><b>配置の案</b><span>概要はいつも表示</span><b>詳細を開く　⌄</b></div>}
    {id === 'donut-chart' && <div className="mini-workflow"><div style={{position:"relative",width:52,height:52,borderRadius:"50%",background:"conic-gradient(#235de5 0 60%, #9c6200 60% 90%, #64758f 90% 100%)"}}><i style={{position:"absolute",inset:10,borderRadius:"50%",background:"white"}} /></div><span>確認済み60%・確認中30%</span><b>合計10件</b></div>}
    {id === 'bar-chart' && <div className="mini-workflow"><div style={{display:"flex",alignItems:"end",gap:10,height:55}}><i style={{display:"block",width:24,height:18,background:"#235de5"}} /><i style={{display:"block",width:24,height:36,background:"#235de5"}} /><i style={{display:"block",width:24,height:54,background:"#235de5"}} /></div><span>配置4　配色8　要点12</span></div>}
    {id === 'metric-card' && <div className="mini-workflow"><span>作成メモ数 / 7日間</span><b style={{fontSize:24}}>12件</b><span>前の期間より3件多い</span></div>}
    {id === 'split-button' && <div className="mini-workflow"><b>プレビューを表示 │ ▾</b><span>要点を表示</span><span>補助枠を切り替え</span></div>}
    {id === 'unsaved-changes' && <div className="mini-workflow"><b>未反映の変更があります</b><span>移動をやめる</span><span>変更を戻して移動</span></div>}
    {id === 'autosave-feedback' && <div className="mini-workflow"><span>架空のラベル　入力中…</span><b>入力停止を待機</b><span>疑似保存済みの値を別に表示</span></div>}
    {id === 'optimistic-update' && <div className="mini-workflow"><span>表示中：固定中</span><span>確定済み：未固定</span><b>処理の結果を待機…</b></div>}
    {id === 'bulk-actions' && <div className="mini-workflow"><b>2件選択　まとめて確認</b><span>☑ 配置の案　未確認</span><span>☑ 配色の案　未確認</span></div>}
    {id === 'transfer-list' && <div className="mini-workflow"><span>候補　☑ 配置の案</span><b>採用へ移す →</b><span>採用　要点メモ</span></div>}
    {id === 'dependent-select' && <div className="mini-workflow"><span>分類：レイアウト ⌄</span><b>パターン：グリッド ⌄</b><span>親の選択で候補を更新</span></div>}
    {id === 'conditional-fields' && <div className="mini-workflow"><span>○ 基本だけ　● 補足も入力</span><b>補足の入力欄</b><span>選択に応じて表示</span></div>}
    {id === 'inline-edit' && <div className="mini-workflow"><span>配置の案　編集</span><b>題名を入力…</b><span>変更を反映　取り消す</span></div>}
    {id === 'focus-ring' && <div className="mini-exploration"><span>Tabで操作位置を確認</span><b style={{display:"inline-block",outline:"2px solid #1746b5",outlineOffset:2,padding:6}}>案1</b><span>選択とは別の枠線</span></div>}
    {id === 'spacing-scale' && <div className="mini-exploration"><b>4px × 1・2・4</b><span style={{marginTop:12}}>見出しと本文</span><span>余白を揃える</span></div>}
    {id === 'gradient-surface' && <div className="mini-exploration" style={{background:"linear-gradient(45deg,#dce9ff,#eae1ff)",color:"#25364e"}}><span>青から紫へ</span><b>余白から広がる</b><span>方向 45度</span></div>}
    {id === 'elevation' && <div className="mini-exploration" style={{boxShadow:"6px 6px 12px #25364e35"}}><span>同じカード</span><b>影の段階 2</b></div>}
    {id === 'flip-card' && <div className="mini-exploration" style={{background:"#e5f3ec"}}><span>FRONT ⇄ BACK</span><b>目的と次の操作</b><span>カードを裏返す</span></div>}
    {id === 'image-comparison' && <div className="mini-exploration"><div style={{height:55,background:"linear-gradient(90deg,#285db7 50%,#b6c1d2 50%)",borderRadius:5}} /><span>変更後 ← │ → 変更前</span></div>}
    {id === 'multi-column' && <div className="mini-exploration" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><span>文章を上から下へ。<br />次に右の段へ。</span><span>文章の続き。<br />段に流し込む。</span></div>}
    {id === 'container-query' && <div className="mini-exploration"><span>親枠 280px → 480px</span><b>図形</b><span>↓ 縦配置 ⇔ 横配置</span></div>}
    {id === 'dual-range' && <div className="mini-exploration"><span>下限　20点　●───</span><span>上限　80点　───●</span><b>20〜80点</b></div>}
    {id === 'input-adornment' && <div className="mini-exploration"><span>サンプルの幅（px）</span><b>幅 │ 32 │ px</b><span>単位は固定表示</span></div>}
    {id === 'fieldset' && <div className="mini-exploration"><b>表示の補助設定</b><span>☑ 補助グリッド</span><span>カードの間隔　16px</span></div>}
    {id === 'skip-link' && <div className="mini-exploration"><b>本文へ移動　↓</b><span>概要　記録　補足</span><span>ノートの本文</span></div>}
    {id === 'typography-scale' && <div className="mini-continuation"><b style={{fontSize:16}}>余白から考える</b><span style={{fontSize:12}}>次の操作を近くへ</span><span>本文からサイズを決める</span></div>}
    {id === 'text-truncation' && <div className="mini-continuation"><span>画面の情報を整理するときは、</span><span>まず目的と次の操作を…</span><b>全文を表示</b></div>}
    {id === 'aspect-ratio' && <div className="mini-continuation"><div style={{aspectRatio:"16/9",background:"#e4ecff",display:"grid",placeItems:"center"}}>16:9</div><span>枠と内容の収まり</span></div>}
    {id === 'responsive-grid' && <div className="mini-continuation" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}><span>カード1</span><span>カード2</span><span>カード3</span><span>カード4</span></div>}
    {id === 'load-more' && <div className="mini-continuation"><span>1. 目的　2. 余白</span><span>3. 配色</span><b>＋ 続きを表示する</b></div>}
    {id === 'error-summary' && <div className="mini-continuation" style={{border:"2px solid #a52c40"}}><b>入力内容を確認</b><span>題名を入力してください。</span><span>種類を選んでください。</span></div>}
    {id === 'confirmation-flow' && <div className="mini-continuation"><span>配置のアイデア</span><b>下書き → 採用</b><span>戻って見直す　採用に変更</span></div>}
    {id === 'loading-button' && <div className="mini-continuation"><span>画面サンプルの確認</span><b>確認中…</b><span>処理が終わるまで待機</span></div>}
    {id === 'status-badge' && <div className="mini-continuation"><span>配置の確認</span><b style={{background:"#e4f3ea",color:"#205e42",padding:5}}>✓ 完了</b></div>}
    {id === 'description-list' && <div className="mini-continuation"><span>題名　余白の記録</span><span>種類　見た目</span><span>状態　確認済み</span></div>}
    {id === 'multi-select' && <div className="mini-continuation"><span>試す道具（複数）</span><b>配置スケッチ　✓</b><span>配色ノート　✓</span><span>要点メモ</span></div>}
    {id === 'textarea' && <div className="mini-continuation"><span>画面のメモ</span><span>余白を広くする。</span><span>操作を近くにまとめる。</span><b>20 / 40文字</b></div>}
    {id === 'meter' && <div className="mini-extension"><span>85% 使用 · 上限に近い</span><div style={{height:8,background:'#f5e0c3'}}><i style={{display:'block',width:'85%',height:8,background:'#9c6200'}} /></div></div>}
    {id === 'dark-mode' && <div className="mini-extension" style={{background:'#162238',color:'#edf3ff'}}><span>余白から考える</span><b style={{color:'#8bb5ff'}}>メモを選ぶ</b></div>}
    {id === 'resizable-panel' && <div className="mini-extension"><span>一覧　 ⋮　内容</span><b>30%　⇔　70%</b></div>}
    {id === 'sticky-header' && <div className="mini-extension"><b>ノート一覧　↑</b><span>────────</span><span>枠の上端に残す</span></div>}
    {id === 'timeline' && <div className="mini-extension"><span>10/01　設計　完了</span><span>　│</span><span>10/15　確認　進行中</span></div>}
    {id === 'date-picker' && <div className="mini-extension"><span>デモの予定日</span><b>2026 / 10 / 25</b><span>範囲を確認して確定</span></div>}
    {id === 'tag-input' && <div className="mini-extension"><span>画面 ×　余白 ×</span><b>＋ タグを追加</b></div>}
    {id === 'number-input' && <div className="mini-extension"><span>カードの枚数</span><b>−　5　＋</b><span>1〜9枚</span></div>}
    {id === 'color-picker' && <div className="mini-extension"><span>アクセント色</span><b style={{color:'#235de5'}}>■　</b><b style={{color:'#176c52'}}>■　</b><b style={{color:'#7544af'}}>■</b></div>}
    {id === 'toolbar' && <div className="mini-extension"><span>太字　斜体　下線</span><b>書式を組み合わせる</b></div>}
    {id === 'context-menu' && <div className="mini-extension"><span>ピン留めを切り替え</span><span>ラベルを確認</span><span>余白を切り替え</span></div>}
    {id === 'tree-view' && <div className="mini-extension"><span>▾ ノート</span><span>　画面案</span><span>　色の記録</span><span>▸ ツール</span></div>}
    {id === 'reorder-list' && <div className="mini-growth"><span>1 目的のメモ　↑ ↓</span><span>2 配置の案　　↑ ↓</span><span>3 確認リスト　↑ ↓</span></div>}
    {id === 'combobox' && <div className="mini-growth"><span>ボード　⌄</span><b>スケッチボード</b><span>メモボード</span></div>}
    {id === 'scrollspy' && <div className="mini-growth"><span>目的　構成　<b style={{color:'#235de5'}}>確認</b></span><span>読んでいる見出しを表示</span></div>}
    {id === 'carousel' && <div className="mini-growth" style={{background:'#e7f3ed'}}><span>色を比べる</span><b>‹　1　●　3　›</b></div>}
    {id === 'alert-banner' && <div className="mini-growth" style={{borderLeft:'4px solid #986000',background:'#fff3d9'}}><span>要確認：設定を確認</span><b>案内を閉じる</b></div>}
    {id === 'empty-state' && <div className="mini-growth" style={{textAlign:'center'}}><span>最初のノートを作ろう</span><b>＋ サンプルを追加</b></div>}
    {id === 'step-indicator' && <div className="mini-growth"><span>1 分類　2 見た目　3 確認</span><b>完了　　現在　　 未着手</b></div>}
    {id === 'data-table' && <div className="mini-growth"><span>ノート名　記録数 ↑</span><span>色　　　　　2</span><span>配置　　　　5</span></div>}
    {id === 'select' && <div className="mini-growth"><span>使う道具</span><b>スケッチボード　⌄</b></div>}
    {id === 'toast' && <div className="mini-growth"><span>設定を適用しました</span><b>通知を閉じる</b></div>}
    {id === 'range-slider' && <div className="mini-growth"><span>カードの余白　24px</span><div style={{height:4,background:'#dce3ee'}}><i style={{display:'block',width:14,height:14,borderRadius:'50%',background:'#235de5',marginLeft:'45%',transform:'translateY(-5px)'}} /></div></div>}
    {id === 'progress-bar' && <div className="mini-growth mini-progress"><span>50% 完了</span><i style={{ width: '50%' }} /></div>}
    {id === 'breadcrumb' && <div className="mini-breadcrumb"><span><b>ホーム</b> / <b>ノート</b> / <strong>画面案</strong></span><span>階層をたどる</span></div>}
    {id === 'pagination' && <div className="mini-pagination"><span>‹</span><span>1</span><strong>2</strong><span>3</span><span>›</span></div>}
    {id === 'tooltip' && <div className="mini-tooltip"><span>短い操作の説明</span><b>要点を表示</b></div>}
    {id === 'switch' && <div className="mini-choices"><span>補助グリッド<i className="mini-switch-track" /></span><span>オン · すぐに反映</span></div>}
    {id === 'radio-group' && <div className="mini-choices"><span><i className="mini-radio-dot is-selected" />15分</span><span><i className="mini-radio-dot" />30分</span><span><i className="mini-radio-dot" />45分</span></div>}
    {id === 'checkbox' && <div className="mini-choices"><span><i className="mini-checkbox-mark is-selected">−</i>一部選択</span><span><i className="mini-checkbox-mark is-selected">✓</i>要点メモ</span><span><i className="mini-checkbox-mark" />配置スケッチ</span></div>}
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
