const { test, expect } = require('@playwright/test');
const axeCore = require('axe-core');

test.describe('site smoke + accessibility', () => {
  test('homepage loads and main CTA visible + a11y', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    await page.goto('/');
    await expect(page).toHaveTitle(/WhatsApp Messages Hack/);
    await expect(page.locator('#form-submit')).toBeVisible();

    // accessibility check (axe)
    await page.addScriptTag({ content: axeCore.source });
    const results = await page.evaluate(async () => await axe.run());
    expect(results.violations.length).toBe(0);

    // ensure no console errors on load
    expect(consoleErrors).toEqual([]);
  });

  test('form submit shows progress messages and triggers locker alert', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('#form-country', 'US');
    await page.fill('#form-phone', '15551234567');

    const dialog = await page.waitForEvent('dialog');
    await page.click('#form-submit');
    const shown = await dialog.message();
    expect(shown).toBe('demo');
    await dialog.dismiss();

    await expect(page.locator('#progress-messages')).toContainText('Provded phone number: 15551234567');
    await expect(page.locator('#progress-messages')).toContainText('Provided country by code: US');
  });

  test('whatsapp link is generated and contains phone', async ({ page }) => {
    await page.goto('/');
    await page.fill('#form-phone', '15551234567');
    await page.selectOption('#form-country', 'US');

    const link = page.locator('#whatsapp-link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /wa\.me\/15551234567/);
  });
});
