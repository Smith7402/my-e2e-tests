// import { expect } from "@wdio/globals";
// import "@wdio/globals/types/expect-matchers";
import LoginPage from "../pageobjects/login.page";

describe("TC01 - Login Page Render", () => {
  it("should display username, password fields and login button", async () => {
    const loginPage = new LoginPage();
    await loginPage.open(); // => /login
    await expect(loginPage.inputUsername).toBeDisplayed(); // selector mẫu, cần chỉnh lại theo thực tế
    await expect(loginPage.inputPassword).toBeDisplayed();
    await expect(loginPage.btnLogin).toBeDisplayed();
  });
});

// describe("TC04 - Successful Login", () => {
//   it("should login and redirect to dashboard", async () => {
//     const loginPage = new LoginPage();

//     await loginPage.open(); // => /login
//     await loginPage.login("Admin", "admin123");

//     await expect(browser).toHaveUrl(
//       expect.stringContaining("/web/index.php/dashboard/index")
//     );
//   });
// });
