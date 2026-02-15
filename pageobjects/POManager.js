const { LoginPage } = require("./LoginPage");
const { HomePage } = require("./HomePage");
const { DetailProductPage } = require("./DetailProductPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { SearchPage } = require("./SearchPage");
const { ProfilePage } = require("./ProfilePage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.detailProductPage = new DetailProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.ordersHistoryPage = new OrdersHistoryPage(page);
    this.searchPage = new SearchPage(page);
    this.profilePage = new ProfilePage(page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getHomePage() {
    return this.homePage;
  }
  getDetailProductPage() {
    return this.detailProductPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }
  getSearchPage() {
    return this.searchPage;
  }
  getProfilePage() {
    return this.profilePage;
  }
}
module.exports = { POManager };
