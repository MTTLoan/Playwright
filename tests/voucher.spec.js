import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

test("Verify voucher is still valid (not expired)", async ({ page }) => {
  const poManager = new POManager(page);
  const voucherPage = poManager.getVoucherPage();
  await voucherPage.goto();
  await voucherPage.checkVoucherValidity();
});

test("Verify copy button shows alert message", async ({ page }) => {
  const poManager = new POManager(page);
  const voucherPage = poManager.getVoucherPage();
  await voucherPage.goto();
  await voucherPage.clickCopyButton(0);
});

test("Verify no duplicate voucher codes", async ({ page }) => {
  const poManager = new POManager(page);
  const voucherPage = poManager.getVoucherPage();
  await voucherPage.goto();
  const codes = await voucherPage.getAllVoucherCodes();
  const uniqueCodes = new Set(codes);
  expect(uniqueCodes.size).toBe(codes.length);
});
