import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1200 });

// MaxCenter full page
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: '/tmp/maxcenter-full.png', fullPage: false });

// Check the layout structure
const layout = await page.evaluate(() => {
  const main = document.querySelector('main');
  const aside = document.querySelector('aside');
  return {
    mainRect: main ? main.getBoundingClientRect() : null,
    asideRect: aside ? aside.getBoundingClientRect() : null,
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
    htmlBg: window.getComputedStyle(document.documentElement).backgroundColor
  };
});
console.log('Layout:', JSON.stringify(layout, null, 2));

await browser.close();
