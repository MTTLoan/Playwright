import { expect } from "@playwright/test";

class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(".search-input");
    this.searchButton = page.locator(".search-btn");
    this.sortDropdown = page.locator("select[name='sort_by']");
    this.products = page.locator(".product");
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async getAllProductTitles() {
    await this.products.first().waitFor();
    const titles = this.products.locator("p").allTextContents();
    return titles;
  }

  async verifyAllResultsContain(keyword) {
    const titles = await this.getAllProductTitles();

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async getProductCount() {
    return await this.products.count();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
    await this.products.first().waitFor();
  }

  async getAllPrices() {
    const count = await this.products.count();
    const prices = [];

    for (let i = 0; i < count; i++) {
      const priceText = await this.products
        .nth(i)
        .locator("h5#price")
        .textContent();

      const price = Number(priceText.replace(/[^\d]/g, ""));
      prices.push(price);
    }

    return prices;
  }

  async getAllSalesNumbers() {
    const count = await this.products.count();
    const sales = [];

    for (let i = 0; i < count; i++) {
      const salesText = await this.products
        .nth(i)
        .locator("span#sales")
        .textContent();

      const number = Number(salesText.replace(/[^\d]/g, ""));
      sales.push(number);
    }

    return sales;
  }
}

export default { SearchPage };
