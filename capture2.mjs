import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:4000/blocks', { waitUntil: 'networkidle', timeout: 30000 });

// Get computed styles for body
const bodyBg = await page.evaluate(() => {
  return window.getComputedStyle(document.body).backgroundColor;
});
const htmlClass = await page.evaluate(() => {
  return document.documentElement.className;
});

// Get sidebar bg
const sidebarBg = await page.evaluate(() => {
  const sidebar = document.querySelector('aside');
  return sidebar ? window.getComputedStyle(sidebar).backgroundColor : 'not found';
});

console.log('HTML classes:', htmlClass);
console.log('Body background:', bodyBg);
console.log('Sidebar background:', sidebarBg);

await page.screenshot({ path: '/tmp/v4-analyzed.png', fullPage: true });
await browser.close();
