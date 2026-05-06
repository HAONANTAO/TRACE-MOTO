# 骑迹行者 · WAYFARER

> 墨尔本华人摩托新手指南 · A Chinese-language motorcycling guide for Melbourne newcomers

一本用中文带华人走完澳洲摩托全流程的杂志式指南——从拿牌、选车、装备、修行到跑山、保险。

---

## 这是什么

**骑迹行者** 不是攻略站，是一座**翻译型本地化指南**——把墨尔本本地摩托文化（VicRoads / Bikesales / TAC）翻译成中文新手能消化的内容。

每一章都对照「中国 ↔ 墨尔本」的差异，并附**真实可点击的外部链接**（官方网站、经销商、保险公司、训练机构）。

### 6 章结构

```
01 · 拿牌  LICENCE      VIC 驾照流程 · 海外转换 · 4 家驾校
02 · 选车  RIDES        11 台精选 + 43 台目录 · 三车并排对比 · 智能 quiz
03 · 装备  GEAR         头型识别 · 五件套 · 国际 + 国产品牌全覆盖
04 · 修行  PRACTICE     5 项核心练习 · 12 个月路线图 · 团骑 · 事故处理
05 · 入山  MOUNTAINS    Black Spur 完整路书 · 维州山路推荐
06 · 护身  INSURANCE    三层保险 · 5 家比价 · 防盗四件套 · 中国驾照专属注意
```

---

## 本地运行

需要 Node.js ≥ 18（推荐 20）。

```bash
npm install         # 安装依赖
npm run dev         # 开发模式（自动开 http://localhost:5173）
npm run build       # 完整构建：vite + 预渲染 → dist/index.html (537KB · 含 6 章完整 HTML)
npm run build:fast  # 仅 vite build（不预渲染、跑得快，开发自查用）
npm run preview     # 本地预览生产包
npm run prerender   # 仅跑预渲染（前提是已 build）
npm run og          # 重新生成分享卡 public/og.png
npm run icons       # 重新生成 PWA icons
```

---

## 项目结构

```
wayfarer/
├── public/
│   ├── favicon.svg              站点图标
│   ├── og.png                   1200×630 分享卡（微信/朋友圈/Telegram 预览）
│   ├── icon-192.png / 512.png   PWA 图标
│   ├── icon-maskable.png        Android 自适应图标
│   ├── manifest.webmanifest     PWA 清单（手机可"添加到主屏幕"）
│   ├── sitemap.xml              给 Google / Bing 看的索引（含 6 章锚点）
│   └── robots.txt               爬虫规则
├── scripts/
│   ├── build-og.mjs             生成 og.png（用 sharp）
│   ├── build-icons.mjs          生成 PWA icons
│   └── prerender.mjs            预渲染 SPA → 静态 HTML（用 puppeteer）
├── src/
│   ├── App.jsx                  主应用 · 全部组件
│   ├── data.js                  全部数据（27 个数据集 · 改这里 → 浏览器立刻看到效果）
│   ├── theme.js                 颜色常量
│   ├── styles.css               全局 CSS（动画、网格、媒体查询、悬浮 bar、对比表）
│   └── main.jsx                 React 入口（自动判断 hydrate vs createRoot）
├── index.html                   模板（SEO meta + JSON-LD Article + FAQPage + Plausible）
├── package.json
└── vite.config.js
```

---

## 改内容怎么改

**所有内容都在 `src/data.js`**（改完 dev 立刻生效）：

| 数据 | 用在哪 |
|---|---|
| `chapters` | 6 章基础数据（导航 + 锚点） |
| `bikes` | 11 台精选车（含完整规格 + 评测 + 升级方向） |
| `bikeCatalog` | 43 台完整目录 |
| `gearBrandsByRegion` | 装备品牌（按地域 · 国际/日系/国产） |
| `chapterResources` | 6 章外部资源链接 |
| `chapterCompare` | 中国 ↔ 墨尔本 跨语言对比 |
| `blackSpurData` | Black Spur 完整路书 |
| `taobaoShippingData` / `shippingChannels` | 淘宝海运红绿灯 |
| `insuranceLayers` / `insuranceCompanies` | 保险三层 + 5 家比价 |
| `theftSpots` / `lockKit` | 盗车率分布 + 防盗四件套 |
| `routes` / `schools` / `gear` / `drills` 等 | 各章详细数据 |
| `fieldNotes` | 18 条手写编辑注 |

---

## 部署到 Vercel · 最简单的发布

### 方式 1：网页（不用终端）

1. 推到 GitHub（创建一个新 repo，把所有文件 push 上去）
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
3. 点 **New Project** → 选你的 repo → 一路 Next（Vercel 自动检测到 Vite）
4. 等 1-2 分钟，自动给你一个 `xxx.vercel.app` 域名
5. 之后每次 git push，Vercel 自动重新部署

### 方式 2：CLI

```bash
npm i -g vercel
vercel              # 第一次：跟着提示绑定项目（preview 部署）
vercel --prod       # 上线生产环境
```

### ⚠️ 部署后 4 件必做事

#### 1. 替换占位域名

`og.png` 和 sitemap 里的链接默认写的是 `https://wayfarer.cc`——发布到自己的域名前，**全局替换**：

```bash
# 假设你的域名是 example.com
grep -rl 'wayfarer.cc' index.html public/ | xargs sed -i '' 's|https://wayfarer.cc|https://example.com|g'
```

涉及 5 个文件：
- `index.html`（canonical / hreflang / og:url / og:image / twitter:image / JSON-LD）
- `index.html` 里的 Plausible `data-domain="wayfarer.cc"` → 你的域名
- `public/sitemap.xml`
- `public/robots.txt`

#### 2. 装搜索引擎验证 token

`index.html` 里有 3 个验证 meta tag 占位（`REPLACE_ME_GOOGLE` / `REPLACE_ME_BING` / `REPLACE_ME_BAIDU`）。到对应控制台拿 token 替换：

| 平台 | 链接 | 必要程度 |
|---|---|---|
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) | ⭐ 必做 |
| Bing Webmaster | [bing.com/webmasters](https://www.bing.com/webmasters) | 推荐 |
| 百度站长 | [ziyuan.baidu.com](https://ziyuan.baidu.com) | 国内访客多再做 |

验证完后到 Search Console **提交 sitemap.xml**——加快收录。

#### 3. 注册 Plausible（或换成 GA4）

`index.html` 已经接好 Plausible 占位：

```html
<script defer data-domain="wayfarer.cc" src="https://plausible.io/js/script.js"></script>
```

到 [plausible.io](https://plausible.io)（30 天免费试用、之后 $9/月起）注册账号、添加你的域名，把 `data-domain` 改成你的真实域名即可生效。

**想换 GA4 免费方案**：删掉 Plausible 那行，换成：
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```
（GA4 完全免费，但欧盟/澳洲访客需要 cookie banner——多一道合规工作）

#### 4. 测试分享卡

发布后用以下工具确认 og.png 正常加载：

- **微信内**：直接发给自己看预览（最直观）
- **Twitter/X**：[cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- **Facebook**：[developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- **通用**：[opengraph.xyz](https://www.opengraph.xyz/)

---

## 做了哪些 SEO + 宣传优化

### 社交分享（微信 / 朋友圈 / 小红书 / Telegram / iMessage / 微博 / X）

- 1200×630 高清分享卡（`public/og.png`）
- 完整 og: 标签集（type / locale=zh_CN / site_name / image:width/height/alt）+ Twitter Card
- 每章末尾有 **ShareBar 分享按钮**：复制链接（自动加 anchor） / 微信 / 小红书 / 微博 / X

### 搜索引擎索引（Google / Bing / Baidu）

- **预渲染**：`npm run build` 用 puppeteer 把 SPA 渲染成完整 HTML（`dist/index.html` 537KB · 6 章完整内容直接索引）。百度 / 微信内嵌浏览器即使不跑 JS 也能读到全文。
- **JSON-LD `Article`** 结构化数据（含 6 章 articleSection、6 个 about topics、Melbourne spatial）
- **JSON-LD `FAQPage`**（7 条高频新手问题——Google 可能在搜索结果里展示成可展开问答卡）
- canonical + hreflang zh-CN + x-default
- sitemap.xml（含 6 个章节锚点）+ robots.txt
- `<noscript>` 后备文本（爬虫即使禁 JS 也能读到 6 章简介）
- 三个搜索引擎验证 meta tag 占位

### PWA · 加桌面 / 主屏幕

- `manifest.webmanifest`：用户可以在手机浏览器里"添加到主屏幕"，像 App 一样打开
- 192/512/maskable 三套 icon（Android 自适应图标）
- `display: standalone` · 全屏沉浸式体验

### 性能（影响 Google 排名 + Core Web Vitals）

- 字体 preconnect + preload（避免 JS 中 @import 的渲染阻塞）
- 滚动监听用 IntersectionObserver（不是 scroll 事件）
- 静态 CSS 文件 + CSS variables（不是内联 `<style>` JSX）
- 全局 `prefers-reduced-motion` 兼容
- 客户端 hydration（不重新 render 浪费）

### 可访问性（A11y）

- `<h1>` Hero 主标题 / `<h2>` 章节标题 / `<h3>` SectionLabel · 正确语义层级
- aria-label 在 SideRail / 回顶按钮上
- `lang="zh-CN"` 全局
- 键盘可用：所有 button 是真 `<button>`、所有 link 是真 `<a>`

---

## 域名建议

如果你买了域名（比如 `qijixingzhe.com` / `wayfarer.cc`）：

1. Vercel 项目面板进 **Settings → Domains**
2. 输入你的域名，Vercel 会告诉你要在域名注册商那里加什么 DNS 记录
3. 加完 DNS（一般是 A record 或 CNAME）后等 5-30 分钟生效
4. Vercel 自动签 SSL 证书，访问 `https://yourdomain.com` 就能看到

**域名候选：**
- `qijixingzhe.com` —— 拼音直接，国内朋友最好记
- `wayfarer.cc` —— 短，国际感
- `rt-melbourne.com` —— 突出墨尔本

---

## 内容维护时间表

| 章节 | 更新内容 | 频率 |
|---|---|---|
| 02 选车 · § 2.8 目录 | 43 台车价格区间 | 每 6 个月 |
| 06 护身 · § 6.3 比价 | 5 家保险公司报价 | 每 12 个月 |
| 01 拿牌 · 资源链接 | VicRoads 政策变化 | 每年检查 |
| 03 装备 · 国产品牌 | 国产新品牌出现 | 不定期 |

每次内容大更新后，记得：
- `npm run og`：如果改了 hero 或核心定位，重新生成分享卡
- 把 `<meta property="og:image:updated_time">` 加上 timestamp（让平台重抓 og）
- `public/sitemap.xml` 里 `<lastmod>` 更新到当天日期

---

## 致谢与数据来源

本指南信息核对至 **2026-04**，主要数据来源：

- **官方**：VicRoads、TAC Victoria、Victoria Police
- **市场**：Bikesales、Procycles、Peter Stevens、TeamMoto
- **社区**：Whirlpool 论坛、Netrider、FortNine YouTube
- **国内对比**：知乎、汽车之家、摩托车二手网、淘宝

每个章节的 SectionLabel 都标注了具体来源，可点击 ResourceBox 链接二次核对。

---

## 已知限制

1. **作者没亲自跑过 Black Spur** —— § 5 入山章是基于 5 个澳洲骑手社区汇总，骑前请二次确认。
2. **价格区间是估算** —— ±10% 浮动正常，最终以经销商报价为准。
3. **保险报价仅参考** —— 实际保费因人/车而异，必须比价 3-5 家。
4. **改装条款简化处理** —— 任何改装请咨询保险公司确认。

---

## 反馈与勘误

- 内容错误：直接改 `src/data.js`
- 想加新章节：参考 `06 护身` 章的实现模式
- 想加用户系统/评论：建议接 Supabase（未来扩展）

---

## 版权

内容创作于 2026 年，使用 MIT 协议。

链接到的第三方网站（VicRoads / Bikesales / 各品牌官网等）版权归各自所有。

---

**骑迹行者 · WAYFARER · VOL.001 · MELBOURNE EDITION**
