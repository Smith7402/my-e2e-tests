import { expect } from "@wdio/globals";
import { openLoginPage, loginWithCredentials } from "./login.ts";
import { wrongCredentials } from "../../const/testData";
import LoginPage from "./login.locator";

const loginPage = new LoginPage();

export async function testLoginPageRender() {
  await openLoginPage();

  await expect(loginPage.inputUsername).toBeDisplayed();
  await expect(loginPage.inputPassword).toBeDisplayed();
  await expect(loginPage.btnLogin).toBeDisplayed();
}

export async function testLoginWithMissingFields() {
  await openLoginPage();
  await loginPage.btnLogin.click();

  await expect(loginPage.usernameValidation).toBeDisplayed();
}

export async function testLoginWithInvalidCredentials() {
  await loginWithCredentials(
    wrongCredentials.username,
    wrongCredentials.password
  );

  const errorText = await loginPage.errorInvalidValues.getText();
  expect(errorText).toContain("Invalid credentials");
}
