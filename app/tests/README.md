# E2Eテスト

このディレクトリには、Playwrightを使用したE2Eテストが含まれています。

## テストファイル

- `example.spec.ts` - 基本的な動作確認テスト
- `home.spec.ts` - ホームページのテスト
- `garbage-search.spec.ts` - ゴミ分別検索ページのテスト
- `navigation.spec.ts` - サイトナビゲーションとレスポンシブデザインのテスト

## テストの実行方法

### 全てのテストを実行（ヘッドレスモード）

```bash
cd app
npm test
```

### UIモードで実行（推奨）

```bash
npm run test:ui
```

### ブラウザを表示して実行

```bash
npm run test:headed
```

### 特定のテストファイルを実行

```bash
npx playwright test tests/home.spec.ts
```

### 特定のブラウザでテスト

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## テストレポート

テスト実行後、HTMLレポートを表示：

```bash
npx playwright show-report
```

## 注意事項

- テストを実行する前に、開発サーバーが起動していることを確認してください（`npm run dev`）
- テスト設定（`playwright.config.ts`）により、テスト実行時に自動的に開発サーバーが起動します
- CI環境では、テストは自動的にリトライされます

## テストの追加

新しいテストを追加する場合は、以下のパターンに従ってください：

```typescript
import { test, expect } from '@playwright/test';

test.describe('テストグループ名', () => {
  test('テスト名', async ({ page }) => {
    await page.goto('/');
    // テストコード
  });
});
```
