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

  async verifyTotalPriceCalculation() {
    await this.waitForCartPage();

    const itemCount = await this.cartItems.count();
    let total = 0;

    for (let i = 0; i < itemCount; i++) {
      const item = this.cartItems.nth(i);

      const unitPriceText = await item
        .locator(".cart-item-price span")
        .first()
        .textContent();
      const unitPrice = Number(unitPriceText.replace(/[^\d]/g, ""));
      // console.log("Unit price:", unitPriceText, "->", unitPrice);

      const quantityText = await item
        .locator(".cart-item-quantity input")
        .inputValue();
      const quantity = Number(quantityText.trim());
      // console.log("Quantity:", quantityText, "->", quantity);

      total += unitPrice * quantity;
    }

    // Lấy tổng tiền hiển thị
    const displayedTotalText = await this.getTotalPrice();

    // Loại bỏ dấu chấm và ký tự " đ"
    const normalizedTotal = Number(displayedTotalText.replace(/[^\d]/g, ""));
    // console.log("Displayed total:", displayedTotalText, "->", normalizedTotal);
    // console.log("Calculated total:", total);
    expect(normalizedTotal).toBe(total);
  }
}
module.exports = { CartPage };
