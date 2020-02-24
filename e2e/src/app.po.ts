import { browser, by, element, ExpectedConditions } from 'protractor';
const fs = require('fs');

export class AppPage {
  public bBrowser: any;
  private EC = ExpectedConditions;
  constructor() {


    this.bBrowser = browser.forkNewDriverInstance();
    this.bBrowser.driver
      .manage()
      .window()
      .setSize(1365, 700);
  }

  public takeScreenShot(filename: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const paths = [
        'screenshots',
        'screenshots/1365x700'
      ];
      for (const path of paths) {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
      }
      browser.takeScreenshot().then((png) => {
        const stream = fs.createWriteStream(`screenshots/1365x700/${filename}.png`);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
        resolve(true);
      }).catch(e => {
        resolve(false);
      });
    });
  }

  navigateTo(path: string) {
    return browser.get('http://localhost:4200/' + path) as Promise<any>;
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  public waitForVisible(locator: string) {
    const elm = this.getElement(locator);
    // tslint:disable-next-line:no-unused-expression
    browser.wait(this.EC.visibilityOf(elm), 5000, '') as Promise<any>;
  }

  public clickIn(selector: string) {
    return this.getElement(selector).click();
  }

  public scrollToTop() {
    browser.executeScript('window.scrollTo(0,0);');
  }
}
