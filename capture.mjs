import { chromium } from 'playwright';

async function capture(url, name) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: `/tmp/${name}.png`, fullPage: true });
    console.log(`Captured ${name}`);
  } catch (e) {
    console.log(`Error capturing ${name}: ${e.message}`);
  }
  await browser.close();
}

await capture('http://localhost:4000/blocks', 'v4-blocks');
await capture('http://localhost:3000/max/use-cases', 'maxcenter-usecases');
console.log('Done!');
