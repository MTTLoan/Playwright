class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#btnLogin");
    this.username = page.locator("#name");
    this.password = page.locator("#password");
    this.okButton = page.locator(".swal2-confirm");
  }
  async goto() {
    await this.page.goto(
      "https://cosmeticsellingweb.onrender.com/account/login",
    );
  }
  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.okButton.click();
  }
}
module.exports = { LoginPage };
