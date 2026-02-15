class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.province = page.locator("#province");
    this.district = page.locator("#district");
    this.ward = page.locator("#ward");
    this.address = page.locator("#address");
    this.discountInput = page.locator(".discount-code");
    this.applyDiscountBtn = page.locator(".apply-discount");
    this.totalPrice = page.locator("#total-price");
    this.completeOrderBtn = page.locator("#completeOrder");
    this.okButton = page.locator(".swal2-confirm");
  }
  async fillShippingInfo(province, district, ward, address) {
    await this.province.selectOption({ label: province });
    await this.district.selectOption({ label: district });
    await this.ward.selectOption({ label: ward });
    await this.address.fill(address);
  }
  async applyDiscount(code) {
    await this.discountInput.fill(code);
    await this.applyDiscountBtn.click();
  }
  async getTotalPriceText() {
    return await this.totalPrice.textContent();
  }
  async completeOrder() {
    await this.completeOrderBtn.click();
    await this.okButton.click();
  }
}
export default { CheckoutPage };
