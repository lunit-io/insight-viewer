# How to Use

```sh
npm install @lunit/screenshot
```

```js
import { screenshot } from '@lunit/screenshot';

describe('login', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1200,
        height: 900,
      },
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('default', async () => {
    await page.goto('https://localhost:8080');
    await page.waitForSelector('#app [data-view="login"]');

    const title = await page.$eval('#app footer p:first-child', (e) => e.innerHTML);
    expect(title).toEqual('Lunit INSIGHT for OPT');

    const email = await page.$eval('#app footer p:nth-child(2)', (e) => e.innerHTML);
    expect(email).toEqual('Contact <a href="mailto:insight@lunit.io">insight@lunit.io</a>');

    const copyright = await page.$eval('#app footer p:nth-child(3)', (e) => e.innerHTML);
    expect(copyright).toEqual(
      '© 2018 <a href="https://lunit.io" target="_blank" rel="noopener noreferrer">Lunit Inc.</a> ALL RIGHTS RESERVED',
    );

    await screenshot({
      page,
      file: path.join(process.cwd(), `screenshots/login.default.png`),
    });
  }, 100000);
});
```
