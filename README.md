# UI Atlas

触って選べるUI/UX辞典。名前や用途で探し、操作デモで確かめて、選んだ設定に対応するAIへの指示文をコピーできます。

- [サイトを開く](https://program-person.github.io/ui-atlas/)
- [GitHubリポジトリ](https://github.com/program-person/ui-atlas)

## 最初の版

5項目：サイドバー、モーダル、ドロワー、ホバーと押下の反応、検索と絞り込み。

日本語・英語・別名・用途からの検索、分類、PC幅とスマホ幅のデモ、デモのリセット、設定の変更、指示文コピー、参考資料を使えます。デモのデータはすべて架空です。

比較・複数項目の指示文合成・残り15項目・利用枠による自動追加は、次の段階です。

## ローカルで使う

Node.js 24とnpmを推奨します。Node.jsは22.18以上が必要です。Windows PowerShell 5.1から実行します。

初回の準備：

```powershell
Set-Location '<ui-atlasのフォルダ>'
npm.cmd ci
```

起動：

```powershell
npm.cmd run dev
```

表示されたローカルURLをブラウザで開きます。通常は `http://127.0.0.1:5173/` です。終了するときは起動したターミナルでCtrl+Cを押します。

検証：

```powershell
npm.cmd test
npm.cmd run build
```

本番ビルドのローカル確認：

```powershell
npm.cmd run preview
```

## GitHub Pages

公開リポジトリのSettings → Pages → SourceをGitHub Actionsに設定します。mainへのpushでテスト・項目検証・型チェック・ビルドが通った場合にサイトを更新します。Pull Requestでは検証のみ行います。

`.github/workflows/pages.yml`はWindows実行環境を使用し、コマンドはWindows PowerShellです。ビルド出力は相対パスなので、リポジトリ名を変えた場合も同じ構成を利用できます。詳細ページには `#/patterns/drawer` などのハッシュURLを使います。

## 後から項目を追加する

[設計](DESIGN.md)、[追加手順](docs/ADDING_PATTERNS.md)、[候補一覧](docs/BACKLOG.md)、[進捗](PROGRESS.md)を確認してください。

項目のJSONは `src/catalog/patterns/`、デモは `src/demos/` にあります。`CatalogRepository`が取得処理と画面を分けています。将来APIから取得する場合は取得実装を変更し、画面に取得先のURLを埋め込みません。

`AGENTS.md`をCodexとClaude Codeの共通指示にし、`CLAUDE.md`から参照します。

## 検証の範囲

ローカルChromeで5種類の操作デモ、検索と0件時の解除、指示文と設定の一致、コピー成功と失敗時の案内、モーダル内のフォーカス循環とEsc、375/768/1440pxでの横幅、動きを減らす設定、直接URL・再読み込み・戻るを確認しました。

この結果は全ブラウザ・スクリーンリーダーの検証を意味しません。現在の公開状態はPROGRESS.mdに記録します。
