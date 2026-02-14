const { LoginPage } = require("./LoginPage");
const { HomePage } = require("./HomePage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    // this.dashboardPage = new DashboardPage(page);
    // this.cartPage = new CartPage(page);
    // this.ordersReviewPage = new OrdersReviewPage(page);
    // this.ordersHistoryPage = new OrdersHistoryPage(page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getHomePage() {
    return this.homePage;
  }
  // getCartPage() {
  //   return this.cartPage;
  // }
  // getOrdersReviewPage() {
  //   return this.ordersReviewPage;
  // }
  // getOrdersHistoryPage() {
  //   return this.ordersHistoryPage;
  // }
}
module.exports = { POManager };
