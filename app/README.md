# お役立ち WEB サイト

の情報をわかりやすくお届けする WEB サイトです。

## 📋 プロジェクト概要

島根県の各種情報（避難所、AED 設置場所、公共施設、など）を一元的に提供するウェブアプリケーションです。

## 🚀 開発状況

### ✅ 完了（Day 1）

- プロジェクト基盤構築
- ディレクトリ構造の作成
- ローカル JSON データの準備
  - 避難所情報
  - AED 設置場所
  - 公共施設情報
  - ・お知らせ
- 基本ページの作成
  - トップページ
  - 避難所一覧ページ
  - AED 一覧ページ
  - 公共施設一覧ページ
  - ニュース一覧ページ

### 🚧 今後の実装予定

- 島根県オープンデータとの連携
- RSS 自動取得機能
- 地図表示機能
- 統計情報の表示
- 検索機能
- フィルタリング機能

## 🛠️ 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## 📂 プロジェクト構造

```
app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── shelters/          # 避難所ページ
│   ├── aeds/              # AEDページ
│   ├── facilities/        # 公共施設ページ
│   ├── news/              # ニュースページ
│   ├── statistics/        # 統計ページ（準備中）
│   └── map/               # 地図ページ（準備中）
├── src/
│   └── features/          # 機能別モジュール
│       ├── opendata/      # オープンデータ機能
│       └── news/          # ニュース機能
├── public/
│   └── data/              # ローカルJSONデータ
└── CODING_RULES.md        # コーディング規約
```

## 🏃 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📊 データソース

### Day 1（現在）

- ローカル JSON ファイル（`public/data/`）

### 今後の予定

1. **島根県オープンデータ**

   - 避難所一覧（CSV/Excel）
   - AED 設置場所
   - 公共施設一覧

2. **いずも RSS**

   - URL: https://www.city.izumo.shimane.jp/www/rss/news.xml
   - 更新頻度: 1 時間ごと or 1 日 3 回

3. **統計でみる出雲（PDF）**
   - 人口推移、年齢別人口、地域別人口など
   - 更新頻度: 年 1 回

## 📝 コーディング規約

詳細は [CODING_RULES.md](./CODING_RULES.md) を参照してください。

## 🔄 更新履歴

### 2025-12-06

- プロジェクト初期セットアップ
- Day 1: ローカル JSON データを使用した基本機能実装
