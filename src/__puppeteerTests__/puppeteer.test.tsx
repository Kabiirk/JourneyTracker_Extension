import * as puppeteer from "puppeteer";
import path from 'path';
import '@testing-library/jest-dom';
import {setTimeout} from "node:timers/promises";
import { Target } from 'puppeteer';

// Replace with your absolute path of dist/ 
const EXTENSION_PATH = path.join(process.cwd(), 'dist');
const EXTENSION_ID = 'cmiopkdpgchbdbbdfapbkbjiieabaffg';

let browser:any;

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

  test('Login Works as expected', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
    await setTimeout(1000);
    // Set session cookie
    await page.setCookie({
      name: 'next-auth.session-token',
      // value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mDsS-b5w8dRluy1Z.U1vZK40LsUNxWnQl8Exzon9PFQk0iPM_SkPGL0vCn_iPiM_v2eUMJi4C3kXzVNyBTqQ8TikxGViLqn44Ee_lhaFXCjW5EI7fFzXgVcAmkLpLr_5rXdjiGqrOoWrQTMv6k-QNGLp_YnK6Uq38f3Bsjlp4ja2M2zlM4R8fYMaGG3bM7fIHCg5ZTwDotvGNuR3sVmAf6ENlJAWZsM4c36at73_YcmywPhpObnCdsw.50IavPtQBal_eomSrMb11w',
      value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bev4xnsUF3dg9NoJ.Y4YraD3vhPL9yryK4Lbe_vJ_9Z3ouG0DvwKS2B8LXLdEO0t0VNNYdiRbRm2TeCyAm4oay1yB0i8YTkkxz6LUAC4bleAUvg0FT1qzP_W82NW20lt3j29jAae3mu83bzN50N_4S6khVwzDAw1Yy5D6dxFD1ggZfN0RK4Xb_Gkbfe9lzn9rcSV0slrlHSgXSFctuBsPjjlbiiyyWxgORcg4_InsHsNN4_tzQ5XXmw.Re1Wm04ZOHBEV8iYLyN1Mg',
      domain: 'localhost:3000', // Set your domain here
      path: '/', // Set cookie path
      httpOnly: true, // Set HTTP only flag if needed
      secure: true, // Set secure flag if needed (for HTTPS)
      sameSite: 'Lax' // Set sameSite attribute if needed
    });
  
    // click and wait for navigation
    const [] = await Promise.all([
      new Promise((resolve, reject) => {
        browser.once('targetcreated', (target: Target) => { resolve(target.url()); });
      }),
      page.click('.MuiButtonBase-root'),
    ]);
    
    await page.bringToFront();
    await page.reload()
    await setTimeout(3000);
    await page.close();
  });

  // // Test 3

  test('Dropdown Works as expected to change journey', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
    await setTimeout(1000);
    // Set session cookie
    await page.setCookie({
      name: 'next-auth.session-token',
      // value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mDsS-b5w8dRluy1Z.U1vZK40LsUNxWnQl8Exzon9PFQk0iPM_SkPGL0vCn_iPiM_v2eUMJi4C3kXzVNyBTqQ8TikxGViLqn44Ee_lhaFXCjW5EI7fFzXgVcAmkLpLr_5rXdjiGqrOoWrQTMv6k-QNGLp_YnK6Uq38f3Bsjlp4ja2M2zlM4R8fYMaGG3bM7fIHCg5ZTwDotvGNuR3sVmAf6ENlJAWZsM4c36at73_YcmywPhpObnCdsw.50IavPtQBal_eomSrMb11w',
      value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bev4xnsUF3dg9NoJ.Y4YraD3vhPL9yryK4Lbe_vJ_9Z3ouG0DvwKS2B8LXLdEO0t0VNNYdiRbRm2TeCyAm4oay1yB0i8YTkkxz6LUAC4bleAUvg0FT1qzP_W82NW20lt3j29jAae3mu83bzN50N_4S6khVwzDAw1Yy5D6dxFD1ggZfN0RK4Xb_Gkbfe9lzn9rcSV0slrlHSgXSFctuBsPjjlbiiyyWxgORcg4_InsHsNN4_tzQ5XXmw.Re1Wm04ZOHBEV8iYLyN1Mg',
      domain: 'localhost:3000', // Set your domain here
      path: '/', // Set cookie path
      httpOnly: true, // Set HTTP only flag if needed
      secure: true, // Set secure flag if needed (for HTTPS)
      sameSite: 'Lax' // Set sameSite attribute if needed
    });
  
    // click and wait for navigation
    const [] = await Promise.all([
      new Promise((resolve, reject) => {
        browser.once('targetcreated', (target: Target) => { resolve(target.url()); });
      }),
      page.click('.MuiButtonBase-root'),
    ]);

    await page.bringToFront();
    await page.reload()
    await setTimeout(2000);
    const [] = await Promise.all([
      page.click('.MuiAutocomplete-endAdornment').then(() => {
      }).catch((error:any) => {
        console.error('Error clicking on element:', error);
      })
    ]);

    await page.waitForSelector('.MuiAutocomplete-option');

    // Find all options with the class 'MuiAutocomplete-option'
    const options = await page.$$('.MuiAutocomplete-option');
    await options[options.length-1].click();
    await setTimeout(3000);
    await page.close();
  });

  test('Clear Table functionality', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
    await setTimeout(1000);
    // Set session cookie
    await page.setCookie({
      name: 'next-auth.session-token',
      // value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mDsS-b5w8dRluy1Z.U1vZK40LsUNxWnQl8Exzon9PFQk0iPM_SkPGL0vCn_iPiM_v2eUMJi4C3kXzVNyBTqQ8TikxGViLqn44Ee_lhaFXCjW5EI7fFzXgVcAmkLpLr_5rXdjiGqrOoWrQTMv6k-QNGLp_YnK6Uq38f3Bsjlp4ja2M2zlM4R8fYMaGG3bM7fIHCg5ZTwDotvGNuR3sVmAf6ENlJAWZsM4c36at73_YcmywPhpObnCdsw.50IavPtQBal_eomSrMb11w',
      value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bev4xnsUF3dg9NoJ.Y4YraD3vhPL9yryK4Lbe_vJ_9Z3ouG0DvwKS2B8LXLdEO0t0VNNYdiRbRm2TeCyAm4oay1yB0i8YTkkxz6LUAC4bleAUvg0FT1qzP_W82NW20lt3j29jAae3mu83bzN50N_4S6khVwzDAw1Yy5D6dxFD1ggZfN0RK4Xb_Gkbfe9lzn9rcSV0slrlHSgXSFctuBsPjjlbiiyyWxgORcg4_InsHsNN4_tzQ5XXmw.Re1Wm04ZOHBEV8iYLyN1Mg',
      domain: 'localhost:3000', // Set your domain here
      path: '/', // Set cookie path
      httpOnly: true, // Set HTTP only flag if needed
      secure: true, // Set secure flag if needed (for HTTPS)
      sameSite: 'Lax' // Set sameSite attribute if needed
    });
  
    // click and wait for navigation
    const [] = await Promise.all([
      new Promise((resolve, reject) => {
        browser.once('targetcreated', (target: Target) => { resolve(target.url()); });
      }),
      page.click('.MuiButtonBase-root'),
    ]);
    
    await page.bringToFront();
    await page.reload();
    await setTimeout(3000);

    await page.waitForSelector('.MuiButtonBase-root');

  // Find all buttons with the class 'MuiButtonBase-root'
    const buttons = await page.$$('.MuiButtonBase-root');

    // Loop through the buttons to find the one with the desired text content
    for (const button of buttons) {
      // Get the text content of the button
      const buttonText = await page.evaluate((button:any) => button.textContent, button);
      console.log(buttonText);
      // Assuming 'desiredButtonText' is the text of the button you want to click
      if (buttonText.trim() === 'Clear Table') {
        // Click on the desired button
        console.log("FOund clear")
        await button.click();
        break; // Exit the loop once the button is clicked
      }
    }

    // await page.reload()
    await setTimeout(3000);
    await page.close();
  });

  test('Create a new journey', async () => {
    const page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
    await setTimeout(1000);
    // Set session cookie
    await page.setCookie({
      name: 'next-auth.session-token',
      // value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mDsS-b5w8dRluy1Z.U1vZK40LsUNxWnQl8Exzon9PFQk0iPM_SkPGL0vCn_iPiM_v2eUMJi4C3kXzVNyBTqQ8TikxGViLqn44Ee_lhaFXCjW5EI7fFzXgVcAmkLpLr_5rXdjiGqrOoWrQTMv6k-QNGLp_YnK6Uq38f3Bsjlp4ja2M2zlM4R8fYMaGG3bM7fIHCg5ZTwDotvGNuR3sVmAf6ENlJAWZsM4c36at73_YcmywPhpObnCdsw.50IavPtQBal_eomSrMb11w',
      value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bev4xnsUF3dg9NoJ.Y4YraD3vhPL9yryK4Lbe_vJ_9Z3ouG0DvwKS2B8LXLdEO0t0VNNYdiRbRm2TeCyAm4oay1yB0i8YTkkxz6LUAC4bleAUvg0FT1qzP_W82NW20lt3j29jAae3mu83bzN50N_4S6khVwzDAw1Yy5D6dxFD1ggZfN0RK4Xb_Gkbfe9lzn9rcSV0slrlHSgXSFctuBsPjjlbiiyyWxgORcg4_InsHsNN4_tzQ5XXmw.Re1Wm04ZOHBEV8iYLyN1Mg',
      domain: 'localhost:3000', // Set your domain here
      path: '/', // Set cookie path
      httpOnly: true, // Set HTTP only flag if needed
      secure: true, // Set secure flag if needed (for HTTPS)
      sameSite: 'Lax' // Set sameSite attribute if needed
    });
  
    // click and wait for navigation
    const [] = await Promise.all([
      new Promise((resolve, reject) => {
        browser.once('targetcreated', (target: Target) => { resolve(target.url()); });
      }),
      page.click('.MuiButtonBase-root'),
    ]);

    await page.bringToFront();
    await page.reload()
    await setTimeout(2000);
    const buttonSelector = '[data-testid="add-button"]'; // Replace with the actual data-testid value
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
    await setTimeout(1000);

    const inputSelector = '.MuiInputBase-input'; // Replace with the actual class name
    await page.waitForSelector('.MuiInputBase-input', { timeout: 5000 }); // Wait for the input to appear

    await page.type(inputSelector, 'Journey e2e');
    await setTimeout(1000);
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
    await setTimeout(1000);
    const [] = await Promise.all([
      page.click('.MuiAutocomplete-endAdornment').then(() => {
      }).catch((error:any) => {
        console.error('Error clicking on element:', error);
      })
    ]);




    await setTimeout(4000);


    await page.close();
  });
});