import {
  testLoginPageRender,
  testLoginWithMissingFields,
  testLoginWithInvalidCredentials,
} from "../pageobjects/login/login.method";

describe("Login Test Cases", () => {
  it("TC01 - Login Page Render", async () => {
    await testLoginPageRender();
  });

  it.only("TC02 - Login with missing fields", async () => {
    await testLoginWithMissingFields();
  });

  it("TC03 - Login with invalid credentials", async () => {
    await testLoginWithInvalidCredentials();
  });
});
