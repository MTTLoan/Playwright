const { test, expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart-item");
    this.productNames = page.locator(".cart-item-name");
    this.totalQuantity = page.locator("#total-quantity");
    this.totalPrice = page.locator("#total-price");
    this.checkoutBtn = page.locator(".btn-checkout");
  }

  async waitForCartPage() {
    await this.cartItems.first().waitFor();
  }

  async verifyProductIsDisplayed(productName) {
    await this.waitForCartPage();
    const bool = await this.cartItems
      .filter({ hasText: productName })
      .isVisible();
    expect(bool).toBeTruthy();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }

  async getTotalQuantity() {
    return (await this.totalQuantity.textContent()).trim();
  }

  async getTotalPrice() {
    return (await this.totalPrice.textContent()).trim();
  }

  async increaseQuantity(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    const before = await this.getTotalQuantity();
    await item.locator("button:has-text('+')").click();
    const after = await this.getTotalQuantity();
    // after = before + 1
    expect(Number(after)).toBe(Number(before) + 1);
  }

  async decreaseQuantity(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    const before = await this.getTotalQuantity();
    await item.locator("button:has-text('-')").click();
    const after = await this.getTotalQuantity();
    // after = before - 1
    expect(Number(after)).toBe(Number(before) - 1);
  }

  async removeProduct(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator(".remove-item").click();
    await expect(item).toHaveCount(0);
  }

  async getProductCount() {
    return await this.cartItems.count();
  }
  // getProductLocator(productName) {
  //   return this.cartItems.filter({ hasText: productName });
  // }
}
module.exports = { CartPage };
