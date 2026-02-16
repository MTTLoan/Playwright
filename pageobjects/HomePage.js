export default class HomePage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".product");
    this.productText = page.locator(".product p");
    this.productImage = page.locator(".product img");
    this.cartButton = page.locator(".cart-icon");
    this.ordersButton = page.locator("[data-target='Order']");
    this.voucherButton = page.locator("[data-target='Voucher']");
    this.homeButton = page.locator(".navbar-brand");
    this.categorys = page.locator(".card-group-title");
    // Sidebar
    this.categoryItems = page.locator(".category-item");
    this.submenuLinks = page.locator(".submenu a");
  }

  async goto() {
    await this.page.goto("https://cosmeticsellingweb.onrender.com/");
  }

  async searchProduct(productName) {
    await this.products.first().waitFor();
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

  async searchCategory(categoryName) {
    await this.products.first().waitFor();
    const count = await this.categorys.count();
    for (let i = 0; i < count; i++) {
      const text = await this.categorys.nth(i).locator("span").textContent();
      if (text.toLowerCase() === categoryName.toLowerCase()) {
        await this.categorys.nth(i).locator(".card-group-link").click();
        break;
      }
    }
  }

  async openCategoryFromSidebar(typeName) {
    const count = await this.categoryItems.count();

    for (let i = 0; i < count; i++) {
      const category = this.categoryItems.nth(i);
      await category.hover();

      const type = category.locator(".submenu a", {
        hasText: typeName,
      });

      if ((await type.count()) > 0) {
        await type.first().click();
        return;
      }
    }

    throw new Error(`Không tìm thấy type: ${typeName}`);
  }
}
