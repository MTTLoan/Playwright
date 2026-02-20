import { expect } from "@playwright/test";

export default class CategoryPage {
  constructor(page) {
    this.page = page;
    this.category = page.locator("h1");
    this.sortDropdown = page.locator("select[name='sort_by']");
    this.products = page.locator(".product");
  }

  async getCategoryTitle() {
    await this.products.first().waitFor();
    return await this.category.textContent();
  }

  async getAllProductTitles() {
    await this.products.first().waitFor();
    const titles = this.products.locator("p").allTextContents();
    return titles;
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
