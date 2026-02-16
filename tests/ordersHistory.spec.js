import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

const ordersHistoryUrl = "https://cosmeticsellingweb.onrender.com/orderinfor";

test.beforeAll(async ({ browser }) => {
  // Login and save storage state to reuse in other tests
  const username = "khachhang";
  const password = "123456";

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.acceptAlert();

  await context.storageState({ path: "state.json" });

  const csrfToken = await page
    .locator('meta[name="csrf-token"]')
    .getAttribute("content");

  const response = await page.request.post(
    "https://cosmeticsellingweb.onrender.com/buy-now-create",
    {
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
      form: {
        product_id: 1,
        quantity: 2,
        address: "123 Test Street",
        ward: 760,
        district: 760,
        province: 79,
        date_received: "",
        discount_id: "",
        total_price: 518000,
      },
    },
  );

  expect(response.status()).toBe(200);
});

test("Latest order has correct status", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto(ordersHistoryUrl);
  const poManager = new POManager(page);
  const ordersPage = poManager.getOrdersHistoryPage();
  await ordersPage.verifyLatestOrderStatus("Đã xác nhận");
});

test("Verify orders exist", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto(ordersHistoryUrl);
  const poManager = new POManager(page);
  const ordersPage = poManager.getOrdersHistoryPage();
  await ordersPage.verifyOrderExists();
});

test("Verify latest order total is correct", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto(ordersHistoryUrl);
  const poManager = new POManager(page);
  const ordersPage = poManager.getOrdersHistoryPage();
  await ordersPage.verifyLatestOrderTotal("518.000 VND");
});

test("Verify cancel order", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto(ordersHistoryUrl);
  const poManager = new POManager(page);
  const ordersPage = poManager.getOrdersHistoryPage();
  await ordersPage.cancelLatestOrder();
  await ordersPage.verifyLatestOrderStatus("Đã huỷ");
});
