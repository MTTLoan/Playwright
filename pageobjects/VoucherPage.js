import { expect } from "@playwright/test";

export default class VoucherPage {
  constructor(page) {
    this.page = page;
    this.voucherItems = page.locator(".coupon_code");
    this.voucherCodes = page.locator(".buttons p.fw-bold");
    this.copyButtons = page.locator(".btn_copy");
  }

  async goto() {
    await this.page.goto("https://cosmeticsellingweb.onrender.com/discounts");
  }

  async getVoucherDate(index) {
    const voucher = this.voucherItems.nth(index);
    const text = await voucher.locator("p").last().textContent();

    const regex = /(\d{4}-\d{2}-\d{2})/g;
    const matches = text.match(regex);

    return {
      startDate: new Date(matches[0]),
      endDate: new Date(matches[1]),
    };
  }

  async getVoucherCount() {
    return await this.voucherItems.count();
  }

  async checkVoucherValidity() {
    const today = new Date();
    console.log("Today:", today);
    const count = await this.getVoucherCount();
    for (let i = 0; i < count; i++) {
      const { startDate, endDate } = await this.getVoucherDate(i);
      const isValid = today >= startDate && today <= endDate;
      expect(isValid).toBeTruthy();
    }
  }

  async clickCopyButton(index) {
    this.page.on("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      expect(dialog.message()).toContain("Đã sao chép mã:");
      await dialog.accept();
    });

    await this.copyButtons.nth(index).click();
  }

  async getAllVoucherCodes() {
    const codes = await this.voucherCodes.allTextContents();
    return codes;
  }
}
