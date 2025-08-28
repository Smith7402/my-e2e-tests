import {
  testSuccessfulLoginRedirect,
  testLogoutRedirect,
  testDisplayedUsernameAfterLogin,
} from "../pageobjects/homepage/home.method";

describe("Dashboard Test Cases", () => {
  it("TC04 - Successful login should redirect to dashboard", async () => {
    await testSuccessfulLoginRedirect();
  });

  it("TC05 - Logout functionality should redirect to login page", async () => {
    await testLogoutRedirect();
  });

  it("TC06 - Verify displayed username after login", async () => {
    await testDisplayedUsernameAfterLogin();
  });
});
