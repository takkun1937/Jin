import { RoutePath } from '@/common/constants';
import { expect, test } from '@playwright/test';

test('未ログイン状態で記事一覧と記事内容表示ページ間の画面遷移に関するテスト', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('テスト投稿').click();
  await expect(page).toHaveURL(new RegExp(`${RoutePath.Content}`));
  await page.getByRole('heading', { name: 'テスト投稿' }).click();
  await expect(page).toHaveURL(new RegExp(`${RoutePath.Content}`));
  await page.getByRole('button', { name: 'ホーム' }).click();
  await expect(page).toHaveURL('/');
  await page.getByText('テスト投稿').click();
  await expect(page).toHaveURL(new RegExp(`${RoutePath.Content}`));
  await page.getByRole('button', { name: 'Jin' }).click();
  await expect(page).toHaveURL('/');
});
