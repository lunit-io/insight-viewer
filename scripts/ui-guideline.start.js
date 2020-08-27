const {start} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');
const puppeteer = require('puppeteer');

(async () => {
  const {port} = await start({
    app: 'ui-guideline',
    staticFileDirectories: [
      '{cwd}/public',
      '{cwd}/src/@lunit/insight-viewer/public',
    ],
    babelLoaderOptions,
  });
  
  const browser = await puppeteer.launch({
    //userDataDir: process.env.CHROMIUM_USER_DATA_DEBUG,
    defaultViewport: null,
    headless: false,
    args: ['--start-fullscreen', `--remote-debugging-port=9222`],
    devtools: true,
  });
  
  const [page] = await browser.pages();
  await page.goto(`http://localhost:${port}`);
})();