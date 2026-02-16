import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import DetailProductPage from "./DetailProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrdersHistoryPage from "./OrdersHistoryPage";
import SearchPage from "./SearchPage";
import ProfilePage from "./ProfilePage";
import ChangePasswordPage from "./ChangePasswordPage";
import VoucherPage from "./VoucherPage";
import CategoryPage from "./CategoryPage";

export default class POManager {
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
    this.changePasswordPage = new ChangePasswordPage(page);
    this.voucherPage = new VoucherPage(page);
    this.categoryPage = new CategoryPage(page);
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
  getChangePasswordPage() {
    return this.changePasswordPage;
  }
  getVoucherPage() {
    return new VoucherPage(this.page);
  }
  getCategoryPage() {
    return new CategoryPage(this.page);
  }
}
