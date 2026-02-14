const { expect } = require("@playwright/test");
class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderItems = page.locator(".order-item");
  }

  async verifyOrderContainsProduct(productName) {
    const productLocator = this.page.locator(".order-item h5", {
      hasText: productName,
    });

    await productLocator.first().waitFor();
  }

  async verifyLatestOrderStatus(expectedStatus) {
    const latestOrder = this.orderItems.first();
    const statusBadge = latestOrder.locator(".badge");
    const statusText = await statusBadge.textContent();
    expect(statusText.trim()).toBe(expectedStatus);
  }
}

module.exports = { OrdersHistoryPage };
