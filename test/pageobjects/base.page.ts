export default class BasePage {
  public async open(path: string) {
    await browser.url(path);
  }
}
