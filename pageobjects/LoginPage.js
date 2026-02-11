class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#login");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }
  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
