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
02 · 选车  RIDES        11 台精选 + 41 台目录 · 智能 quiz · 华人友好评测
03 · 装备  GEAR         头型识别 · 五件套 · 本地 vs 淘宝双线策略
04 · 修行  PRACTICE     5 项核心练习 · 12 个月路线图 · 团骑 · 事故处理
05 · 入山  MOUNTAINS    Black Spur 完整路书 · 维州山路推荐
06 · 护身  INSURANCE    三层保险 · 5 家比价 · 防盗四件套 · 中国驾照专属注意
```

---

## 本地运行

需要 Node.js ≥ 18。

```bash
# 1. 安装依赖
npm install

# 2. 开发模式（浏览器自动打开 http://localhost:5173）
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览构建结果
npm run preview
```

---

## 部署到 Vercel（最简单）

**方式 1：通过网页（不需要终端）**

1. 把这个项目推到 GitHub（创建一个新 repo，把所有文件 push 上去）
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
3. 点 **New Project** → 选你的 repo → 一路 Next
4. 等 1-2 分钟，自动给你一个 `xxx.vercel.app` 域名
5. 之后每次 git push，Vercel 自动重新部署

**方式 2：通过 CLI**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目根目录跑
vercel

# 跟着提示走，第一次会问要不要绑定项目
# 第二次开始用 vercel --prod 上线生产环境
vercel --prod
```

---

## 部署到自己的域名

如果你买了域名（比如 `qijixingzhe.com`）：

1. 在 Vercel 项目面板进 **Settings → Domains**
2. 输入你的域名，Vercel 会告诉你要在域名注册商那里加什么 DNS 记录
3. 加完 DNS（一般是 A record 或 CNAME）后等 5-30 分钟生效
4. Vercel 自动签 SSL 证书，访问 `https://yourdomain.com` 就能看到

**域名建议：**
- `qijixingzhe.com` —— 拼音直接，中国朋友最好记
- `wayfarer.cc` —— 短，国际感
- `rt-melbourne.com` —— 突出墨尔本

---

## 项目结构

```
qijixingzhe/
├── src/
│   ├── App.jsx          # 主应用（4177 行 · 41 个组件 · 6 章内容）
│   └── main.jsx         # React 入口
├── public/
│   └── favicon.svg      # 站点图标
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── vite.config.js       # Vite 配置
├── vercel.json          # Vercel SPA 路由配置
└── README.md            # 你正在看的这个文件
```

---

## 内容维护

### 数据更新时间表

| 章节 | 更新内容 | 频率 |
|---|---|---|
| 02 选车 · § 2.7 目录 | 41 台车价格区间 | 每 6 个月 |
| 06 护身 · § 6.3 比价 | 5 家保险公司报价 | 每 12 个月 |
| 01 拿牌 · 资源链接 | VicRoads 政策变化 | 每年检查 |
| 03 装备 · 淘宝品牌 | 国产新品牌出现 | 不定期 |

### 改内容怎么改

所有数据都在 `src/App.jsx` 顶部的 `const` 块里，按主题分组：

- `chapters` — 6 章基础数据
- `bikes` — 11 台精选车（带评测）
- `bikeCatalog` — 41 台完整目录
- `gearBrandsByRegion` — 装备品牌按地域
- `chapterCompare` — 中澳差异对比
- `chapterResources` — 6 章外部链接
- `fieldNotes` — 18 条手写编辑注

改了之后 `npm run dev` 浏览器里立刻看到效果。

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

- 内容错误：请改 `src/App.jsx` 里的对应数据
- 想加新章节：参考 06 护身章的实现模式
- 想加用户系统/评论：建议接 Supabase（未来扩展）

---

## 版权

内容创作于 2026 年，使用 MIT 协议。

链接到的第三方网站（VicRoads / Bikesales / 各品牌官网等）版权归各自所有。

---

**骑迹行者 · WAYFARER · VOL.001 · MELBOURNE EDITION**
