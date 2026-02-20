import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

test("User can navigate to category and see products", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.searchCategory("Tẩy trang");

  const categoryPage = poManager.getCategoryPage();
  expect(await categoryPage.getCategoryTitle()).toBe("Tẩy trang");
});

test.only("Open category using sidebar", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.openCategoryFromSidebar("Tẩy trang");
  const categoryPage = poManager.getCategoryPage();
  expect(await categoryPage.getCategoryTitle()).toBe("Tẩy trang");
});

test("Sort by price ascending", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.searchCategory("Tẩy trang");
  const categoryPage = poManager.getCategoryPage();
  await categoryPage.sortBy("Giá tăng dần");
  const prices = await categoryPage.getAllPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test("Sort by price descending", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.searchCategory("Tẩy trang");
  const categoryPage = poManager.getCategoryPage();
  await categoryPage.sortBy("Giá giảm dần");
  const prices = await categoryPage.getAllPrices();
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

test("Sort by best selling", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.searchCategory("Tẩy trang");
  const categoryPage = poManager.getCategoryPage();
  await categoryPage.sortBy("Bán chạy nhất");
  const sales = await categoryPage.getAllSalesNumbers();

  const sorted = [...sales].sort((a, b) => b - a);
  expect(sales).toEqual(sorted);
});
