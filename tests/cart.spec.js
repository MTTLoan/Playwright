import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

const cartUrl = "https://cosmeticsellingweb.onrender.com/cart";
const productName = "Dầu tẩy trang hoa hồng Cocoon 140ml";

test.beforeAll(async ({ browser }) => {
  // Login and save storage state to reuse in other tests
  const username = "khachhang2";
  const password = "123456";

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.acceptAlert();

  await context.storageState({ path: "state2.json" });

  // Add to cart
  const version = "1";
  const quantity = "1";
  const homePage = poManager.getHomePage();
  await homePage.searchProduct(productName);
  const detailProductPage = poManager.getDetailProductPage();
  await detailProductPage.selectVersion(version);
  await detailProductPage.increaseQuantity(quantity);
  await detailProductPage.addToCart();
});

test("Product is displayed in cart", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state2.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await page.goto(cartUrl);
  await cartPage.waitForCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
});

test("Verify total price calculation", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state2.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await page.goto(cartUrl);
  await cartPage.verifyTotalPriceCalculation();
});

test("Increase product quantity", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state2.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await page.goto(cartUrl);
  await cartPage.increaseQuantity(productName);
});

test("Decrease product quantity", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state2.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await page.goto(cartUrl);
  await cartPage.decreaseQuantity(productName);
});

test("Remove product from cart", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state2.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await page.goto(cartUrl);
  await cartPage.removeProduct(productName);
  // await expect(cartPage.cartItems).toHaveCount(0);
});
