# Playwright E2E Test Suite

Bộ test tự động cho website bán mỹ phẩm, được xây dựng bằng **Playwright** theo mô hình **Page Object Model (POM)**.

## Cấu trúc thư mục

```text
.
├── pageobjects/          # Các Page Object và POManager
├── tests/                # Test specs theo chức năng
├── utils/                # Dữ liệu test
├── playwright.config.js  # Cấu hình Playwright
└── package.json          # Script chạy test và dependencies
```

## Danh sách nhóm test chính

- End-to-end đặt hàng (`tests/E2E.spec.js`)
- Đăng nhập (`tests/login.spec.js`)
- Tìm kiếm (`tests/search.spec.js`)
- Danh mục (`tests/category.spec.js`)
- Giỏ hàng (`tests/cart.spec.js`)
- Voucher (`tests/voucher.spec.js`)
- Đổi mật khẩu (`tests/changePassword.spec.js`)
- Hồ sơ người dùng (`tests/profile.spec.js`)
- Lịch sử đơn hàng (`tests/ordersHistory.spec.js`)

## Điều kiện chạy

- Node.js 18+ (khuyến nghị LTS)
- npm 9+

## Cài đặt

```bash
npm install
npx playwright install
```

## Chạy test

Chạy toàn bộ regression:

```bash
npm run regression
```

Chạy một file test cụ thể:

```bash
npx playwright test tests/login.spec.js
```

## Allure Report

![Product Name Screen Shot][product-screenshot]

Cài dependencies:

```bash
npm install -D allure-playwright allure-commandline
```

Chạy test để sinh kết quả Allure:

```bash
npx playwright test --reporter=line,allure-playwright
```

Mở report Allure:

```bash
npx allure generate allure-results --clean
npx allure open allure-report
```

## Dữ liệu test

- Dữ liệu cho E2E order nằm ở: `utils/orderTestData.json`

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: utils/allure.png
