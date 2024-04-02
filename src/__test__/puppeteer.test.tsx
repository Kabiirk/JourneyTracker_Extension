import * as puppeteer from "puppeteer";
// import '@testing-library/jest-dom';

// Replace with your absolute path of dist/ 
const EXTENSION_PATH = 'C:/Users/kabii/Desktop/FOLDERS/UWATERLOO/2 - Sem 2 - Winter\'24/ECE 651/Project/JourneyTracker_Extension/dist';
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

test('popup renders correctly', async () => {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
})