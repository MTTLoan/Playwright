import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test("Valid login test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin("khachhang", "123456");
  await expect(page.getByText("Đăng nhập thành công!")).toBeVisible();
});

test("Invalid login test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin("khachhang", "123");
  await expect(
    page.getByText("Sai tên tài khoản hoặc mật khẩu."),
  ).toBeVisible();
});

test("Empty username test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin("", "123456");
  const validationMessage = await loginPage.username.evaluate(
    (node) => node.validationMessage,
  );
  expect(validationMessage).toContain("fill out");
});

test("Empty password test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin("khachhang", "");
  const validationMessage = await loginPage.password.evaluate(
    (node) => node.validationMessage,
  );
  expect(validationMessage).toContain("fill out");
});
