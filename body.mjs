import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { timeout: 30000 });
await page.waitForTimeout(5000);

const bodyHtml = await page.evaluate(() => {
  return document.body.innerHTML.substring(0, 2000);
});

console.log('Body HTML:', bodyHtml);
await browser.close();
