class HomePage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".product");
    this.productText = page.locator(".product p");
    this.productImage = page.locator(".product img");
    this.cartButton = page.locator(".cart-icon");
    this.ordersButton = page.getByText("ĐƠN HÀNG");
    this.voucherButton = page.getByText("VOUCHER");
  }

  async searchProduct(productName) {
    const titles = await this.productText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("img").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cartButton.click();
  }

  async navigateToOrders() {
    await this.ordersButton.click();
  }

  async navigateToVoucher() {
    await this.voucherButton.click();
  }
}
module.exports = { HomePage };
