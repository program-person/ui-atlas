# 2026-10-29 継続追加

ユーザーの「利用制限の限りUI増やしてよ」に基づく作業。開始時は170項目で、前回の50項目と共通ファイルに未コミット変更があった。Codexが追加70項目の新規JSON・Demo.tsx、Growth2Thumbnail.tsx、growth2-demos.css、共通登録と検証を担当した。既存変更を保ち、依存・DB・API・カテゴリは追加していない。

## 実装済み

追加70項目で合計240項目。図表、文字と画像の表示、表と入力、位置と選択、一覧と通知、関係図、ブラウザの表示・操作の7組を実装した。各項目にデモ・説明・用途・注意点・関連項目・設定と指示文を用意し、一覧用のプレビューを追加した。図表と関係図の20項目には自作SVGのプレビューを用意した。

## 検証済み

- npm.cmd testの5件が成功。全240項目の日本語・英語・別名検索と全設定の指示文生成を含む。npm.cmd run buildとgit diff --checkも成功。
- 追加70項目すべての固有操作とリセットをキーボードで確認。全141設定で指示文とiframeの設定値が一致し、全選択肢を375 / 768 / 1440pxの423通りで確認した。ページ全体の横はみ出しはない。内部スクロールを持つ図表や本文枠は残している。
- 本番ビルドで図表・文字・表・選択・一覧・関係図の60項目を検証し、10項目の追加後に240項目版でブラウザ操作の10項目と統合操作を検証した。全デモのソースはその後変更していない。
- 47の境界・設定ケースが成功。図と数表の値、箱ひげ図の幅、流量の保存、入力の空欄・全角文字・上限・逆転・同値、年月、集合、依存関係、選択解除、ページまたぎ、通知の状態、仮想リストのDOM数、自動追加の終端、合成ホイール、画像の切替、動きを減らす設定、フォーカスを含む。
- 統合4ケースが成功。全角英字の検索、詳細、設定、指示文全文のコピー、失敗時の手動選択、375pxの本体とiframe、SVGプレビュー、既存の入力マスク・カレンダー・モーダル・サイドバーのルートを確認した。コピーはテスト用のwriteTextへ差し替え、実クリップボードは読んでいない。
- デスクトップと375pxのスクリーンショットを目視確認した。開発サーバーの再読み込み待ちは本番プレビューで再現せず、再実行で通過。縦書きは375pxで検証し、相対時刻の検証ではIntlの空白を許容した。アプリの表示をテストに合わせて変えてはいない。
- 画面とデモで未処理のJavaScript例外は検出されなかった。ビルドのJavaScriptは1,123.23kB、gzip 292.35kB。

## 未実装・未確認

追加分のコミット・push・公開は未実施。公開URLとGitHub Actionsは今回確認していない。別ブラウザ、実タッチ、IME変換中、スクリーンリーダーは未確認。比較・指示文合成とコード分割は別課題。JavaScriptのサイズ警告が続いている。新たな定期実行、利用枠のリセット、課金、無人公開は設定していない。今回の作業で利用制限に到達したとは記録していない。

## レビュー用メモ

- 目的：前回の170項目へ、重複しない操作デモを継続して追加する。
- 変更ファイル：追加70 JSONと70 Demo.tsx、DataFigure.tsx、Growth2Thumbnail.tsx、growth2-demos.css、types.ts・Demos.tsx・Thumbnail.tsx・main.tsx、scripts/growth2-*-cases.json・prepare-growth2-smoke.mjs・growth2-boundary-smoke.js・growth2-integration-smoke.js、DESIGN.md・README.md・PROGRESS.md・docs/BACKLOG.mdと本記録。前回の未コミット50項目とは分けて確認する。
- 設計との対応：DESIGN.md 3（説明・デモ・指示文の一致）、4（検索と設定）、7（共通形式）、10・11（検証と掲載）、今回の継続追加の項目。
- 確認したこと・未確認のこと：上記の検証欄と未確認欄を参照。
- 特に見てほしい点：図表と数表の一致、入力の境界、選択と依存設定、枠内スクロール、キーボードとフォーカス。

## ダッシュボード更新案

- 対象：UI Atlas（UI/UX辞典）、ID p20261007043749234ca4b99。状態activeを維持。
- 次の行動の読取値：追加54項目を公開し、100項目追加の残り46項目を進める。比較・指示文合成は別課題。
- 次の行動の変更案：追加分を含む240項目版をコミット・公開し、公開URLで確認する。コード分割、比較・指示文合成は別課題として検討する。
- 作業ログ案：170項目へ70項目を追加して240項目。テスト5件・ビルド、70操作とリセット、141設定、3画面幅423通り、境界47ケース・統合4ケースを確認。追加分は未コミット・未公開。
- 書き込みは行っていない。反映は明示的なOK後に直前の値を読み直して行う。


## 追加した項目

| 組 | ID | 名前 |
|---|---|---|
| 図表 | lollipop-chart | ロリポップチャート |
| 図表 | diverging-bar | 左右に分かれる棒グラフ |
| 図表 | dumbbell-chart | ダンベルチャート |
| 図表 | slope-chart | スロープチャート |
| 図表 | radar-chart | レーダーチャート |
| 図表 | box-plot | 箱ひげ図 |
| 図表 | bubble-chart | バブルチャート |
| 図表 | gantt-chart | ガントチャート |
| 図表 | range-band | 範囲帯付きの折れ線 |
| 図表 | legend-toggle | 凡例から系列を切り替える |
| 文字と画像 | object-fit | 画像を枠に収める |
| 文字と画像 | writing-mode | 縦書きと横書き |
| 文字と画像 | fluid-type | 幅に応じて変わる文字サイズ |
| 文字と画像 | tabular-numbers | 数字の幅を揃える |
| 文字と画像 | drop-cap | 段落の先頭文字を大きくする |
| 文字と画像 | text-spacing | 文字間隔を調整する |
| 文字と画像 | color-mix | 基準色から中間色を作る |
| 文字と画像 | contrast-checker | 文字と背景のコントラスト |
| 文字と画像 | border-radius | 角の丸みを使い分ける |
| 文字と画像 | scroll-shadow | スクロールの続きの手がかり |
| 表と入力 | table-transpose | 表の行と列を入れ替える |
| 表と入力 | grouped-table | 分類別にまとまった表 |
| 表と入力 | pivot-table | クロス集計表 |
| 表と入力 | multi-sort-table | 複数の条件で並べ替える表 |
| 表と入力 | responsive-table | 狭い枠で表の表示を変える |
| 表と入力 | cross-field-validation | 入力欄どうしの整合性を確かめる |
| 表と入力 | month-input | 年月だけを入力する |
| 表と入力 | number-format | 数値を表示用に整える |
| 表と入力 | paste-preview | 取り込む前に表を確認する |
| 表と入力 | toggle-button | 押した状態を保つボタン |
| 位置と選択 | seat-selection | 配置図から場所を選ぶ |
| 位置と選択 | time-slot-picker | 空いている時間帯を選ぶ |
| 位置と選択 | schedule-conflict | 時間帯の重なりを確認する |
| 位置と選択 | permission-matrix | 権限を表で選ぶ |
| 位置と選択 | settings-dependency | 関連する設定の有効・無効 |
| 位置と選択 | facet-counts | 絞り込み候補の件数 |
| 位置と選択 | selection-summary | 選んだ項目の合計 |
| 位置と選択 | image-hotspots | 図の印から説明を開く |
| 位置と選択 | pan-controls | 図を上下左右へ動かす |
| 位置と選択 | shortcut-hints | キー操作を画面に示す |
| 一覧と通知 | cursor-pagination | 次の位置をたどるページ送り |
| 一覧と通知 | cross-page-selection | ページをまたいで選ぶ |
| 一覧と通知 | attachment-list | 添付候補を一覧で確認する |
| 一覧と通知 | upload-constraints | 取り込み条件を先に示す |
| 一覧と通知 | delivery-receipt | 送信・到達・既読を分ける |
| 一覧と通知 | threaded-comments | 返信を階層で読む |
| 一覧と通知 | code-block | コードの表示と折り返し |
| 一覧と通知 | anchor-offset | 固定見出しを避けて移動する |
| 一覧と通知 | notification-grouping | 関連する通知をまとめる |
| 一覧と通知 | collapsed-breadcrumb | 長いパンくずの中間を開く |
| 関係図 | flowchart | 条件分岐のフローチャート |
| 関係図 | state-machine | 状態遷移図 |
| 関係図 | organization-chart | 階層の構成図 |
| 関係図 | network-graph | つながりのネットワーク図 |
| 関係図 | dependency-graph | 前提を持つ作業の図 |
| 関係図 | swimlane | 担当範囲ごとの工程図 |
| 関係図 | cycle-diagram | 繰り返す手順の図 |
| 関係図 | sankey-diagram | 量の流れを太さで示す図 |
| 関係図 | parallel-coordinates | 平行座標の比較図 |
| 関係図 | venn-diagram | 集合の重なりを示す図 |
| ブラウザの表示・操作 | floating-label | 入力後も残る浮動ラベル |
| ブラウザの表示・操作 | autosize-textarea | 文章量に合わせて伸びる入力欄 |
| ブラウザの表示・操作 | card-list-toggle | カードとリストを切り替える |
| ブラウザの表示・操作 | virtual-list | 見えている範囲だけ描く一覧 |
| ブラウザの表示・操作 | infinite-scroll | 末尾で次の項目を表示する |
| ブラウザの表示・操作 | scrollbar-gutter | スクロールバーの場所を確保する |
| ブラウザの表示・操作 | overscroll-containment | スクロールを枠の中に留める |
| ブラウザの表示・操作 | relative-time | 相対時刻と日時を切り替える |
| ブラウザの表示・操作 | responsive-image | 幅に応じて画像を選ぶ |
| ブラウザの表示・操作 | easing-curves | 動きの速さの変化を比べる |
