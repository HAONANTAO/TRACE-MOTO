// 生成 PWA icons（192 / 512）+ manifest 引用的图标。
// 用法：npm run icons

import sharp from 'sharp';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

// 简洁 logo：黑底 + 红色"骑"字 + 红色横线
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0A0A0C"/>
  <rect x="40" y="40" width="432" height="432" fill="none" stroke="#C73E1D" stroke-width="4"/>
  <text x="256" y="305" font-family="'PingFang SC','Hiragino Sans GB','Heiti SC',sans-serif" font-size="280" font-weight="600" fill="#ECE6D9" text-anchor="middle">骑</text>
  <rect x="80" y="430" width="120" height="3" fill="#C73E1D"/>
  <text x="80" y="465" font-family="'SF Mono','Monaco','Menlo',monospace" font-size="22" fill="#9B978D" letter-spacing="3">VOL.001</text>
</svg>`;

const sizes = [192, 512];
for (const size of sizes) {
  const out = resolve(publicDir, `icon-${size}.png`);
  await sharp(Buffer.from(svg(size)))
    .resize(size, size)
    .png({ quality: 95 })
    .toFile(out);
  console.log(`✓ ${out}`);
}

// 同时生成一个 maskable icon（带 padding 避免 Android 裁掉边缘）
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0A0A0C"/>
  <text x="256" y="320" font-family="'PingFang SC','Hiragino Sans GB','Heiti SC',sans-serif" font-size="240" font-weight="600" fill="#ECE6D9" text-anchor="middle">骑</text>
  <rect x="106" y="380" width="80" height="3" fill="#C73E1D"/>
</svg>`;

const maskableOut = resolve(publicDir, 'icon-maskable.png');
await sharp(Buffer.from(maskableSvg))
  .resize(512, 512)
  .png({ quality: 95 })
  .toFile(maskableOut);
console.log(`✓ ${maskableOut}`);
