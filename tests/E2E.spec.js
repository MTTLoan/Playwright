import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";
const dataset = JSON.parse(
  JSON.stringify(require("../utils/orderTestData.json")),
);
for (const data of dataset) {
  test(`E2E test for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(data.username, data.password);
    await loginPage.acceptAlert();

    const homePage = poManager.getHomePage();
    await homePage.searchProduct(data.productName);

    const detailProductPage = poManager.getDetailProductPage();
    await detailProductPage.selectVersion(data.version);
    await detailProductPage.increaseQuantity(data.quantity);
    await detailProductPage.addToCart();
    await homePage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillShippingInfo(
      data.province,
      data.district,
      data.ward,
      data.address,
    );
    await checkoutPage.completeOrder();

    await homePage.navigateToHome();
    await homePage.navigateToOrders();
    const orderHistoryPage = poManager.getOrdersHistoryPage();
    await orderHistoryPage.verifyOrderContainsProduct(data.productName);
    await orderHistoryPage.verifyLatestOrderStatus("Đã xác nhận");
  });
}

test("Buy Now test", async ({ page }) => {
  const productName =
    "Kem chống nắng cấp ẩm nâng tone Beyond Angel Aqua Tone-up Sun cream";
  const version = 1;
  const quantity = "1";
  const province = "Thành phố Hồ Chí Minh";
  const district = "Quận 1";
  const ward = "Phường Bến Nghé";
  const address = "123 Đường ABC";

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login("khachhang", "123456");
  await loginPage.acceptAlert();

  const homePage = poManager.getHomePage();
  await homePage.searchProduct(productName);

  const detailProductPage = poManager.getDetailProductPage();
  await detailProductPage.selectVersion(version);
  await detailProductPage.increaseQuantity(quantity);
  await detailProductPage.buyNow();

  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.fillShippingInfo(province, district, ward, address);
  await checkoutPage.completeOrder();

  await homePage.navigateToHome();
  await homePage.navigateToOrders();
  const orderHistoryPage = poManager.getOrdersHistoryPage();
  await orderHistoryPage.verifyOrderContainsProduct(productName);
  await orderHistoryPage.verifyLatestOrderStatus("Đã xác nhận");
});
