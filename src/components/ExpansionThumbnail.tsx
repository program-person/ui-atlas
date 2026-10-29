import type { DemoId } from '../types.ts';

const previews: Partial<Record<DemoId, [string, string, string]>> = {
  'search-input': ['検索語を入力', 'ノート　［検索］', '確定してから検索'],
  'duration-input': ['時間と分を分ける', '1時間 ＋ 30分', '合計 90分'],
  'character-counter': ['文章を入力', '青い空', '残り17文字 / 上限20'],
  'input-clear': ['入力欄の近くに操作', 'サンプル　×', '空欄へ戻して入力を続ける'],
  'search-highlight': ['一致した語を示す', '青い［ノート］', '検索結果の中で強調'],
  'tokenized-search': ['検索条件を積み重ねる', '青 ×　ノート ×', 'すべての語に一致'],
  'query-builder': ['構造化した条件', '色＝青 AND 種類＝ノート', 'AND ⇄ OR'],
  'date-presets': ['基準日 2026-10-29', '今月 │ 過去7日', '10/01〜10/31'],
  'unit-converter': ['単位を明示して換算', '1 m → 100 cm', '空入力と数値を検証'],
  'input-suggestions': ['入力した語から候補', '青 → 青いノート', '候補ボタンで値を確定'],
  'editable-table': ['品目 │ 数量', 'ノート │ ［2］', '表の中で編集・確認'],
  'repeatable-fields': ['項目1　ノート', '＋ 行を追加', '最大5行・個別に外す'],
  'checkbox-cards': ['選択肢全体を押せる', '□ 青　☑ 赤', '複数選択のカード'],
  'table-row-expansion': ['道具A │ 10 │ 詳細 ⌄', '補足：軽量な道具', '行の直下に説明を開く'],
  'column-visibility': ['☑ 記録数を表示', '道具A │ 10', '列単位で表示・非表示'],
  'column-reorder': ['道具 → 記録数', '記録数 → 道具', 'ヘッダーとセルを一緒に移す'],
  'pinned-columns': ['道具A │ 春 夏 秋 冬 →', '先頭列を固定', '表の中だけ横スクロール'],
  'table-footer': ['道具A 10 / 道具B 20', '合計 30 ⇄ 平均 15', '表の末尾に集計'],
  'retry-backoff': ['再試行の上限 2回', '0.5秒 → 1秒', '間隔を伸ばして待機'],
  'request-cancellation': ['架空の処理を待機中', '［キャンセル］', '遅い結果の反映を止める'],
  'dependent-steps': ['詳細を追加 ☑', '基本 → 詳細 → 確認', '選択で手順数が変わる'],
  'checkpoint-resume': ['手順2・メモを記録', '中断 → 記録から再開', '位置と内容をメモリに保持'],
  'batch-progress': ['処理済み 2 / 3件', '成功1件・失敗1件', '失敗で停止 ⇄ 続行'],
  'async-search': ['青 → 検索中…', '1件・青いノート', '古い検索を取り消す'],
  'search-history': ['直前の検索を再利用', 'ノート / 配置 / 色', '重複を除いて件数を制限'],
  'saved-filters': ['青 ☑　小 ☑', '保存 → 呼び戻す', '置き換え ⇄ 条件を併合'],
  'selection-limit': ['☑ 朝　☑ 昼　□ 夜', '選択 2 / 2件', '上限でも選択解除は可能'],
  'conflict-resolution': ['自分：青いメモ', '別の変更：赤いメモ', '残す内容を選んで確定'],
  'version-comparison': ['前の版 → 現在の版', '青いノート → 赤いノート', '変更箇所を見比べる'],
  'session-timeout': ['利用中・残り8秒', '延長 │ 終了', '期限前に警告する'],
  'offline-fallback': ['接続できません', '前回の内容を表示', '接続後に再試行'],
  'masonry-columns': ['高さが異なる記録', '1・短文 │ 3・短文', '2・長いメモ │ 4・長文'],
  'sticky-aside': ['スクロールする本文', '本文 ↓ │ 補足を残す', '記事の領域内で固定'],
  'bottom-navigation': ['本文を覆わない移動先', '01 ノート │ 02 検索', '画面下に主要な移動先'],
  'navigation-rail': ['少数の移動先', '01 │ 本文', '02 │ 細い縦の列'],
  'overflow-menu': ['その他の操作 ⌄', '固定する / 情報を見る', 'Tabで選ぶ・Escで閉じる'],
  'disclosure-navigation': ['作る ⌄　調べる', '下書き / プレビュー', '分類から下位の移動先へ'],
  'line-length': ['一行の長さを比べる', '28ch ⇄ 52ch', '本文幅 × 行間'],
  'text-wrap': ['見出しの行末を調整', '通常 ⇄ 行の長さを均す', '全文を保ったまま折り返す'],
  'logical-properties': ['開始側の余白', 'LTR →　⇄　← RTL', '読む方向で余白が動く'],
  'subgrid': ['見出し │ 見出し', '説明の高さを共有', '補足の行も揃える'],
  'scroll-snap': ['資料1 → 資料2 → 資料3', '区切りに停止する', '手動のスクロールを保つ'],
};

const chartNames: Partial<Record<DemoId, string>> = {
  sparkline: 'スパークライン', 'area-chart': '面グラフ', histogram: '10分ごとの度数',
  'bullet-chart': '実績60 / 目標75', 'waterfall-chart': '40 ＋20 −10 ＝50',
  'waffle-chart': '完了60%・残り40%', 'funnel-chart': '90 → 70 → 50 → 30', treemap: '文章50%・図30%・音声20%',
};

export function ExpansionThumbnail({ id }: { id: DemoId }) {
  const chart = chartNames[id];
  if (chart) return <div className="mini-workflow"><svg viewBox="0 0 200 70" style={{ width: '100%', height: 65 }}>
    {id === 'sparkline' && <polyline points="5,55 65,35 130,45 195,15" fill="none" stroke="#235b46" strokeWidth="3" />}
    {id === 'area-chart' && <polygon points="5,65 5,55 65,35 130,45 195,15 195,65" fill="#75a9a0" stroke="#235b46" />}
    {id === 'histogram' && [20, 40, 60, 30].map((value, index) => <rect key={index} x={index * 48} y={65 - value} width="47" height={value} fill="#235b46" />)}
    {id === 'bullet-chart' && <><rect x="0" y="25" width="200" height="25" fill="#d8e2dc" /><rect x="0" y="31" width="120" height="13" fill="#235b46" /><path d="M150 20V55" stroke="#172f2d" strokeWidth="3" /></>}
    {id === 'waterfall-chart' && <><rect x="0" y="25" width="35" height="40" fill="#235b46" /><rect x="50" y="5" width="35" height="20" fill="#75a9a0" /><rect x="100" y="5" width="35" height="10" fill="#b46140" /><rect x="150" y="15" width="35" height="50" fill="#235b46" /></>}
    {id === 'waffle-chart' && Array.from({ length: 50 }, (_, index) => <rect key={index} x={index % 10 * 18} y={Math.floor(index / 10) * 13} width="15" height="10" fill={index < 30 ? '#235b46' : '#d8e2dc'} />)}
    {id === 'funnel-chart' && [180, 140, 100, 60].map((width, index) => <rect key={index} x={(200 - width) / 2} y={index * 17} width={width} height="14" fill={index % 2 ? '#75a9a0' : '#235b46'} />)}
    {id === 'treemap' && <><rect x="0" y="0" width="100" height="65" fill="#235b46" /><rect x="103" y="0" width="97" height="37" fill="#75a9a0" /><rect x="103" y="40" width="97" height="25" fill="#b46140" /></>}
  </svg><span>{chart}</span></div>;
  const preview = previews[id];
  return preview ? <div className="mini-workflow"><span>{preview[0]}</span><b>{preview[1]}</b><span>{preview[2]}</span></div> : null;
}
