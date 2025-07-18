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

    // Login
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

    // Login
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

describe("TC06 - Verify displayed username after login", () => {
  it("should display correct user name in profile menu", async () => {
    const loginPage = new LoginPage();

    // Login
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await $('img[alt="profile picture"]').click();
    const name = await $("p.oxd-userdropdown-name");
    await expect(name).toHaveText("manda user");
  });
});

describe("TC07 - Search Employee in PIM", () => {
  it("should find employee by name", async () => {
    const loginPage = new LoginPage();

    // Login
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    // Go to PIM
    const pimLink = await $('a[href="/web/index.php/pim/viewPimModule"]');
    await pimLink.waitForDisplayed({ timeout: 10000 });
    await pimLink.click();

    // Wait for Employee Information header
    const header = await $("h5=Employee Information");
    await header.waitForDisplayed({ timeout: 10000 });

    // Search input handling
    const searchInput = await $('input[placeholder="Type for hints..."]');
    await searchInput.scrollIntoView();
    await browser.waitUntil(
      async () => {
        return (
          (await searchInput.isDisplayed()) && (await searchInput.isEnabled())
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "Search input is not displayed or not enabled after 10s",
      }
    );
    await searchInput.click(); // để đảm bảo focus
    await searchInput.setValue("John");
    await $('button[type="submit"]').click();

    const result = await $$("div.oxd-table-cell")[2]; // index bắt đầu từ 0
    const text = await result.getText();
    expect(text).toContain("John");
  });
});

describe("TC08 - Add new employee in PIM", () => {
  it("should add a new employee", async () => {
    const loginPage = new LoginPage();

    // Login
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    // Go to PIM and Add Employee
    const ButtonAdd = await $(
      'button.oxd-button.oxd-button--medium.oxd-button--secondary[type="button"]'
    );

    await $('a[href="/web/index.php/pim/viewPimModule"]').click();
    ButtonAdd.click();

    await $('input[name="firstName"]').setValue("Datttt");
    await $('input[name="lastName"]').setValue("Nguyen");
    await $('button[type="submit"]').click();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/pim/viewPersonalDetails")
    );
  });
});
