# 追加候補と段階

## 段階1：最初の5項目

- 完了：サイドバー、モーダル、ドロワー、ホバーと押下の反応、検索と絞り込み。
- ローカルでの動作検証済み。URL公開の結果はPROGRESS.mdを参照。

## 段階2：比較と初期20項目

まず、ひが段階1の画面を使って確かめた後、次のまとまりから追加する。

2026-10-07：ユーザーの「一気に充実させたい」という依頼で、残り13項目を今回の対象にする。Codexが1項目ずつ実装・検証し、確認できたものを公開する。比較・指示文合成は次の機能追加として残す。

| 優先 | ID | 候補 | 状態 |
|---|---|---|---|
| 1 | tabs | タブ | 完了（2026-10-07、公開URLでも検証済み） |
| 1 | accordion | アコーディオン | 完了（2026-10-07、公開URLでも検証済み） |
| 1 | popover | ポップオーバー | 完了（2026-10-07、公開URLでも検証済み） |
| 2 | minimal | ミニマル | 完了（2026-10-07、公開URLでも検証済み） |
| 2 | glassmorphism | ガラス風 | 完了（2026-10-07、公開URLでも検証済み） |
| 2 | neobrutalism | ネオブルータリズム | 完了（2026-10-07、公開URLでも検証済み） |
| 3 | split-view | 分割画面 | 完了（2026-10-07、公開URLでも検証済み） |
| 3 | bento-grid | Bentoグリッド | 完了（2026-10-07、公開URLでも検証済み） |
| 3 | master-detail | 一覧と詳細 | 完了（2026-10-07、公開URLでも検証済み） |
| 4 | inline-validation | 入力欄の近くでの検証 | 完了（2026-10-07、公開URLでも検証済み） |
| 4 | skeleton-loading | 読み込み中の仮表示 | 完了（2026-10-07、公開URLでも検証済み） |
| 4 | undo-feedback | 操作と取り消し | 完了（2026-10-07、公開URLでも検証済み） |
| 5 | command-palette | コマンドパレット | 完了（2026-10-07、公開URLでも検証済み） |
| 5 | fade-slide | フェードとスライド | 完了（2026-10-07、公開URLでも検証済み） |
| 5 | stagger | 順番に表示する動き | 完了（2026-10-07、公開URLでも検証済み） |

機能：最大3項目の比較、選択順での指示文合成、設定の矛盾の案内は未着手。

## 段階3：継続追加

### 100項目追加の目標（2026-10-25）

- ユーザー依頼：既存20項目から100項目を追加し、合計120項目を目指す。通常は1回1〜3項目とし、ユーザー指定がある場合は件数を拡大できる。第3〜8回は各12項目、第9回は残り22項目。説明・デモ・設定・指示文・検証を揃え、2026-10-28に100項目追加を完了。
- 自動実行・定期実行・利用枠の監視は今回の対象外。
- 第1回の担当：Codex。開始時に既存の未コミット変更なしを確認。
- 第2回の担当：Codex。第1回の未コミット変更を保持して継続する。
- 第2回の担当ファイル：新規breadcrumb.json・BreadcrumbDemo.tsx、pagination.json・PaginationDemo.tsx、tooltip.json・TooltipDemo.tsx、navigation-demos.css、共通のtypes.ts・Demos.tsx・Thumbnail.tsx・main.tsx、進捗資料。

| ID | 候補 | 状態 |
|---|---|---|
| switch | スイッチ | 完了（公開済み） |
| radio-group | ラジオグループ | 完了（公開済み） |
| checkbox | チェックボックス | 完了（公開済み） |
| breadcrumb | パンくずリスト | 完了（公開済み） |
| pagination | ページネーション | 完了（公開済み） |
| tooltip | ツールチップ | 完了（公開済み） |

追加済み・公開済み：100 / 100（既存20 + 100 = 合計120、残り0）。23a102b・79246ca・8c0bb2b・6c2639cをmainへpush済み。2026-10-28にActions 40612161316のbuild・deploy成功と公開URLの全120デモ表示を確認。全設定・全境界の操作検証はPROGRESS.mdのローカル記録を参照。

第2回はパンくずリスト・ページネーション・ツールチップを追加する。既存の項目名・別名・デモと重複しないことを確認し、WAI-ARIA APG・W3C・USWDSの一次資料を参照する。

第3回の出発候補はプログレスバー・範囲スライダー・トースト通知。ユーザーの依頼を受け、以下の12項目まで追加した。

### 第3回：12項目（ユーザーの一括追加依頼）

担当：Codex。第1・2回の未コミット変更を保持する。担当ファイルは各IDの新規JSON、対応するDemo.tsx、growth-demos.css、既存のtypes.ts・Demos.tsx・Thumbnail.tsx・main.tsxと進捗資料。依存・DB・カテゴリは追加しない。

| ID | 候補 | 状態 |
|---|---|---|
| progress-bar | プログレスバー | 完了（公開済み） |
| range-slider | 範囲スライダー | 完了（公開済み） |
| toast | トースト通知 | 完了（公開済み） |
| select | セレクトボックス | 完了（公開済み） |
| data-table | データテーブル | 完了（公開済み） |
| step-indicator | ステップ表示 | 完了（公開済み） |
| empty-state | 空の状態 | 完了（公開済み） |
| alert-banner | アラートバナー | 完了（公開済み） |
| carousel | カルーセル | 完了（公開済み） |
| scrollspy | スクロール連動ナビ | 完了（公開済み） |
| combobox | コンボボックス | 完了（公開済み） |
| reorder-list | 並べ替えリスト | 完了（公開済み） |

第4回はツリービュー・コンテキストメニュー・ツールバー・カラーピッカーを出発点に、以下の12項目を追加した。

### 第4回：12項目（まとまった追加の継続）

担当：Codex。前回までの未コミット変更を保持する。担当ファイル：下記IDの新規JSONと対応するDemo.tsx、extension-demos.css、types.ts・Demos.tsx・Thumbnail.tsx・main.tsx、設計・進捗資料。依存・DB・API・カテゴリは追加しない。

| ID | 候補 | 状態 |
|---|---|---|
| tree-view | ツリービュー | 完了（公開済み） |
| context-menu | コンテキストメニュー | 完了（公開済み） |
| toolbar | ツールバー | 完了（公開済み） |
| color-picker | カラーピッカー | 完了（公開済み） |
| number-input | 数値入力 | 完了（公開済み） |
| tag-input | タグ入力 | 完了（公開済み） |
| date-picker | 日付入力 | 完了（公開済み） |
| timeline | タイムライン | 完了（公開済み） |
| sticky-header | 追従ヘッダー | 完了（公開済み） |
| resizable-panel | 可変分割パネル | 完了（公開済み） |
| dark-mode | ダーク配色 | 完了（公開済み） |
| meter | メーター | 完了（公開済み） |

第4回終了時点の残りは70項目。第5回も、既存の用途・挙動と区別しながら選定する。

### 第5回：12項目（追加の継続）

担当：Codex。第1〜4回の未コミット変更を保持する。担当ファイルは以下のIDの新規JSON・対応するDemo.tsx、continuation-demos.css、types.ts・Demos.tsx・Thumbnail.tsx・main.tsxと進捗資料。依存・DB・API・カテゴリは追加しない。

| ID | 候補 | 状態 |
|---|---|---|
| textarea | 複数行入力 | 完了（公開済み） |
| multi-select | 複数選択リスト | 完了（公開済み） |
| description-list | 説明リスト | 完了（公開済み） |
| status-badge | 状態バッジ | 完了（公開済み） |
| loading-button | 処理中ボタン | 完了（公開済み） |
| confirmation-flow | 実行前の確認 | 完了（公開済み） |
| error-summary | エラーのまとめ | 完了（公開済み） |
| load-more | もっと読み込む | 完了（公開済み） |
| responsive-grid | 均等カードグリッド | 完了（公開済み） |
| aspect-ratio | アスペクト比 | 完了（公開済み） |
| text-truncation | 文章の省略と展開 | 完了（公開済み） |
| typography-scale | 文字サイズの階層 | 完了（公開済み） |

第5回終了時点の残りは58項目。JavaScriptサイズ警告があるため、公開前の読み込み時間と分割方針の検討を別課題として記録する。依存追加・構成変更・警告の抑制はしていない。

### 第6回：12項目（2026-10-26、追加の継続）

担当：Codex。既存の未コミット変更を保持する。担当ファイルは以下の新規JSON・対応するDemo.tsx、exploration-demos.css、types.ts・Demos.tsx・Thumbnail.tsx・main.tsxと進捗資料。依存・DB・API・カテゴリは追加しない。

| ID | 候補 | 状態 |
|---|---|---|
| skip-link | 本文へのスキップリンク | 完了（公開済み） |
| fieldset | 入力欄のグループ | 完了（公開済み） |
| input-adornment | 入力欄の単位表示 | 完了（公開済み） |
| dual-range | 範囲の下限と上限 | 完了（公開済み） |
| container-query | コンテナに応じた配置 | 完了（公開済み） |
| multi-column | 文章の段組み | 完了（公開済み） |
| image-comparison | 画像の比較スライダー | 完了（公開済み） |
| flip-card | 裏返すカード | 完了（公開済み） |
| elevation | 影による奥行き | 完了（公開済み） |
| gradient-surface | グラデーションの面 | 完了（公開済み） |
| spacing-scale | 余白の段階 | 完了（公開済み） |
| focus-ring | フォーカスの見え方 | 完了（公開済み） |

第6回終了時点の残りは46項目。第6回の本番ビルドは成功し、JavaScriptサイズ警告は566.12kB（gzip 158.46kB）。公開前の読み込み時間と分割方針の検討は引き続き別課題。

### 第7回：12項目（2026-10-26、コミット後の継続）

担当：Codex。第1〜6回は23a102bへコミット済み。担当ファイル：以下の新規JSONと対応するDemo.tsx、workflow-demos.css、types.ts・Demos.tsx・Thumbnail.tsx・main.tsxと進捗資料。依存・DB・API・カテゴリは追加しない。

| ID | 候補 | 状態 |
|---|---|---|
| inline-edit | その場で編集 | 完了（公開済み） |
| conditional-fields | 条件に応じた入力欄 | 完了（公開済み） |
| dependent-select | 連動する選択欄 | 完了（公開済み） |
| transfer-list | 2つのリスト間で移動 | 完了（公開済み） |
| bulk-actions | 一覧の一括操作 | 完了（公開済み） |
| optimistic-update | 結果を先に反映 | 完了（公開済み） |
| autosave-feedback | 自動保存の案内 | 完了（公開済み） |
| unsaved-changes | 未保存の変更への案内 | 完了（公開済み） |
| split-button | 主操作と追加操作 | 完了（公開済み） |
| metric-card | 指標カード | 完了（公開済み） |
| bar-chart | 棒グラフ | 完了（公開済み） |
| donut-chart | ドーナツグラフ | 完了（公開済み） |

第7回終了時点は残り34項目。第7回のJavaScriptは625.09kB（gzip 173.47kB）でサイズ警告が継続。公開前の読み込み時間とコード分割の検討は別課題。

### 第8回：12項目（2026-10-28、Terraとの分担）

開始時の作業ツリーはクリーン。ユーザーの継続・Terra利用の了承に基づく。共通登録・資料・統合検証はCodexが担当し、Terraは割り当てた新規JSON・Demo.tsx・専用CSSだけを編集する。依存・DB・API・カテゴリは追加しない。

| ID | 候補 | 担当 / 状態 |
|---|---|---|
| media-object | 図と本文の組み合わせ | Codex / 完了（公開済み） |
| holy-grail-layout | ヘッダー付き3列配置 | Codex / 完了（公開済み） |
| sticky-footer | 短い本文の下端フッター | Codex / 完了（公開済み） |
| line-chart | 折れ線グラフ | Terra charts / 完了（公開済み） |
| stacked-bar-chart | 積み上げ棒グラフ | Terra charts / 完了（公開済み） |
| scatter-plot | 散布図 | Terra charts / 完了（公開済み） |
| sort-controls | 並べ替えコントロール | Terra controls / 完了（公開済み） |
| filter-chips | フィルターチップ | Terra controls / 完了（公開済み） |
| segmented-control | セグメントコントロール | Terra controls / 完了（公開済み） |
| heatmap | ヒートマップ | Terra collections / 完了（公開済み） |
| grouped-list | グループ化リスト | Terra collections / 完了（公開済み） |
| expandable-card | 詳細を開くカード | Terra collections / 完了（公開済み） |

担当ファイル：各IDの新規JSONと対応するDemo.tsx。CSSはCodexがcomposition-demos.css、Terraがanalytics-demos.css・selection-demos.css・collection-demos.css。types.ts・Demos.tsx・Thumbnail.tsx・main.tsxと資料はCodexだけが編集する。

第8回はテスト5件・98項目のビルド、全48設定・12リセット・3画面幅72通りを確認。相互レビュー2件を修正してブラウザで再確認した。残り22項目は未着手。JavaScriptは678.28kB（gzip 186.60kB）でサイズ警告が継続。未確認範囲とダッシュボード更新案はPROGRESS.mdを参照。

### 第9回：残り22項目（2026-10-28、追加目標の完了へ）

ユーザーの「続けて完成させてしまいましょう」に基づき、残り22項目を今回の対象にする。開始時の作業ツリーはクリーン。Terraの3担当が入力・状態・一覧の各6項目、Codexが配置とスクロールの4項目を担当。共通登録・資料・統合ブラウザ検証・ローカルコミットはCodexが担当する。既存の依存・DB・API・カテゴリを維持し、比較・指示文合成は別課題。

| ID | 担当 / 状態 |
|---|---|
| input-mask | Terra inputs / 完了（公開済み） |
| rating | Terra inputs / 完了（公開済み） |
| date-range | Terra inputs / 完了（公開済み） |
| time-input | Terra inputs / 完了（公開済み） |
| copy-button | Terra inputs / 完了（公開済み） |
| form-review | Terra inputs / 完了（公開済み） |
| notification-center | Terra states / 完了（公開済み） |
| connection-status | Terra states / 完了（公開済み） |
| activity-feed | Terra states / 完了（公開済み） |
| polling-control | Terra states / 完了（公開済み） |
| queue-controls | Terra states / 完了（公開済み） |
| history-controls | Terra states / 完了（公開済み） |
| calendar-grid | Terra collections / 完了（公開済み） |
| kanban-board | Terra collections / 完了（公開済み） |
| comparison-table | Terra collections / 完了（公開済み） |
| zoom-controls | Terra collections / 完了（公開済み） |
| thumbnail-gallery | Terra collections / 完了（公開済み） |
| hierarchical-checkboxes | Terra collections / 完了（公開済み） |
| full-bleed-layout | Codex / 完了（公開済み） |
| card-footer-alignment | Codex / 完了（公開済み） |
| reading-progress | Codex / 完了（公開済み） |
| back-to-top | Codex / 完了（公開済み） |

担当ファイル：各IDの新規JSONと対応するDemo.tsx、final-input-demos.css・final-state-demos.css・final-collection-demos.css・final-layout-demos.css。types.ts・Demos.tsx・Thumbnail.tsx・main.tsx・資料はCodexだけが編集し、共有ファイルの衝突を避ける。

第9回は120項目のテスト5件・本番ビルド、全88設定・22リセット・3画面幅132通り、境界動作とフォーカスを確認。100項目追加の依頼は完了。公開と比較・指示文合成は別課題。JavaScript763.45kB（gzip 207.57kB）の警告が継続。確認内容と未確認範囲、ダッシュボード更新案はPROGRESS.mdを参照。

2026-10-28：120項目版を公開済み。公開URLでは全120デモの表示とタイトル、検索・設定・コピーと代表操作、3画面幅を確認。各回の未公開記述は当時の記録で、現在の状態はこの行と冒頭の集計を参照。

定期実行や自動公開は未設定。目標達成後に自動で追加を続けず、新たな依頼がある場合に候補を判断する。
