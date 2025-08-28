import BasePage from "../base.page";

export default class LoginPage extends BasePage {
  public get inputUsername() {
    return $('input[name="username"]');
  }

  public get inputPassword() {
    return $('input[name="password"]');
  }

  public get btnLogin() {
    return $('button[type="submit"]');
  }

  public get usernameValidation() {
    return $('//span[text()="Required"]');
  }

  public get errorInvalidValues() {
    return $("div.oxd-alert.oxd-alert--error");
  }
}
