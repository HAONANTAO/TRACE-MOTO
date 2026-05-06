// 生成 1200×630 的 og.png 分享卡。
// 用法：npm run og
// 依赖：sharp（自动用系统字体渲染 SVG → PNG）

import sharp from 'sharp';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grain" width="200" height="200" patternUnits="userSpaceOnUse">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" />
        <feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.85  0 0 0 0.04 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </pattern>
  </defs>

  <!-- 背景 -->
  <rect width="1200" height="630" fill="#0A0A0C"/>
  <rect width="1200" height="630" fill="url(#grain)" opacity="0.6"/>

  <!-- 顶部细横线 -->
  <line x1="80" y1="92" x2="1120" y2="92" stroke="#16161D" stroke-width="1"/>
  <line x1="80" y1="538" x2="1120" y2="538" stroke="#16161D" stroke-width="1"/>

  <!-- 顶 eyebrow -->
  <text x="80" y="68" font-family="'SF Mono','Monaco','Menlo','Courier New',monospace" font-size="13" fill="#C73E1D" letter-spacing="4" font-weight="700">VOL.001 · MELBOURNE EDITION · 2026</text>
  <text x="1120" y="68" font-family="'SF Mono','Monaco','Menlo',monospace" font-size="11" fill="#5F5C56" letter-spacing="3" text-anchor="end">骑迹行者 · WAYFARER</text>

  <!-- 主标题（英文）-->
  <text x="80" y="270" font-family="'Impact','Arial Black','Helvetica Neue',sans-serif" font-size="170" fill="#ECE6D9" font-weight="900" letter-spacing="-4">ZERO TO</text>
  <text x="80" y="430" font-family="'Impact','Arial Black','Helvetica Neue',sans-serif" font-size="170" fill="#C73E1D" font-weight="900" letter-spacing="-4">MOUNTAIN<tspan fill="#ECE6D9">.</tspan></text>

  <!-- 中文副标 -->
  <text x="80" y="500" font-family="'PingFang SC','Hiragino Sans GB','Heiti SC',sans-serif" font-size="34" fill="#ECE6D9" font-weight="300">墨尔本华人摩托新手指南</text>

  <!-- 章节标签 -->
  <text x="80" y="588" font-family="'SF Mono','Monaco','Menlo',monospace" font-size="14" fill="#9B978D" letter-spacing="3">01 拿牌 · 02 选车 · 03 装备 · 04 修行 · 05 入山 · 06 护身</text>

  <!-- 右下版本号 -->
  <text x="1120" y="588" font-family="'SF Mono','Monaco','Menlo',monospace" font-size="11" fill="#5F5C56" letter-spacing="3" text-anchor="end">≈ 18 MIN READ</text>

  <!-- 右侧红色细线 -->
  <rect x="1182" y="0" width="2" height="630" fill="#C73E1D"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(out);

console.log(`✓ ${out}`);
