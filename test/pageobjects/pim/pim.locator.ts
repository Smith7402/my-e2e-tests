import BasePage from "../base.page";

export default class PimPage extends BasePage {
  public get btnViewPimModule() {
    return $('a[href="/web/index.php/pim/viewPimModule"]');
  }

  public get btnAddEmployee() {
    return $(
      'button.oxd-button.oxd-button--medium.oxd-button--secondary[type="button"]'
    );
  }

  public get btnSubmit() {
    return $('button[type="submit"]');
  }

  public get inputFirstName() {
    return $('input[name="firstName"]');
  }

  public get inputMiddleName() {
    return $('input[name="middleName"]');
  }

  public get inputLastName() {
    return $('input[name="lastName"]');
  }

  public get errorRequiredName() {
    return $("span.oxd-input-field-error-message");
  }

  public get inputSearch() {
    return $('input[placeholder="Type for hints..."]');
  }

  public get tableCells() {
    return $$("div.oxd-table-cell");
  }

  public get dashboardPageUrl() {
    return expect.stringContaining("/web/index.php/dashboard/index");
  }

  public get loginPageUrl() {
    return expect.stringContaining("/web/index.php/auth/login");
  }

  public get viewEmployeeDetailPageUrl() {
    return expect.stringContaining("/pim/viewPersonalDetails");
  }
}
