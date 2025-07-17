import BasePage from "./base.page";

export default class LoginPage extends BasePage {
  public get inputUsername() {
    return $('input[name="Username"]');
  }

  public get inputPassword() {
    return $('input[name="Password"]');
  }

  public get btnLogin() {
    return $('button[type="submit"]');
  }

  public get errorMessage() {
    return $("#error");
  }

  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  public async open() {
    await super.open("/web/index.php/auth/login"); // mở đường dẫn /login
  }
}
