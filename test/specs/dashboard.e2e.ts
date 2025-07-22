import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";

describe("Dashboard Test Cases", () => {
  it("TC04 - Successful Login should redirect to dashboard", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await expect(browser).toHaveUrl(
      expect.stringContaining("/web/index.php/dashboard/index")
    );
  });

  it("TC05 - Logout functionality should redirect to login page", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await $('img[alt="profile picture"]').click();
    await $('a[href="/web/index.php/auth/logout"]').click();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/web/index.php/auth/login")
    );
  });

  it("TC06 - Verify displayed username after login", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await $('img[alt="profile picture"]').click();
    const name = await $("p.oxd-userdropdown-name");
    await expect(name).toHaveText("nandhanda leo");
  });
});
