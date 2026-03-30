import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });

// Check specific elements
const colors = await page.evaluate(() => {
  const elements = {
    body: { bg: window.getComputedStyle(document.body).backgroundColor },
    article: { bg: null },
    aside: { bg: null },
    main: { bg: null },
  };
  
  const article = document.querySelector('article');
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  
  if (article) elements.article.bg = window.getComputedStyle(article).backgroundColor;
  if (aside) elements.aside.bg = window.getComputedStyle(aside).backgroundColor;
  if (main) elements.main.bg = window.getComputedStyle(main).backgroundColor;
  
  return elements;
});

console.log('Computed colors:', JSON.stringify(colors, null, 2));
await browser.close();
