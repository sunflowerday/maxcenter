import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });

// Get full layout
const info = await page.evaluate(() => {
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  const firstDiv = document.body.children[0];
  
  const results = {
    asideExists: !!aside,
    mainExists: !!main,
    firstDivIsAside: firstDiv?.tagName === 'DIV' && firstDiv?.className.includes('flex'),
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
  };
  
  if (aside) {
    const rect = aside.getBoundingClientRect();
    results.asideRect = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    results.asideBg = window.getComputedStyle(aside).backgroundColor;
  }
  
  if (main) {
    const rect = main.getBoundingClientRect();
    results.mainRect = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    results.mainBg = window.getComputedStyle(main).backgroundColor;
  }
  
  return results;
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
