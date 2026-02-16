import { expect } from "@playwright/test";

export default class ProfilePage {
  constructor(page) {
    this.page = page;

    // Inputs
    this.usernameInput = page.locator("#name");
    this.fullnameInput = page.locator("#fullname");
    this.birthdayInput = page.locator("#birthday");
    this.sexSelect = page.locator("#sex");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone_number");
    this.provinceSelect = page.locator("#province");
    this.districtSelect = page.locator("#district");
    this.wardSelect = page.locator("#ward");
    this.addressInput = page.locator("#address");

    // Buttons
    this.saveButton = page.locator("button.btn-save");
    this.cancelButton = page.locator("button#btnCancel");
    this.okButton = page.locator(".swal2-confirm");

    // Form
    this.form = page.locator("#profileForm");
  }

  async goto() {
    await this.page.goto(
      "https://cosmeticsellingweb.onrender.com/account/profile",
    );
  }

  async verifyPageLoaded() {
    await expect(this.form).toBeVisible();
    await expect(this.page.locator(".form-title")).toHaveText(
      "THÔNG TIN CÁ NHÂN",
    );
  }

  async updateFullName(name) {
    await this.fullnameInput.fill(name);
  }

  async updatePhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async updateAddress(address) {
    await this.addressInput.fill(address);
  }

  async selectGender(gender) {
    await this.sexSelect.selectOption(gender);
  }

  async clickSave() {
    await this.saveButton.click();
    await this.okButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async getFullName() {
    return await this.fullnameInput.inputValue();
  }

  async getPhone() {
    return await this.phoneInput.inputValue();
  }
}
