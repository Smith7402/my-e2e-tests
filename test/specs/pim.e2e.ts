import {
  testAddNewEmployee,
  testAddEmployeeValidationCheck,
  testSearchEmployee,
} from "../pageobjects/pim/pim.method";

describe("PIM Test Cases", () => {
  it("TC07 - Add new employee in PIM", async () => {
    await testAddNewEmployee();
  });

  it("TC08 - Add employee validation check", async () => {
    await testAddEmployeeValidationCheck();
  });

  it("TC09 - Search Employee in PIM", async () => {
    await testSearchEmployee();
  });
});
