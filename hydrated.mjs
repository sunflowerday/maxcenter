import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { timeout: 30000 });

// Wait for React to hydrate
await page.waitForSelector('aside', { timeout: 10000 }).catch(() => console.log('No aside found after wait'));

// Give it more time
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  
  return {
    asideExists: !!aside,
    mainExists: !!main,
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
    asideBg: aside ? window.getComputedStyle(aside).backgroundColor : null,
    mainBg: main ? window.getComputedStyle(main).backgroundColor : null,
    htmlClasses: document.documentElement.className.substring(0, 200),
  };
});

console.log(JSON.stringify(info, null, 2));

// Take screenshot after hydration
await page.screenshot({ path: '/tmp/maxcenter-hydrated.png', fullPage: true });
console.log('Screenshot saved');

await browser.close();
