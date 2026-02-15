const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");

const username = "khachhang3";
const password = "123456";
const newPassword = "12345678";

test.beforeAll(async ({ browser }) => {
  // Login and save storage state to reuse in other tests
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

test("Submit with empty fields", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.submit();
  const currentValidation =
    await changePasswordPage.currentPasswordInput.evaluate(
      (node) => node.validationMessage,
    );

  expect(currentValidation).toContain("fill out");
});

test("Empty current password field", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword("", newPassword, newPassword);
  const currentValidation =
    await changePasswordPage.currentPasswordInput.evaluate(
      (node) => node.validationMessage,
    );

  expect(currentValidation).toContain("fill out");
});

test("Empty new password field", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword(password, "", "");
  const currentValidation = await changePasswordPage.newPasswordInput.evaluate(
    (node) => node.validationMessage,
  );

  expect(currentValidation).toContain("fill out");
});

test("Wrong current password", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword("saimatkhau", "12345678", "12345678");
  await changePasswordPage.expectErrorMessage("Mật khẩu hiện tại không đúng.");
});

test("New password too short", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword(password, "123", "123");
  await changePasswordPage.expectErrorMessage(
    "The new password field must be at least 6 characters.",
  );
});

test("Password confirmation mismatch", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword(password, "12345678", "12345679");
  await changePasswordPage.expectErrorMessage(
    "The new password field confirmation does not match.",
  );
});

test("Change password successfully", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const changePasswordPage = poManager.getChangePasswordPage();
  await changePasswordPage.goto();
  await changePasswordPage.changePassword(password, newPassword, newPassword);
  await changePasswordPage.expectSuccessMessage("Đổi mật khẩu thành công!");
  await changePasswordPage.logout();

  // Re-login với newpassword
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(username, newPassword);
  await expect(page.getByText("Đăng nhập thành công!")).toBeVisible();
});
