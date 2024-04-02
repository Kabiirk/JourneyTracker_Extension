import * as puppeteer from "puppeteer";
import path from 'path';
// import '@testing-library/jest-dom';

// Replace with your absolute path of dist/ 
const EXTENSION_PATH = path.join(process.cwd(), 'dist');
const EXTENSION_ID = 'nddhdlfndkgohnpbegaopeglgkdahkpa';

let browser : any;

beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`
      ]
    });
  });
  
afterEach(async () => {
  await browser.close();
  browser = undefined;
});

describe('JourneyList component', () => {
  // Test 1
  test('popup renders correctly', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);

    const root = await page.$('html');
    const children = await root.$$('button');

    expect(children.length).toBe(1);
  });

  // Test 2
  test('Login Works as expected', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);

    // click and wait for navigation
    // await Promise.all(
    //   [
    //     page.click('.MuiButtonBase-root'),
    //     // page.waitForNavigation({ waitUntil: 'networkidle0' }),
    //   ]
    // )
    const [url] = await Promise.all([
      new Promise((resolve, reject) => {
        browser.once('targetcreated', (target : any) => { resolve(target.url()); });
      }),
      page.click('.MuiButtonBase-root'),
    ]);
    
    // console.log(url);
    const currentUrl = url;
    expect(currentUrl).toMatch(/http.*login/);
  });
});