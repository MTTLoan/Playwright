import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test("Valid login test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin("khachhang", "123456");

  const homePage = poManager.getHomePage();
  await homePage.searchProduct("Nước tẩy trang bí đao Cocoon 500ml");
});
