import { test, expect } from '@playwright/test';

test.describe('ゴミ分別検索ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/garbage');
  });

  test('ページが正しく表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page.getByRole('heading', { name: 'ゴミ分別検索' })).toBeVisible();

    // 説明文の確認
    await expect(
      page.getByText('出雲市のゴミの分け方・出し方を簡単に検索できます')
    ).toBeVisible();

    // 検索バーの確認
    await expect(
      page.getByPlaceholder('品目名を入力してください（例：ペットボトル、テレビ、新聞紙）')
    ).toBeVisible();

    // フィルターセクションの確認
    await expect(page.getByText('分別区分で絞り込み')).toBeVisible();
  });

  test('カテゴリーフィルターボタンが表示される', async ({ page }) => {
    // すべてのカテゴリーボタンが表示されることを確認
    await expect(page.getByRole('button', { name: 'すべて' })).toBeVisible();
    await expect(page.getByRole('button', { name: '燃えるごみ' })).toBeVisible();
    await expect(page.getByRole('button', { name: '破砕ごみ' })).toBeVisible();
    await expect(page.getByRole('button', { name: '埋立ごみ' })).toBeVisible();
    await expect(page.getByRole('button', { name: '粗大ごみ' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'リサイクル' })).toBeVisible();
    await expect(page.getByRole('button', { name: '市で収集不可' })).toBeVisible();
  });

  test('検索機能が動作する', async ({ page }) => {
    // 検索バーに入力
    const searchInput = page.getByPlaceholder(
      '品目名を入力してください（例：ペットボトル、テレビ、新聞紙）'
    );
    await searchInput.fill('ペットボトル');

    // 検索結果が表示されるまで待機
    await page.waitForTimeout(500);

    // 結果件数が表示されることを確認（0件以上）
    await expect(page.getByText(/件の品目が見つかりました/)).toBeVisible();
  });

  test('カテゴリーフィルターが動作する', async ({ page }) => {
    // 「燃えるごみ」ボタンをクリック
    await page.getByRole('button', { name: '燃えるごみ' }).click();

    // フィルター結果が表示されるまで待機
    await page.waitForTimeout(500);

    // 結果件数が表示されることを確認
    await expect(page.getByText(/件の品目が見つかりました/)).toBeVisible();
  });

  test('リサイクルカテゴリーフィルターが動作する', async ({ page }) => {
    // 「リサイクル」ボタンをクリック
    await page.getByRole('button', { name: 'リサイクル' }).click();

    // フィルター結果が表示されるまで待機
    await page.waitForTimeout(500);

    // 結果件数が表示されることを確認
    await expect(page.getByText(/件の品目が見つかりました/)).toBeVisible();
  });

  test('検索結果が表示される', async ({ page }) => {
    // 何らかの検索を実行
    const searchInput = page.getByPlaceholder(
      '品目名を入力してください（例：ペットボトル、テレビ、新聞紙）'
    );
    await searchInput.fill('缶');

    // 検索結果が表示されるまで待機
    await page.waitForTimeout(500);

    // 結果件数の表示を確認
    const resultText = await page.getByText(/件の品目が見つかりました/).textContent();
    expect(resultText).toBeTruthy();
  });

  test('検索とフィルターの組み合わせが動作する', async ({ page }) => {
    // まずカテゴリーを選択
    await page.getByRole('button', { name: 'リサイクル' }).click();
    await page.waitForTimeout(500);

    // 次に検索ワードを入力
    const searchInput = page.getByPlaceholder(
      '品目名を入力してください（例：ペットボトル、テレビ、新聞紙）'
    );
    await searchInput.fill('ペット');
    await page.waitForTimeout(500);

    // 絞り込まれた結果が表示されることを確認
    await expect(page.getByText(/件の品目が見つかりました/)).toBeVisible();
  });

  test('結果が0件の場合のメッセージが表示される', async ({ page }) => {
    // 存在しない品目を検索
    const searchInput = page.getByPlaceholder(
      '品目名を入力してください（例：ペットボトル、テレビ、新聞紙）'
    );
    await searchInput.fill('存在しない品目xyz123');
    await page.waitForTimeout(500);

    // 0件のメッセージを確認
    await expect(page.getByText('該当する品目が見つかりませんでした。')).toBeVisible();
    await expect(page.getByText('別のキーワードで検索してみてください。')).toBeVisible();
  });

  test('ホームに戻るボタンが機能する', async ({ page }) => {
    // ホームに戻るリンクを探してクリック
    const backLink = page.getByRole('link', { name: /ホーム/ });
    await backLink.click();

    // ホームページに戻ることを確認
    await expect(page).toHaveURL('/');
  });
});
