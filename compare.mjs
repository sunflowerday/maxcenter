import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Capture v4
await page.goto('http://localhost:4000/blocks', { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: '/tmp/v4-current.png', fullPage: true });

// Capture MaxCenter
await page.goto('http://localhost:3000/max/use-cases', { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: '/tmp/maxcenter-current.png', fullPage: true });

console.log('Captured current screenshots');
await browser.close();
