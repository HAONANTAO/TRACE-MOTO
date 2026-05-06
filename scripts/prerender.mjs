// 预渲染 SPA 为静态 HTML（提升 SEO + 首屏 + 百度/微信内嵌可见性）
// 流程：起一个本地静态服务 → 用 puppeteer 加载 → 等所有章节渲染 → 把完整 HTML 写回 dist/index.html

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

if (!existsSync(distDir)) {
  console.error('✗ dist/ 不存在，请先跑 npm run build');
  process.exit(1);
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

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`→ rendering ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  // 确保 6 章都已挂到 DOM
  for (const id of ['licence', 'ride', 'gear', 'practice', 'mountain', 'insurance']) {
    await page.waitForSelector(`#${id}`, { timeout: 30000 });
  }

  // 滚回顶部，让 activeChapter / 进度条状态归零（与客户端 hydration 时保持一致）
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));

  // 标记 prerender，让 React 在客户端用 hydrate 而不是 createRoot
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
