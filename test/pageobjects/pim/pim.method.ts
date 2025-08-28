import { expect } from "@wdio/globals";
import { loginWithCredentials } from "../login/login.ts";
import { rightCredentials, employeeData } from "../../const/testData";
import PimPage from "./pim.locator";

const pimPage = new PimPage();

export async function testAddNewEmployee() {
  // Login
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  // Go to PIM page
  await pimPage.btnViewPimModule.click();
  await pimPage.btnAddEmployee.click();

  // Add new employee with first name "Dat" and last name "Nguyen"
  await pimPage.inputFirstName.setValue(employeeData.firstName);
  await pimPage.inputLastName.setValue(employeeData.lastName);
  await pimPage.btnSubmit.click();

  // Verify employee detail page is displayed
  await expect(browser).toHaveUrl(pimPage.viewEmployeeDetailPageUrl);
}

export async function testAddEmployeeValidationCheck() {
  // Login
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  // Go to PIM page
  await pimPage.btnViewPimModule.click();
  await pimPage.btnAddEmployee.click();
  await pimPage.btnSubmit.click();

  // Verify validation error for missing first name is displayed
  await expect(pimPage.errorRequiredName).toBeDisplayed();
}

export async function testSearchEmployee() {
  // Login
  await loginWithCredentials(
    rightCredentials.username,
    rightCredentials.password
  );

  // Go to PIM page
  await pimPage.btnViewPimModule.click();

  // Search employee with first name "Dat"
  await pimPage.inputSearch.click();
  await pimPage.inputSearch.setValue(employeeData.searchName);
  await pimPage.btnSubmit.click();

  // Verify employee "Dat" is displayed in the result table
  const texts = [
    await pimPage.tableCells[2].getText(),
    await pimPage.tableCells[3].getText(),
  ];

  expect(texts.some((text) => text.includes(employeeData.searchName))).toBe(
    true
  );
}
