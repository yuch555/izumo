import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('ページが正しく表示される', async ({ page }) => {
    await page.goto('/');

    // タイトルの確認
    await expect(page.getByRole('heading', { name: '出雲市お役立ちWEBサイト' })).toBeVisible();

    // 説明文の確認
    await expect(page.getByText('出雲市での生活をもっと便利に。')).toBeVisible();
  });

  test('主要機能カードが表示される', async ({ page }) => {
    await page.goto('/');

    // ゴミ分別検索カード
    await expect(page.getByRole('heading', { name: 'ゴミ分別検索' })).toBeVisible();
    await expect(page.getByText('品目から簡単検索')).toBeVisible();

    // リサイクルステーションカード
    await expect(page.getByRole('heading', { name: 'リサイクルステーション' })).toBeVisible();
    await expect(page.getByText('店舗を地図から探す')).toBeVisible();

    // お知らせ一覧カード
    await expect(page.getByRole('heading', { name: 'お知らせ一覧' })).toBeVisible();
    await expect(page.getByText('最新情報をチェック')).toBeVisible();

    // 財政状況カード
    await expect(page.getByRole('heading', { name: '財政状況' })).toBeVisible();
    await expect(page.getByText('予算・決算を可視化')).toBeVisible();
  });

  test('ゴミ分別検索へのリンクが機能する', async ({ page }) => {
    await page.goto('/');

    // ゴミ分別検索カードをクリック
    await page.getByRole('link', { name: /ゴミ分別検索/ }).click();

    // URLが変わることを確認
    await expect(page).toHaveURL('/garbage');
  });

  test('リサイクルステーションへのリンクが機能する', async ({ page }) => {
    await page.goto('/');

    // リサイクルステーションカードをクリック
    await page.getByRole('link', { name: /リサイクルステーション/ }).click();

    // URLが変わることを確認
    await expect(page).toHaveURL('/recycling');
  });
});
