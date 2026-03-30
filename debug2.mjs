import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });

// Get all elements
const structure = await page.evaluate(() => {
  const body = document.body;
  const children = Array.from(body.children).map(el => ({
    tag: el.tagName,
    class: el.className.substring(0, 100),
    id: el.id
  }));
  return children;
});

console.log('Body children:', JSON.stringify(structure, null, 2));

// Get html element classes
const htmlClass = document.documentElement.className;
console.log('HTML class:', htmlClass);

await browser.close();
