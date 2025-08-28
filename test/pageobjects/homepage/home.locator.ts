import BasePage from "../base.page";

export default class HomePage extends BasePage {
  public get profilePicture() {
    return $('img[alt="profile picture"]');
  }

  public get userDropdownName() {
    return $("p.oxd-userdropdown-name");
  }

  public get btnLogout() {
    return $('a[href="/web/index.php/auth/logout"]');
  }

  public get dashboardPageUrl() {
    return expect.stringContaining("/web/index.php/dashboard/index");
  }

  public get loginPageUrl() {
    return expect.stringContaining("/web/index.php/auth/login");
  }
}
