class HomePage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cartButton = page.locator("button[routerlink*='cart']");
    this.ordersButton = page.locator("button[routerlink*='myorders']");
  }

  async searchProduct(productName) {
    const titles = await this.productText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
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
}
module.exports = { HomePage };
