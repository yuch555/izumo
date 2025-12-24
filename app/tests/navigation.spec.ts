import { test, expect } from '@playwright/test';

test.describe('サイトナビゲーション', () => {
  test('全ての主要ページに移動できる', async ({ page }) => {
    await page.goto('/');

    // ゴミ分別検索ページへ
    await page.getByRole('link', { name: /ゴミ分別検索/ }).click();
    await expect(page).toHaveURL('/garbage');
    await expect(page.getByRole('heading', { name: 'ゴミ分別検索' })).toBeVisible();

    // ホームに戻る
    await page.goto('/');

    // リサイクルステーションページへ
    await page.getByRole('link', { name: /リサイクルステーション/ }).click();
    await expect(page).toHaveURL('/recycling');

    // ホームに戻る
    await page.goto('/');

    // お知らせ一覧ページへ
    await page.getByRole('link', { name: /お知らせ一覧/ }).click();
    await expect(page).toHaveURL('/news');

    // ホームに戻る
    await page.goto('/');

    // 財政状況ページへ
    await page.getByRole('link', { name: /財政状況/ }).click();
    await expect(page).toHaveURL('/fiscal');
  });

  test('ダークモード切り替えが動作する', async ({ page }) => {
    await page.goto('/');

    // ダークモードトグルボタンを探す（存在する場合）
    const darkModeButton = page.locator('button[aria-label*="ダーク"]').or(
      page.locator('button[aria-label*="テーマ"]')
    ).or(
      page.locator('[data-theme-toggle]')
    );

    // ボタンが存在する場合のみテスト
    const count = await darkModeButton.count();
    if (count > 0) {
      await darkModeButton.first().click();
      await page.waitForTimeout(300);

      // HTML要素にdarkクラスが追加されることを確認
      const html = page.locator('html');
      const hasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));
      expect(hasDarkClass).toBeTruthy();
    }
  });

  test('レスポンシブデザインが機能する（モバイル）', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // ページが正しく表示されることを確認
    await expect(page.getByRole('heading', { name: '出雲市お役立ちWEBサイト' })).toBeVisible();

    // カードが表示されることを確認
    await expect(page.getByRole('heading', { name: 'ゴミ分別検索' })).toBeVisible();
  });

  test('レスポンシブデザインが機能する（タブレット）', async ({ page }) => {
    // タブレットビューポートに設定
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // ページが正しく表示されることを確認
    await expect(page.getByRole('heading', { name: '出雲市お役立ちWEBサイト' })).toBeVisible();

    // カードが表示されることを確認
    await expect(page.getByRole('heading', { name: 'ゴミ分別検索' })).toBeVisible();
  });
});
