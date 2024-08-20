import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Desafio Frontend/);
});

test('adds new wallet', async ({ page }) => {
  const uuid = (Math.random() + 1).toString(36).substring(7);
  await page.goto('/');

  await page.getByRole('button', { name: 'Adicionar Carteira' }).click();

  await page.getByPlaceholder(/Nome/).fill('Playwright');

  await page.getByPlaceholder(/Sobrenome/).fill('Testing');

  await page.getByPlaceholder(/E-mail/).fill(`playwright.testing.${uuid}@example.com`);

  await page.waitForTimeout(500);

  await page.getByPlaceholder(/Valor de compra/).fill('10000');

  await page.waitForTimeout(500);
  
  await page.getByText(/Salvar/).click();

  await page.waitForTimeout(500);

  await page.locator('button.last-page-button').click();

  await page.waitForTimeout(500);

  expect(await page.locator(`text=playwright.testing.${uuid}@example.com`).isVisible()).toBeTruthy();

  await page.waitForTimeout(500);

  await page.locator('tr.user-row').locator('nth=-1').locator('div.delete-btn').click();

  await page.waitForTimeout(500);

  expect(await page.locator(`text=Excluir Carteira`).isVisible()).toBeTruthy();

  await page.locator(`button.confirm-button`).click();

  await page.waitForTimeout(500);

  expect(await page.locator(`text=playwright.testing.${uuid}@example.com`).isVisible()).toBeFalsy();
});