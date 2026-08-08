import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

/**
 * Login flow coverage: valid login, locked-out user, and invalid credentials.
 * Uses SauceDemo's publicly documented standard test accounts.
 */
test.describe('Login', () => {
  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });

  test('invalid credentials are rejected', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    await loginPage.expectLoginError('Username and password do not match');
  });

  test('empty credentials show a required-field error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await loginPage.expectLoginError('Username is required');
  });
});
