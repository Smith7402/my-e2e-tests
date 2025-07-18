import { expect } from "@wdio/globals";

import LoginPage from "../pageobjects/login.page";

describe("TC01 - Login Page Render", () => {
  it("should display username, password fields and login button", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();

    await expect(loginPage.inputUsername).toBeDisplayed();
    await expect(loginPage.inputPassword).toBeDisplayed();
    await expect(loginPage.btnLogin).toBeDisplayed();
  });
});

describe("TC02 - Login with missing fields", () => {
  it("should show required validation messages", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();

    await loginPage.btnLogin.click();

    const usernameValidation = await $('//span[text()="Required"]');
    await expect(usernameValidation).toBeDisplayed();
  });
});

describe("TC03 - Login with invalid credentials", () => {
  it("should show error message for invalid credentials", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();

    await loginPage.login("wronguser", "wrongpass");

    // const error = await $("div.oxd-alert-content-text");
    // await expect(error).toHaveTextContaining("Invalid credentials");

    const error = await $("div.oxd-alert.oxd-alert--error");
    const errorText = await error.getText();
    expect(errorText).toContain("Invalid credentials");
  });
});

describe("TC04 - Successful Login", () => {
  it("should login and redirect to dashboard", async () => {
    const loginPage = new LoginPage();

    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await expect(browser).toHaveUrl(
      expect.stringContaining("/web/index.php/dashboard/index")
    );
  });
});

describe("TC05 - Logout functionality", () => {
  it("should logout and redirect to login page", async () => {
    const loginPage = new LoginPage();

    // Login
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    // Logout
    await $('img[alt="profile picture"]').click();
    await $('a[href="/web/index.php/auth/logout"]').click();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/web/index.php/auth/login")
    );
  });
});
