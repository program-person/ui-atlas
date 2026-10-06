# UI Atlas — GitHub Pagesの公開案

作成日：2026-10-07（日本時間）
状態：GitHub Pagesとローカル起動の方針に合意済み。最新の作業状況はPROGRESS.mdに記録。

この文書はGitHub Pagesを選んだ理由と構成の記録。合意内容はDESIGN.mdにも反映済み。

## 結論

今回の初期版はGitHub Pagesに対応できる。検索、操作デモ、比較、指示文の組み立てはブラウザ側のJavaScriptで処理する。GitHub Pagesが静的ホスティングであることは、これらの機能を妨げない。

GitHub PagesはHTML・CSS・JavaScriptを配信するサービス。サーバー上でアプリの処理を動かす機能とは区別する。将来サーバーでの認証、秘密情報を必要とするAPI処理、共通DBへの書き込みが必要になった場合は、別のバックエンドを検討する。今回の初期版には含めない。

出典：[GitHub Pages公式説明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[Vite公式の静的デプロイ手順](https://vite.dev/guide/static-deploy.html#github-pages)。確認日：2026-10-07。

## 修正する方針

- URL版の第一候補をSitesからGitHub Pagesに変更する。
- React + TypeScript + Vite、JSONの項目データ、ブラウザ内の処理というアプリ構成は維持する。
- ローカル起動とURL版を同じリポジトリで管理する。
- mainへのpushをきっかけに、GitHub Actionsで整合性チェック・ビルド・Pagesへの配置を行う案。
- 検証やビルドに失敗した場合は配置の処理へ進まない。
- Viteのbaseはリポジトリの公開パスに合わせ、URL版でCSS・JavaScript・項目データの参照を確認する。
- 詳細ページはハッシュを使い、静的ホスティング上での直接アクセスや再読み込みに対応する。
- ローカルでのコマンド実行も、GitHub Actions内に自分で書くコマンドもPowerShellで統一する案。ActionsではWindows実行環境とWindows PowerShellを明示する。
- 初期段階で余剰枠による項目追加の自動実行は設定しない。push後のサイト更新と、AIによる項目追加は別の処理として設計する。

Viteの公式手順では、ビルドした出力をGitHub ActionsからGitHub Pagesへ配置できる。プロジェクトサイトではbaseをリポジトリ名に合わせる必要がある。

出典：[Vite: GitHub Pagesへのデプロイ](https://vite.dev/guide/static-deploy.html#github-pages)。

## URLの想定

リポジトリ名をui-atlasとした場合のプロジェクトサイト形式は、`https://<owner>.github.io/ui-atlas/`。

これは予定の形式であり、作成済み・公開済みのURLではない。リポジトリ名と所有者は作成前に確定する。

## 公開範囲と料金の前提

GitHub Freeでは公開リポジトリでGitHub Pagesが利用できる。非公開リポジトリでの利用は対応プランに依存する。

出典：[GitHub Pages: Who can use this feature?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。確認日：2026-10-07。

無料利用を前提とする構成では、公開リポジトリと公開サイトになる。この構成での実装をユーザーが了承済み。

ソースを非公開にしたい場合は、GitHubの実際のプランを確認するか、GitHubとの連携が可能な別のホスティング先を検討する。追加契約・カード登録は確認なしに行わない。

## 次の行動

設計と公開範囲の合意後、5項目で最初の版を作り、ローカルで確認する。その後、リポジトリへのpushとGitHub Pagesへの配置を行い、同じ機能をURL版で確認する。

## 現在の確認状況

- 確認済み：公式資料上、初期版に必要なブラウザ側の機能とViteの静的ビルドはGitHub Pages向けの構成にできる。
- 未実施：アプリ実装、ビルド、リポジトリ作成、push、Actions設定、Pages公開、URL版の動作確認。
- 決定済み：GitHub Pagesでの公開、ローカル起動への対応、専用リポジトリ名ui-atlas。

## ダッシュボード登録案（未反映）

- 対象：UI Atlas（UI/UX辞典）。未登録、IDは未発行。
- 状態：planning、優先度：low。
- 次の行動：未登録 → 設計と公開範囲を確定し、5項目の操作デモ・検索・指示文コピーをローカルとGitHub Pagesで使えるようにする。
- 作業ログ：初期20項目と継続追加の手順を設計し、URL版はGitHub Pages、ローカル版は同じソースで起動する案を整理。
- ユーザーの明示的な了承後に反映する。PROGRESS.mdのSitesを前提とした案より、この登録案を優先する。
