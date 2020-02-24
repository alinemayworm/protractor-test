import { AppPage } from './app.po';
import { MockBackend } from './mock-backend.po';
import { AppConstants } from '../../src/app/app.constants';


describe('workspace-project App', () => {
  let page: AppPage;
  const backend: MockBackend = new MockBackend();

  beforeAll(() => {
    backend.start();
  });


  beforeEach(async () => {
    page = new AppPage();
  });

  it('should display welcome message - blue - english', async (done) => {
    await page.navigateTo('');
    page.bBrowser.sleep(1000);
    expect(await page.takeScreenShot('welcome-blue')).toBeTruthy();
    page.clickIn('#change-color');
    page.scrollToTop();
    page.bBrowser.sleep(1000);
    expect(await page.takeScreenShot('welcome-pink')).toBeTruthy();
    done();
  });

  afterEach(async () => {
    page.bBrowser.close();
  });

  afterAll(() => {
    backend.stop();
  });
});
