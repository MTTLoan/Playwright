class DetailProductPage {
  constructor(page) {
    this.page = page;
    this.quantityInput = "#quantity";
    this.btnIncrease = page.locator(".btn-increase");
    this.btnDecrease = page.locator(".btn-decrease");
    this.versionButtons = page.locator(".version-btn");
    this.addToCartButton = page.locator("#btnAddCart");
    this.buyNowButton = page.locator("#btnBuyNow");
    this.okButton = page.locator(".swal2-confirm");
  }
  async selectVersion(version) {
    // await this.versionButtons.first().waitFor();
    await this.page.waitForLoadState("networkidle");
    await this.versionButtons.nth(version - 1).click();
  }
  async increaseQuantity(quantity) {
    for (let i = 1; i < quantity; i++) {
      await this.btnIncrease.click();
    }
  }
  async addToCart() {
    await this.addToCartButton.click();
    await this.okButton.click();
  }
  async buyNow() {
    await this.buyNowButton.click();
  }
}
module.exports = { DetailProductPage };
