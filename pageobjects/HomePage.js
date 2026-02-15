class HomePage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".product");
    this.productText = page.locator(".product p");
    this.productImage = page.locator(".product img");
    this.cartButton = page.locator(".cart-icon");
    this.ordersButton = page.locator("[data-target='Order']");
    this.voucherButton = page.locator("[data-target='Voucher']");
    this.homeButton = page.locator(".navbar-brand");
  }

  async goto() {
    await this.page.goto("https://cosmeticsellingweb.onrender.com/");
  }

  async searchProduct(productName) {
    await this.products.first().waitFor();
    const titles = await this.productText.allTextContents();
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("p").textContent()) === productName
      ) {
        await this.products.nth(i).locator("img").click();
        break;
      }
    }
  }

  async navigateToHome() {
    await this.homeButton.click();
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
export default { HomePage };
