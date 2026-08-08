import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage, CheckoutPage } from './pages/CartPage';

/**
 * End-to-end checkout flow: login -> add items to cart -> checkout -> order confirmation.
 * Also covers sorting behavior on the inventory page.
 */
test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user can add items to cart and complete checkout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.goToCart();
    await cartPage.expectItemCount(2);
    await cartPage.beginCheckout();

    await checkoutPage.fillCheckoutInfo('Priya', 'Anand', '110001');
    await expect(checkoutPage.summaryTotalLabel).toBeVisible();

    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('products can be sorted by price, low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getDisplayedPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('cart badge is not shown when cart is empty', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
