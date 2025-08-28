import { expect } from "@wdio/globals";
import { loginWithCredentials } from "../login/login.ts";
import { rightCredentials, employeeData } from "../../const/testData";
import HomePage from "./home.locator";

const homePage = new HomePage();

export async function testSuccessfulLoginRedirect() {
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  await expect(browser).toHaveUrl(homePage.dashboardPageUrl);
}

export async function testLogoutRedirect() {
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  await homePage.profilePicture.click();
  await homePage.btnLogout.click();

  await expect(browser).toHaveUrl(homePage.loginPageUrl);
}

export async function testDisplayedUsernameAfterLogin() {
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  await homePage.profilePicture.click();
  await expect(homePage.userDropdownName).toHaveText(employeeData.userName);
}
