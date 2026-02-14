import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
const searchText = "chống nắng";

test("Search returns products containing keyword", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();

  const searchPage = poManager.getSearchPage();
  await searchPage.search(searchText);
  await searchPage.verifyAllResultsContain(searchText);
});

test("Search with invalid keyword shows no products", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();

  const searchPage = poManager.getSearchPage();
  await searchPage.search("abcdefghxyz");
  expect(await searchPage.getProductCount()).toBe(0);
});

test("Sort by price ascending", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  const searchPage = poManager.getSearchPage();
  await searchPage.search(searchText);
  await searchPage.sortBy("Giá tăng dần");
  const prices = await searchPage.getAllPrices();
  // for (let i = 1; i < prices.length; i++) {
  //   expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  // }
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

test("Sort by price descending", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  const searchPage = poManager.getSearchPage();
  await searchPage.search(searchText);
  await searchPage.sortBy("Giá giảm dần");
  const prices = await searchPage.getAllPrices();
  // for (let i = 1; i < prices.length; i++) {
  //   expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  // }
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

test.only("Sort by best selling", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  const searchPage = poManager.getSearchPage();
  await searchPage.search(searchText);
  await searchPage.sortBy("Bán chạy nhất");
  const sales = await searchPage.getAllSalesNumbers();

  const sorted = [...sales].sort((a, b) => b - a);
  expect(sales).toEqual(sorted);
});
