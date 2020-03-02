import fs from 'fs-extra';
import path from 'path';
import { Page } from 'puppeteer';

export async function screenshot({ page, file }: { page: Page; file: string }) {
  await fs.mkdirp(path.dirname(file));
  await page.screenshot({
    path: file,
    type: 'png',
  });
}
