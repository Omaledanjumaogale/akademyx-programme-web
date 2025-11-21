import { test, expect } from '@playwright/test';

test('home page loads and has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Akademyx/);
    await expect(page.getByRole('heading', { name: /Transform Your Future/ })).toBeVisible();
});

test('application form is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Secure Your Spot Now')).toBeVisible();
});

test('referral page loads', async ({ page }) => {
    await page.goto('/referral');
    await expect(page.getByText('Become a Referral Partner')).toBeVisible();
});
