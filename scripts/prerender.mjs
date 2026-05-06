// 预渲染 SPA 为静态 HTML（提升 SEO + 首屏 + 百度/微信内嵌可见性）
// 流程：起一个本地静态服务 → 用 puppeteer 加载 → 等所有章节渲染 → 把完整 HTML 写回 dist/index.html
//
// 运行环境检测：
//   · 本地（macOS / Linux 桌面）→ 用 puppeteer + 自带 Chromium
//   · Vercel（serverless Linux）→ 用 puppeteer-core + @sparticuz/chromium（精简兼容版）

import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

if (!existsSync(distDir)) {
  console.error('✗ dist/ 不存在，请先跑 vite build');
  process.exit(1);
}

const isVercel = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
console.log(`→ 环境: ${isVercel ? 'Vercel / Serverless' : '本地'}`);

// 动态加载对应的 Chromium / Puppeteer
let launchOptions;
let puppeteer;
if (isVercel) {
  const chromium = (await import('@sparticuz/chromium')).default;
  puppeteer = (await import('puppeteer-core')).default;
  launchOptions = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  };
} else {
  puppeteer = (await import('puppeteer')).default;
  launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  let url = (req.url || '/').split('?')[0];
  if (url === '/') url = '/index.html';
  const filePath = join(distDir, url);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403); res.end(); return;
  }

  if (!existsSync(filePath)) {
    const html = await readFile(join(distDir, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  const data = await readFile(filePath);
  res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' });
  res.end(data);
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const url = `http://localhost:${port}/`;
console.log(`→ static server :${port}`);

const browser = await puppeteer.launch(launchOptions);

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`→ rendering ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  for (const id of ['licence', 'ride', 'gear', 'practice', 'mountain', 'insurance']) {
    await page.waitForSelector(`#${id}`, { timeout: 30000 });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-prerendered', 'true');
  });

  const html = await page.content();
  const outPath = join(distDir, 'index.html');
  await writeFile(outPath, html, 'utf8');

  const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`✓ prerendered ${outPath} (${sizeKB} KB)`);
} finally {
  await browser.close();
  server.close();
}

process.exit(0);
