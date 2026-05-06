// 通过 IndexNow 协议主动通知 Bing / Yandex / Naver / Seznam 等搜索引擎重新抓取。
// 这些搜索引擎共用同一个 IndexNow 端点，提交一次全部生效。
// 用法：内容更新后跑 `npm run indexnow`
//
// 注：百度不支持 IndexNow，要单独到 ziyuan.baidu.com 提交。
// Google 不支持 IndexNow（自己的 Search Console），但已经通过 sitemap 收录。

const HOST = 'wayfarer-phi.vercel.app';
const KEY = '63805083440debffe94d8c2510b730f1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  // 加更多页面（如果以后有真正的子路由）
];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS,
};

console.log(`→ 提交 ${URLS.length} 个 URL 到 IndexNow...`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

const text = await res.text();
if (res.ok || res.status === 202) {
  console.log(`✓ 接受 (HTTP ${res.status}) · Bing / Yandex 会在 24-48h 内重新抓取`);
} else {
  console.error(`✗ 失败 HTTP ${res.status}: ${text}`);
  process.exit(1);
}
