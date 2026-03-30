import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });

const htmlClass = await page.evaluate(() => {
  return document.documentElement.className;
});
const bodyBg = await page.evaluate(() => {
  return window.getComputedStyle(document.body).backgroundColor;
});

console.log('MaxCenter HTML classes:', htmlClass);
console.log('MaxCenter Body background:', bodyBg);

await browser.close();
