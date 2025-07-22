import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";

describe("Login Test Cases", () => {
  it("TC01 - Login Page Render", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();

    await expect(loginPage.inputUsername).toBeDisplayed();
    await expect(loginPage.inputPassword).toBeDisplayed();
    await expect(loginPage.btnLogin).toBeDisplayed();
  });

  it("TC02 - Login with missing fields", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.btnLogin.click();

    const usernameValidation = await $('//span[text()="Required"]');
    await expect(usernameValidation).toBeDisplayed();
  });

  it("TC03 - Login with invalid credentials", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("wronguser", "wrongpass");

    const error = await $("div.oxd-alert.oxd-alert--error");
    const errorText = await error.getText();
    expect(errorText).toContain("Invalid credentials");
  });
});
