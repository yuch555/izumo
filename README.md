# 出雲市お役立ち WEB サイト 🏛️

出雲市での生活をもっと便利にするための情報ポータルサイトです。市民の日常生活に必要な情報を、使いやすい形で提供します。

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## 📖 概要

この Web サイトは、出雲市の市民向けに、日常生活で必要となる様々な情報を一元的に提供するプラットフォームです。公式データとオープンデータを活用し、直感的な UI で情報にアクセスできるように設計されています。

### 主な機能

#### 🗑️ ゴミ分別検索

- 品目名から簡単にゴミの分別方法を検索
- 収集日、出し方、注意事項を表示
- リアルタイム検索で素早くアクセス

#### 📰 お知らせ情報

- 出雲市公式 RSS フィードから最新ニュースを取得
- 災害・緊急情報、注目情報、新着情報の 3 カテゴリー
- カテゴリー別・日付別フィルタリング機能
- ISR（Incremental Static Regeneration）で 1 時間ごとに自動更新

#### ♻️ 資源リサイクル

- リサイクルステーションの場所と営業時間
- 対応品目の詳細情報
- 地図表示による視覚的な位置確認

#### 🏢 公共施設情報

- 市内の公共施設データベース
- 施設の詳細情報、連絡先、アクセス方法
- カテゴリー別分類と検索機能

#### 🏥 AED 設置場所

- 市内の AED 設置施設の位置情報
- Mapbox GL を使用したインタラクティブな地図表示
- 施設情報のポップアップ表示

#### 🚨 避難所情報

- 災害時の避難所位置と詳細情報
- 地図上での視覚的な確認
- 施設の収容人数や設備情報

#### 📊 人口・世帯統計

- 最新の住民基本台帳データ（2025 年 10 月時点）
- 地区別・町別の詳細な人口・世帯数
- 前月比・前年同月比の推移データ
- 国籍・地域別人口の内訳
- インタラクティブなグラフとチャート

#### 💰 財政情報

- 出雲市の財政状況の可視化（令和 5 年度）
- 歳入歳出、基金残高、地方債などの詳細データ
- Recharts を使用したグラフ表示
- わかりやすい解説とツールチップ

## 🎯 工夫した点

### 1. **RSS 統合によるリアルタイム情報配信**

出雲市公式の 3 つの RSS フィード（災害・緊急情報、注目情報、新着情報）を統合し、API ルートで一元管理。Zod スキーマによる型安全なデータ検証を実装し、エラーハンドリングも充実させています。

```typescript
// RSS取得と検証の実装例
const RSS_FEEDS = {
  emergency: "https://www.city.izumo.shimane.jp/www/rss/kinkyu.rdf",
  topics: "https://www.city.izumo.shimane.jp/www/rss/topics.rdf",
  news: "https://www.city.izumo.shimane.jp/www/rss/news.rdf",
};
```

**RSS 実装の特徴：**

- 3 つのフィードを並列取得してパフォーマンス最適化
- RDF 形式（RSS 1.0）と RSS 2.0 形式の両方に対応
- フェイルセーフ設計（1 つのフィードが失敗しても他は取得）
- HTML タグの除去とサニタイズ処理
- 日付順での自動ソート機能

### 2. **ISR（Incremental Static Regeneration）による最適化**

Next.js の ISR 機能を活用し、1 時間ごとにコンテンツを自動再生成。静的サイトのパフォーマンスと動的コンテンツの新鮮さを両立しています。

```typescript
export const revalidate = 3600; // 1時間ごとに再生成
```

### 3. **型安全な開発環境**

TypeScript と Zod を活用し、エンドツーエンドで型安全性を確保。API レスポンスから UI コンポーネントまで、一貫した型チェックを実施しています。

### 4. **レスポンシブデザイン**

Tailwind CSS を使用し、モバイルファーストのレスポンシブデザインを実装。すべてのデバイスで快適に閲覧できます。

### 5. **インタラクティブな地図表示**

Mapbox GL JS を使用し、AED や避難所の位置を直感的に確認できるインタラクティブマップを実装。日本語表示にも対応しています。

### 6. **データビジュアライゼーション**

Recharts と Lucide React を組み合わせ、統計データをわかりやすいグラフやチャートで表現。視覚的に理解しやすい UI を実現しています。

### 7. **モジュラーなコンポーネント設計**

機能ごとにディレクトリを分割し、保守性の高いコード構造を実現。shadcn/ui ベースの UI コンポーネントライブラリを構築しています。

## 📁 フォルダ構成

```
app/
├── app/                          # Next.js App Router
│   ├── api/                      # APIルート
│   │   └── news/                 # ニュースRSS取得API
│   │       └── route.ts
│   ├── aeds/                     # AED設置場所ページ
│   │   └── page.tsx
│   ├── facilities/               # 公共施設情報ページ
│   │   └── page.tsx
│   ├── fiscal/                   # 財政情報ページ
│   │   └── page.tsx
│   ├── garbage/                  # ゴミ分別検索ページ
│   │   └── page.tsx
│   ├── map/                      # 地図ページ
│   │   └── page.tsx
│   ├── news/                     # お知らせページ
│   │   └── page.tsx
│   ├── recycling/                # リサイクルステーション
│   │   └── page.tsx
│   ├── shelters/                 # 避難所情報ページ
│   │   └── page.tsx
│   ├── statistics/               # 人口統計ページ
│   │   └── page.tsx
│   ├── globals.css               # グローバルスタイル
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # トップページ
├── components/                   # shadcn/ui コンポーネント
│   └── ui/                       # 汎用UIコンポーネント
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── tooltip.tsx
├── src/
│   ├── components/
│   │   ├── base/                 # 基本コンポーネント
│   │   │   └── BackToHome.tsx    # ホームに戻るボタン
│   │   ├── features/             # 機能別コンポーネント
│   │   │   ├── AEDMap.tsx        # AED地図表示
│   │   │   ├── FacilitiesStats.tsx # 公共施設統計
│   │   │   ├── FiscalStats.tsx   # 財政情報表示
│   │   │   ├── GarbageSearch.tsx # ゴミ検索機能
│   │   │   ├── MapComponent.tsx  # 地図コンポーネント
│   │   │   ├── NewsList.tsx      # ニュース一覧
│   │   │   ├── PopulationStats.tsx # 人口統計表示
│   │   │   ├── RecyclingStations.tsx # リサイクル施設
│   │   │   └── ShelterMap.tsx    # 避難所地図
│   │   └── ui/                   # カスタムUIコンポーネント
│   ├── features/
│   │   └── news/
│   │       └── schemas.ts        # Zodスキーマ定義
│   └── lib/
│       └── news.ts               # ニュース取得ユーティリティ
├── public/
│   ├── data/                     # 静的データ
│   │   ├── aeds.json             # AED設置情報
│   │   ├── artificialData/       # 統計データ
│   │   │   └── izumo_jumin_daicho_202510.json
│   │   ├── cycle-aria.json       # リサイクルステーション
│   │   ├── fiscalOverviewData/   # 財政データ
│   │   │   └── izumo_2023_fiscal_overview.json
│   │   ├── garbage.json          # ゴミ分別データ
│   │   ├── news.json             # ニュースデータ
│   │   ├── opendata.json         # オープンデータ
│   │   ├── public-facilities.json # 公共施設データ
│   │   └── shelters.json         # 避難所データ
│   └── image/                    # 画像ファイル
├── lib/                          # ユーティリティライブラリ
├── CODING_RULES.md               # コーディング規約
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 16.0.7** - React フレームワーク
- **React 19.2.0** - UI ライブラリ
- **TypeScript 5** - 型安全な開発
- **Tailwind CSS 4** - ユーティリティファースト CSS

### UI コンポーネント

- **shadcn/ui** - 再利用可能なコンポーネントライブラリ
- **Radix UI** - アクセシブルなプリミティブコンポーネント
- **Lucide React** - アイコンライブラリ
- **Recharts** - データビジュアライゼーション

### 地図・位置情報

- **Mapbox GL JS** - インタラクティブマップ
- **react-map-gl** - React 用 Mapbox ラッパー

### データ処理

- **fast-xml-parser** - RSS/XML パース
- **Zod** - スキーマ検証
- **date-fns** - 日付処理

## 🚀 セットアップ

### 前提条件

- Node.js 20 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yuch555/izumo.git
cd izumo/app

# 依存関係のインストール
npm install

# 環境変数の設定（Mapbox用）
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here" > .env
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### ビルド

```bash
npm run build
npm start
```

## 📊 データソース

### 公式 RSS

- **災害・緊急情報**: `https://www.city.izumo.shimane.jp/www/rss/kinkyu.rdf`
- **注目情報**: `https://www.city.izumo.shimane.jp/www/rss/topics.rdf`
- **新着情報**: `https://www.city.izumo.shimane.jp/www/rss/news.rdf`

### オープンデータ

- 出雲市オープンデータポータル
- 住民基本台帳データ（2025 年 10 月 31 日時点）
- 公共施設データ
- AED 設置情報
- 財政データ（令和 5 年度）

## 🎨 デザインシステム

### カラーパレット

- **プライマリー**: 緑系（ゴミ分別）
- **セカンダリー**: 青系（公共施設、地図）
- **アクセント**: オレンジ系（重要情報）
- **中立色**: グレースケール

### レスポンシブブレークポイント

- モバイル: `< 768px`
- タブレット: `768px - 1024px`
- デスクトップ: `> 1024px`

## 📝 コーディング規約

詳細は [CODING_RULES.md](./CODING_RULES.md) を参照してください。

### 主なルール

- TypeScript 厳格モード
- ESLint + Prettier
- コンポーネント単位でのファイル分割
- 機能別ディレクトリ構造
- Zod による型検証

## 🔄 RSS 統合について

### 実装の詳細

RSS フィードの取得と処理は `app/api/news/route.ts` で実装されています：

```typescript
// 3つのRSSフィードを並列取得
const [emergencyNews, topicsNews, regularNews] = await Promise.all([
  fetchRSSFeed(RSS_FEEDS.emergency, "emergency"),
  fetchRSSFeed(RSS_FEEDS.topics, "topics"),
  fetchRSSFeed(RSS_FEEDS.news, "news"),
]);

// カテゴリーを付与してマージ
const allNews = [
  ...emergencyNews.map((item) => ({ ...item, category: "emergency" })),
  ...topicsNews.map((item) => ({ ...item, category: "topics" })),
  ...regularNews.map((item) => ({ ...item, category: "news" })),
];
```

### 特徴

- **並列処理**: Promise.all で 3 つのフィードを同時取得
- **エラーハンドリング**: 個別のフィード取得失敗時も他のデータを返却
- **データ検証**: Zod スキーマで型安全性を保証
- **キャッシュ**: ISR で 1 時間ごとに再検証
- **HTML サニタイズ**: 説明文から HTML タグを除去

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まず issue を開いて変更内容を議論してください。

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 👥 作成者

- **yuch555** - [GitHub](https://github.com/yuch555)

## 🙏 謝辞

- 出雲市オープンデータポータル
- Next.js チーム
- shadcn/ui
- Mapbox

---

**Note**: このプロジェクトは出雲市の公式サイトではありません。市民の利便性向上を目的とした個人プロジェクトです。
