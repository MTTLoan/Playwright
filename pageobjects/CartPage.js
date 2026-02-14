const { test, expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator(".cart-item");
    this.productsText = page.locator(".cart-item-name");
    this.checkout = page.locator(".btn-checkout");
  }
  s;
  async VerifyProductIsDisplayed(productName) {
    await this.cartProducts.first().waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.cartProducts.filter({ hasText: productName });
  }
}
module.exports = { CartPage };
