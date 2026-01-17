# コーディングルール

## 概要

このドキュメントは、Izumo プロジェクトにおけるコーディング規約とベストプラクティスを定義します。

## ディレクトリ構造

```
src/
├── components/           # コンポーネント
│   ├── base/            # 基本コンポーネント（Header、Footer等）
│   │   └── Header/
│   │       ├── Header.jsx
│   │       └── Header.module.scss
│   ├── page/            # ページ固有のコンポーネント
│   │   ├── Index/
│   │   │   ├── Index.jsx
│   │   │   └── Index.module.scss
│   │   └── News/
│   │       ├── Archive.jsx
│   │       └── Archive.module.scss
│   └── ui/              # 汎用UIコンポーネント（Button、Input等）
│       └── Button/
│           ├── Button.jsx
│           └── Button.module.scss
├── const/               # 定数定義
│   └── site.js
├── features/            # 機能別モジュール
│   └── news/
│       ├── api/         # API通信ロジック
│       │   ├── getNewsCategory.js
│       │   └── getNewsPost.js
│       ├── components/  # 機能固有のコンポーネント
│       │   ├── NewsCategoryList.jsx
│       │   ├── NewsCategoryList.module.scss
│       │   ├── NewsPostList.jsx
│       │   └── NewsPostList.module.scss
│       └── hooks/       # カスタムフック
│           └── useXXX.js
├── lib/                 # 外部ライブラリのラッパーやユーティリティ
│   └── newt.js
├── pages/               # Next.js ページ
└── styles/              # グローバルスタイル
```

## ディレクトリ構造の説明

### components/

再利用可能なコンポーネントを配置。以下の 3 つのサブディレクトリに分類：

- **base/**: サイト全体で使用される基本コンポーネント（ヘッダー、フッター、レイアウト等）
- **page/**: 特定のページ専用のコンポーネント
- **ui/**: 汎用的な UI コンポーネント（ボタン、インプット、カード等）

各コンポーネントは独自のディレクトリを持ち、JSX ファイルと SCSS モジュールをセットで管理。

### features/

機能ごとにまとめたモジュール。各機能は以下の構造を持つ：

- **api/**: データ取得や API 通信のロジック
- **components/**: その機能に固有のコンポーネント
- **hooks/**: その機能で使用するカスタムフック

### const/

アプリケーション全体で使用する定数を定義。

### lib/

外部ライブラリのラッパー関数やユーティリティ関数を配置。

## 命名規則

### ファイル名

- **コンポーネント**: PascalCase（例: `Header.jsx`, `Button.jsx`）
- **スタイル**: コンポーネント名と同じ + `.module.scss`（例: `Header.module.scss`）
- **API/ユーティリティ**: camelCase（例: `getNewsPost.js`, `site.js`）
- **カスタムフック**: `use` + PascalCase（例: `useNews.js`）

### コンポーネント名

- PascalCase を使用（例: `UserProfile`, `NewsPostList`）

### 関数名

- camelCase を使用（例: `getUserData`, `getNewsPost`）

### 定数

- UPPER_SNAKE_CASE を使用（例: `MAX_RETRY_COUNT`, `API_BASE_URL`）

## コンポーネント構成ルール

### コンポーネントの配置基準

1. **base/**: サイト全体で 1 回のみ使用される基本構造

   - Header, Footer, Layout 等

2. **ui/**: 複数箇所で再利用される汎用コンポーネント

   - Button, Input, Card, Modal 等
   - 機能に依存しない

3. **page/**: 特定のページでのみ使用

   - そのページの構造やレイアウトを担当

4. **features/[機能名]/components/**: 特定機能に紐づくコンポーネント
   - その機能でのみ使用
   - 他の機能では使わない

### スタイリング

- CSS Modules を使用（`.module.scss`）
- グローバルスタイルは`styles/`に配置
- コンポーネント固有のスタイルはコンポーネントと同じディレクトリに配置

## 機能開発の流れ

新しい機能を追加する際は、`features/`配下に新しいディレクトリを作成：

```
features/
└── [機能名]/
    ├── api/              # データ取得ロジック
    ├── components/       # 機能固有のコンポーネント
    └── hooks/            # カスタムフック
```

## ベストプラクティス

- コンポーネントは単一責任の原則に従う
- 1 コンポーネント = 1 ファイル
- スタイルはコンポーネントごとに分離
- 機能は`features/`でカプセル化
- API 呼び出しは`api/`ディレクトリに集約
- ロジックの再利用は`hooks/`でカスタムフック化
