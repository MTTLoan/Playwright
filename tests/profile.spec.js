import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test.beforeAll(async ({ browser }) => {
  // Login and save storage state to reuse in other tests
  const username = "khachhang";
  const password = "123456";

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.acceptAlert();

  await context.storageState({ path: "state.json" });
  await context.close();
});

test("Verify profile page loads correctly", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const profilePage = poManager.getProfilePage();
  await profilePage.goto();

  await profilePage.verifyPageLoaded();
});

test("Verify update fullname", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const profilePage = poManager.getProfilePage();
  await profilePage.goto();

  const newName = "Automation Test User";
  await profilePage.updateFullName(newName);
  await profilePage.clickSave();

  // reload lại để verify persistence
  await page.reload();

  const updatedName = await profilePage.getFullName();
  expect(updatedName).toBe(newName);
});

test("Verify cancel button resets form", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const profilePage = poManager.getProfilePage();
  await profilePage.goto();

  const originalName = await profilePage.getFullName();

  await profilePage.updateFullName("Temp Name");
  await profilePage.clickCancel();

  await profilePage.goto();
  const afterResetName = await profilePage.getFullName();

  expect(afterResetName).toBe(originalName);
});

test("Verify required validation for fullname", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const profilePage = poManager.getProfilePage();
  await profilePage.goto();

  await profilePage.updateFullName("");
  await profilePage.clickSave();

  await expect(profilePage.fullnameInput).toHaveClass(/is-invalid/);
});

test("Verify update multiple fields", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const profilePage = poManager.getProfilePage();
  await profilePage.goto();

  await profilePage.updateFullName("QA Engineer");
  await profilePage.updatePhone("0912345678");
  await profilePage.updateAddress("123 Automation Street");
  await profilePage.selectGender("Nam");

  await profilePage.clickSave();

  await page.reload();

  expect(await profilePage.getFullName()).toBe("QA Engineer");
  expect(await profilePage.getPhone()).toBe("0912345678");
});
