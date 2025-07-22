import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";

describe("PIM Test Cases", () => {
  it("TC07 - Search Employee in PIM", async () => {
    const loginPage = new LoginPage();
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
      async () =>
        (await searchInput.isDisplayed()) && (await searchInput.isEnabled()),
      {
        timeout: 10000,
        timeoutMsg: "Search input is not displayed or not enabled after 10s",
      }
    );
    await searchInput.click();
    await searchInput.setValue("1234");
    await $('button[type="submit"]').click();

    const result = await $$("div.oxd-table-cell")[2];
    const text = await result.getText();
    expect(text).toContain("1234");
  });

  it("TC08 - Add new employee in PIM", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    // Go to PIM
    const pimLink = await $('a[href="/web/index.php/pim/viewPimModule"]');
    // await pimLink.waitForDisplayed({ timeout: 10000 });
    await pimLink.click();

    const ButtonAdd = await $(
      'button.oxd-button.oxd-button--medium.oxd-button--secondary[type="button"]'
    );
    // await ButtonAdd.waitForDisplayed({ timeout: 5000 });
    await ButtonAdd.click();

    await $('input[name="firstName"]').setValue("Datttt");
    await $('input[name="lastName"]').setValue("Nguyen");
    await $('button[type="submit"]').click();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/pim/viewPersonalDetails")
    );
  });

  it("TC09 - Add employee validation check", async () => {
    const loginPage = new LoginPage();
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    // Go to PIM
    const pimLink = await $('a[href="/web/index.php/pim/viewPimModule"]');
    await pimLink.waitForDisplayed({ timeout: 10000 });
    await pimLink.click();

    const ButtonAdd = await $(
      'button.oxd-button.oxd-button--medium.oxd-button--secondary[type="button"]'
    );
    await ButtonAdd.waitForDisplayed({ timeout: 5000 });
    await ButtonAdd.click();

    await $('button[type="submit"]').click();

    const firstNameError = await $("span.oxd-input-field-error-message");
    await expect(firstNameError).toBeDisplayed();
  });
});
