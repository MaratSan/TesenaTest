import { test, expect } from '@playwright/test';

// Test Case 12: Add Products in Cart
test('Add Products in Cart', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await page.getByRole('button', { name: 'Consent' }).click();
  await page.waitForTimeout(1000)

  await page.locator('.carousel-inner').first().isVisible();

  await page.locator('a[href="/products"]').click();
  await expect(page).toHaveURL('https://automationexercise.com/products');
  await page.waitForTimeout(1000)

  await page.locator('.features_items .col-sm-4').nth(0)
      .locator('.add-to-cart').first().click();
  await page.waitForTimeout(1000)

  await page.locator('button:has-text("Continue Shopping")').click();
  await page.waitForTimeout(1000)

  await page.locator('.features_items .col-sm-4').nth(1)
      .locator('.add-to-cart').first().click();
  await page.waitForTimeout(1000)

  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');

  const cartItems = page.locator('.cart_info > table > tbody > tr');
  await expect(cartItems).toHaveCount(2);

  const firstProductPrice = (await cartItems.nth(0).locator('.cart_price').textContent()).trim();
  const secondProductPrice = (await cartItems.nth(1).locator('.cart_price').textContent()).trim();

  expect(firstProductPrice).toBe('Rs. 500');
  expect(secondProductPrice).toBe('Rs. 400');

  const firstProductQty = (await cartItems.nth(0).locator('.cart_quantity').textContent()).trim();
  const secondProductQty = (await cartItems.nth(1).locator('.cart_quantity').textContent()).trim();

  expect(firstProductQty).toBe('1');
  expect(secondProductQty).toBe('1');

  const firstProductTotal = (await cartItems.nth(0).locator('.cart_total').textContent()).trim();
  const secondProductTotal = (await cartItems.nth(1).locator('.cart_total').textContent()).trim();

  expect(firstProductTotal).toBe('Rs. 500');
  expect(secondProductTotal).toBe('Rs. 400');
});


// Test Case 3: Login User with incorrect email and password
test('Login User with incorrect email and password', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await page.getByRole('button', { name: 'Consent' }).click();

  await page.getByRole('link', { name: ' Signup / Login' }).click();

  await page.getByText('Login to your account Login').click();

  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('san.marat93@gmail.com');

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('dfvdfvdsfv');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Your email or password is').isVisible();
});


// Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
test('Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await page.getByRole('button', { name: 'Consent' }).click();

  await page.waitForTimeout(1000)
  await page.locator('.carousel-inner').first().isVisible();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // Wait for page to settle

  await expect(page.locator('h2:has-text("SUBSCRIPTION")')).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000); // Wait for page to settle

  await page.getByRole('heading', { name: 'Full-Fledged practice website' }).isVisible();
});

// Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
test('Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to URL
  await page.goto('http://automationexercise.com');
  await page.getByRole('button', { name: 'Consent' }).click();

  await page.waitForTimeout(1000)
  await page.locator('.carousel-inner').first().isVisible();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await expect(page.locator('h2:has-text("SUBSCRIPTION")')).toBeVisible();

  await page.locator('.grippy-host').click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: '' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('heading', { name: 'Full-Fledged practice website' }).isVisible();
});
