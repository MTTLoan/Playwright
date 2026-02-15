import { expect } from "@playwright/test";

class ChangePasswordPage {
  constructor(page) {
    this.page = page;

    this.currentPasswordInput = page.locator("#current_password");
    this.newPasswordInput = page.locator("#new_password");
    this.confirmPasswordInput = page.locator("#new_password_confirmation");

    this.saveBtn = page.locator("#btnSave");
    this.cancelBtn = page.locator("#btnCancel");

    this.successAlert = page.locator(".alert-success");
    this.errorAlert = page.locator(".alert-danger");

    this.userIcon = page.locator("#userDropdown");
    this.logoutBtn = page.locator("a.dropdown-item", { hasText: "Đăng xuất" });
  }

  async goto() {
    await this.page.goto(
      "https://cosmeticsellingweb.onrender.com/account/change-password",
    );
  }

  async changePassword(currentPass, newPass, confirmPass) {
    await this.currentPasswordInput.fill(currentPass);
    await this.newPasswordInput.fill(newPass);
    await this.confirmPasswordInput.fill(confirmPass);
    await this.saveBtn.click();
  }

  async expectSuccessMessage(message) {
    await expect(this.successAlert).toContainText(message);
  }

  async expectErrorMessage(message) {
    await expect(this.errorAlert).toContainText(message);
  }

  async submit() {
    await this.saveBtn.click();
  }

  async logout() {
    await this.userIcon.click();
    await this.logoutBtn.click();
  }
}

export default { ChangePasswordPage };
