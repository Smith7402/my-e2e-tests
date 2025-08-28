import LoginPage from "./login.locator";

const loginPage = new LoginPage();

export async function openLoginPage() {
  await loginPage.open("/web/index.php/auth/login");
}

export async function loginWithCredentials(username: string, password: string) {
  await loginPage.open("/web/index.php/auth/login");
  await loginPage.inputUsername.waitForDisplayed({ timeout: 5000 });
  await loginPage.inputUsername.setValue(username);
  await loginPage.inputPassword.setValue(password);
  await loginPage.btnLogin.click();
}
