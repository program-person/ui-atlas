# 追加50項目の実装・検証記録

確認日：2026-10-29（日本時間）

既存120項目に50項目を追加し、ローカル版は170項目になった。今回の追加目標は50 / 50で完了。追加分は未コミット・未push・未公開。比較と指示文合成は未実装のまま別課題とする。

## 実装したもの

Terraが入力13項目、表とグラフ13項目、操作の流れ13項目を担当し、Codexが配置とナビゲーション11項目、共通登録、一覧プレビュー、統合検証を担当した。各項目に説明・用途・注意点・参考資料・固有の操作デモ・2つの設定・指示文を揃えた。既存のカテゴリとCatalogRepositoryを維持し、依存・DB・APIは追加していない。

| ID | 名前 | 分類 |
|---|---|---|
| search-input | 検索入力 | 部品 |
| duration-input | 時間量の入力 | 部品 |
| character-counter | 文字数カウンター | 部品 |
| input-clear | 入力のクリア | 部品 |
| search-highlight | 検索語の強調 | 部品 |
| tokenized-search | 検索語のトークン化 | 部品 |
| query-builder | 検索条件ビルダー | 部品 |
| date-presets | 日付のプリセット | 部品 |
| unit-converter | 単位変換 | 部品 |
| input-suggestions | 入力候補 | 部品 |
| editable-table | 編集できる表 | 部品 |
| repeatable-fields | 繰り返し入力欄 | 部品 |
| checkbox-cards | チェックボックスカード | 部品 |
| table-row-expansion | 行の展開 | 部品 |
| column-visibility | 列の表示切替 | 部品 |
| column-reorder | 列の並べ替え | 部品 |
| pinned-columns | 列の固定 | 部品 |
| table-footer | 表のフッター | 部品 |
| sparkline | スパークライン | 部品 |
| area-chart | 面グラフ | 部品 |
| histogram | ヒストグラム | 部品 |
| bullet-chart | バレットチャート | 部品 |
| waterfall-chart | ウォーターフォールチャート | 部品 |
| waffle-chart | ワッフルチャート | 部品 |
| funnel-chart | ファネルチャート | 部品 |
| treemap | ツリーマップ | 部品 |
| retry-backoff | 再試行と待機 | UXの流れ |
| request-cancellation | 処理のキャンセル | UXの流れ |
| dependent-steps | 条件で変わる手順 | UXの流れ |
| checkpoint-resume | 途中から再開 | UXの流れ |
| batch-progress | 一括処理の進捗 | UXの流れ |
| async-search | 非同期検索 | UXの流れ |
| search-history | 検索履歴 | UXの流れ |
| saved-filters | 条件の一時保存 | UXの流れ |
| selection-limit | 選択数の上限 | UXの流れ |
| conflict-resolution | 変更の競合解決 | UXの流れ |
| version-comparison | 版の比較 | UXの流れ |
| session-timeout | セッション期限の警告 | UXの流れ |
| offline-fallback | オフライン時の代替表示 | UXの流れ |
| masonry-columns | 高さの違うカードを詰める | レイアウト |
| sticky-aside | スクロールに残る補足 | レイアウト |
| bottom-navigation | 画面下のナビゲーション | 部品 |
| navigation-rail | ナビゲーションレール | 部品 |
| overflow-menu | その他の操作 | 部品 |
| disclosure-navigation | 分類から開くナビゲーション | 部品 |
| line-length | 文章の一行の長さ | 見た目 |
| text-wrap | 見出しの折り返し | 見た目 |
| logical-properties | 読む方向に沿った余白 | レイアウト |
| subgrid | 内側の行を揃えるグリッド | レイアウト |
| scroll-snap | 区切りに収まるスクロール | 動き |

## 検証結果

- npm.cmd test：5件成功。170項目の日本語・英語・別名検索と、全設定の組み合わせに対する指示文生成を含む。
- npm.cmd run build：170項目のカタログ検査、TypeScript、本番ビルドが成功。既存distを消さない設定を維持。
- Chromeの本番ビルドで、追加50項目のキーボード操作・リセット50件、全200設定と指示文・iframe URLの対応を確認した。
- 全設定の組み合わせを375 / 768 / 1440pxで表示し、計600通りで画面全体が横にはみ出さないことを確認した。表や資料列の意図した内部スクロールは維持している。
- 境界操作23件を確認。検索の空白・0件・Enter、絵文字20 / 21文字、数値の空欄・範囲外・小数、古い計算結果の消去、条件の重複防止、繰り返し行の上限、削除後のフォーカス、中断の二度押しと再開、キャンセル後の遅い結果、非同期検索の更新、再試行の上限、失敗で止まる一括処理、期限切れ、競合選択、オフライン復帰、開閉のEsc、補足の固定位置、subgrid、スクロールスナップの両端と中央を含む。
- 統合操作6件を確認。170項目と一覧プレビュー、検索から詳細への移動、設定後のコピー全文照合、コピー失敗時の全文選択、3画面幅の詳細とスマホプレビュー、既存ドロワーと検索の操作を含む。
- 動きを減らす設定で主要検証を実施。画像はoutput/playwright/expansion-*.png、操作結果は同フォルダのexpansion-*-result*.txtに保存した。

## レビューで修正したもの

- 中断後の再記録で保存位置とメモが初期値に変わる問題を、状態のガードで修正した。
- 処理開始時のフォーカス消失、条件や行を外した後の戻り先、入力変更後の古い結果表示を修正した。
- 実際に検索しない検索デモを固定の架空データの検索に変更し、複数語のAND検索と構造化条件のAND / ORを分けた。
- 版の比較元に合う変更説明、成功と失敗を分けた一括処理表示、手動終了と自然な期限切れの区別を追加した。
- 中央揃えのスクロールスナップの両端に余白を設け、補足の固定位置が親のpadding分だけずれる問題を修正した。

## 未実装・未確認

- 追加50項目の公開、GitHub Actionsと公開URLの確認は未実施。公開に関する過去の記録は120項目版のもの。
- Chrome以外、実タッチ、IME変換中の入力、スクリーンリーダーは未確認。すべての設定で境界操作を繰り返したものではない。
- 比較・複数項目の指示文合成、コード分割、定期実行・無人追加は対象外。JavaScriptは約911kBでサイズ警告が継続。

## レビュー用メモ

- 目的：検索からデモ・設定・指示文へ進める項目を50件追加する。
- 変更ファイル：src/catalog/patternsの50 JSON、src/demosの50 Demo.tsx、src/styles/expansion-*-demos.css、src/components/ExpansionThumbnail.tsx・Thumbnail.tsx、src/types.ts・demos/Demos.tsx・main.tsx、scripts/expansion-*-cases.json・prepare-expansion-smoke.mjs、DESIGN.md・README.md・PROGRESS.md・docs/BACKLOG.mdと本記録。
- 設計との対応：DESIGN.mdの3（デモとの一致・独立状態・キーボード）、4（検索・設定・指示文）、7（共通形式）、9・追加目標、10（検証後の掲載）。
- 確認したことと未確認の範囲：上記の検証結果と未確認欄を参照。
- 特に見てほしい点：設定・説明・指示文の一致、既存項目との操作上の違い、タイマーの解除、中断・再開とキャンセル、狭い画面の内部スクロール、グラフと数表の一致。

## ダッシュボード更新案（未反映）

- 対象：UI Atlas（UI/UX辞典）、ID p20261007043749234ca4b99。状態activeを維持。
- 次の行動（読取値）：追加54項目を公開し、100項目追加の残り46項目を進める。比較・指示文合成は別課題。
- 次の行動（変更案）：追加50項目の実装・検証を完了した170項目版を公開する。コード分割、比較・指示文合成は別課題として検討する。
- 作業ログ案：Terraと分担して50項目を追加し合計170項目。テスト5件・ビルド、50操作とリセット、200設定、3画面幅600通り、境界23件と統合6件を確認。未コミット・未公開。
- list_projectsとget_projectで対象と現行値を確認した。書き込みは実行していない。明示的なOK後、直前値を読み直して正規ツールで反映する。
