import fs from 'fs-extra';
import path from 'path';
import { Page } from 'puppeteer';

/**
 * puppeteer와 함께 사용할 수 있는 간단한 Utility
 *
 * 특정 위치에 png 파일을 생성해준다.
 *
 * 단순히 mkdirp()와 puppeteer.page.screenshot()을 처리해준다.
 */
export async function screenshot({ page, file }: { page: Page; file: string }) {
  await fs.mkdirp(path.dirname(file));
  await page.screenshot({
    path: file,
    type: 'png',
  });
}
