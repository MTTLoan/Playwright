import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test("E2E test", async ({ page }) => {
  const productName =
    "Phấn nước che phủ cao mỏng nhẹ OHUI Ultimate Cover Denier Cushion 13G x 2";
  const version = 2;
  const quantity = "2";
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
  await detailProductPage.addToCart();
  await homePage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.checkout();

  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.fillShippingInfo(province, district, ward, address);
  await checkoutPage.completeOrder();

  await homePage.navigateToHome();
  await homePage.navigateToOrders();
  const orderHistoryPage = poManager.getOrdersHistoryPage();
  await orderHistoryPage.verifyOrderContainsProduct(productName);
  await orderHistoryPage.verifyLatestOrderStatus("Đã xác nhận");
});

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
