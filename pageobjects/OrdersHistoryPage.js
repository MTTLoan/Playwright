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

  async getOrderCount() {
    return await this.orderItems.count();
  }

  async verifyOrderExists() {
    const count = await this.getOrderCount();
    expect(count).toBeGreaterThan(0);
  }

  async verifyLatestOrderTotal(expectedTotal) {
    const latestOrder = this.orderItems.first();

    // Lấy tất cả product rows
    const productRows = latestOrder.locator(".d-flex.mb-2.align-items-center");
    const count = await productRows.count();

    let sum = 0;
    for (let i = 0; i < count; i++) {
      const row = productRows.nth(i);
      const priceText = await row.locator(".order-price p").textContent();
      const quantityText = await row
        .locator("p:has-text('Số lượng')")
        .textContent();
      const price = parseInt(priceText.replace(/[^\d]/g, ""));
      const quantity = parseInt(quantityText.replace(/[^\d]/g, ""));
      sum += price * quantity;
    }

    const totalText = await latestOrder
      .locator(".order-total h5")
      .textContent();
    const totalNumber = parseInt(totalText.replace(/[^\d]/g, ""));
    expect(sum).toBe(totalNumber);
  }

  async cancelLatestOrder() {
    const latestOrder = this.orderItems.first();
    await latestOrder.locator("button:has-text('Hủy đơn hàng')").click();

    // Popup 1: Confirm
    const confirmBtn = this.page.locator(".swal2-confirm");
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    // Popup 2: Success
    const successBtn = this.page.locator(".swal2-confirm");
    await expect(successBtn).toBeVisible();
    await successBtn.click();

    await this.page.reload();
  }
}

module.exports = { OrdersHistoryPage };
