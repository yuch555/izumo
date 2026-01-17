import { test, expect } from '@playwright/test';

test.describe('基本的な動作確認', () => {
  test('ページタイトルが設定されている', async ({ page }) => {
    await page.goto('/');

    // タイトルに「出雲」が含まれることを確認
    await expect(page).toHaveTitle(/出雲/);
  });

  test('ページが正常に読み込まれる', async ({ page }) => {
    await page.goto('/');

    // メインコンテンツが表示されることを確認
    await expect(page.getByRole('heading', { name: '出雲市お役立ちWEBサイト' })).toBeVisible();
  });
});
