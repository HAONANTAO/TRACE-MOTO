import { useState, useRef, useEffect, useMemo } from "react";
import {
  ArrowRight, X, Sparkles, AlertTriangle, ArrowLeft,
  Star, ChevronRight
} from "lucide-react";
import { C } from "./theme";
import {
  chapters, fieldNotes, bikes, schools, certifications, gear, drills,
  yearRoadmap, groupSignals, groupPitfalls, accidentSteps, routes,
  bikeCatalog, recentQs, headShapes, lamsModRules,
} from "./data";


const fieldNotes = {
  licence_1: "驾照翻译要 NAATI 认证——VicRoads 不认普通翻译。但香港驾照本身有英文不用翻。",
  licence_2: "我选的 HART Somerton——周末预约要提前 2 周。",
  licence_3: "签证状态会影响转换流程，临时签证只能用国际驾照。",
  ride_1: "二手 LAMS 看车记得带懂行的朋友。Bikesales 报价水分不小。",
  ride_2: "新车前 6 个月折旧最猛——3 年后买新换车真的亏。",
  gear_1: "试戴时戴 30 分钟不取下——回家发现压头的盔，下次出门一定后悔。",
  gear_2: "Shoei 国内只有北京 Fenghuolun + 厦门 Chuangjian 两家正规代理——其他淘宝店都是水货。",
  gear_3: "KOMINE 新款几乎全是越南/印尼产——号称\"国产代工\"的多半是假货。",
  practice_1: "Bunnings Burnside 周日早 7-9 点是练车黄金时段——员工还没上班，巡逻车 9 点后才来。",
  practice_2: "团骑前先看 leader 是谁——超过 2 年新手当 leader 的，宁可不跟。",
  practice_3: "TAC 索赔越早越好——12 个月时限不是建议，是法律。错过基本零希望。",
  mountain_1: "周末 11 点后游客和老司机都堵在 Healesville——避开。",
  mountain_2: "Black Spur 在维州官方记录里是\"摩托事故黑点\"——没有路肩，跑偏不是撞山就是飞下悬崖。",
  mountain_3: "Netrider 老司机的话：\"湿天 hold 不住 Black Spur？Reefton Spur 就别去——通常更难。\"",
  mountain_4: "出发前查 VicTraffic 的 fire warning，夏天山区一根烟头能毁一切。",
  insurance_1: "我的策略：转 Full 牌前买便宜二手 + 第三方财产，转牌后再升综合险。能省 A$2k+。",
  insurance_2: "保险报价至少比 5 家——同样配置 QBE / NRMA / RACV 报价能差 40%。",
  insurance_3: "我朋友的 Ninja 400 在 Footscray 街边过夜被偷——保险全赔但补办两个月没车骑。",
};

const bikes = [
  { brand: "HONDA", model: "CB300R", price: 6.8, displ: 286, hp: 30, weight: 144, seat: 800, gears: 6, fuel: 27, type: "街车", power: "温和", budget: "<8k", height: ["S", "M", "L"], pick: "新手最轻", beginnerScore: 9.5, commute: 9, mountain: 6, review: "286cc 单缸高速会觉得不够用——但这正是让你不作死的功能。撞了不心疼。", upgradeTo: "CB650R / MT-07" },
  { brand: "YAMAHA", model: "MT-03", price: 7.5, displ: 321, hp: 41, weight: 168, seat: 780, gears: 6, fuel: 26, type: "街车", power: "适中", budget: "<8k", height: ["S", "M", "L"], pick: "矮个友好", beginnerScore: 9.0, commute: 8, mountain: 7, review: "780mm 座椅是矮个救星。论坛常说 6 档高速段不够长——日常通勤完全够。", upgradeTo: "MT-07 / Ninja 650" },
  { brand: "CFMOTO", model: "450NK", price: 8.0, displ: 449, hp: 47, weight: 175, seat: 795, gears: 6, fuel: 24, type: "街车", power: "适中", budget: "<8k", height: ["M", "L", "XL"], pick: "性价比", beginnerScore: 8.5, commute: 7, mountain: 8, review: "中国造性价比之王，但服务网点比日厂少。冷启动有时不顺。", upgradeTo: "MT-07 / Trident 660" },
  { brand: "YAMAHA", model: "YZF-R3", price: 8.0, displ: 321, hp: 41, weight: 169, seat: 780, gears: 6, fuel: 28, type: "仿赛", power: "适中", budget: "<8k", height: ["S", "M", "L"], beginnerScore: 8.0, commute: 5, mountain: 8, review: "运动姿势漂亮但前倾通勤累，1 小时手腕开始酸。新手少买仿赛。", upgradeTo: "R7 / Ninja 650" },
  { brand: "KAWASAKI", model: "Z400", price: 8.1, displ: 399, hp: 45, weight: 167, seat: 785, gears: 6, fuel: 25, type: "街车", power: "适中", budget: "8-12k", height: ["M", "L"], beginnerScore: 8.5, commute: 8, mountain: 7, review: "Ninja 400 的裸车版，更舒适。澳洲销量没 Ninja 400 高但通勤更对路。", upgradeTo: "Z650 / MT-07" },
  { brand: "KAWASAKI", model: "Ninja 400", price: 8.6, displ: 399, hp: 45, weight: 168, seat: 785, gears: 6, fuel: 25, type: "仿赛", power: "适中", budget: "8-12k", height: ["M", "L"], pick: "新手仿赛标杆", beginnerScore: 9.0, commute: 6, mountain: 8, review: "澳洲新手仿赛销量第一。轻、快、好控。但 P 牌期满几乎所有人都换大的。", upgradeTo: "Ninja 650 / ZX-6R" },
  { brand: "KTM", model: "390 Duke", price: 7.8, displ: 373, hp: 44, weight: 149, seat: 820, gears: 6, fuel: 26, type: "街车", power: "激进", budget: "<8k", height: ["L", "XL"], beginnerScore: 7.0, commute: 5, mountain: 9, review: "44 马力配 149kg——powerful 到新手会被吓到。先骑别的再回来。", upgradeTo: "790 Duke / 890 Duke" },
  { brand: "HONDA", model: "CBR500R", price: 9.5, displ: 471, hp: 47, weight: 192, seat: 785, gears: 6, fuel: 24, type: "仿赛", power: "适中", budget: "8-12k", height: ["M", "L", "XL"], beginnerScore: 7.5, commute: 7, mountain: 7, review: "比 Ninja 400 重，但 471cc 双缸更顺。仿赛姿势没那么前倾，通勤还能接受。", upgradeTo: "CBR650R / Ninja 650" },
  { brand: "SUZUKI", model: "SV650 LAMS", price: 10.5, displ: 645, hp: 52, weight: 198, seat: 785, gears: 6, fuel: 20, type: "街车", power: "进阶", budget: "8-12k", height: ["M", "L", "XL"], pick: "弯道神器", beginnerScore: 7.0, commute: 7, mountain: 9, review: "解禁版是弯道神器——LAMS 限速版被夹得很闷。买它就是为了 P 牌期满直接解禁。", upgradeTo: "SV650 (解禁) / MT-07" },
  { brand: "YAMAHA", model: "MT-07 LAMS", price: 11.6, displ: 689, hp: 52, weight: 184, seat: 805, gears: 6, fuel: 22, type: "街车", power: "进阶", budget: "8-12k", height: ["L", "XL"], beginnerScore: 7.0, commute: 7, mountain: 9, review: "解禁后是最经典的中量级双缸。LAMS 期感觉力被锁——满 P 牌后再上才是它的本色。", upgradeTo: "MT-07 解禁版" },
  { brand: "ROYAL ENFIELD", model: "Conti GT 650", price: 10.8, displ: 648, hp: 47, weight: 198, seat: 793, gears: 6, fuel: 24, type: "复古", power: "适中", budget: "8-12k", height: ["M", "L"], pick: "复古党", beginnerScore: 7.5, commute: 6, mountain: 7, review: "复古党专属，café racer 姿势。慢慢骑才有味，跑山别选它。", upgradeTo: "继续骑就行" },
];

const schools = [
  { name: "HART", brand: "Honda", spots: ["Somerton", "St Kilda"], price2day: 579, type: "国际连锁", note: "教练标准化" },
  { name: "Stay Upright", brand: "—", spots: ["Werribee", "Braeside"], price2day: 599, type: "VIC 主流", note: "全澳最大" },
  { name: "Armstrongs", brand: "—", spots: ["Thomastown"], price2day: 525, type: "本地老牌", note: "性价比" },
  { name: "Ridetek", brand: "—", spots: ["Pakenham"], price2day: 499, type: "性价比", note: "东南区最便宜" },
];

const certifications = [
  { name: "AS/NZS 1698", region: "澳新", legal: true, note: "澳洲合法上路必须", level: "★★★★" },
  { name: "ECE 22.06", region: "欧盟", legal: false, note: "国际主流，但澳洲法规要求 AS/NZS", level: "★★★★★" },
  { name: "DOT", region: "美国", legal: false, note: "美标，澳洲不承认", level: "★★★" },
  { name: "SNELL M2020", region: "美国", legal: false, note: "赛道级，但澳洲不替代 AS/NZS", level: "★★★★★" },
  { name: "3C", region: "中国", legal: false, note: "国内强制，澳洲无效", level: "★★" },
];

const gear = [
  { cn: "头盔", en: "HELMET", critical: true, note: "唯一不能省的——直接关系命",
    warning: "澳洲法律要求 AS/NZS 1698 认证，淘宝多数没此标，戴上路违法",
    local: { entry: "HJC C70 / LS2 FF902 · A$229–349", mid: "Shoei NXR2 / AGV K6S · A$849", high: "Shoei X-15 · A$1399+", where: "MCAS · Peter Stevens" },
    taobao: { entry: "LS2 国行 · ¥800-1500", mid: "AGV K6S 国行 · ¥3500-5500", warning: "认证可能不带 AS/NZS" } },
  { cn: "骑行夹克", en: "JACKET", critical: true, note: "必须带 CE 等级护具（肩、肘、背）",
    local: { entry: "DriRider RX-3 · A$399", mid: "Alpinestars T-GP · A$599", high: "Dainese Avro · A$899", where: "AMX · BikeBiz" },
    taobao: { entry: "KOMINE 副厂 · ¥400", mid: "SCOYCO 赛羽 · ¥800-1500", high: "瑞德兹 · ¥1500-2500" } },
  { cn: "骑行手套", en: "GLOVES", critical: true,
    local: { entry: "Five RFX1 · A$129", mid: "Knox Hand Armour · A$199", high: "Held Phantom · A$229", where: "MCAS · AMX" },
    taobao: { entry: "KOMINE GK-167 · ¥150", mid: "摩雷士 · ¥300-500", high: "SCOYCO · ¥250-450" } },
  { cn: "骑行裤", en: "PANTS", note: "Draggin Jeans 是墨尔本本土品牌",
    local: { entry: "Rev'It Lombard 3 · A$249", mid: "Draggin Jeans · A$299", high: "Dainese Casual · A$599", where: "Draggin · MCAS" },
    taobao: { entry: "SCOYCO · ¥300-600", mid: "KOMINE 副厂 · ¥600-1000", high: "瑞德兹 · ¥1000-1500" } },
  { cn: "骑行靴", en: "BOOTS", note: "重点是护踝 + 防滑",
    local: { entry: "TCX Hero · A$249", mid: "Forma Adventure · A$349", high: "Sidi Rain · A$449", where: "MCAS · Peter Stevens" },
    taobao: { entry: "SCOYCO · ¥300-500", mid: "摩雷士 · ¥500-800", high: "RIDEZ · ¥800-1200" } },
];

const drills = [
  { num: "01", title: "直线起停", en: "Stop & Go", desc: "半离合 + 找平衡。最基础也最重要", time: "30min", level: "★" },
  { num: "02", title: "8 字绕桩", en: "Figure Eight", desc: "用视线带车，不用方向。看下下个桩，身体自然跟上", time: "45min", level: "★★" },
  { num: "03", title: "紧急刹车", en: "Emergency Brake", desc: "前 7 后 3，重心后压。模拟从 40km/h 急停", time: "20min", level: "★★" },
  { num: "04", title: "慢速平衡", en: "Slow Balance", desc: "后刹拖着走，越慢越稳。穿过 10 米窄道用 30 秒", time: "30min", level: "★★★" },
  { num: "05", title: "压弯入门", en: "Counter Steer", desc: "推内把，身体微倾。在停车场画 8 字，先慢后快", time: "1hr", level: "★★★" },
];

const yearRoadmap = [
  {
    period: "第 1 个月",
    en: "MONTH 01",
    title: "肌肉记忆期",
    italic: "Muscle memory phase.",
    rules: ["不上高速 / 不夜骑 / 不跑山", "通勤距离 ≤ 20 km", "5 项核心练习每周至少 1 次", "下雨别骑——胎温没建立你刹不住"],
    focus: "目标不是骑得帅。目标是让换挡 / 刹车 / 转向变成不思考的本能。",
  },
  {
    period: "第 2-3 个月",
    en: "MONTH 02-03",
    title: "扩展边界期",
    italic: "Expanding the envelope.",
    rules: ["可以高速通勤（M 字头公路 100 km/h）", "可以跑短山路（< 50 km，避开 Black Spur）", "开始 lane filtering（VIC 法定 ≤ 30 km/h 可以）", "第一次雨天通勤——挑白天 + 短距离"],
    focus: "从「学操作」过渡到「读路况」。开始预判其他车的意图，不要只看自己的前轮。",
  },
  {
    period: "第 4-6 个月",
    en: "MONTH 04-06",
    title: "技术升级期",
    italic: "Skill compounding.",
    rules: ["第一次 Black Spur——选周日早 8 点前", "学 trail braking（带刹入弯）", "练高速下变道判断", "考虑报 Stay Upright Advanced 课程"],
    focus: "你应该开始觉得「原来车比我厉害」——这是好事。学会信任车的极限远高于你的胆量。",
  },
  {
    period: "第 7-12 个月",
    en: "MONTH 07-12",
    title: "风格成型期",
    italic: "Finding your line.",
    rules: ["多日长途（Great Ocean Road / 跨州 trip）", "第一次跟团骑（先选 5-7 人小队）", "持照 ≥ 3 年的 D/E 直接 Full 牌（中国驾照转换者）", "完全新手考虑解禁（VIC 需持 P 牌满 3 年）"],
    focus: "一年下来，你应该有自己偏爱的路、偏爱的速度、偏爱的骑姿——而不是 YouTube 上看来的样子。",
  },
];

const groupSignals = [
  { hand: "左臂下摆 · 掌心朝下", meaning: "减速", en: "SLOW DOWN" },
  { hand: "左手食指 + 中指竖起（V 形）", meaning: "改 staggered 队形", en: "STAGGERED" },
  { hand: "左手食指竖起", meaning: "改 single file（单列）", en: "SINGLE FILE" },
  { hand: "左手指地（左侧）/ 右脚指地（右侧）", meaning: "路面危险物", en: "ROAD HAZARD" },
  { hand: "左手指油箱", meaning: "我快没油了", en: "FUEL STOP" },
  { hand: "拳头举起 + 上下挥动", meaning: "停车 / 休息", en: "PIT STOP" },
];

const groupPitfalls = [
  { wrong: "跟得太紧（中国摩托文化习惯）", right: "Staggered 队形里跟前车 2 秒，斜对角 1 秒——安全冗余高过你想象" },
  { wrong: "弯道里超车 / 改线", right: "进弯前确定位置，弯里只走自己的线。改线 = 撞队友" },
  { wrong: "不打手势（觉得刹车灯就够了）", right: "前 3 个人都要重复 leader 的手势——确保最后的 sweep 也看到" },
  { wrong: "加油 / 厕所不等齐", right: "5-7 人是一个团。先到的等齐了再走，没人掉队" },
  { wrong: "发现走丢了就狂追", right: "靠边停车，等 sweep 来 / 打电话给 leader。骑超你能力的代价是命" },
];

const accidentSteps = [
  { num: "01", title: "安全 · SAFETY", desc: "如果还能动，把人和车移到路肩 / 紧急车道。后方 50 米放警示三角架（车上常备）。" },
  { num: "02", title: "拨 000", desc: "有人受伤 → 救护车。任何人不能动 → 别碰。火 / 油泄漏 → 消防。一个电话同时叫所有服务。" },
  { num: "03", title: "交换信息", desc: "对方姓名、地址、车牌、保险公司名 + 保单号。VIC 法律：不交换属交通违法。" },
  { num: "04", title: "拍现场", desc: "车辆位置、刹车痕、路况、对方车牌、对方驾照、伤情。多角度拍——TAC 受理这些是核心证据。" },
  { num: "05", title: "找证人", desc: "记下证人姓名 + 电话。证人是 TAC 在你和对方说法不一致时唯一能信的来源。" },
  { num: "06", title: "报警", desc: "VIC 法律强制报警条件：有人受伤 / 对方逃逸 / 财产损失但找不到主人。其他可在线补报：Victoria Police Online。" },
  { num: "07", title: "看医生", desc: "即使感觉没事也去——whiplash / 内出血可能 24-72 小时后才显现。医院能直接帮你 lodge TAC claim。" },
];

const routes = [
  { name: "Black Spur", cn: "黑刺道", from: "Healesville → Marysville", km: 32, fromCBD: 73, time: "1H", level: "进阶", note: "32 公里连续 sweepers，墨尔本必骑", best: "10-3 月", featured: true, type: "经典", vibe: ["弯道", "森林"] },
  { name: "Reefton Spur", cn: "瑞夫顿", from: "Marysville → Reefton", km: 45, fromCBD: 130, time: "1.5H", level: "高手", note: "Black Spur 进阶版，技术弯多", best: "12-2 月", type: "技术", vibe: ["弯道"] },
  { name: "Kinglake Loop", cn: "金莱克环", from: "St Andrews 出发", km: 60, fromCBD: 50, time: "2H", level: "入门", note: "新手第一次跑山首选", best: "全年", type: "入门", vibe: ["近郊", "温和"] },
  { name: "Mt Donna Buang", cn: "唐娜邦山", from: "Warburton 山顶", km: 38, fromCBD: 90, time: "1.5H", level: "进阶", note: "盘山雨林，路面湿滑", best: "11-3 月", type: "盘山", vibe: ["森林", "弯道"] },
  { name: "Great Ocean Road", cn: "大洋路", from: "Torquay → Apollo Bay", km: 130, fromCBD: 100, time: "半天", level: "进阶", note: "世界级海岸线，注意游客车", best: "10-4 月", type: "风景", vibe: ["海岸", "风景"] },
  { name: "Great Alpine Road", cn: "阿尔卑斯路", from: "Bright → Omeo", km: 200, fromCBD: 320, time: "2 天", level: "高手", note: "雪山公路，冬季危险", best: "11-4 月", type: "长途", vibe: ["长途", "风景"] },
];

const bikeCatalog = [
  // ========== 街车 NAKED (11 台) ==========
  { brand: "HONDA", model: "CB300F", displ: 286, hp: 30, weight: 144, seat: 800, type: "街车", bestFor: "便宜入门", priceNew: "A$5.8k", priceUsed: "A$3.5–5k" },
  { brand: "HONDA", model: "CB500F Hornet", displ: 471, hp: 47, weight: 189, seat: 790, type: "街车", bestFor: "通勤·过渡", priceNew: "A$8.5k", priceUsed: "A$5–7k" },
  { brand: "KAWASAKI", model: "Z500", displ: 451, hp: 45, weight: 169, seat: 785, type: "街车", bestFor: "通勤·新款", priceNew: "A$8.7k", priceUsed: "新款" },
  { brand: "KAWASAKI", model: "Z650 LAMS", displ: 649, hp: 52, weight: 187, seat: 790, type: "街车", bestFor: "解禁过渡", priceNew: "A$10.5k", priceUsed: "A$7–9k" },
  { brand: "KAWASAKI", model: "Z650 RS LAMS", displ: 649, hp: 52, weight: 188, seat: 800, type: "街车·复古", bestFor: "颜值党", priceNew: "A$11.4k", priceUsed: "A$8–10k" },
  { brand: "KTM", model: "250 Duke", displ: 249, hp: 30, weight: 159, seat: 822, type: "街车", bestFor: "新手·激进", priceNew: "A$7.4k", priceUsed: "A$5–6.5k" },
  { brand: "TRIUMPH", model: "Speed 400", displ: 398, hp: 40, weight: 176, seat: 790, type: "街车", bestFor: "性价比", priceNew: "A$8.3k", priceUsed: "新款" },
  { brand: "BMW", model: "G310 R", displ: 313, hp: 34, weight: 164, seat: 785, type: "街车", bestFor: "矮个·城市", priceNew: "A$8.2k", priceUsed: "A$5–6.5k" },
  { brand: "HUSQVARNA", model: "Svartpilen 401", displ: 399, hp: 44, weight: 158, seat: 820, type: "街车·复古", bestFor: "颜值党", priceNew: "A$10.5k", priceUsed: "A$7–8.5k" },
  { brand: "HUSQVARNA", model: "Vitpilen 401", displ: 399, hp: 44, weight: 158, seat: 820, type: "街车·复古", bestFor: "café racer", priceNew: "A$10.5k", priceUsed: "A$7–8.5k" },
  { brand: "APRILIA", model: "Tuono 660 LAMS", displ: 659, hp: 47, weight: 183, seat: 820, type: "街车", bestFor: "解禁过渡", priceNew: "A$15k", priceUsed: "A$11–13k" },

  // ========== 仿赛 SPORT (7 台) ==========
  { brand: "HONDA", model: "CBR300R", displ: 286, hp: 30, weight: 164, seat: 785, type: "仿赛", bestFor: "新手仿赛", priceNew: "A$6.5k", priceUsed: "A$4–5.5k" },
  { brand: "YAMAHA", model: "YZF-R7 LAMS", displ: 689, hp: 52, weight: 188, seat: 835, type: "仿赛", bestFor: "解禁过渡", priceNew: "A$13.4k", priceUsed: "A$10–12k" },
  { brand: "KAWASAKI", model: "Ninja 500", displ: 451, hp: 45, weight: 171, seat: 785, type: "仿赛", bestFor: "替代 N400", priceNew: "A$8.9k", priceUsed: "新款" },
  { brand: "KAWASAKI", model: "Ninja 650 LAMS", displ: 649, hp: 52, weight: 192, seat: 790, type: "仿赛", bestFor: "解禁过渡", priceNew: "A$11.3k", priceUsed: "A$8–10k" },
  { brand: "KTM", model: "RC 390", displ: 373, hp: 44, weight: 155, seat: 824, type: "仿赛", bestFor: "跑山·激进", priceNew: "A$8.2k", priceUsed: "A$5.5–7k" },
  { brand: "APRILIA", model: "RS 125", displ: 125, hp: 15, weight: 137, seat: 820, type: "仿赛", bestFor: "L 牌期", priceNew: "A$8.2k", priceUsed: "A$5–6.5k" },
  { brand: "APRILIA", model: "RS 660 LAMS", displ: 659, hp: 47, weight: 183, seat: 820, type: "仿赛", bestFor: "解禁过渡", priceNew: "A$15.5k", priceUsed: "A$12–14k" },

  // ========== 复古 RETRO (6 台) ==========
  { brand: "ROYAL ENFIELD", model: "Hunter 350", displ: 349, hp: 20, weight: 181, seat: 790, type: "复古", bestFor: "便宜可爱", priceNew: "A$6.7k", priceUsed: "A$4.5–6k" },
  { brand: "ROYAL ENFIELD", model: "Meteor 350", displ: 349, hp: 20, weight: 191, seat: 765, type: "复古", bestFor: "矮个友好", priceNew: "A$7.3k", priceUsed: "A$5–6.5k" },
  { brand: "ROYAL ENFIELD", model: "Interceptor 650", displ: 648, hp: 47, weight: 202, seat: 804, type: "复古", bestFor: "气质流", priceNew: "A$10.4k", priceUsed: "A$7–9k" },
  { brand: "ROYAL ENFIELD", model: "Bear 650", displ: 648, hp: 47, weight: 216, seat: 830, type: "复古·Scrambler", bestFor: "气质流", priceNew: "A$10.5k", priceUsed: "新款" },
  { brand: "YAMAHA", model: "XSR700 LAMS", displ: 689, hp: 52, weight: 188, seat: 815, type: "复古", bestFor: "解禁过渡", priceNew: "A$13.5k", priceUsed: "A$9–11k" },
  { brand: "TRIUMPH", model: "Scrambler 400 X", displ: 398, hp: 40, weight: 179, seat: 835, type: "Scrambler", bestFor: "性价比", priceNew: "A$9.5k", priceUsed: "新款" },

  // ========== 巡航 CRUISER (7 台) ==========
  { brand: "HONDA", model: "CMX300 Rebel", displ: 286, hp: 27, weight: 169, seat: 690, type: "巡航", bestFor: "矮个最低座", priceNew: "A$7.4k", priceUsed: "A$5–6k" },
  { brand: "HONDA", model: "Rebel 500", displ: 471, hp: 45, weight: 191, seat: 690, type: "巡航", bestFor: "矮个·哈风格", priceNew: "A$9.6k", priceUsed: "A$6–8k" },
  { brand: "KAWASAKI", model: "Vulcan S", displ: 649, hp: 52, weight: 235, seat: 705, type: "巡航", bestFor: "解禁过渡", priceNew: "A$10k", priceUsed: "A$7–9k" },
  { brand: "KAWASAKI", model: "Eliminator 500", displ: 451, hp: 45, weight: 176, seat: 735, type: "巡航", bestFor: "新款·矮", priceNew: "A$8.7k", priceUsed: "新款" },
  { brand: "ROYAL ENFIELD", model: "Classic 350", displ: 349, hp: 20, weight: 195, seat: 805, type: "巡航·复古", bestFor: "情怀党", priceNew: "A$7.7k", priceUsed: "A$5–6.5k" },
  { brand: "HARLEY-DAVIDSON", model: "X350", displ: 353, hp: 35, weight: 195, seat: 777, type: "巡航", bestFor: "哈牌入门", priceNew: "A$9.8k", priceUsed: "新款" },
  { brand: "HARLEY-DAVIDSON", model: "X500", displ: 500, hp: 47, weight: 208, seat: 820, type: "巡航", bestFor: "哈牌入门", priceNew: "A$11.5k", priceUsed: "新款" },

  // ========== Adventure / Dual-Sport (8 台) ==========
  { brand: "HONDA", model: "CRF300L", displ: 286, hp: 27, weight: 142, seat: 880, type: "双运动", bestFor: "越野·轻量", priceNew: "A$8.4k", priceUsed: "A$6–7.5k" },
  { brand: "HONDA", model: "CRF300 Rally", displ: 286, hp: 27, weight: 153, seat: 885, type: "Adventure", bestFor: "拉力造型", priceNew: "A$9.4k", priceUsed: "A$6.5–8k" },
  { brand: "ROYAL ENFIELD", model: "Himalayan 450", displ: 452, hp: 39, weight: 196, seat: 825, type: "Adventure", bestFor: "性价比拉力", priceNew: "A$8.4k", priceUsed: "新款" },
  { brand: "KTM", model: "390 Adventure", displ: 373, hp: 44, weight: 158, seat: 855, type: "Adventure", bestFor: "技术拉力", priceNew: "A$10k", priceUsed: "A$7–9k" },
  { brand: "BMW", model: "G310 GS", displ: 313, hp: 34, weight: 169, seat: 835, type: "Adventure", bestFor: "BMW 入门", priceNew: "A$8.5k", priceUsed: "A$5.5–7k" },
  { brand: "SUZUKI", model: "V-Strom 650 LAMS", displ: 645, hp: 52, weight: 213, seat: 835, type: "Adventure", bestFor: "通勤·长途", priceNew: "A$11k", priceUsed: "A$7–9k" },
  { brand: "YAMAHA", model: "Ténéré 700 LAMS", displ: 689, hp: 52, weight: 205, seat: 875, type: "Adventure", bestFor: "硬派拉力", priceNew: "A$15.6k", priceUsed: "A$11–13k" },
  { brand: "CFMOTO", model: "450MT", displ: 449, hp: 41, weight: 175, seat: 820, type: "Adventure", bestFor: "性价比拉力", priceNew: "A$9.5k", priceUsed: "新款" },

  // ========== 踏板 SCOOTER (4 台) ==========
  { brand: "YAMAHA", model: "NMAX 155", displ: 155, hp: 15, weight: 131, seat: 765, type: "踏板", bestFor: "L 牌·通勤", priceNew: "A$5.3k", priceUsed: "A$3.5–4.5k" },
  { brand: "YAMAHA", model: "XMAX 300", displ: 292, hp: 28, weight: 179, seat: 795, type: "踏板", bestFor: "高速通勤", priceNew: "A$8.4k", priceUsed: "A$5–7k" },
  { brand: "HONDA", model: "PCX 160", displ: 156, hp: 16, weight: 132, seat: 764, type: "踏板", bestFor: "省油通勤", priceNew: "A$5.5k", priceUsed: "A$3.5–4.5k" },
  { brand: "VESPA", model: "GTS 300", displ: 278, hp: 23, weight: 161, seat: 790, type: "踏板", bestFor: "意大利风", priceNew: "A$10.6k", priceUsed: "A$6.5–8.5k" },
];

const recentQs = [
  { who: "L. 同学", days: "2 天前", q: "中国驾照 4 年，3 月份能转完吗？", aPreview: "完全可以。NAATI 翻译 1 周 + VicRoads 验证 + 2-Day 课程同时安排，3 月底前能拿 Full 牌..." },
  { who: "Yuki", days: "5 天前", q: "168cm 选 MT-03 和 Ninja 400 哪个？", aPreview: "MT-03 座椅 780mm 更友好，Ninja 400 座椅 785mm 但前倾姿势会让你脚更难触地..." },
  { who: "Ben.W", days: "1 周前", q: "Black Spur 现在去合适吗？", aPreview: "5 月已经入秋，桉树叶湿滑路况开始变差。建议改去 Kinglake Loop——海拔低、路况干..." },
];

const headShapes = [
  {
    id: "long", name: "长椭圆", en: "LONG OVAL", pct: "约 10%",
    desc: "前后明显比左右长——头型像鸡蛋立着",
    suited: ["Arai Signet-X (经典长椭圆)", "Arai Profile-V", "X-lite / Nolan 部分款"],
    avoid: ["HJC (顶额头)", "Bell (顶后脑)", "AGV K 系列"],
  },
  {
    id: "inter", name: "中椭圆", en: "INTERMEDIATE OVAL", pct: "约 80% · 最常见",
    desc: "前后比左右略长——大多数人是这种",
    suited: ["Shoei NXR2 / X-15 (经典)", "AGV K6S / Pista", "HJC RPHA (偏圆但能戴)", "Scorpion"],
    avoid: ["Arai Signet (太长)"],
    primary: true,
  },
  {
    id: "round", name: "圆椭圆", en: "ROUND OVAL", pct: "约 10%",
    desc: "前后和左右几乎一样长——较罕见",
    suited: ["Bell", "AGV K 系列 (部分)", "Arai Quantum"],
    avoid: ["Shoei (会两侧夹)", "Arai Signet"],
  },
];

const lamsModRules = [
  { name: "拆 throttle restrictor / 解禁", legal: false, ins: false, note: "完全违法 + 保险作废，事故全赔" },
  { name: "改 ECU / Tune / 排气", legal: false, ins: false, note: "动力上升即 LAMS 失效" },
  { name: "高流量进气 / Air filter", legal: false, ins: false, note: "动力可能上升，技术上违规" },
  { name: "Lowering link / 降低座椅", legal: false, ins: true, note: "矮个常见改装，原则违规但少被查，必须上报保险" },
  { name: "Frame slider / 车架保护", legal: false, ins: true, note: "原则违规但极少被查，多数保险接受" },
  { name: "Tail tidy / 短尾灯", legal: false, ins: true, note: "原则违规但极少被查" },
  { name: "Bar end mirror / 后视镜", legal: true, ins: true, note: "视野改善反而更安全" },
  { name: "Vinyl wrap / 贴纸 / 喷漆", legal: true, ins: true, note: "外观改装，没问题" },
];

/* ============ 主应用 ============ */

export default function App() {
  const [activeChapter, setActiveChapter] = useState("");

  useEffect(() => {
    const elements = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);
    if (!elements.length) return;

    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        const top = chapters.find((c) => visible.has(c.id));
        setActiveChapter(top ? top.id : "");
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="f-body grain" style={{
        background: C.bg, color: C.cream, minHeight: '100vh',
        position: 'relative', overflow: 'hidden',
      }}>
        <Nav active={activeChapter} />
        <Hero />
        <DecisionFunnel />
        <LicenceSection />
        <RideSection />
        <GearSection />
        <PracticeSection />
        <MountainSection />
        <InsuranceSection />
        <Footer />
      </div>
    </>
  );
}

/* ============ Nav ============ */

function Nav({ active }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: `${C.bg}E6`, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'baseline', gap: 8, textDecoration: 'none' }}>
        <span className="f-display" style={{ fontSize: 22, color: C.cream }}>骑迹行者</span>
        <span className="f-serif hide-mobile" style={{ fontSize: 12, fontStyle: 'italic', color: C.accent, fontWeight: 400 }}>wayfarer</span>
      </a>

      <div className="hide-mobile nav-spacer" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {chapters.map(ch => (
          <a key={ch.id} href={`#${ch.id}`} className="f-mono nav-link" style={{
            fontSize: 10, letterSpacing: 2, textDecoration: 'none',
            color: active === ch.id ? C.accent : C.creamMute, transition: 'color 0.2s',
          }}>
            {ch.num} / {ch.cn.toUpperCase()}
          </a>
        ))}
      </div>

      <div className="hide-mobile f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2 }}>
        UPDATED · 2026.04.20
      </div>
      <div className="show-mobile f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>VOL.001</div>
    </nav>
  );
}

/* ============ Hero ============ */

function Hero() {
  return (
    <section id="top" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      paddingTop: 80, paddingBottom: 40,
    }}>
      <HeroBackground />

      <div className="container fade-up" style={{ position: 'relative', zIndex: 2, animationDelay: '0.1s' }}>
        <div className="grid-3" style={{ paddingTop: 32, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 6 }}>FILED</div>
            <div className="f-mono" style={{ fontSize: 12, color: C.cream }}>2026 · AUTUMN ISSUE</div>
          </div>
          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 6 }}>FOR</div>
            <div className="f-mono" style={{ fontSize: 12, color: C.cream }}>NEW RIDERS · 墨尔本华人</div>
          </div>
          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 6 }}>READ</div>
            <div className="f-mono" style={{ fontSize: 12, color: C.cream }}>≈ 18 MIN</div>
          </div>
        </div>
      </div>

      <div className="container fade-up" style={{ position: 'relative', zIndex: 2, animationDelay: '0.3s', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 40, paddingBottom: 40 }}>
        <h1 style={{
          fontFamily: "'Anton', system-ui",
          fontSize: 'clamp(56px, 13vw, 200px)',
          lineHeight: 0.85, color: C.cream,
          letterSpacing: '-0.02em', margin: 0,
        }}>
          ZERO<br/>
          <span style={{ color: C.accent }}>TO</span><br/>
          MOUNTAIN
        </h1>

        <div style={{ marginTop: 40, maxWidth: 760 }}>
          <div className="f-serif" style={{
            fontSize: 'clamp(20px, 2.4vw, 30px)', fontStyle: 'italic',
            color: C.cream, fontWeight: 300, lineHeight: 1.4, marginBottom: 20,
          }}>
            墨尔本拿驾照 · LAMS 选车 · 装备策略 · 跑山攻略<br/>
            <span style={{ color: C.accent }}>给中文新手的完整指南。</span>
          </div>
          <div className="f-mono" style={{ fontSize: 11, color: C.creamMute, letterSpacing: 2, lineHeight: 1.8 }}>
            VICROADS 官方流程 · 11 台 LAMS 实测 · 6 条山路对比 · 2 条拿牌路径
          </div>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#funnel" style={{
            padding: '16px 28px', display: 'inline-flex', alignItems: 'center', gap: 12,
            background: C.cream, color: C.bg, textDecoration: 'none',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, fontWeight: 700,
          }}>
            从我的情况开始 <ArrowRight size={14} />
          </a>
          <a href="#licence" className="f-mono" style={{
            fontSize: 11, color: C.creamMute, letterSpacing: 2, textDecoration: 'none',
            borderBottom: `1px solid ${C.border}`, paddingBottom: 4,
          }}>
            或从头开始读 →
          </a>
        </div>
      </div>

      <div className="container fade-up" style={{ position: 'relative', zIndex: 2, paddingTop: 32, borderTop: `1px solid ${C.border}`, animationDelay: '0.5s' }}>
        <div className="grid-5">
          {[
            { n: "5", l: "章节" },
            { n: "11", l: "LAMS 选车" },
            { n: "6", l: "维州山路" },
            { n: "4", l: "驾校对比" },
            { n: "2", l: "拿牌路径" },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: i === 0 ? 'none' : `1px solid ${C.border}`, paddingLeft: i === 0 ? 0 : 24 }}>
              <div className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: C.cream, lineHeight: 1 }}>{s.n}</div>
              <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2, marginTop: 8 }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 75% 30%, ${C.accentDim}33 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, ${C.surface} 0%, transparent 60%)`,
      }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={C.cream} strokeOpacity="0.03" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <svg style={{ position: 'absolute', right: 0, top: '20%', width: '60%', height: '60%', opacity: 0.15 }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 600 400">
        {[...Array(8)].map((_, i) => (
          <path key={i}
            d={`M 0 ${100 + i * 40} Q 150 ${80 + i * 40}, 300 ${120 + i * 40} T 600 ${100 + i * 40}`}
            fill="none" stroke={C.accent} strokeWidth="1" strokeOpacity={0.4 - i * 0.04} />
        ))}
      </svg>
    </div>
  );
}

/* ============ Decision Funnel · 漏斗式 ============ */

function DecisionFunnel() {
  const [step, setStep] = useState(0);
  const [hasLicence, setHasLicence] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rt_user_profile') || '{}');
      if (saved.funnelDone) {
        setDone(true);
        setHasLicence(saved.hasLicence);
        setOrigin(saved.origin);
      }
    } catch (e) {}
  }, []);

  const saveAndRoute = (data, target) => {
    try {
      const profile = JSON.parse(localStorage.getItem('rt_user_profile') || '{}');
      localStorage.setItem('rt_user_profile', JSON.stringify({ ...profile, ...data, funnelDone: true }));
    } catch (e) {}
    setDone(true);
    setTimeout(() => {
      const t = document.getElementById(target);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const handleNoLicence = () => {
    setHasLicence(false);
    saveAndRoute({ hasLicence: false, stageLabel: "完全新手" }, "licence");
  };

  const handleHasLicence = () => {
    setHasLicence(true);
    setStep(1);
  };

  const originOptions = [
    { id: "mainland", name: "中国大陆", en: "MAINLAND", note: "需走 2-Day 转换课程 + 路考", hot: true, target: "licence", stageLabel: "中国大陆驾照（需考试）" },
    { id: "hktw", name: "香港 / 台湾", en: "HK · TW", note: "⚠ 2025.4 EDR 废除，现也需考试", warning: true, target: "licence", stageLabel: "港台驾照（EDR 已废除）" },
    { id: "macau", name: "澳门", en: "MACAU", note: "非认可，需考试", target: "licence", stageLabel: "澳门驾照（非认可）" },
    { id: "sea", name: "新加坡 / 马来西亚", en: "SG · MY", note: "新加坡可直换；马来西亚需考试", target: "licence", stageLabel: "东南亚驾照" },
    { id: "aus", name: "澳洲其他州", en: "AU OTHER", note: "州际互认，直接用", target: "ride", stageLabel: "已有澳洲牌（其他州）" },
    { id: "other", name: "其他国家", en: "OTHER", note: "去 VicRoads 查互认表", target: "licence", stageLabel: "其他国家驾照" },
  ];

  const resultText = {
    mainland: { title: "需走转换 + 路考", subtitle: "中国大陆驾照属于非认可——必须完成 2-Day 转换课程并通过路考。下方第 1 章详解流程。" },
    hktw: { title: "⚠ 2025.4 新规", subtitle: "VIC 废除了 EDR——港台驾照现在也必须完成考试和课程，和大陆基本一样。这是很多旧攻略没更新的关键变化。" },
    macau: { title: "需考试转换", subtitle: "澳门驾照属于非认可——必须完成知识和路考。建议看下方 2-Day 课程方案。" },
    sea: { title: "先看你具体来自哪——", subtitle: "新加坡是 Recognised Country 可直换；马来西亚是非认可需考试。先确认你的具体来源。" },
    aus: { title: "已有澳洲牌——直接选车", subtitle: "州际互认，页面已为你滚动到选车章节" },
    other: { title: "其他国家驾照——", subtitle: "需要在 VicRoads 网站确认你国驾照的具体互认状态。Recognised Country 共 28 国（UK/US/Canada/Japan/Singapore/Germany 等可直换）。" },
  };

  const handleOrigin = (opt) => {
    setOrigin(opt.id);
    saveAndRoute({
      hasLicence: true,
      origin: opt.id,
      stageLabel: opt.stageLabel,
    }, opt.target);
  };

  const reset = () => {
    setStep(0); setHasLicence(null); setOrigin(null); setDone(false);
    try {
      const profile = JSON.parse(localStorage.getItem('rt_user_profile') || '{}');
      delete profile.funnelDone; delete profile.hasLicence; delete profile.origin; delete profile.stageLabel;
      localStorage.setItem('rt_user_profile', JSON.stringify(profile));
    } catch (e) {}
  };

  return (
    <section id="funnel" style={{ padding: '120px 0', borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center', marginBottom: 60 }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 4, marginBottom: 16 }}>
            — START HERE · 1-2 个问题 —
          </div>
          <h2 className="f-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: C.cream, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            告诉我你的情况<br/>
            <span style={{ color: C.accent }}>我把你送到正确的章节</span>
          </h2>
          <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', color: C.creamMute, fontStyle: 'italic', marginTop: 20, fontWeight: 300, lineHeight: 1.7 }}>
            选完之后可以在 § 2.5「老司机的话」看你选的车有什么真实评论。
          </p>
        </div>

        {!done ? (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 3, marginBottom: 20, textAlign: 'center' }}>
              · QUESTION {step + 1} / {hasLicence === true ? 2 : 1} ·
            </div>

            {step === 0 && (
              <div className="fade-up">
                <div className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: C.cream, textAlign: 'center', marginBottom: 40, lineHeight: 1.1 }}>
                  你已经有<span style={{ color: C.accent }}>摩托车驾照</span>了吗？
                </div>
                <div className="grid-2" style={{ maxWidth: 600, margin: '0 auto' }}>
                  <button onClick={handleHasLicence} className="funnel-card" style={funnelBtnStyle()}>
                    <div className="f-display" style={{ fontSize: 36, color: C.cream, lineHeight: 1 }}>有</div>
                    <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', marginTop: 8 }}>YES, I HAVE ONE</div>
                  </button>
                  <button onClick={handleNoLicence} className="funnel-card" style={funnelBtnStyle()}>
                    <div className="f-display" style={{ fontSize: 36, color: C.cream, lineHeight: 1 }}>没有</div>
                    <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', marginTop: 8 }}>NO, START FROM ZERO</div>
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="fade-up">
                <button onClick={() => setStep(0)} className="f-mono" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'transparent', border: 'none', color: C.mute,
                  fontSize: 10, letterSpacing: 2, cursor: 'pointer', marginBottom: 24,
                }}>
                  <ArrowLeft size={12} /> 上一题
                </button>
                <div className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: C.cream, textAlign: 'center', marginBottom: 16, lineHeight: 1.1 }}>
                  哪里的<span style={{ color: C.accent }}>驾照</span>？
                </div>
                <p className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', textAlign: 'center', marginBottom: 40, fontWeight: 300, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                  VicRoads 把驾照按来源分 3 档：可直换、需考试转换、非认可。<br/>
                  <span style={{ color: C.accent }}>注意：2025.4 起港台不再可直换。</span>
                </p>
                <div className="grid-3" style={{ maxWidth: 1000, margin: '0 auto' }}>
                  {originOptions.map(opt => (
                    <button key={opt.id} onClick={() => handleOrigin(opt)} className="funnel-card" style={{
                      ...funnelBtnStyle(),
                      borderColor: opt.hot ? C.accent : opt.warning ? C.accent : C.border,
                      background: opt.hot ? `${C.accent}10` : opt.warning ? `${C.accent}06` : 'transparent',
                      textAlign: 'left',
                      borderStyle: opt.warning ? 'dashed' : 'solid',
                    }}>
                      {opt.hot && <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>· HOT ·</div>}
                      {opt.warning && <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>· UPDATED 2025.4 ·</div>}
                      <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 4 }}>{opt.en}</div>
                      <div className="f-display" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: C.cream, lineHeight: 1.05 }}>{opt.name}</div>
                      <div className="f-serif" style={{ fontSize: 13, color: opt.hot || opt.warning ? C.accent : C.creamMute, fontStyle: 'italic', marginTop: 10, lineHeight: 1.4, fontWeight: 300 }}>{opt.note}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="fade-up" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16 }}>
              · 已记住 ·
            </div>
            <div className="f-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: C.cream, lineHeight: 1.2, marginBottom: 12 }}>
              {hasLicence === false && "你是完全新手——"}
              {hasLicence === true && origin && resultText[origin].title}
            </div>
            <div className="f-serif" style={{ fontSize: 16, color: C.creamMute, fontStyle: 'italic', marginBottom: 24, fontWeight: 300, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              {hasLicence === false && "页面已为你滚动到拿牌章节"}
              {hasLicence === true && origin && resultText[origin].subtitle}
            </div>
            <div className="f-hand" style={{ fontSize: 22, color: C.accent, marginBottom: 24 }}>
              ↗ 接下来可以去 § 2 选车
            </div>
            <button onClick={reset} className="f-mono" style={{
              padding: '8px 14px', background: 'transparent', border: `1px solid ${C.border}`,
              color: C.creamMute, fontSize: 10, letterSpacing: 2, cursor: 'pointer',
            }}>↻ 重新选择</button>
          </div>
        )}
      </div>
    </section>
  );
}

function funnelBtnStyle() {
  return {
    padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)',
    textAlign: 'center', background: 'transparent',
    border: `1px solid ${C.border}`, color: 'inherit', cursor: 'pointer',
  };
}

/* ============ 章节通用 ============ */

function ChapterCover({ num, cn, en, type }) {
  return (
    <div style={{
      width: '100%', height: 'clamp(240px, 32vh, 380px)',
      position: 'relative', overflow: 'hidden',
      background: C.bg, borderTop: `1px solid ${C.border}`,
    }}>
      <ChapterArt num={num} type={type} />
      <div className="container" style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 4, marginBottom: 16 }}>
          CHAPTER {num} · {en}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div className="f-display" style={{ fontSize: 'clamp(60px, 11vw, 160px)', color: C.cream, lineHeight: 0.85, letterSpacing: '-0.02em' }}>{cn}</div>
          <div className="f-display" style={{ fontSize: 'clamp(40px, 7vw, 96px)', color: C.muteDeep, lineHeight: 0.85, letterSpacing: '-0.02em' }}>{num}</div>
        </div>
      </div>
    </div>
  );
}

function ChapterArt({ num, type }) {
  if (type === "licence") {
    return (
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} preserveAspectRatio="none" viewBox="0 0 1400 400">
        {[...Array(20)].map((_, i) => (<line key={i} x1="0" y1={20 + i * 20} x2="1400" y2={20 + i * 20} stroke={C.cream} strokeWidth="0.5" strokeOpacity="0.3" />))}
        <circle cx="1100" cy="200" r="120" fill="none" stroke={C.accent} strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="1100" cy="200" r="90" fill="none" stroke={C.accent} strokeWidth="1.5" />
        <text x="1100" y="200" textAnchor="middle" fill={C.accent} fontSize="20" fontFamily="monospace" letterSpacing="4">VICROADS</text>
        <text x="1100" y="225" textAnchor="middle" fill={C.accent} fontSize="11" fontFamily="monospace" letterSpacing="2">APPROVED · 2026</text>
      </svg>
    );
  }
  if (type === "ride") {
    return (
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 1400 400">
          {[...Array(40)].map((_, i) => (<line key={i} x1={i * 35} y1="0" x2={i * 35} y2="400" stroke={C.cream} strokeWidth="0.5" strokeOpacity="0.4" />))}
          <text x="200" y="160" fill={C.accent} fontSize="80" fontFamily="'Anton', sans-serif" opacity="0.6">286</text>
          <text x="500" y="280" fill={C.accent} fontSize="80" fontFamily="'Anton', sans-serif" opacity="0.5">449</text>
          <text x="800" y="180" fill={C.accent} fontSize="80" fontFamily="'Anton', sans-serif" opacity="0.7">650</text>
          <text x="1150" y="300" fill={C.accent} fontSize="80" fontFamily="'Anton', sans-serif" opacity="0.4">321</text>
        </svg>
      </div>
    );
  }
  if (type === "gear") {
    return (
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} preserveAspectRatio="none" viewBox="0 0 1400 400">
        {[...Array(6)].map((_, i) => (<rect key={i} x={400 + i * 30} y={50 + i * 30} width={600 - i * 60} height={300 - i * 60} fill="none" stroke={C.accent} strokeWidth="1" strokeOpacity={0.6 - i * 0.08} />))}
        <text x="80" y="100" fill={C.cream} fontSize="14" fontFamily="monospace" opacity="0.5">✓ HELMET</text>
        <text x="80" y="140" fill={C.cream} fontSize="14" fontFamily="monospace" opacity="0.5">✓ JACKET</text>
        <text x="80" y="180" fill={C.cream} fontSize="14" fontFamily="monospace" opacity="0.5">✓ GLOVES</text>
        <text x="80" y="220" fill={C.cream} fontSize="14" fontFamily="monospace" opacity="0.5">✓ PANTS</text>
        <text x="80" y="260" fill={C.cream} fontSize="14" fontFamily="monospace" opacity="0.5">✓ BOOTS</text>
      </svg>
    );
  }
  if (type === "practice") {
    return (
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} preserveAspectRatio="none" viewBox="0 0 1400 400">
        <path d="M 300 200 C 300 100, 500 100, 500 200 C 500 300, 700 300, 700 200 C 700 100, 900 100, 900 200 C 900 300, 1100 300, 1100 200" fill="none" stroke={C.accent} strokeWidth="2" strokeDasharray="6 6" />
        {[300, 500, 700, 900, 1100].map((x, i) => (<polygon key={i} points={`${x},180 ${x-12},220 ${x+12},220`} fill={C.accent} opacity="0.7" />))}
      </svg>
    );
  }
  return null;
}

function ChapterIntro({ num, cn, en, italic, lead, type, customCover }) {
  // lead 支持字符串或数组——数组每项独立段落
  const leadLines = Array.isArray(lead) ? lead : (lead ? [lead] : []);

  return (
    <>
      {customCover || <ChapterCover num={num} cn={cn} en={en} type={type} />}
      <div className="container" style={{ padding: '60px clamp(20px, 4vw, 64px) 40px' }}>
        <div className="chapter-grid">
          <div />
          <div>
            {italic && (<div className="f-serif" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontStyle: 'italic', color: C.accent, fontWeight: 300 }}>{italic}</div>)}
            {leadLines.map((line, i) => (
              <p key={i} className="f-serif" style={{
                fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1.65,
                color: C.creamMute, marginTop: i === 0 ? 24 : 16,
                fontWeight: 300, fontStyle: 'italic', maxWidth: 720,
              }}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children, num, source }) {
  return (
    <div className="container" style={{
      padding: '60px clamp(20px, 4vw, 64px) 24px',
      display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
    }}>
      {num && <span className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 2 }}>§ {num}</span>}
      <span className="f-mono" style={{ fontSize: 11, color: C.creamMute, letterSpacing: 3, textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: C.border, minWidth: 24 }} />
      {source && <span className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1 }}>SOURCE · {source}</span>}
    </div>
  );
}

function FieldNote({ children, rotation = -2 }) {
  return (
    <div className="f-hand" style={{
      display: 'inline-block', position: 'relative',
      padding: '14px 20px', margin: '24px 0',
      color: C.cream, fontSize: 'clamp(20px, 2.2vw, 26px)',
      transform: `rotate(${rotation}deg)`, lineHeight: 1.4,
      borderLeft: `3px solid ${C.accent}`, paddingLeft: 18,
      background: `${C.accent}08`,
    }}>
      <div className="f-mono" style={{
        fontSize: 9, color: C.accent, letterSpacing: 2,
        marginBottom: 4, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
      }}>· FIELD NOTE ·</div>
      {children}
    </div>
  );
}

/* ============ ChapterOutro · 新增 ============ */

function ChapterOutro({ summary, next, isLast }) {
  return (
    <div style={{ padding: '80px 0 120px', borderTop: `1px solid ${C.border}`, background: C.surface, position: 'relative' }}>
      <div className="container">
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 4, textAlign: 'center', marginBottom: 48 }}>
          — 这一章读完了 —
        </div>
        <div className="outro-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div>
            <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 3, marginBottom: 16 }}>· WHAT YOU LEARNED ·</div>
            <div className="f-display" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', color: C.cream, lineHeight: 1.1, marginBottom: 24 }}>
              你刚学到了
            </div>
            <div>
              {summary.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span className="f-mono" style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginTop: 2 }}>✓</span>
                  <span className="f-serif" style={{ fontSize: 15, color: C.cream, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {!isLast && next ? (
            <a href={`#${next.id}`} style={{
              display: 'block', padding: 'clamp(28px, 4vw, 40px)',
              background: C.bg, border: `1px solid ${C.border}`,
              color: 'inherit', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
            >
              <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16 }}>· WHAT'S NEXT ·</div>
              <div className="f-mono" style={{ fontSize: 11, color: C.mute, letterSpacing: 2, marginBottom: 8 }}>CHAPTER {next.num}</div>
              <div className="f-display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: C.cream, lineHeight: 0.9, marginBottom: 16 }}>{next.cn}</div>
              <div className="f-serif" style={{ fontSize: 15, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginBottom: 24 }}>
                {next.preview}
              </div>
              <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 2, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                继续读 <ArrowRight size={14} />
              </div>
            </a>
          ) : (
            <div style={{ padding: 'clamp(28px, 4vw, 40px)', background: C.bg, border: `1px solid ${C.accent}` }}>
              <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16 }}>· THE END ·</div>
              <div className="f-display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: C.cream, lineHeight: 0.9, marginBottom: 16 }}>
                你看完了
              </div>
              <div className="f-serif" style={{ fontSize: 15, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                如果有用，订阅 newsletter，每月一封山路推荐 + 季节提醒。<br/>
                有勘误或建议——文末留言或发邮件。
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ 拿牌（含日历）============ */

function LicenceSection() {
  return (
    <section id="licence">
      <ChapterIntro
        num="01" cn="拿牌" en="LICENCE" type="licence"
        italic="The Licence."
        lead={[
          "墨尔本拿摩托车 P 牌的两条路：完全新手 vs 海外驾照转换。",
          "中国大陆 / 港台 / 澳门 / 马来西亚等都属于非认可——必须 2-Day 课程 + 路考。",
          "但持有摩托驾照能跳过 3 个月 L 牌等待期，比从零快 2-3 个月。",
        ]}
      />

      {/* 日历移到这里：§ 1.1 */}
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="licence" />
      </div>

      <SectionLabel num="1.1">时间表 · TIMELINE</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <JourneyCalendar />
      </div>

      <SectionLabel num="1.2" source="VicRoads · 2026.04">两条路径对比 · TWO PATHS</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <PathComparison />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote>{fieldNotes.licence_1}</FieldNote>
      </div>

      <SectionLabel num="1.3">中国驾照持照年限 · INTERACTIVE</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 40px' }}>
        <YearSlider />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={1}>{fieldNotes.licence_3}</FieldNote>
      </div>

      <SectionLabel num="1.4" source="各驾校官网 · 2026.04">驾校对比 · DRIVING SCHOOLS</SectionLabel>
      <div className="container table-scroll" style={{ padding: '0 clamp(20px, 4vw, 64px) 24px' }}>
        <SchoolTable />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1.5}>{fieldNotes.licence_2}</FieldNote>
      </div>

      <SectionLabel num="1.5">关键提醒 · WATCH OUT</SectionLabel>
      <div className="container grid-3" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {[
          { num: "01", t: "中国驾照非认可", c: "VIC 不直接互认中国驾照——必须走 2-Day 转换课程，但能跳过 3 个月 L 牌等待期" },
          { num: "02", t: "持照年限决定结果", c: "中国摩托驾照 ≥3 年得 Full 牌（无 LAMS 限制），<3 年仍是 P 牌" },
          { num: "03", t: "L 牌期间挂 L 板", c: "前后都要挂，零酒精，不能载人——罚款 A$233+" },
        ].map((tip, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${C.accent}`, paddingLeft: 20 }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, marginBottom: 10 }}>NOTE {tip.num}</div>
            <div className="f-display" style={{ fontSize: 24, color: C.cream, lineHeight: 1.1, marginBottom: 12 }}>{tip.t}</div>
            <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>{tip.c}</div>
          </div>
        ))}
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="licence" />
      </div>

      <ChapterOutro
        summary={[
          "VIC 拿摩托牌有两条路径：完全新手 vs 海外驾照转换",
          "中国驾照可以走转换路径，跳过 3 个月 L 牌等待期",
          "持中国驾照 ≥3 年可拿 Full 牌（无 LAMS 限制）",
          "墨尔本主流驾校 4 家：HART、Stay Upright、Armstrongs、Ridetek",
        ]}
        next={{ id: "ride", num: "02", cn: "选车", preview: "11 台 LAMS 实测对比 + 4 题智能 quiz，给你 3 台量身推荐" }}
      />
    </section>
  );
}

/* ============ Journey Calendar · 重新设计 ============ */

function JourneyCalendar() {
  const [path, setPath] = useState("convert");

  // 重新设计：phases 概念，区分"主动"和"等待"
  const pathBPhases = [
    {
      label: "PHASE 01 · 准备", days: "Day 0 → 14", color: C.accent,
      steps: [
        { day: 0, t: "今天", d: "下定决心，开始准备材料" },
        { day: 3, t: "找 NAATI 翻译", d: "中国驾照中英对照翻译件" },
        { day: 7, t: "VicRoads 预约", d: "带护照、签证、驾照原件 + 翻译" },
        { day: 14, t: "VicRoads 验证", d: "工作人员核验、记录在案", milestone: true },
      ],
    },
    {
      label: "PHASE 02 · 课程 + 路考", days: "Day 21 → 32", color: C.accent,
      steps: [
        { day: 21, t: "预约 2-Day 课程", d: "HART / Stay Upright" },
        { day: 28, t: "Day 1 课程", d: "理论 + 场地基础" },
        { day: 29, t: "Day 2 + 路考", d: "通过即拿牌——关键日子", milestone: true, hot: true },
        { day: 32, t: "P 牌寄到", d: "卡片 5-7 个工作日寄到" },
      ],
    },
  ];

  const pathAPhases = [
    {
      label: "PHASE 01 · 准备 + 拿 L 牌", days: "Day 0 → 21", color: C.accent,
      steps: [
        { day: 0, t: "今天", d: "下定决心，开始准备" },
        { day: 7, t: "VicRoads 视力 + 理论", d: "32 题，免费" },
        { day: 14, t: "预约 2-Day 课程", d: "提前 2 周才能预约到" },
        { day: 21, t: "Day 1+2 课程 → L 牌", d: "拿到 L 牌——这是新手最大成就", milestone: true, hot: true },
      ],
    },
    {
      label: "PHASE 02 · 等待 + 练车", days: "Day 21 → 90", color: C.muteDeep,
      waiting: true,
      steps: [
        { day: 21, t: "L 牌挂车上", d: "前后都要挂，零酒精" },
        { day: 60, t: "练车两个月", d: "周末去停车场练 5 项核心动作" },
        { day: 90, t: "3 个月期满", d: "现在可以预约 Check Ride", milestone: true },
      ],
    },
    {
      label: "PHASE 03 · 路考 + 拿 P 牌", days: "Day 90 → 120", color: C.accent,
      steps: [
        { day: 105, t: "Check Ride 评估", d: "考前 1 个月内必做" },
        { day: 110, t: "Licence Test 路考", d: "通过即拿 P 牌", milestone: true, hot: true },
        { day: 120, t: "P 牌寄到", d: "正式上路（LAMS 限制 3 年）" },
      ],
    },
  ];

  const phases = path === "convert" ? pathBPhases : pathAPhases;
  const totalDays = path === "convert" ? 32 : 120;

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.borderStrong}`, padding: 'clamp(28px, 5vw, 60px)' }}>
      {/* Path toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 4, marginBottom: 12 }}>
            · 从今天到拿牌 ·
          </div>
          <div className="f-display" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.cream, lineHeight: 0.95 }}>
            具体哪一天能上路
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={() => setPath("convert")} className="f-mono" style={{
            padding: '12px 20px', background: path === "convert" ? C.accent : 'transparent',
            color: path === "convert" ? C.cream : C.creamMute,
            border: `1px solid ${path === "convert" ? C.accent : C.border}`,
            cursor: 'pointer', fontSize: 10, letterSpacing: 2, fontWeight: 700,
          }}>
            B · 海外转换 · 32 天
          </button>
          <button onClick={() => setPath("zero")} className="f-mono" style={{
            padding: '12px 20px', background: path === "zero" ? C.accent : 'transparent',
            color: path === "zero" ? C.cream : C.creamMute,
            border: `1px solid ${path === "zero" ? C.accent : C.border}`, borderLeft: 'none',
            cursor: 'pointer', fontSize: 10, letterSpacing: 2, fontWeight: 700,
          }}>
            A · 完全新手 · 120 天
          </button>
        </div>
      </div>

      {/* Big number */}
      <div style={{ marginBottom: 60, paddingBottom: 40, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
          <div className="f-display" style={{ fontSize: 'clamp(80px, 14vw, 200px)', color: C.accent, lineHeight: 0.85, letterSpacing: '-0.03em' }}>
            {totalDays}
          </div>
          <div>
            <div className="f-display" style={{ fontSize: 'clamp(28px, 3vw, 36px)', color: C.cream, lineHeight: 1 }}>DAYS</div>
            <div className="f-serif" style={{ fontSize: 16, color: C.creamMute, fontStyle: 'italic', marginTop: 6, fontWeight: 300 }}>
              ≈ {Math.ceil(totalDays / 7)} 周 / {totalDays >= 30 ? `${Math.round(totalDays / 30 * 10) / 10} 个月` : `${totalDays} 天`}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200, textAlign: 'right' }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2 }}>总成本</div>
            <div className="f-display" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', color: C.cream, lineHeight: 1, marginTop: 4 }}>
              {path === "convert" ? "A$700–900" : "A$1,000–1,400"}
            </div>
          </div>
        </div>
      </div>

      {/* Phases timeline */}
      <div style={{ position: 'relative' }}>
        {phases.map((phase, pi) => (
          <div key={pi} style={{ marginBottom: pi < phases.length - 1 ? 48 : 0, position: 'relative' }}>
            {/* Phase header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
              <div className="f-mono" style={{ fontSize: 11, color: phase.waiting ? C.mute : C.accent, letterSpacing: 3, fontWeight: 700 }}>
                {phase.label}
              </div>
              <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2 }}>
                {phase.days}
              </div>
            </div>

            {/* Steps */}
            <div style={{
              position: 'relative', paddingLeft: 32,
              borderLeft: phase.waiting ? `2px dashed ${C.muteDeep}` : `2px solid ${C.accent}`,
            }}>
              {phase.waiting && (
                <div className="f-hand" style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translate(-100%, -50%) rotate(-90deg)',
                  fontSize: 18, color: C.mute, letterSpacing: 2, whiteSpace: 'nowrap',
                  transformOrigin: 'right center',
                }}>
                  · 等待 ·
                </div>
              )}
              {phase.steps.map((step, si) => (
                <div key={si} style={{
                  display: 'flex', gap: 24, paddingBottom: si < phase.steps.length - 1 ? 24 : 0,
                  position: 'relative', alignItems: 'flex-start',
                }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: -41, top: 6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: step.hot ? C.accent : step.milestone ? C.cream : C.bg,
                    border: `2px solid ${step.hot ? C.accent : step.milestone ? C.cream : phase.waiting ? C.muteDeep : C.accent}`,
                    boxShadow: step.hot ? `0 0 16px ${C.accent}` : 'none',
                    zIndex: 2,
                  }}>
                    {step.hot && <Star size={10} color={C.cream} fill={C.cream} style={{ position: 'absolute', top: 2, left: 2 }} />}
                  </div>

                  {/* Day label */}
                  <div style={{ width: 70, flexShrink: 0 }}>
                    <div className="f-mono" style={{ fontSize: 10, color: phase.waiting ? C.mute : C.creamMute, letterSpacing: 1 }}>
                      DAY {step.day}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div className="f-display" style={{
                      fontSize: 'clamp(18px, 2vw, 22px)', color: step.hot ? C.accent : C.cream, lineHeight: 1,
                    }}>{step.t}</div>
                    <div className="f-serif" style={{
                      fontSize: 14, color: C.creamMute, fontStyle: 'italic', marginTop: 4,
                      fontWeight: 300, lineHeight: 1.5,
                    }}>{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PathComparison() {
  const rows = [
    { criteria: "适合人群", zero: "完全没骑过摩托", convert: "持非认可国驾照（陆/港/台/澳门等）", emphasize: "convert" },
    { criteria: "总耗时", zero: "4 个月起步", convert: "1-2 周", emphasize: "convert" },
    { criteria: "总成本", zero: "A$1,000–1,400", convert: "A$700–900", emphasize: "convert" },
    { criteria: "L 牌等待期", zero: "必须 3 个月", convert: "无（Day 2 直接路考）", emphasize: "convert" },
    { criteria: "Check Ride", zero: "强制（路考前 1 个月内）", convert: "推荐但非强制" },
    { criteria: "拿到的牌", zero: "P 牌 → LAMS 限制 3 年", convert: "持照 ≥3 年得 Full 牌（无限制）", emphasize: "convert" },
    { criteria: "驾照翻译", zero: "—", convert: "需 NAATI 认证（香港驾照本身有英文除外）" },
  ];

  return (
    <div className="table-scroll">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', border: `1px solid ${C.borderStrong}`, minWidth: 720 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.borderStrong}`, borderRight: `1px solid ${C.border}` }}>
          <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>CRITERIA</div>
        </div>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.borderStrong}`, borderRight: `1px solid ${C.border}` }}>
          <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>PATH A</div>
          <div className="f-display" style={{ fontSize: 28, color: C.cream, marginTop: 4, lineHeight: 1 }}>完全新手</div>
        </div>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.borderStrong}`, background: `${C.accent}08` }}>
          <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2 }}>PATH B · 推荐</div>
          <div className="f-display" style={{ fontSize: 28, color: C.accent, marginTop: 4, lineHeight: 1 }}>海外驾照转换</div>
        </div>

        {rows.map((row, i) => (
          <>
            <div key={`c-${i}`} style={{ padding: '18px 24px', borderRight: `1px solid ${C.border}`, borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontSize: 13, color: C.creamMute }}>{row.criteria}</div>
            </div>
            <div key={`a-${i}`} style={{ padding: '18px 24px', borderRight: `1px solid ${C.border}`, borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontSize: 13, color: C.cream }}>{row.zero}</div>
            </div>
            <div key={`b-${i}`} style={{ padding: '18px 24px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: row.emphasize === "convert" ? `${C.accent}08` : 'transparent' }}>
              <div style={{ fontSize: 13, color: row.emphasize === "convert" ? C.accent : C.cream, fontWeight: row.emphasize === "convert" ? 600 : 400 }}>
                {row.convert}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

function YearSlider() {
  const [years, setYears] = useState(2);
  const isFullEligible = years >= 3;

  return (
    <div style={{ padding: 'clamp(28px, 4vw, 48px)', background: C.surface, border: `1px solid ${C.border}` }}>
      <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 20 }}>
        · 拖动滑块 · 看你的结果 ·
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <span className="f-display" style={{ fontSize: 'clamp(56px, 8vw, 96px)', color: isFullEligible ? C.accent : C.cream, lineHeight: 0.9 }}>{years}</span>
        <span className="f-mono" style={{ fontSize: 14, color: C.mute, letterSpacing: 2 }}>YEARS · 年</span>
      </div>
      <input type="range" min="0" max="10" value={years} onChange={e => setYears(Number(e.target.value))}
        style={{ width: '100%', height: 4, marginBottom: 12, accentColor: C.accent, cursor: 'pointer' }} />
      <div className="f-mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 32 }}>
        <span>0</span><span>3 (临界)</span><span>10+</span>
      </div>
      <div style={{
        padding: 'clamp(20px, 3vw, 32px)',
        background: isFullEligible ? `${C.accent}15` : C.bg,
        border: `1px solid ${isFullEligible ? C.accent : C.border}`, transition: 'all 0.3s',
      }}>
        <div className="f-mono" style={{ fontSize: 10, color: isFullEligible ? C.accent : C.mute, letterSpacing: 3, marginBottom: 12 }}>
          → 你能拿到的 VIC 牌照
        </div>
        <div className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: isFullEligible ? C.accent : C.cream, lineHeight: 1 }}>
          {isFullEligible ? "FULL 牌" : "P 牌 + LAMS"}
        </div>
        <div className="f-serif" style={{ fontSize: 16, fontStyle: 'italic', color: C.creamMute, marginTop: 12, lineHeight: 1.6, fontWeight: 300 }}>
          {isFullEligible ? "无 LAMS 限制，可骑任何排量。但建议第一年仍按新手心态骑车。" : "前 3 年只能骑 LAMS 车（≤660cc）。3 年后可升级 Full 牌。"}
        </div>
      </div>
    </div>
  );
}

function SchoolTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
          {["驾校", "类型", "校区", "2-Day 价格", "备注"].map((h, i) => (
            <th key={i} className="f-mono" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schools.map((s, i) => (
          <tr key={i} className="hover-row" style={{ borderBottom: i < schools.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <td style={{ padding: '20px' }}>
              <div className="f-display" style={{ fontSize: 22, color: C.cream, lineHeight: 1 }}>{s.name}</div>
              <div className="f-mono" style={{ fontSize: 9, color: C.mute, marginTop: 4, letterSpacing: 1 }}>{s.brand !== "—" ? s.brand : ""}</div>
            </td>
            <td style={{ padding: '20px', fontSize: 13, color: C.creamMute }}>{s.type}</td>
            <td style={{ padding: '20px' }}>
              {s.spots.map(spot => <div key={spot} className="f-mono" style={{ fontSize: 11, color: C.cream, marginBottom: 2 }}>{spot}</div>)}
            </td>
            <td style={{ padding: '20px' }}><span className="f-display" style={{ fontSize: 22, color: C.accent }}>A${s.price2day}</span></td>
            <td style={{ padding: '20px', fontSize: 12, color: C.creamMute, fontStyle: 'italic' }} className="f-serif">{s.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ============ 选车（Quiz 加 4 维）============ */

function RideSection() {
  const [budget, setBudget] = useState("any");
  const [power, setPower] = useState("any");
  const [type, setType] = useState("any");
  const [sortKey, setSortKey] = useState("beginnerScore");
  const [sortDir, setSortDir] = useState("desc");

  const filtered = useMemo(() => {
    let arr = bikes.filter(b => {
      if (budget !== "any" && b.budget !== budget) return false;
      if (power !== "any" && b.power !== power) return false;
      if (type !== "any" && b.type !== type) return false;
      return true;
    });
    arr.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [budget, power, type, sortKey, sortDir]);

  const setSort = (k) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  return (
    <section id="ride">
      <ChapterIntro
        num="02" cn="选车" en="RIDE" type="ride"
        italic="The First Bike."
        lead={[
          "P 牌前 3 年只能骑 LAMS（≤660cc 且功率/重量 <150kW/吨）。",
          "别想着先买大的——违法。",
          "下面是墨尔本主流的 11 台 LAMS，按新手友好度排序。",
        ]}
      />

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="ride" />
      </div>

      <SectionLabel num="2.1">4 题给你 3 台推荐 · QUIZ</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <BikeQuiz />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote>{fieldNotes.ride_1}</FieldNote>
      </div>

      <SectionLabel num="2.2">筛选 · FILTER</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <FilterGroup label="预算" value={budget} setValue={setBudget} options={[
          { v: "any", l: "All" }, { v: "<8k", l: "<$8K" }, { v: "8-12k", l: "$8-12K" },
        ]} />
        <FilterGroup label="动力" value={power} setValue={setPower} options={[
          { v: "any", l: "All" }, { v: "温和", l: "Easy" }, { v: "适中", l: "Mid" }, { v: "进阶", l: "Strong" }, { v: "激进", l: "Aggro" },
        ]} />
        <FilterGroup label="类型" value={type} setValue={setType} options={[
          { v: "any", l: "All" }, { v: "街车", l: "Naked" }, { v: "仿赛", l: "Sport" }, { v: "复古", l: "Retro" },
        ]} />
      </div>

      <SectionLabel num="2.3" source="编辑实测 + Bikesales 2026.04">完整对比表 · FULL TABLE</SectionLabel>

      <div className="container table-scroll" style={{ padding: '0 clamp(20px, 4vw, 64px) 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
              {[
                { k: "model", l: "型号" }, { k: "type", l: "类型" }, { k: "price", l: "价格 K" },
                { k: "displ", l: "排量 cc" }, { k: "hp", l: "马力" }, { k: "weight", l: "重量 kg" },
                { k: "seat", l: "座高 mm" }, { k: "fuel", l: "油耗 km/L" }, { k: "beginnerScore", l: "新手分" },
              ].map((h) => (
                <th key={h.k} onClick={() => setSort(h.k)} className="f-mono" style={{
                  padding: '16px 16px', textAlign: 'left', fontSize: 9,
                  color: sortKey === h.k ? C.accent : C.mute, letterSpacing: 2, fontWeight: 700,
                  cursor: 'pointer', userSelect: 'none',
                }}>
                  {h.l}{sortKey === h.k && (sortDir === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={i} className="hover-row" style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <td style={{ padding: '18px 16px' }}>
                  <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1 }}>{b.brand}</div>
                  <div className="f-display" style={{ fontSize: 18, color: C.cream, lineHeight: 1, marginTop: 2 }}>{b.model}</div>
                  {b.pick && <div className="f-serif" style={{ fontSize: 11, color: C.accent, fontStyle: 'italic', marginTop: 4 }}>"{b.pick}"</div>}
                </td>
                <td style={{ padding: '18px 16px', fontSize: 12, color: C.creamMute }}>{b.type}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 14, color: C.accent, fontWeight: 700 }}>A${b.price}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 13, color: C.cream }}>{b.displ}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 13, color: C.cream }}>{b.hp}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 13, color: C.cream }}>{b.weight}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 13, color: C.cream }}>{b.seat}</td>
                <td className="f-mono" style={{ padding: '18px 16px', fontSize: 13, color: C.cream }}>{b.fuel}</td>
                <td style={{ padding: '18px 16px' }}><BeginnerBar score={b.beginnerScore} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={1.5}>{fieldNotes.ride_2}</FieldNote>
      </div>

      <SectionLabel num="2.4">编辑精选 · EDITOR'S PICKS</SectionLabel>
      <div className="container grid-3" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {bikes.filter(b => b.pick).slice(0, 3).map((b, i) => <BikePosterCard key={i} bike={b} />)}
      </div>

      <SectionLabel num="2.5" source="Whirlpool · Netrider · Procycles 实测">老司机的话 · STREET WISDOM</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <BikeReviewCards />
      </div>

      <SectionLabel num="2.6" source="VicRoads · LAMS 规则 + Netrider">改装与 LAMS · 黄金法则</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <ModWarning />
      </div>

      <SectionLabel num="2.7" source="Bikesales 2026.04 · 各品牌经销商 · 估算">完整目录 · COMPLETE CATALOG</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <BikeCatalog />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="ride" />
      </div>

      <ChapterOutro
        summary={[
          "LAMS 限制：≤660cc 且功率/重量 <150kW/吨",
          "11 台主流 LAMS 完整对比，新手分 9.5 是 CB300R",
          "改装提升动力 = LAMS 失效 + 保险作废",
          "新手第一台建议买二手——3 年后必换车",
        ]}
        next={{ id: "gear", num: "03", cn: "装备", preview: "AS/NZS 1698 认证 + 头型识别 + 5 件套本地 vs 淘宝" }}
      />
    </section>
  );
}

function BikeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // 加了第 4 题：用途
  const questions = [
    { key: "height", q: "你的身高？", opts: [
      { v: "S", l: "<170 cm" }, { v: "M", l: "170-180" }, { v: "L", l: "180-190" }, { v: "XL", l: ">190" }
    ]},
    { key: "budget", q: "预算？", opts: [{ v: "<8k", l: "$8K 以下" }, { v: "8-12k", l: "$8-12K" }] },
    { key: "use", q: "主要用途？", opts: [
      { v: "commute", l: "通勤为主" }, { v: "mountain", l: "周末跑山" }, { v: "both", l: "都要" }
    ]},
    { key: "style", q: "风格偏好？", opts: [
      { v: "街车", l: "通勤街车" }, { v: "仿赛", l: "仿赛运动" }, { v: "复古", l: "复古文艺" }, { v: "any", l: "都可以" }
    ]},
  ];

  const result = useMemo(() => {
    if (step < questions.length) return null;

    try {
      const profile = JSON.parse(localStorage.getItem('rt_user_profile') || '{}');
      localStorage.setItem('rt_user_profile', JSON.stringify({ ...profile, ...answers, quizDone: true }));
    } catch (e) {}

    let scored = bikes.map(b => {
      let score = b.beginnerScore;
      if (answers.height && !b.height.includes(answers.height)) score -= 3;
      if (answers.budget && b.budget !== answers.budget) score -= 2;
      if (answers.style && answers.style !== "any" && b.type !== answers.style) score -= 1.5;

      // 用途加权——这是新增的关键维度
      if (answers.use === "commute") score += (b.commute - 5) * 0.5;
      else if (answers.use === "mountain") score += (b.mountain - 5) * 0.5;
      else if (answers.use === "both") score += ((b.commute + b.mountain) / 2 - 5) * 0.4;

      return { ...b, _s: score };
    });
    return scored.sort((a, b) => b._s - a._s).slice(0, 3);
  }, [step, answers]);

  const reset = () => { setStep(0); setAnswers({}); };

  if (result) {
    const useLabel = answers.use === "commute" ? "通勤" : answers.use === "mountain" ? "跑山" : "通勤+跑山";
    return (
      <div style={{ padding: 'clamp(28px, 4vw, 48px)', background: C.surface, border: `1px solid ${C.border}` }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16 }}>· YOUR 3 MATCHES ·</div>
        <div className="f-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: C.cream, marginBottom: 32, lineHeight: 1.05 }}>
          基于你的回答<br/>
          <span style={{ color: C.accent }}>这三台最合适</span>
        </div>
        <div className="grid-3">
          {result.map((b, i) => (
            <div key={i} style={{ padding: 24, background: C.bg, border: `1px solid ${i === 0 ? C.accent : C.border}` }}>
              <div className="f-mono" style={{ fontSize: 9, color: i === 0 ? C.accent : C.mute, letterSpacing: 3, marginBottom: 6 }}>
                #{i + 1} · {i === 0 ? "BEST MATCH" : "ALSO CONSIDER"}
              </div>
              <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 1 }}>{b.brand}</div>
              <div className="f-display" style={{ fontSize: 28, color: C.cream, lineHeight: 1, marginTop: 4 }}>{b.model}</div>
              <div className="f-display" style={{ fontSize: 22, color: C.accent, marginTop: 16 }}>A${b.price}K</div>
              <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, marginTop: 12, letterSpacing: 1 }}>
                {b.displ}cc · {b.hp}HP · {b.weight}kg · 座 {b.seat}mm
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: 'flex', gap: 12 }}>
                <span className="f-mono" style={{ fontSize: 10, color: C.creamMute }}>通勤 <span style={{ color: C.cream, fontWeight: 700 }}>{b.commute}</span></span>
                <span className="f-mono" style={{ fontSize: 10, color: C.creamMute }}>跑山 <span style={{ color: C.cream, fontWeight: 700 }}>{b.mountain}</span></span>
              </div>
              {b.pick && <div className="f-serif" style={{ fontSize: 12, color: C.accent, fontStyle: 'italic', marginTop: 12 }}>"{b.pick}"</div>}
            </div>
          ))}
        </div>
        <div className="f-hand" style={{ marginTop: 24, fontSize: 22, color: C.accent }}>
          ↗ 选完看 § 2.3 完整对比表
        </div>
        <button onClick={reset} className="f-mono" style={{
          marginTop: 16, padding: '10px 16px', background: 'transparent',
          border: `1px solid ${C.border}`, color: C.creamMute,
          fontSize: 10, letterSpacing: 2, cursor: 'pointer',
        }}>↻ 重新测试</button>
      </div>
    );
  }

  const cur = questions[step];

  return (
    <div style={{ padding: 'clamp(28px, 4vw, 48px)', background: C.surface, border: `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3 }}>
          · QUESTION {step + 1} / {questions.length} ·
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {questions.map((_, i) => <div key={i} style={{ width: 32, height: 3, background: i <= step ? C.accent : C.border }} />)}
        </div>
      </div>

      <div className="f-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: C.cream, lineHeight: 1, marginBottom: 32 }}>
        {cur.q}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {cur.opts.map(opt => (
          <button key={opt.v} onClick={() => {
            setAnswers(a => ({ ...a, [cur.key]: opt.v }));
            setStep(step + 1);
          }} style={{
            padding: '14px 24px', background: 'transparent',
            border: `1px solid ${C.border}`, color: C.cream, fontSize: 14,
            cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.target.style.background = C.accent; e.target.style.borderColor = C.accent; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = C.border; }}
          >{opt.l}</button>
        ))}
      </div>

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="f-mono" style={{
          marginTop: 24, background: 'transparent', border: 'none',
          color: C.mute, fontSize: 10, letterSpacing: 2, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <ArrowLeft size={12} /> 上一题
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, value, setValue, options }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button key={opt.v} onClick={() => setValue(opt.v)} className="f-mono" style={{
            padding: '7px 14px', fontSize: 10, letterSpacing: 1, fontWeight: 700,
            background: value === opt.v ? C.cream : 'transparent',
            color: value === opt.v ? C.bg : C.creamMute,
            border: `1px solid ${value === opt.v ? C.cream : C.border}`,
            cursor: 'pointer',
          }}>{opt.l}</button>
        ))}
      </div>
    </div>
  );
}

function BeginnerBar({ score }) {
  const filled = Math.round(score);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ width: 5, height: 14, background: i < filled ? (score >= 8.5 ? C.accent : score >= 7.5 ? C.cream : C.creamMute) : C.muteDeep }} />
        ))}
      </div>
      <span className="f-mono" style={{ fontSize: 11, color: C.cream, fontWeight: 700 }}>{score}</span>
    </div>
  );
}

function BikePosterCard({ bike }) {
  return (
    <div style={{
      padding: 32, border: `1px solid ${C.border}`, background: C.surface,
      minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div>
        <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 3, marginBottom: 6 }}>EDITOR'S PICK</div>
        <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2 }}>{bike.brand}</div>
        <div className="f-display" style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: C.cream, lineHeight: 0.9, marginTop: 6 }}>{bike.model}</div>
        <div className="f-serif" style={{ fontSize: 16, fontStyle: 'italic', color: C.accent, marginTop: 14 }}>"{bike.pick}"</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>FROM</div>
          <div className="f-display" style={{ fontSize: 36, color: C.cream, lineHeight: 1 }}>A${bike.price}K</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.creamMute }}>{bike.displ}cc · {bike.hp}HP</div>
          <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, marginTop: 2 }}>{bike.weight}kg · 座 {bike.seat}</div>
        </div>
      </div>
    </div>
  );
}

/* ============ 装备 ============ */

function GearSection() {
  return (
    <section id="gear">
      <ChapterIntro
        num="03" cn="装备" en="GEAR" type="gear"
        italic="The Armor."
        lead={[
          "ATGATT — All The Gear, All The Time.",
          "头盔在本地买（认证 + 试戴），其他可淘宝砍一半价。",
          "这是墨尔本华人骑士最聪明的双线策略。",
        ]}
      />

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <div style={{
          padding: 'clamp(20px, 3vw, 32px)', border: `1px solid ${C.accent}`,
          background: `${C.accent}10`, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
        }}>
          <AlertTriangle size={28} color={C.accent} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>· AUSTRALIAN LAW ·</div>
            <div className="f-serif" style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: C.cream, fontStyle: 'italic', lineHeight: 1.5 }}>
              澳洲法律要求头盔必须有 <span style={{ color: C.accent, fontWeight: 600 }}>AS/NZS 1698</span> 认证。
              淘宝多数头盔只有 ECE 或 3C，戴上路违法。<span style={{ color: C.accent }}>第一顶头盔一定本地买。</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="gear" />
      </div>

      <SectionLabel num="3.1" source="VicRoads · Australian Standards">头盔认证对比 · CERTIFICATIONS</SectionLabel>
      <div className="container table-scroll" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <CertTable />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote>{fieldNotes.gear_1}</FieldNote>
      </div>

      <SectionLabel num="3.2" source="Lid Picker · Revv Rider · 各品牌实测">头型识别 + 头盔匹配 · HEAD SHAPE</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <HeadShapeGuide />
      </div>

      <SectionLabel num="3.3">五件套 · 本地 vs 淘宝</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {gear.map((g, i) => <GearRow key={i} gear={g} idx={i} />)}
      </div>

      <SectionLabel num="3.4" source="知乎 · 摩托车二手网 · 汽车之家论坛实测">品牌按地域对比 · BRANDS BY REGION</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <BrandsByRegion />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 60 }}>
        <FieldNote>{fieldNotes.gear_2}</FieldNote>
        <FieldNote>{fieldNotes.gear_3}</FieldNote>
      </div>

      <SectionLabel num="3.5">预算方案 · BUDGETS</SectionLabel>
      <div className="container grid-3" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {[
          { tier: "ENTRY", cn: "入门混搭", aud: 600, items: ["本地头盔 A$300", "淘宝其他 ¥1500"], note: "最低预算上路", color: C.creamMute },
          { tier: "MID", cn: "本地中端", aud: 1500, items: ["全套本地", "中端品牌混搭"], note: "性价比平衡", color: C.cream, primary: true },
          { tier: "PREMIUM", cn: "全本地高端", aud: 3500, items: ["顶级头盔", "Dainese / Alpinestars"], note: "认真对待安全", color: C.accent },
        ].map((b, i) => (
          <div key={i} style={{ padding: 32, border: `1px solid ${b.primary ? C.cream : C.border}`, background: b.primary ? C.surface : 'transparent' }}>
            <div className="f-mono" style={{ fontSize: 10, color: b.color, letterSpacing: 3, fontWeight: 700 }}>{b.tier}</div>
            <div className="f-display" style={{ fontSize: 28, color: C.cream, marginTop: 8, lineHeight: 1 }}>{b.cn}</div>
            <div className="f-display" style={{ fontSize: 'clamp(48px, 6vw, 64px)', color: b.color, marginTop: 16, lineHeight: 1 }}>A${b.aud}</div>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              {b.items.map((item, j) => <div key={j} className="f-mono" style={{ fontSize: 11, color: C.creamMute, marginBottom: 6, letterSpacing: 1 }}>· {item}</div>)}
              <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', marginTop: 16 }}>{b.note}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel num="3.6" source="淘宝官方集运 · Wise · 知乎实测 · 澳洲海关">淘宝海运红绿灯 · WHAT TO SHIP</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <TaobaoShipping />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="gear" />
      </div>

      <ChapterOutro
        summary={[
          "头盔必须有 AS/NZS 1698 认证才能合法上路",
          "买头盔前先识别自己头型——80% 是 intermediate oval",
          "本地买头盔，其他装备可以淘宝省 50-70%",
          "全套预算从 A$600（混搭）到 A$3,500（高端）",
        ]}
        next={{ id: "practice", num: "04", cn: "修行", preview: "5 项核心练习——拿牌不等于会骑，真功夫从练车场开始" }}
      />
    </section>
  );
}

function CertTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
          {["认证", "地区", "澳洲合法", "等级", "备注"].map((h, i) => (
            <th key={i} className="f-mono" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {certifications.map((c, i) => (
          <tr key={i} className="hover-row" style={{ borderBottom: i < certifications.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <td style={{ padding: '18px 20px' }} className="f-mono"><span style={{ fontSize: 13, color: c.legal ? C.accent : C.cream, fontWeight: 700 }}>{c.name}</span></td>
            <td style={{ padding: '18px 20px', fontSize: 13, color: C.creamMute }}>{c.region}</td>
            <td style={{ padding: '18px 20px' }}>
              {c.legal ? <span className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1, fontWeight: 700 }}>✓ 合法</span> : <span className="f-mono" style={{ fontSize: 11, color: C.mute, letterSpacing: 1 }}>✗ 不合法</span>}
            </td>
            <td style={{ padding: '18px 20px', fontSize: 13, color: C.cream, letterSpacing: 1 }}>{c.level}</td>
            <td style={{ padding: '18px 20px', fontSize: 12, color: C.creamMute, fontStyle: 'italic' }} className="f-serif">{c.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GearRow({ gear, idx }) {
  return (
    <div style={{ paddingTop: idx === 0 ? 0 : 32, paddingBottom: 32, borderTop: idx === 0 ? 'none' : `1px solid ${C.border}` }}>
      <div className="gear-grid">
        <div>
          <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2 }}>0{idx + 1}</div>
          <div className="f-display" style={{ fontSize: 36, color: C.cream, lineHeight: 1, marginTop: 4 }}>{gear.cn}</div>
          <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, letterSpacing: 2, marginTop: 4 }}>{gear.en}</div>
          {gear.critical && (
            <div className="f-mono" style={{ display: 'inline-block', marginTop: 12, padding: '3px 8px', fontSize: 9, color: C.accent, letterSpacing: 2, fontWeight: 700, border: `1px solid ${C.accent}` }}>· 必备 ·</div>
          )}
          {gear.note && <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', marginTop: 12, lineHeight: 1.5 }}>{gear.note}</div>}
        </div>

        <div className="grid-2">
          <div style={{ padding: 20, border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <span className="f-mono" style={{ fontSize: 10, color: C.cream, letterSpacing: 2, fontWeight: 700 }}>· LOCAL ·</span>
              {gear.local.where && <span className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1 }}>{gear.local.where}</span>}
            </div>
            {gear.local.entry && <GearTier label="入门" value={gear.local.entry} />}
            {gear.local.mid && <GearTier label="进阶" value={gear.local.mid} />}
            {gear.local.high && <GearTier label="高端" value={gear.local.high} />}
          </div>

          <div style={{ padding: 20, border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <span className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, fontWeight: 700 }}>· TAOBAO ·</span>
              <span className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1 }}>淘宝 / 1688</span>
            </div>
            {gear.taobao.entry && <GearTier label="入门" value={gear.taobao.entry} />}
            {gear.taobao.mid && <GearTier label="进阶" value={gear.taobao.mid} />}
            {gear.taobao.high && <GearTier label="高端" value={gear.taobao.high} />}
            {gear.taobao.warning && (
              <div className="f-serif" style={{ fontSize: 11, color: C.accent, fontStyle: 'italic', marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>⚠ {gear.taobao.warning}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GearTier({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px dashed ${C.border}`, gap: 12 }}>
      <span className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, flexShrink: 0 }}>{label.toUpperCase()}</span>
      <span style={{ fontSize: 12, color: C.cream, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

/* ============ 修行 ============ */

function PracticeSection() {
  return (
    <section id="practice">
      <ChapterIntro
        num="04" cn="修行" en="PRACTICE" type="practice"
        italic="The Craft."
        lead={[
          "拿牌不等于会骑——驾校只教过考试的招式。",
          "真功夫从练车场开始。",
          "5 项核心练习按这个顺序练，第一次跑山前你会变成另一个人。",
        ]}
      />

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="practice" />
      </div>

      <SectionLabel num="4.1">五项核心练习 · CORE DRILLS</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        {drills.map((d) => (
          <div key={d.num} style={{ padding: '32px 0', borderTop: `1px solid ${C.border}` }}>
            <div className="drill-grid">
              <div className="f-display" style={{ fontSize: 'clamp(48px, 5vw, 64px)', color: C.muteDeep, lineHeight: 0.9 }}>{d.num}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span className="f-display" style={{ fontSize: 'clamp(28px, 3vw, 36px)', color: C.cream, lineHeight: 1 }}>{d.title}</span>
                  <span className="f-serif" style={{ fontSize: 18, fontStyle: 'italic', color: C.creamMute, fontWeight: 300 }}>{d.en}</span>
                </div>
                <div className="f-serif" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', color: C.creamMute, fontStyle: 'italic', marginTop: 12, lineHeight: 1.6, fontWeight: 300 }}>{d.desc}</div>
              </div>
              <div className="f-mono" style={{ fontSize: 11, color: C.cream, letterSpacing: 2 }}>
                难度 {d.level}<br/>
                <span style={{ color: C.mute, fontSize: 10 }}>{d.time}</span>
              </div>
              <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, textAlign: 'right' }}>SESSION {d.num}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel num="4.2">练习场地 · WHERE</SectionLabel>
      <div className="container grid-3" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {[
          { t: "空旷停车场", c: "Bunnings · Costco · IKEA", d: "周日早 8 点前最佳——管理松，但别扰民" },
          { t: "工业区周末", c: "Dandenong · Campbellfield", d: "周末几乎无车，路况好，最佳练习场" },
          { t: "驾校开放日", c: "HART · Stay Upright", d: "偶尔开放，需要预约付费——但有教练指导" },
        ].map((p, i) => (
          <div key={i} style={{ padding: 28, border: `1px solid ${C.border}` }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2 }}>0{i + 1}</div>
            <div className="f-display" style={{ fontSize: 28, color: C.cream, marginTop: 8, lineHeight: 1 }}>{p.t}</div>
            <div className="f-mono" style={{ fontSize: 11, color: C.creamMute, letterSpacing: 1, marginTop: 12 }}>{p.c}</div>
            <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', marginTop: 16, lineHeight: 1.6, fontWeight: 300 }}>{p.d}</div>
          </div>
        ))}
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1.5}>{fieldNotes.practice_1}</FieldNote>
      </div>

      {/* § 4.3 第一年路线图 */}
      <SectionLabel num="4.3" source="MSF · Stay Upright · 真实骑手经验">第一年路线图 · THE FIRST YEAR</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 40 }}>
          拿到牌不是终点——是真正学骑车的<span style={{ color: C.accent }}>第一天</span>。
          <br/>这张表给你 12 个月的边界——什么时候该做什么、不该碰什么。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {yearRoadmap.map((m, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 200px) 1fr',
              gap: 'clamp(20px, 3vw, 40px)',
              padding: 'clamp(28px, 3vw, 40px) 0',
              borderTop: `1px solid ${C.border}`,
              borderBottom: i === yearRoadmap.length - 1 ? `1px solid ${C.border}` : 'none',
            }}>
              <div>
                <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>
                  {m.en}
                </div>
                <div className="f-display" style={{ fontSize: 'clamp(28px, 3vw, 36px)', color: C.cream, lineHeight: 1, marginBottom: 6 }}>
                  {m.period}
                </div>
                <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.4 }}>
                  {m.italic}
                </div>
              </div>

              <div>
                <div className="f-display" style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: C.cream, lineHeight: 1.2, marginBottom: 16 }}>
                  {m.title}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', marginBottom: 20 }}>
                  {m.rules.map((r, j) => (
                    <li key={j} className="f-serif" style={{
                      fontSize: 'clamp(14px, 1.4vw, 16px)',
                      color: C.cream,
                      lineHeight: 1.7,
                      paddingLeft: 24,
                      position: 'relative',
                      fontWeight: 300,
                      marginBottom: 6,
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: C.accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>—</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <div style={{ paddingTop: 16, borderTop: `1px dashed ${C.border}` }}>
                  <span className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, fontWeight: 700 }}>· FOCUS · </span>
                  <span className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6 }}>
                    {m.focus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* § 4.4 团骑礼仪 */}
      <SectionLabel num="4.4" source="MSF Group Riding · Australian biker community">团骑礼仪 · GROUP ETIQUETTE</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 40 }}>
          团骑不是社交活动——是<span style={{ color: C.accent }}>多人共用一片路面</span>。
          <br/>规则不懂，5 个人变 5 个炸弹。
        </p>

        {/* 队形说明 */}
        <div style={{ marginBottom: 48 }}>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
            01 · 队形 / FORMATION
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ padding: 28, border: `1px solid ${C.border}`, background: C.surface }}>
              <div className="f-display" style={{ fontSize: 22, color: C.cream, marginBottom: 8, lineHeight: 1.1 }}>Staggered（错开）</div>
              <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 14 }}>默认队形</div>
              <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                Leader 走车道左边，第二个走右边，第三个又左——锯齿形。每人前方 2 秒（直对），斜对角 1 秒。视野最佳、刹车空间足。
              </div>
            </div>
            <div style={{ padding: 28, border: `1px solid ${C.border}`, background: C.surface }}>
              <div className="f-display" style={{ fontSize: 22, color: C.cream, marginBottom: 8, lineHeight: 1.1 }}>Single File（单列）</div>
              <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 14 }}>弯道 / 窄路 / 雨天</div>
              <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                进山弯道前 leader 会做手势（食指竖起）改单列。每人前方 2 秒不变，但每人走自己最舒服的弯线。
              </div>
            </div>
          </div>
        </div>

        {/* 手势表 */}
        <div style={{ marginBottom: 48 }}>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
            02 · 手势 / SIGNALS
          </div>
          <div className="table-scroll">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>动作</th>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>含义</th>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>EN</th>
                </tr>
              </thead>
              <tbody>
                {groupSignals.map((s, i) => (
                  <tr key={i} className="hover-row" style={{ borderBottom: i < groupSignals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <td className="f-serif" style={{ padding: '16px 12px', fontSize: 14, color: C.cream, lineHeight: 1.4, fontWeight: 300, fontStyle: 'italic' }}>{s.hand}</td>
                    <td className="f-display" style={{ padding: '16px 12px', fontSize: 16, color: C.cream }}>{s.meaning}</td>
                    <td className="f-mono" style={{ padding: '16px 12px', fontSize: 10, color: C.accent, letterSpacing: 2 }}>{s.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="f-serif" style={{ fontSize: 12, color: C.mute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginTop: 16 }}>
            手势要<span style={{ color: C.accent }}>逐人传递</span>——leader 做了，第二个跟着做，传到 sweep（殿后人）。让最后一个也看到。
          </p>
        </div>

        {/* 华人新手坑 */}
        <div>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
            03 · 华人新手最容易踩的坑 / COMMON MISTAKES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {groupPitfalls.map((p, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 20,
                padding: '24px 0',
                borderTop: `1px solid ${C.border}`,
                borderBottom: i === groupPitfalls.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'start',
              }}>
                <div className="f-mono" style={{ fontSize: 24, color: C.accent, fontWeight: 700, lineHeight: 1 }}>✗</div>
                <div>
                  <div className="f-display" style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: C.cream, lineHeight: 1.3, marginBottom: 8 }}>
                    {p.wrong}
                  </div>
                  <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                    <span className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, fontWeight: 700 }}>· DO · </span>
                    {p.right}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={1.5}>{fieldNotes.practice_2}</FieldNote>
      </div>

      {/* § 4.5 出事故了 */}
      <SectionLabel num="4.5" source="TAC Victoria · Victoria Police · Maurice Blackburn">出事故了 · WHEN IT HAPPENS</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 32 }}>
          维州的好消息——<span style={{ color: C.cream }}>TAC 是无过错保险</span>。
          <br/>注册费里就含。<span style={{ color: C.accent }}>无论你是否有责，都可以索赔医疗。</span>
          <br/><br/>
          但流程必须做对——做错一步，索赔可能被拒。
        </p>

        {/* 7 步流程 */}
        <div style={{ marginBottom: 48 }}>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 24 }}>
            事故现场 · 7 步 / 7 STEPS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {accidentSteps.map((s, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(60px, 80px) 1fr',
                gap: 'clamp(16px, 2vw, 24px)',
                padding: '24px 0',
                borderTop: `1px solid ${C.border}`,
                borderBottom: i === accidentSteps.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'baseline',
              }}>
                <div className="f-display" style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: C.muteDeep, lineHeight: 0.9 }}>
                  {s.num}
                </div>
                <div>
                  <div className="f-display" style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: C.cream, lineHeight: 1.1, marginBottom: 10 }}>
                    {s.title}
                  </div>
                  <div className="f-serif" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 关键时限 + 中国新手提醒 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div style={{ padding: 'clamp(24px, 3vw, 32px)', border: `1px solid ${C.borderStrong}`, background: C.surface }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 14 }}>· 关键时限 · DEADLINES ·</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {[
                ["12 个月", "lodge TAC claim 的法定时限"],
                ["3 年", "特殊情况可延期（伤情后期才出现）"],
                ["2 年", "申请医疗费报销的时限（每笔费用单独计）"],
              ].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: i < 2 ? `1px dashed ${C.border}` : 'none' }}>
                  <span className="f-display" style={{ fontSize: 18, color: C.cream, minWidth: 80 }}>{t[0]}</span>
                  <span className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5 }}>{t[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ padding: 'clamp(24px, 3vw, 32px)', border: `1px dashed ${C.accent}`, background: 'rgba(199, 62, 29, 0.05)' }}>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 14 }}>· 中国新手最常忽视 · WATCH OUT ·</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {[
                "「感觉没事」就不报警——错。72 小时内出现的伤都算事故伤。",
                "不收对方完整保险信息——错。没保险信息 TAC 索赔会被拒。",
                "不存证人电话——错。证人是双方说法不一致时唯一仲裁。",
                "私下和解——错。任何赔偿协议必须经过保险公司，否则你权利清零。",
              ].map((t, i) => (
                <li key={i} className="f-serif" style={{ fontSize: 13, color: C.cream, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6, padding: '8px 0', paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.accent, fontFamily: 'JetBrains Mono, monospace' }}>—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1}>{fieldNotes.practice_3}</FieldNote>
      </div>

      <div className="container" style={{ padding: '40px clamp(20px, 4vw, 64px) 80px', borderTop: `1px solid ${C.border}` }}>
        <div className="f-serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.3, color: C.cream, fontStyle: 'italic', fontWeight: 300, maxWidth: 900 }}>
          技术比胆量重要。<br/>
          <span style={{ color: C.accent }}>胆量比马力重要。</span><br/>
          顺序不能错。
        </div>
        <div className="f-mono" style={{ fontSize: 10, color: C.muteDeep, letterSpacing: 3, marginTop: 24 }}>— RULE OF THREE</div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="practice" />
      </div>

      <ChapterOutro
        summary={[
          "5 项核心练习：直线起停、8 字绕桩、紧急刹车、慢速平衡、压弯入门",
          "Bunnings 周日早晨停车场是最佳练习场",
          "技术 > 胆量 > 马力——顺序不能错",
        ]}
        next={{ id: "mountain", num: "05", cn: "入山", preview: "维多利亚 6 条山路，从 Kinglake 入门到 Black Spur 必骑——封神之地" }}
      />
    </section>
  );
}

/* ============ 入山 · 视觉高潮 ============ */

function MountainSection() {
  const featured = routes.find(r => r.featured);
  const [vibe, setVibe] = useState("any");

  const matched = useMemo(() => {
    if (vibe === "any") return routes;
    return routes.filter(r => r.vibe.includes(vibe));
  }, [vibe]);

  return (
    <section id="mountain">
      {/* MountainCover · 全屏视觉高潮 */}
      <MountainCover />

      <div className="container" style={{ padding: '60px clamp(20px, 4vw, 64px) 40px' }}>
        <div className="chapter-grid">
          <div />
          <div>
            <div className="f-serif" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontStyle: 'italic', color: C.accent, fontWeight: 300 }}>
              The Mountains.
            </div>
            <p className="f-serif" style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1.65, color: C.creamMute, marginTop: 24, fontWeight: 300, fontStyle: 'italic', maxWidth: 720 }}>
              维多利亚的山，是新手的封神之地。
            </p>
            <p className="f-serif" style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1.65, color: C.creamMute, marginTop: 16, fontWeight: 300, fontStyle: 'italic', maxWidth: 720 }}>
              从 1 小时车程的近郊到阿尔卑斯路 2 天长途，每条路都该被认真骑过。
            </p>
            <p className="f-serif" style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1.65, color: C.creamMute, marginTop: 16, fontWeight: 300, fontStyle: 'italic', maxWidth: 720 }}>
              但记住——每个弯都是新的。
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="mountain" />
      </div>

      <SectionLabel num="5.1">编辑推荐 · FEATURED</SectionLabel>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <div className="featured-grid" style={{ border: `1px solid ${C.borderStrong}`, background: C.surface, overflow: 'hidden' }}>
          <div style={{ position: 'relative', minHeight: 360, padding: 'clamp(32px, 5vw, 60px)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} preserveAspectRatio="none" viewBox="0 0 600 600">
              {[...Array(12)].map((_, i) => (
                <path key={i} d={`M 0 ${100 + i * 40} Q 150 ${50 + i * 40}, 300 ${110 + i * 40} T 600 ${80 + i * 40}`}
                  fill="none" stroke={C.accent} strokeWidth="1" strokeOpacity={0.7 - i * 0.05} />
              ))}
            </svg>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>· THE MUST-RIDE ·</div>
              <div className="f-mono" style={{ fontSize: 11, color: C.cream, letterSpacing: 2 }}>{featured.from}</div>
              <h3 className="f-display" style={{ fontSize: 'clamp(56px, 8vw, 110px)', color: C.cream, lineHeight: 0.85, marginTop: 12, letterSpacing: '-0.02em' }}>
                BLACK<br/>SPUR
              </h3>
              <div className="f-serif" style={{ fontSize: 24, fontStyle: 'italic', color: C.accent, marginTop: 16, fontWeight: 300 }}>
                {featured.cn}
              </div>
            </div>
          </div>

          <div style={{ padding: 'clamp(32px, 5vw, 60px)', borderLeft: `1px solid ${C.border}`, background: C.bg }}>
            <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 32 }}>
              32 公里连续 sweepers 与 hairpins，桉树林封顶。<br/>
              <span style={{ color: C.cream }}>骑过的人才算骑过墨尔本。</span>
            </p>
            <svg viewBox="0 0 320 60" style={{ width: '100%', height: 60 }}>
              <path d="M 0 50 L 30 42 L 60 47 L 90 32 L 130 37 L 170 17 L 210 27 L 250 12 L 290 22 L 320 7" fill="none" stroke={C.accent} strokeWidth="1.5" />
              {[0, 30, 60, 90, 130, 170, 210, 250, 290, 320].map((x, i) => (
                <circle key={i} cx={x} cy={[50, 42, 47, 32, 37, 17, 27, 12, 22, 7][i]} r={i === 0 || i === 9 ? 4 : 2} fill={C.accent} />
              ))}
            </svg>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, textAlign: 'center', marginTop: 8 }}>ELEVATION PROFILE</div>
            <div className="grid-2" style={{ marginTop: 32 }}>
              <FeaturedStat label="距 CBD" value={featured.fromCBD} unit="km" />
              <FeaturedStat label="路段长" value={featured.km} unit="km" />
              <FeaturedStat label="耗时" value={featured.time} unit="" />
              <FeaturedStat label="难度" value={featured.level} unit="" accent />
              <FeaturedStat label="最佳" value={featured.best} unit="" />
              <FeaturedStat label="类型" value={featured.type} unit="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1}>{fieldNotes.mountain_1}</FieldNote>
      </div>

      <div className="container" style={{ padding: '60px clamp(20px, 4vw, 64px) 40px' }}>
        <BlackSpurGuide />
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FieldNote rotation={1}>{fieldNotes.mountain_2}</FieldNote>
        <FieldNote rotation={-1}>{fieldNotes.mountain_3}</FieldNote>
      </div>

      <SectionLabel num="5.2">按你的偏好筛 · ROUTE MATCHER</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 32px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { v: "any", l: "全部" }, { v: "近郊", l: "近郊近" }, { v: "弯道", l: "弯道多" },
            { v: "风景", l: "风景好" }, { v: "森林", l: "森林" }, { v: "海岸", l: "海岸" },
            { v: "长途", l: "长途" }, { v: "温和", l: "新手温和" },
          ].map(opt => (
            <button key={opt.v} onClick={() => setVibe(opt.v)} className="f-mono" style={{
              padding: '8px 14px', fontSize: 10, letterSpacing: 1, fontWeight: 700,
              background: vibe === opt.v ? C.accent : 'transparent',
              color: vibe === opt.v ? C.cream : C.creamMute,
              border: `1px solid ${vibe === opt.v ? C.accent : C.border}`,
              cursor: 'pointer',
            }}>{opt.l}</button>
          ))}
        </div>
        <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 2, marginBottom: 16 }}>→ {matched.length} 条路线匹配</div>
      </div>

      <SectionLabel num="5.3" source="编辑实测 · 2026.04">完整对比 · ALL ROUTES</SectionLabel>
      <div className="container table-scroll" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
              {["路线", "起点 → 终点", "路段 km", "距 CBD", "耗时", "难度", "最佳季", "类型"].map((h, i) => (
                <th key={i} className="f-mono" style={{ padding: '16px 16px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matched.map((r, i) => (
              <tr key={i} className="hover-row" style={{ borderBottom: i < matched.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <td style={{ padding: '20px 16px' }}>
                  <div className="f-display" style={{ fontSize: 22, color: C.cream, lineHeight: 1 }}>{r.name}</div>
                  <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 1, marginTop: 4 }}>{r.cn}</div>
                </td>
                <td style={{ padding: '20px 16px', fontSize: 12, color: C.creamMute }}>{r.from}</td>
                <td className="f-mono" style={{ padding: '20px 16px', fontSize: 13, color: C.cream }}>{r.km}</td>
                <td className="f-mono" style={{ padding: '20px 16px', fontSize: 13, color: C.cream }}>{r.fromCBD}</td>
                <td className="f-mono" style={{ padding: '20px 16px', fontSize: 13, color: C.cream }}>{r.time}</td>
                <td className="f-mono" style={{ padding: '20px 16px', fontSize: 11, color: r.level === "高手" ? C.accent : r.level === "进阶" ? C.cream : C.creamMute, fontWeight: 700, letterSpacing: 1 }}>· {r.level}</td>
                <td className="f-mono" style={{ padding: '20px 16px', fontSize: 11, color: C.creamMute }}>{r.best}</td>
                <td style={{ padding: '20px 16px', fontSize: 12, color: C.creamMute, fontStyle: 'italic' }} className="f-serif">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={1}>{fieldNotes.mountain_4}</FieldNote>
      </div>

      <SectionLabel num="5.4">山路铁律 · MOUNTAIN RULES</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        {[
          "永远预设对面有车。盲弯不压线",
          "上山看视野，下山看刹车，重心永远靠后",
          "袋鼠是真威胁。清晨黄昏少跑山",
          "不超出自己 70% 的水平，留 30% 应急",
          "结伴骑保持错位车距，不并排",
        ].map((rule, i) => (
          <div key={i} style={{ padding: '24px 0', borderTop: `1px solid ${C.border}` }}>
            <div className="rule-grid">
              <div className="f-display" style={{ fontSize: 'clamp(28px, 3vw, 36px)', color: C.muteDeep, lineHeight: 1 }}>{(i + 1).toString().padStart(2, '0')}</div>
              <div className="f-serif" style={{ fontSize: 'clamp(18px, 2.4vw, 30px)', color: C.cream, fontStyle: 'italic', lineHeight: 1.4, fontWeight: 300 }}>{rule}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="mountain" />
      </div>

      <ChapterOutro
        summary={[
          "Black Spur 是墨尔本必骑——32 公里连续弯",
          "新手第一次跑山推荐 Kinglake Loop",
          "袋鼠、湿桉树叶、夏季 fire warning 是真实威胁",
          "5 条山路铁律：盲弯不压线 / 重心后压 / 70% 实力 / 错位车距",
        ]}
        next={{ id: "insurance", num: "06", cn: "护身", preview: "保险 + 防盗——你不想做但必须做的功课。澳洲的玩法和国内完全不同" }}
      />
    </section>
  );
}

function MountainCover() {
  return (
    <div style={{
      width: '100%', height: 'clamp(500px, 75vh, 800px)',
      position: 'relative', overflow: 'hidden',
      background: C.bg, borderTop: `1px solid ${C.border}`,
    }}>
      {/* 满屏地形等高线 - 主体视觉 */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 1600 800">
        {/* 多层等高线，从下往上叠 */}
        {[...Array(20)].map((_, i) => {
          const y = 100 + i * 35;
          const opacity = 0.05 + (i / 20) * 0.4;
          return (
            <path
              key={i}
              d={`M 0 ${y} Q 200 ${y - 30 - Math.sin(i) * 20}, 400 ${y - 10} T 800 ${y - 20} T 1200 ${y + 10} T 1600 ${y - 5}`}
              fill="none"
              stroke={C.accent}
              strokeWidth={i < 5 ? 1.5 : 1}
              strokeOpacity={opacity}
            />
          );
        })}

        {/* 顶部细线 - 像云雾 */}
        {[...Array(8)].map((_, i) => (
          <path
            key={`top-${i}`}
            d={`M 0 ${50 + i * 8} Q 400 ${30 + i * 8}, 800 ${60 + i * 8} T 1600 ${40 + i * 8}`}
            fill="none"
            stroke={C.cream}
            strokeWidth="0.5"
            strokeOpacity={0.08 - i * 0.008}
          />
        ))}

        {/* 关键点 - 地标 */}
        <circle cx="400" cy="380" r="4" fill={C.accent} />
        <text x="412" y="384" fill={C.accent} fontSize="11" fontFamily="monospace" letterSpacing="2">BLACK SPUR</text>

        <circle cx="900" cy="320" r="4" fill={C.accent} />
        <text x="912" y="324" fill={C.accent} fontSize="11" fontFamily="monospace" letterSpacing="2">REEFTON</text>

        <circle cx="1300" cy="450" r="4" fill={C.accent} />
        <text x="1212" y="454" fill={C.accent} fontSize="11" fontFamily="monospace" letterSpacing="2">DONNA BUANG</text>

        <circle cx="200" cy="550" r="4" fill={C.creamMute} opacity="0.6" />
        <text x="212" y="554" fill={C.creamMute} fontSize="11" fontFamily="monospace" letterSpacing="2" opacity="0.6">CBD · MELBOURNE</text>
      </svg>

      {/* 渐变压暗 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, transparent 0%, ${C.bg}99 100%)`,
      }} />

      {/* 文字内容 */}
      <div className="container" style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div className="f-mono" style={{ fontSize: 12, color: C.accent, letterSpacing: 5, marginBottom: 24 }}>
          CHAPTER 05 · MOUNTAIN
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <div className="f-display" style={{
            fontSize: 'clamp(80px, 16vw, 240px)',
            color: C.cream, lineHeight: 0.85, letterSpacing: '-0.03em',
          }}>入山</div>
          <div>
            <div className="f-display" style={{
              fontSize: 'clamp(40px, 7vw, 96px)',
              color: C.muteDeep, lineHeight: 0.85, letterSpacing: '-0.02em',
            }}>05</div>
          </div>
        </div>
        <div className="f-serif" style={{
          fontSize: 'clamp(20px, 2.4vw, 32px)', fontStyle: 'italic',
          color: C.creamMute, marginTop: 32, fontWeight: 300, lineHeight: 1.4,
          maxWidth: 720,
        }}>
          每个新手都在等待自己的<span style={{ color: C.accent }}>第一座山</span>——<br/>
          那是从骑士到人的临界。
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="container" style={{
        position: 'absolute', bottom: 32, left: 0, right: 0, zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3 }}>
          ↑ TOPOGRAPHIC · YARRA RANGES
        </div>
        <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3 }}>
          6 ROUTES · 3 LEVELS
        </div>
      </div>
    </div>
  );
}

function FeaturedStat({ label, value, unit, accent }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>{label.toUpperCase()}</div>
      <div className="f-display" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', color: accent ? C.accent : C.cream, marginTop: 4, lineHeight: 1 }}>
        {value}<span style={{ fontSize: 12, color: C.mute, marginLeft: 4 }}>{unit}</span>
      </div>
    </div>
  );
}

/* ============ Footer ============ */

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.borderStrong}`, background: C.surface }}>
      <div className="container" style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto 48px' }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 4, marginBottom: 16 }}>
            — 最近读者在问 —
          </div>
          <h2 className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: C.cream, lineHeight: 0.95 }}>
            如果你还有问题<br/>
            <span style={{ color: C.accent }}>很可能别人也问过</span>
          </h2>
        </div>

        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {recentQs.map((q, i) => (
            <div key={i} style={{
              padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${C.border}`, background: C.bg,
              display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24,
            }}>
              <div>
                <div className="f-mono" style={{ fontSize: 11, color: C.cream, fontWeight: 700 }}>{q.who}</div>
                <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1, marginTop: 4 }}>{q.days}</div>
              </div>
              <div>
                <div className="f-display" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', color: C.cream, lineHeight: 1.3, marginBottom: 12 }}>
                  「{q.q}」
                </div>
                <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                  {q.aPreview}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 920, margin: '40px auto 0' }}>
          <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7 }}>
            如果你的问题不在上面——欢迎在文末留言，或邮件到 <span style={{ color: C.accent }}>errata@...</span>。每周看一次。
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 64px)', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>· NEWSLETTER ·</div>
            <div className="f-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: C.cream, lineHeight: 1, marginBottom: 12 }}>
              每月一次的山路推荐
            </div>
            <p className="f-serif" style={{ fontSize: 15, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
              新路书、季节性提醒、装备折扣信息。<br/>
              不发广告，每月一封，随时退订。
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="email" placeholder="your@email.com" style={{
              flex: 1, minWidth: 200, padding: '14px 16px', background: 'transparent',
              border: `1px solid ${C.border}`, color: C.cream, fontSize: 14, outline: 'none', fontFamily: 'inherit',
            }} />
            <button className="f-mono" style={{
              padding: '14px 20px', background: C.cream, color: C.bg,
              border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: 2, fontWeight: 700,
            }}>SUBSCRIBE →</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: 'clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px) 40px' }}>
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="f-display" style={{ fontSize: 32, color: C.cream }}>骑迹行者</span>
              <span className="f-serif" style={{ fontSize: 16, fontStyle: 'italic', color: C.accent }}>wayfarer</span>
            </div>
            <p className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', marginTop: 16, lineHeight: 1.7, fontWeight: 300, maxWidth: 400 }}>
              我做的、给墨尔本华人新手骑士的 0→1 田野指南。<br/>
              从拿牌到第一次跑山的每一步，都该被认真记录。
            </p>
          </div>

          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 16 }}>NAVIGATE</div>
            {chapters.map(ch => (
              <a key={ch.id} href={`#${ch.id}`} className="f-mono" style={{
                display: 'block', fontSize: 11, color: C.creamMute,
                padding: '6px 0', textDecoration: 'none', letterSpacing: 1,
              }}>{ch.num} / {ch.cn} <span style={{ color: C.mute }}>· {ch.en}</span></a>
            ))}
          </div>

          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 16 }}>RESOURCES</div>
            {[
              { l: "VicRoads", u: "vicroads.vic.gov.au" },
              { l: "LAMS 清单", u: "vicroads.vic.gov.au" },
              { l: "Bikesales", u: "bikesales.com.au" },
              { l: "勘误 / 反馈", u: "errata@..." },
            ].map((r, i) => (
              <div key={i} className="f-mono" style={{ fontSize: 11, color: C.creamMute, padding: '6px 0', letterSpacing: 1 }}>
                {r.l}<br/>
                <span style={{ color: C.mute, fontSize: 10 }}>{r.u}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 3, marginBottom: 16 }}>COMMUNITY</div>
            <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7 }}>
              想加入路书？<br/>
              分享你的跑山故事？
            </div>
            <button className="f-mono" style={{
              marginTop: 16, padding: '10px 16px', background: 'transparent',
              border: `1px solid ${C.cream}`, color: C.cream, cursor: 'pointer',
              fontSize: 10, letterSpacing: 2, fontWeight: 700,
            }}>JOIN GROUP →</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px clamp(20px, 4vw, 64px)', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>
          骑迹行者 · WAYFARER · VOL.001 · MELBOURNE EDITION
        </div>
        <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>
          © 2026 · 信息核对至 2026.04 · 以 VicRoads 为准
        </div>
      </div>
    </footer>
  );
}


/* ============ V6 新增组件 ============ */

const gearBrandsByRegion = {
  helmet: {
    cn: "头盔", en: "HELMET",
    insight: "唯一不能在淘宝省的——澳洲法律强制 AS/NZS 1698 认证。第一顶必须本地买。",
    regions: [
      { region: "本地买（合法）", en: "LOCAL · AU LEGAL", priority: true,
        brands: [
          { name: "Shoei NXR2 / X-15", price: "A$849–1399", origin: "日本本厂", note: "中椭圆头型，业界标杆" },
          { name: "AGV K6S / Pista", price: "A$849–1899", origin: "意大利", note: "中椭圆，轻、运动感强" },
          { name: "Arai Signet-X", price: "A$1199–1599", origin: "日本", note: "长椭圆专属——国内罕见" },
          { name: "HJC RPHA 11", price: "A$549–849", origin: "韩国", note: "偏圆，性价比之选" },
          { name: "LS2 FF902", price: "A$229–349", origin: "西班牙", note: "入门首选" },
        ] },
      { region: "日本海淘（性价比）", en: "JAPAN IMPORT",
        brands: [
          { name: "Shoei (日亚)", price: "比国内便宜 20–50%", origin: "日本本厂", note: "日本头型偏小，XL 买 XXL" },
          { name: "Arai (日亚)", price: "比国内便宜 30%", origin: "日本本厂", note: "海关可能抽查 + AS/NZS 缺失" },
          { name: "OGK Kabuto", price: "¥1500–3500", origin: "旗舰日产 / 半盔青岛产", note: "性价比日系" },
        ] },
      { region: "淘宝（多数不合法）", en: "TAOBAO · ⚠ NOT AU LEGAL", warning: true,
        brands: [
          { name: "LS2 国行", price: "¥800–1500", origin: "西班牙国内代理", note: "可能不带 AS/NZS" },
          { name: "AGV K6S 国行", price: "¥3500–5500", origin: "国内代理", note: "认证需逐个核实" },
          { name: "Shoei (海淘水货)", price: "¥3000–8000", origin: "正规代理仅 2 家", note: "其他淘宝店多为水货——很多假货" },
          { name: "国产白牌", price: "¥150–500", origin: "义乌/惠州", note: "假认证横行——别买" },
        ] },
    ],
  },
  jacket: {
    cn: "骑行夹克", en: "JACKET",
    insight: "国产 ¥500-1500 性价比最猛；欧版剪裁宽肩，亚洲身形偏大；日系最贴合东方身形。",
    regions: [
      { region: "国际大牌（本地零售）", en: "INTERNATIONAL · LOCAL",
        brands: [
          { name: "Alpinestars T-GP", price: "A$599–899", origin: "意大利 1963", note: "MotoGP 御用 · A 星" },
          { name: "Dainese Avro", price: "A$899–1599", origin: "意大利", note: "首创背心防护，欧版宽肩" },
          { name: "Rev'It Sand 4", price: "A$799–1199", origin: "荷兰", note: "拉力风格，复古党之选" },
          { name: "DriRider RX-3", price: "A$399", origin: "澳洲本土", note: "本土实用主义" },
        ] },
      { region: "日系（贴合东方身形）", en: "JAPANESE",
        brands: [
          { name: "KOMINE 真品", price: "¥800–2500", origin: "日产/越南/印尼", note: "新款多东南亚产，老日产更稀有" },
          { name: "RS Taichi", price: "¥1500–4000", origin: "日本", note: "海淘比国内便宜 20-30%" },
        ] },
      { region: "国产性价比", en: "DOMESTIC · CHINA", priority: true,
        brands: [
          { name: "赛羽 SCOYCO", price: "¥800–1500", origin: "佛山 1998 · 国内最大厂", note: "JK48 经典款，国内最大装备生产商" },
          { name: "MOTOBOY", price: "¥600–1200", origin: "国产", note: "拉力服 + 四季款，进藏常见" },
          { name: "杜汉 DUHAN", price: "¥800–2000", origin: "深圳 1999", note: "机车皮衣强项，OEM 出口" },
          { name: "雷翅", price: "¥1000–2000", origin: "山东 2016", note: "拉力服专精" },
          { name: "NERVE 涅夫", price: "¥1500–3500", origin: "唐山+巴基斯坦", note: "号称德国其实国产" },
        ] },
    ],
  },
  gloves: {
    cn: "手套 / 护具", en: "GLOVES & ARMOR",
    insight: "护具是国产的强项——赛羽手套累计销量 900 万双，护具 500 万双。CE 认证普及。",
    regions: [
      { region: "国际大牌（本地）", en: "LOCAL",
        brands: [
          { name: "Five RFX1 / Knox", price: "A$129–229", origin: "法国 / 英国", note: "本地最常见入门" },
          { name: "Held Phantom", price: "A$229+", origin: "德国", note: "顶级手套之选" },
          { name: "Alpinestars GP Plus", price: "A$229+", origin: "意大利", note: "竞速手套" },
        ] },
      { region: "日系", en: "JAPANESE",
        brands: [
          { name: "KOMINE GK 系列", price: "¥150–500", origin: "日本品牌·东南亚产", note: "经典通勤手套" },
          { name: "RS Taichi", price: "¥400–1500", origin: "日本", note: "运动 + 通勤皆可" },
        ] },
      { region: "国产（强项）", en: "DOMESTIC", priority: true,
        brands: [
          { name: "赛羽 SCOYCO", price: "¥150–500", origin: "佛山", note: "手套护具是赛羽强项" },
          { name: "摩雷士", price: "¥300–500", origin: "国产", note: "中端手套口碑稳" },
          { name: "瑞德兹", price: "¥250–800", origin: "国产", note: "护具 + 手套" },
        ] },
    ],
  },
};

function BrandsByRegion() {
  const [item, setItem] = useState("helmet");
  const data = gearBrandsByRegion[item];
  const items = Object.entries(gearBrandsByRegion);

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, flexWrap: 'wrap' }}>
        {items.map(([key, val], idx) => (
          <button key={key} onClick={() => setItem(key)} className="f-mono" style={{
            padding: '12px 20px',
            background: item === key ? C.accent : 'transparent',
            color: item === key ? C.cream : C.creamMute,
            border: `1px solid ${item === key ? C.accent : C.border}`,
            borderLeft: idx > 0 ? 'none' : undefined,
            cursor: 'pointer', fontSize: 11, letterSpacing: 2, fontWeight: 700,
          }}>{val.en}</button>
        ))}
      </div>

      <p className="f-serif" style={{
        fontSize: 'clamp(15px, 1.6vw, 18px)', color: C.creamMute,
        fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300,
        marginBottom: 32, maxWidth: 800,
      }}>{data.insight}</p>

      <div className="grid-3">
        {data.regions.map((r, i) => (
          <div key={i} style={{
            padding: 'clamp(20px, 3vw, 28px)',
            border: `1px solid ${r.priority ? C.cream : r.warning ? C.accent : C.border}`,
            background: r.priority ? C.surface : r.warning ? `${C.accent}08` : 'transparent',
          }}>
            {r.priority && <div className="f-mono" style={{ fontSize: 9, color: C.cream, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>· 推荐 ·</div>}
            {r.warning && <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>⚠ 注意</div>}
            <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 4 }}>{r.en}</div>
            <div className="f-display" style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: C.cream, lineHeight: 1.05, marginBottom: 20 }}>{r.region}</div>
            {r.brands.map((b, j) => (
              <div key={j} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: j < r.brands.length - 1 ? `1px dashed ${C.border}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                  <span className="f-mono" style={{ fontSize: 12, color: C.cream, fontWeight: 700 }}>{b.name}</span>
                  <span className="f-mono" style={{ fontSize: 11, color: C.accent }}>{b.price}</span>
                </div>
                <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1, marginTop: 4 }}>{b.origin}</div>
                <div className="f-serif" style={{ fontSize: 12, color: C.creamMute, fontStyle: 'italic', marginTop: 6, lineHeight: 1.5, fontWeight: 300 }}>{b.note}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BikeReviewCards() {
  const featured = ["CB300R", "MT-03", "Ninja 400", "390 Duke", "SV650 LAMS", "MT-07 LAMS"];
  const cards = featured.map(model => bikes.find(b => b.model === model)).filter(Boolean);

  // Bikesales URL slug 生成：brand 小写 + model 小写连字符
  const buildBikesalesUrl = (brand, model) => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
    const modelSlug = model.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return `https://www.bikesales.com.au/bikes/${brandSlug}/${modelSlug}/victoria-state/melbourne-region/`;
  };

  return (
    <div className="grid-3">
      {cards.map((b, i) => (
        <div key={i} style={{
          padding: 'clamp(24px, 3vw, 32px)',
          border: `1px solid ${C.border}`, background: C.surface,
          display: 'flex', flexDirection: 'column',
        }}>
          <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2 }}>{b.brand}</div>
          <div className="f-display" style={{ fontSize: 26, color: C.cream, lineHeight: 1, marginTop: 4 }}>{b.model}</div>
          <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, letterSpacing: 1, marginTop: 8 }}>
            {b.gears} 档 · 油耗 {b.fuel}km/L · {b.weight}kg
          </div>
          <p className="f-serif" style={{
            fontSize: 14, color: C.creamMute, fontStyle: 'italic',
            lineHeight: 1.6, marginTop: 16, fontWeight: 300, flex: 1,
          }}>"{b.review}"</p>
          {b.upgradeTo && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 4 }}>多数人之后换</div>
              <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1 }}>→ {b.upgradeTo}</div>
            </div>
          )}
          <a href={buildBikesalesUrl(b.brand, b.model)} target="_blank" rel="noopener noreferrer" className="f-mono" style={{
            marginTop: 16, padding: '10px 14px',
            background: 'transparent', color: C.cream,
            border: `1px solid ${C.border}`, textDecoration: 'none',
            fontSize: 10, letterSpacing: 2, fontWeight: 700,
            textAlign: 'center', display: 'block',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = 'rgba(199, 62, 29, 0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent'; }}>
            BIKESALES 墨尔本 ↗
          </a>
        </div>
      ))}
    </div>
  );
}

function ModWarning() {
  return (
    <div>
      <div style={{
        padding: 'clamp(24px, 3vw, 32px)',
        border: `1px solid ${C.accent}`, background: `${C.accent}10`, marginBottom: 32,
      }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>· LAMS 黄金法则 ·</div>
        <div className="f-serif" style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: C.cream, fontStyle: 'italic', lineHeight: 1.5 }}>
          LAMS 车必须保持 <span style={{ color: C.accent, fontWeight: 600 }}>原厂状态</span>。
          任何改装提升 power-to-weight ratio = LAMS 失效 = 拿 P 牌骑这台车违法 + 保险作废。
          <span style={{ color: C.accent }}> 买二手前一定要核查改装情况。</span>
        </div>
      </div>

      <div className="table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
              {["改装", "LAMS 合法", "保险接受", "实操备注"].map((h, i) => (
                <th key={i} className="f-mono" style={{
                  padding: '16px 20px', textAlign: 'left', fontSize: 9,
                  color: C.mute, letterSpacing: 2, fontWeight: 700,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lamsModRules.map((m, i) => (
              <tr key={i} className="hover-row" style={{ borderBottom: i < lamsModRules.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <td style={{ padding: '18px 20px', fontSize: 13, color: C.cream }}>{m.name}</td>
                <td style={{ padding: '18px 20px' }}>
                  {m.legal
                    ? <span className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1, fontWeight: 700 }}>✓ 合法</span>
                    : <span className="f-mono" style={{ fontSize: 11, color: C.mute, letterSpacing: 1 }}>✗ 不合法</span>}
                </td>
                <td style={{ padding: '18px 20px' }}>
                  {m.ins
                    ? <span className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1 }}>✓ 通常接受</span>
                    : <span className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1 }}>✗ 作废</span>}
                </td>
                <td style={{ padding: '18px 20px', fontSize: 12, color: C.creamMute, fontStyle: 'italic' }} className="f-serif">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeadShapeGuide() {
  return (
    <div>
      <div className="grid-2" style={{ marginBottom: 32 }}>
        <div style={{ padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${C.border}`, background: C.surface }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>· 怎么测自己 ·</div>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>让朋友从头顶垂直拍一张照</li>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>看头形最像下面 3 种里哪个</li>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300 }}>找对应的品牌——别按"我朋友戴 Shoei 我也买"</li>
          </ol>
        </div>
        <div style={{ padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${C.border}`, background: C.surface }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 12 }}>· 30 分钟试戴 ·</div>
          <ul style={{ paddingLeft: 20, margin: 0, listStyle: 'none' }}>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>✓ 戴上摇头 30 秒——不能位移</li>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>✓ 检查眉骨——压不压（"Shoei dot"）</li>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>✓ 检查耳上后脑——是否有顶感</li>
            <li className="f-serif" style={{ fontSize: 14, color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300 }}>✗ 戴满 30 分钟头痛 = 不合适</li>
          </ul>
        </div>
      </div>

      <div className="grid-3">
        {headShapes.map(s => (
          <div key={s.id} style={{
            padding: 'clamp(24px, 3vw, 32px)',
            border: `1px solid ${s.primary ? C.cream : C.border}`,
            background: s.primary ? C.surface : 'transparent',
          }}>
            <svg viewBox="0 0 100 100" style={{ width: 80, height: 80, marginBottom: 16, display: 'block' }}>
              {s.id === "long" && <ellipse cx="50" cy="50" rx="22" ry="40" fill="none" stroke={C.accent} strokeWidth="2" />}
              {s.id === "inter" && <ellipse cx="50" cy="50" rx="32" ry="40" fill="none" stroke={C.cream} strokeWidth="2" />}
              {s.id === "round" && <ellipse cx="50" cy="50" rx="38" ry="40" fill="none" stroke={C.accent} strokeWidth="2" />}
              <text x="50" y="20" textAnchor="middle" fill={C.mute} fontSize="7" fontFamily="monospace" letterSpacing="2">↑ FRONT</text>
            </svg>
            {s.primary && <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>· MOST COMMON ·</div>}
            <div className="f-display" style={{ fontSize: 28, color: C.cream, lineHeight: 1 }}>{s.name}</div>
            <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, letterSpacing: 2, marginTop: 4 }}>{s.en}</div>
            <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 1, marginTop: 8 }}>{s.pct}</div>
            <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5, marginTop: 16, fontWeight: 300 }}>{s.desc}</div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginBottom: 6 }}>✓ 适合</div>
              {s.suited.map((b, i) => <div key={i} className="f-mono" style={{ fontSize: 11, color: C.cream, marginBottom: 4, lineHeight: 1.4 }}>· {b}</div>)}
              <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginTop: 12, marginBottom: 6 }}>✗ 避开</div>
              {s.avoid.map((b, i) => <div key={i} className="f-mono" style={{ fontSize: 11, color: C.mute, marginBottom: 4, lineHeight: 1.4 }}>· {b}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ V6 入山章新增：BLACK SPUR 完整路书 ============ */

const blackSpurData = {
  // 来自 motorcyclerides.com.au + Netrider + Shannons Club + 多篇骑手博客的综合数据
  basics: {
    coreLength: "11 km core (核心 hairpin 段)",
    fullRoute: "32 km Healesville → Marysville",
    cornerRatio: "80% 弯道",
    direction: "推荐 East → West（上坡更安全，刹车好控）",
    surface: "近年重铺沥青，bitumen grip 优良",
    distanceFromCBD: "Healesville 起点距墨尔本 CBD 约 60 km",
  },
  warnings: [
    { icon: "❗", title: "没有路肩", note: "跑偏不是撞山就是飞下悬崖——这是为什么它被列为维州摩托事故黑点。", source: "Noobiker / Spokes" },
    { icon: "❗", title: "Hairpin 连续", note: "几个紧的 hairpin——湿天 + hairpin = 死亡组合。", source: "Netrider 论坛" },
    { icon: "❗", title: "森林覆盖让路面常年潮湿", note: "桉树皮 + 苔藓 + 散落石子常见。冬天部分路段有结冰风险。", source: "Spokes / 多篇博客" },
    { icon: "⚠", title: "周末游客车流量大", note: "周末骑会跟在 SUV 后面爬山。建议工作日去——但留意 timber trucks 砍伐车。", source: "Shannons Club" },
    { icon: "⚠", title: "限速摄像头", note: "是骑手必去的路也是警察必蹲的路。一切按 signed corner speeds 走。", source: "Netrider" },
  ],
  stops: [
    { km: 0, name: "Healesville", note: "起点 · 早餐 / 咖啡 · 局部 cafe 多" },
    { km: 8, name: "Fernshaw Picnic Area", note: "沿途休息点 · 卫生间" },
    { km: 14, name: "Dom Dom Saddle", note: "panoramic view 观景台 · 必停" },
    { km: 22, name: "Black Spur Motel", note: "加油站 + 餐 · 鸟类多 (king parrots, lorikeets)" },
    { km: 28, name: "Narbethong", note: "Nuggetty Cafe · 路终点直接拐弯" },
    { km: 32, name: "Marysville", note: "终点 · Bruno's Art Garden, Fat Tony's café" },
    { km: 40, name: "Buxton (extra)", note: "'Bucky' Pub · 屋顶有摩托车 · 中途吃饭" },
  ],
  voices: [
    {
      quote: "go round the spur a few times to sniff out all the tricky bits before you tackle it full on. also check out reefton spur.",
      who: "GSXR Mark",
      where: "Netrider 2008 帖子",
    },
    {
      quote: "The Spur has an 80k speed limit. Pay attention to the signed speeds for corners and you'll do fine. Treat it as a sight-seeing ride and you won't be going too fast for it.",
      who: "Netrider 老司机",
      where: "Netrider · Riding The Black Spur for the first time",
    },
    {
      quote: "I prefer going from East to West on the Spur — being on the side closest the 'drop' edge gives you much greater visibility through the turns.",
      who: "Netrider Mark",
      where: "Netrider 论坛",
    },
    {
      quote: "Definitely don't go there if it's wet. It's really slippery in winter because of the tree cover, the road stays damp and mossy in parts all the time.",
      who: "Netrider",
      where: "Netrider · 路况讨论",
    },
  ],
  sources: [
    { name: "motorcyclerides.com.au", url: "https://motorcyclerides.com.au/motorbike-rides/australia/vic/yarra-ranges/the-black-spur-yarra-ranges.html" },
    { name: "Netrider 论坛", url: "https://netrider.net.au/threads/riding-the-black-spur-for-the-first-time.94055/" },
    { name: "Shannons Club", url: "https://club.shannons.com.au/club/bike-news/bike-rides/victoria-black-spur-land-of-the-giants/" },
    { name: "Spokes", url: "https://www.spokes.com.au/rides/the-black-spur" },
    { name: "Leader Motorcycles", url: "https://www.leadermoto.com.au/blogs/news/top-10-scenic-motorcycle-rides-around-melbourne-and-victoria" },
  ],
};

function BlackSpurGuide() {
  return (
    <div>
      {/* Section title */}
      <div style={{ marginBottom: 40 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>· DEEP DIVE ·</div>
        <h3 className="f-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: C.cream, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          BLACK SPUR 完整路书
        </h3>
        <p className="f-serif" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', color: C.creamMute, fontWeight: 300, marginTop: 12, lineHeight: 1.7, maxWidth: 760 }}>
          作者没亲自跑过——以下信息汇总自 5 个澳洲骑手社区与博客，每条警告标注来源以便核对。骑前再去对应链接读一遍是好习惯。
        </p>
      </div>

      {/* Basics */}
      <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>· 基础数据 ·</div>
        <div className="grid-3" style={{ gap: 16 }}>
          {Object.entries(blackSpurData.basics).map(([k, v], i) => {
            const labels = {
              coreLength: "核心长度",
              fullRoute: "完整路段",
              cornerRatio: "弯道占比",
              direction: "推荐方向",
              surface: "路面状况",
              distanceFromCBD: "距 CBD",
            };
            return (
              <div key={i} style={{ padding: '16px 0' }}>
                <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 6 }}>{labels[k]}</div>
                <div className="f-serif" style={{ fontSize: 14, color: C.cream, lineHeight: 1.4 }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warnings */}
      <div style={{ marginBottom: 40 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>· 必须知道的危险 ·</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {blackSpurData.warnings.map((w, i) => (
            <div key={i} style={{
              padding: '20px 0',
              borderTop: i === 0 ? `1px solid ${C.borderStrong}` : `1px solid ${C.border}`,
              borderBottom: i === blackSpurData.warnings.length - 1 ? `1px solid ${C.borderStrong}` : 'none',
              display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16, alignItems: 'start',
            }}>
              <div style={{ fontSize: 18, lineHeight: 1, color: C.accent }}>{w.icon}</div>
              <div>
                <div className="f-display" style={{ fontSize: 18, color: C.cream, lineHeight: 1.2 }}>{w.title}</div>
                <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', marginTop: 6, lineHeight: 1.5, fontWeight: 300 }}>{w.note}</div>
              </div>
              <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1, whiteSpace: 'nowrap', alignSelf: 'center' }}>来源: {w.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stops timeline */}
      <div style={{ marginBottom: 40 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>· 沿途节点 · TIMELINE ·</div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 1, background: C.border }} />
          {blackSpurData.stops.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 60px 1fr', gap: 12, marginBottom: 20, alignItems: 'start' }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: i === 0 || i === blackSpurData.stops.length - 1 ? C.accent : C.cream,
                border: `2px solid ${C.bg}`, marginTop: 6, position: 'relative', zIndex: 2,
              }} />
              <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1, marginTop: 4 }}>{s.km} km</div>
              <div>
                <div className="f-display" style={{ fontSize: 18, color: C.cream, lineHeight: 1.2 }}>{s.name}</div>
                <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', marginTop: 4, lineHeight: 1.5, fontWeight: 300 }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voices */}
      <div style={{ marginBottom: 32 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>· 真实骑手怎么说 · VOICES ·</div>
        <div className="grid-2" style={{ gap: 20 }}>
          {blackSpurData.voices.map((v, i) => (
            <div key={i} style={{ padding: 'clamp(20px, 2.5vw, 28px)', border: `1px solid ${C.border}`, background: C.surface }}>
              <div className="f-display" style={{ fontSize: 36, color: C.accent, lineHeight: 0.5, marginBottom: 8 }}>"</div>
              <p className="f-serif" style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', color: C.cream, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>
                {v.quote}
              </p>
              <div className="f-mono" style={{ fontSize: 10, color: C.creamMute, letterSpacing: 1 }}>— {v.who}</div>
              <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1, marginTop: 4 }}>{v.where}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
        <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 12 }}>· 信息来源 · SOURCES ·</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px' }}>
          {blackSpurData.sources.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="f-mono" style={{
              fontSize: 11, color: C.creamMute, textDecoration: 'none',
              borderBottom: `1px solid ${C.border}`, paddingBottom: 2,
            }}>
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ V6 新增：完整目录组件 BikeCatalog ============ */

function BikeCatalog() {
  const [filter, setFilter] = useState("全部");
  const types = ["全部", "街车", "仿赛", "复古", "巡航", "Adventure", "踏板"];

  const filtered = filter === "全部"
    ? bikeCatalog
    : bikeCatalog.filter(b => b.type.includes(filter));

  return (
    <div>
      {/* 中国驾照转换者专属提醒 */}
      <div style={{
        padding: 'clamp(20px, 3vw, 28px)',
        border: `1px solid ${C.accent}`,
        background: 'rgba(199, 62, 29, 0.08)',
        marginBottom: 24,
      }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>· 给中国驾照持有者 · CN LICENCE HOLDERS ·</div>
        <p className="f-serif" style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: C.cream, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          如果你的中国 D/E 驾照<span style={{ color: C.accent }}>持照 ≥ 3 年</span>——你转换后会直接拿 <span style={{ color: C.accent }}>Full Licence</span>，没有 LAMS 限制。
          <br/>这意味着<span style={{ color: C.cream }}>你可以跳过这个 LAMS 目录</span>，直接选 MT-09 / Z900 / CB650R / Tiger 900 这些全功率中量级。
          <br/><br/>
          <span style={{ color: C.creamMute }}>但如果你想从 LAMS 开始（更便宜 / 更轻 / 学习曲线更平），那这个目录还是给你的。重点关注 <span style={{ color: C.accent }}>"解禁过渡"</span> 标签——这些车解禁版本仍是好车，3 年后不必换。</span>
        </p>
      </div>

      {/* 编辑说明 */}
      <div style={{
        padding: 'clamp(20px, 3vw, 28px)',
        border: `1px dashed ${C.border}`,
        background: 'rgba(199, 62, 29, 0.04)',
        marginBottom: 32,
      }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>· 编辑说明 ·</div>
        <p className="f-serif" style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: C.creamMute, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          这部分是<span style={{ color: C.cream }}>市场参考目录 · {bikeCatalog.length} 台</span>——不是编辑评测。深度评论请看 <span style={{ color: C.accent }}>§ 2.5 老司机的话</span>（11 台精选）。
          <br/>价格区间为 2026.04 估算（数据来源 Bikesales 与各品牌经销商），实际报价可能 ±10% 浮动。
          <br/><span style={{ fontSize: 12, color: C.mute }}>下次更新计划：2026.10</span>
        </p>
      </div>

      {/* 类型筛选 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center' }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className="f-mono" style={{
            padding: '10px 16px',
            background: filter === t ? C.accent : 'transparent',
            color: filter === t ? C.cream : C.creamMute,
            border: `1px solid ${filter === t ? C.accent : C.border}`,
            cursor: 'pointer', fontSize: 11, letterSpacing: 2, fontWeight: 700,
          }}>
            {t}
          </button>
        ))}
        <span className="f-mono" style={{
          marginLeft: 'auto',
          fontSize: 10, color: C.mute, letterSpacing: 1,
        }}>{filtered.length} / {bikeCatalog.length} 台</span>
      </div>

      {/* 表格 */}
      <div className="table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
              {["品牌", "型号", "类型", "适合", "排量", "马力", "重量", "座高", "新车价", "二手区间"].map((h, i) => (
                <th key={i} className="f-mono" style={{
                  padding: '14px 10px', textAlign: 'left', fontSize: 9,
                  color: C.mute, letterSpacing: 2, fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={i} className="hover-row" style={{
                borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none',
              }}>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 10, color: C.mute, letterSpacing: 1, whiteSpace: 'nowrap' }}>{b.brand}</td>
                <td className="f-display" style={{ padding: '14px 10px', fontSize: 15, color: C.cream, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{b.model}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 11, color: C.creamMute, letterSpacing: 1, whiteSpace: 'nowrap' }}>{b.type}</td>
                <td className="f-serif" style={{ padding: '14px 10px', fontSize: 12, color: C.accent, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{b.bestFor}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.cream }}>{b.displ}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.cream }}>{b.hp}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.cream }}>{b.weight}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.cream }}>{b.seat}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.accent, whiteSpace: 'nowrap' }}>{b.priceNew}</td>
                <td className="f-mono" style={{ padding: '14px 10px', fontSize: 11, color: C.creamMute, whiteSpace: 'nowrap' }}>{b.priceUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 底部：完整列表说明 */}
      <p className="f-serif" style={{
        fontSize: 13, color: C.mute, fontStyle: 'italic',
        lineHeight: 1.6, fontWeight: 300, marginTop: 24,
      }}>
        没列出的小众款（如电动摩托、Aprilia 125 系列、KTM 250 系列等）——可在 <a href="https://www.vicroads.vic.gov.au" target="_blank" rel="noopener" style={{ color: C.accent }}>VicRoads LAMS 列表</a> 或 <a href="https://www.bikesales.com.au" target="_blank" rel="noopener" style={{ color: C.accent }}>Bikesales</a> 查询完整数据。
      </p>
    </div>
  );
}

/* ============ V6 新增：ResourceBox 资源链接组件 ============ */

const chapterResources = {
  licence: {
    title: "拿牌资源",
    en: "GO DO IT · LICENCE",
    sections: [
      {
        label: "VicRoads 官方",
        links: [
          { name: "海外驾照转换", url: "https://www.vicroads.vic.gov.au/licences/new-to-victoria/convert-your-overseas-licence", note: "中国驾照转换从这里开始" },
          { name: "拿摩托车驾照", url: "https://www.vicroads.vic.gov.au/licences/your-licence/get-your-motorcycle-licence", note: "完全新手流程" },
          { name: "LAMS 认证车型查询", url: "https://www.vicroads.vic.gov.au/safety-and-road-rules/motorcyclist-safety/approved-motorcycles-for-novice-riders", note: "买车前必查" },
        ],
      },
      {
        label: "驾校（墨尔本）",
        links: [
          { name: "Stay Upright", url: "https://stayupright.com.au/", note: "全澳最大，价格中等" },
          { name: "HART (Honda Rider Training)", url: "https://www.hartride.com.au/", note: "Honda 旗下，专业度高" },
          { name: "Ridetek", url: "https://www.ridetek.com.au/", note: "墨尔本本地，华人去得多" },
          { name: "Top Rider Training", url: "https://www.toprider.com.au/", note: "西区驾校" },
        ],
      },
      {
        label: "翻译 + 工具",
        links: [
          { name: "NAATI 认证翻译查询", url: "https://www.naati.com.au/online/CPDDirectorySearch", note: "找你城市的认证翻译" },
          { name: "VicRoads Handbook PDF", url: "https://www.vicroads.vic.gov.au/safety-and-road-rules/road-rules/road-to-solo-driving", note: "笔试题库" },
        ],
      },
    ],
  },
  ride: {
    title: "选车资源",
    en: "GO DO IT · BIKES",
    sections: [
      {
        label: "买车平台",
        links: [
          { name: "Bikesales · LAMS 墨尔本", url: "https://www.bikesales.com.au/bikes/lams/victoria-state/melbourne-region/", note: "澳洲最大摩托交易，新车 + 二手" },
          { name: "Facebook Marketplace · 墨尔本摩托", url: "https://www.facebook.com/marketplace/melbourne/motorcycles/", note: "私人卖家，议价空间大" },
          { name: "Gumtree · 墨尔本摩托", url: "https://www.gumtree.com.au/s-motorcycles-scooters/melbourne/c18342l3001317", note: "便宜车多但要小心" },
          { name: "PPSR 二手车背景查询", url: "https://www.ppsr.gov.au/", note: "A$2 查欠款 / 偷车记录" },
        ],
      },
      {
        label: "墨尔本主要经销商",
        links: [
          { name: "Procycles", url: "https://www.procycles.com.au/", note: "Yamaha / Kawasaki / BMW / Triumph" },
          { name: "Peter Stevens", url: "https://www.peterstevens.com.au/", note: "全品牌大店 · CBD" },
          { name: "TeamMoto", url: "https://www.teammoto.com.au/", note: "全国连锁" },
          { name: "Fraser Motorcycles", url: "https://www.frasermotorcycles.com.au/", note: "墨尔本本地老店" },
        ],
      },
      {
        label: "品牌官网",
        links: [
          { name: "Honda Australia", url: "https://hondamotorcycles.com.au/", note: "" },
          { name: "Yamaha Australia", url: "https://www.yamaha-motor.com.au/", note: "" },
          { name: "Kawasaki Australia", url: "https://www.kawasaki.com.au/", note: "" },
          { name: "CFMoto Australia", url: "https://www.cfmoto.com.au/", note: "国产，性价比" },
        ],
      },
    ],
  },
  gear: {
    title: "装备资源",
    en: "GO DO IT · GEAR",
    sections: [
      {
        label: "本地实体店（推荐先试戴）",
        links: [
          { name: "AMX Superstores 墨尔本", url: "https://www.amxsuperstores.com.au/", note: "全澳连锁，库存最大" },
          { name: "Peter Stevens", url: "https://www.peterstevens.com.au/products/category/riding-gear", note: "CBD 总店有装备区" },
          { name: "MCAS", url: "https://www.mcas.com.au/", note: "Motorcycle Accessories Supermarket" },
          { name: "MotoHeaven", url: "https://www.motoheaven.com.au/", note: "线下 + 网购" },
        ],
      },
      {
        label: "本地网购",
        links: [
          { name: "Bikebiz", url: "https://www.bikebiz.com.au/", note: "" },
          { name: "MX Store", url: "https://www.mxstore.com.au/", note: "越野装备多" },
          { name: "ProCycles 网店", url: "https://www.procycles.com.au/collections/all", note: "" },
        ],
      },
      {
        label: "淘宝 / 国内（性价比）",
        links: [
          { name: "赛羽 SCOYCO 天猫", url: "https://saiyu.tmall.com/", note: "国内最大装备厂，护具强项" },
          { name: "杜汉 DUHAN 天猫", url: "https://duhan.tmall.com/", note: "皮衣强项" },
          { name: "MOTOBOY 天猫", url: "https://motoboy.tmall.com/", note: "拉力服性价比" },
        ],
      },
      {
        label: "海淘（高端）",
        links: [
          { name: "RevZilla (美国)", url: "https://www.revzilla.com/", note: "Shoei / Arai 海淘比国内便宜" },
          { name: "FortNine (加拿大)", url: "https://www.fortnine.ca/", note: "评测视频专业，可查规格" },
          { name: "日亚 (摩托区)", url: "https://www.amazon.co.jp/-/en/Motorcycle/b?node=2381381051", note: "Shoei / Arai 日产正品" },
        ],
      },
    ],
  },
  practice: {
    title: "修行资源",
    en: "GO DO IT · PRACTICE",
    sections: [
      {
        label: "进阶训练课程",
        links: [
          { name: "Stay Upright Advanced", url: "https://stayupright.com.au/courses/advanced/", note: "拿牌后第一年首选" },
          { name: "HART Skills Course", url: "https://www.hartride.com.au/courses/", note: "Honda 旗下进阶" },
          { name: "California Superbike School Aus", url: "https://www.superbikeschool.com.au/", note: "压弯专项" },
        ],
      },
      {
        label: "练车场地（墨尔本）",
        links: [
          { name: "Calder Park (训练场)", url: "https://www.calderpark.com.au/", note: "西区，有摩托训练日" },
          { name: "Sandown Raceway", url: "https://www.sandown.net.au/", note: "Track Days · 进阶骑手" },
          { name: "Phillip Island Circuit", url: "https://www.phillipislandcircuit.com.au/", note: "国家级赛道，开放日" },
        ],
      },
      {
        label: "社区 / 社群",
        links: [
          { name: "Netrider (澳洲最大摩托论坛)", url: "https://netrider.net.au/", note: "英文，但信息密度高" },
          { name: "Whirlpool Motorcycles 板块", url: "https://forums.whirlpool.net.au/forum/97", note: "澳洲本地讨论" },
          { name: "FortNine YouTube", url: "https://www.youtube.com/@FortNine", note: "技术 + 评测顶流" },
          { name: "DanDanTheFireman", url: "https://www.youtube.com/@DanDanTheFireman", note: "通勤骑手向" },
        ],
      },
      {
        label: "事故处理（VIC）",
        links: [
          { name: "Victoria Police Online Reporting", url: "https://www.police.vic.gov.au/online-reporting", note: "事后补报警 / 拿到 event number" },
          { name: "TAC 索赔流程", url: "https://www.tac.vic.gov.au/what-to-do-after-an-accident", note: "无过错保险，注册费里就含" },
          { name: "TAC 在线报案", url: "https://www.tac.vic.gov.au/clients/lodging-a-claim", note: "12 个月时限，越早越好" },
          { name: "What3Words", url: "https://what3words.com/", note: "山区精准定位给救护车（VIC 急救认这个）" },
        ],
      },
    ],
  },
  mountain: {
    title: "入山资源",
    en: "GO DO IT · MOUNTAINS",
    sections: [
      {
        label: "路线 + 导航",
        links: [
          { name: "Strava (查路书)", url: "https://www.strava.com/segments/explore?keyword=Black+Spur", note: "搜路段名查别人轨迹" },
          { name: "Google Maps 导航", url: "https://www.google.com/maps/dir/Healesville+VIC/Marysville+VIC/", note: "Black Spur 例:Healesville→Marysville" },
          { name: "Best Biking Roads", url: "https://www.bestbikingroads.com/motorcycle-roads/australia/victoria/", note: "维州摩托路线社区评分" },
        ],
      },
      {
        label: "天气 + 风险",
        links: [
          { name: "VicEmergency (火险预警)", url: "https://emergency.vic.gov.au/", note: "夏天必查，山火预警" },
          { name: "BOM 7 天天气", url: "https://www.bom.gov.au/vic/forecasts/melbourne.shtml", note: "墨尔本气象局" },
          { name: "VicRoads 道路状况", url: "https://traffic.vicroads.vic.gov.au/", note: "实时封路 / 事故" },
        ],
      },
      {
        label: "工具",
        links: [
          { name: "Snitch (限速摄像头 app)", url: "https://www.snitchapp.com.au/", note: "全澳警察蹲点位置" },
          { name: "FuelCheck VIC", url: "https://www.vic.gov.au/fuelcheckvic", note: "维州官方油价查询" },
        ],
      },
    ],
  },
  insurance: {
    title: "护身资源",
    en: "GO DO IT · INSURANCE",
    sections: [
      {
        label: "保险比价（必比 3-5 家）",
        links: [
          { name: "QBE Motorcycle", url: "https://www.qbe.com/au/motorcycle-insurance", note: "新手友好，inexperienced rider excess 透明" },
          { name: "NRMA Insurance", url: "https://www.nrma.com.au/motorcycle-insurance", note: "全国大型，3M+ 客户" },
          { name: "RACV Insurance", url: "https://www.racv.com.au/insurance/motor/motorcycle.html", note: "VIC 本地，老品牌" },
          { name: "Insure My Ride", url: "https://www.insuremyride.com.au/", note: "摩托专属保险公司" },
          { name: "Youi", url: "https://www.youi.com.au/motorcycle-insurance", note: "评测好，含骑行装备 cover" },
        ],
      },
      {
        label: "TAC（VIC 无过错保险）",
        links: [
          { name: "TAC 官网", url: "https://www.tac.vic.gov.au/", note: "VIC 注册自带，事故索赔从这里开始" },
          { name: "TAC 索赔流程", url: "https://www.tac.vic.gov.au/what-to-do-after-an-accident", note: "12 个月时限" },
          { name: "Greenslip 解释", url: "https://www.tac.vic.gov.au/about-the-tac/our-organisation/about-the-tac/our-history", note: "VIC 的 CTP 叫 TAC charge，含在 reg 里" },
        ],
      },
      {
        label: "防盗装备",
        links: [
          { name: "Abus Granit Detecto", url: "https://www.amxsuperstores.com.au/", note: "AMX 售：碟刹锁带警报，A$150-200" },
          { name: "Kryptonite New York Chain", url: "https://www.bikebiz.com.au/", note: "Bikebiz 售：18mm 链条锁，A$200-250" },
          { name: "Datatool 警报器", url: "https://www.peterstevens.com.au/", note: "Peter Stevens 安装，A$300-500" },
          { name: "AirTag 隐藏", url: "https://www.apple.com/au/shop/buy-airtag", note: "塞进座下电瓶舱——A$45 兜底" },
        ],
      },
      {
        label: "比价工具 + 论坛经验",
        links: [
          { name: "Finder 摩托保险比价", url: "https://www.finder.com.au/car-insurance/motorcycle-insurance", note: "不直接卖，给整体行情" },
          { name: "Whirlpool 保险讨论", url: "https://forums.whirlpool.net.au/forum/97", note: "真实骑手报价分享" },
          { name: "Netrider Insurance", url: "https://netrider.net.au/forums/insurance/", note: "澳洲摩托圈最大讨论区" },
        ],
      },
    ],
  },
};

function ResourceBox({ chapter }) {
  const data = chapterResources[chapter];
  if (!data) return null;

  return (
    <div style={{
      padding: 'clamp(28px, 4vw, 40px)',
      border: `1px solid ${C.borderStrong}`,
      background: C.surface,
      marginTop: 32, marginBottom: 32,
    }}>
      <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
        · {data.en} ·
      </div>
      <h3 className="f-display" style={{
        fontSize: 'clamp(28px, 3.6vw, 40px)', color: C.cream,
        lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, marginBottom: 8,
      }}>
        {data.title}
      </h3>
      <p className="f-serif" style={{
        fontSize: 14, color: C.creamMute,
        lineHeight: 1.65, fontWeight: 300, marginBottom: 28,
      }}>
        看完这章——这些是你接下来该去的地方。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {data.sections.map((s, i) => (
          <div key={i}>
            <div className="f-mono" style={{
              fontSize: 10, color: C.accent, letterSpacing: 2,
              fontWeight: 700, marginBottom: 12,
              paddingBottom: 6, borderBottom: `1px solid ${C.border}`,
            }}>
              {s.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.links.map((l, j) => (
                <a key={j} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="resource-link"
                  style={{
                    textDecoration: 'none',
                    padding: '12px 14px',
                    border: `1px solid ${C.border}`,
                    background: 'transparent',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.accent;
                    e.currentTarget.style.background = 'rgba(199, 62, 29, 0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.background = 'transparent';
                  }}>
                  <div className="resource-link-row">
                    <span className="f-display resource-link-name" style={{ color: C.cream, lineHeight: 1.2 }}>
                      {l.name}
                    </span>
                    <span className="f-serif resource-link-note" style={{ color: C.creamMute, lineHeight: 1.5, fontWeight: 300 }}>
                      {l.note}
                    </span>
                    <span className="f-mono resource-link-go" style={{ color: C.accent, letterSpacing: 1, whiteSpace: 'nowrap' }}>
                      GO ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ V6 新增：中国 ↔ 这里 跨语言对比组件 ============ */

const chapterCompare = {
  licence: {
    title: "中国 ↔ 墨尔本 · 拿牌差异",
    en: "CN ↔ MEL · LICENCE",
    rows: [
      { item: "驾照分类", cn: "E（≥250cc）/ F（≤250cc）/ D（轻便）", au: "L 牌 → P 牌（红/绿）→ Full" },
      { item: "拿牌时长", cn: "场地考一次过 · 2-4 周", au: "L 牌持有 ≥3 个月 + Day 2 评估" },
      { item: "笔试语言", cn: "中文", au: "L 牌阶段 VicRoads 提供中文版 Handbook" },
      { item: "路考形式", cn: "场地桩考", au: "Day 2：真实道路骑行 + 自带车" },
      { item: "总成本", cn: "RMB 2000-4000", au: "A$870-1370（驾校 + VicRoads 牌照费）" },
      { item: "海外持照", cn: "—", au: "持有效摩托驾照 ≥3 年 → 直接 Full、免 LAMS" },
    ],
    note: "中国 D/E 摩托驾照在澳洲 (VIC) 已经不能直接换——2025.4.30 起 EDR 废止。但持照 ≥3 年仍可经过短考试拿 Full 牌，跳过 P 牌期。",
  },
  ride: {
    title: "中国 ↔ 墨尔本 · 买车差异",
    en: "CN ↔ MEL · BUY",
    rows: [
      { item: "二手平台", cn: "闲鱼 / 摩托车大全 / 哈罗摩托", au: "Bikesales / FB Marketplace / Gumtree" },
      { item: "议价幅度", cn: "10-30% 砍价正常", au: "5-10% 温和议价（标价已含留议价空间）" },
      { item: "验车", cn: "自己看 / 摩友帮看", au: "PPSR check（A$2 查欠款 + 偷车记录）必做" },
      { item: "过户", cn: "车管所一次办", au: "卖家 + 买家各自填表 + 在线缴费（VicRoads）" },
      { item: "上牌", cn: "4S 店代办", au: "新车经销商代办 / 二手车自己 VicRoads 上" },
      { item: "国产 CFMoto", cn: "本土主流，售后遍地", au: "入澳 ~5 年，新手友好但售后网点少" },
    ],
    note: "在墨尔本买二手车，PPSR check 一定要做。RMB 10 都不到，但能查出车有没有欠款（被银行抵押）或被报失（偷车）——欠款车被买后银行可以把车拖走。",
  },
  gear: {
    title: "中国 ↔ 墨尔本 · 装备差异",
    en: "CN ↔ MEL · GEAR",
    rows: [
      { item: "头盔认证", cn: "国家 3C / GB 24429", au: "AS/NZS 1698 或 ECE 22.05 / 22.06" },
      { item: "国产头盔", cn: "正规渠道合法", au: "戴上路违法 · 罚 ~A$300 + 扣 3 分" },
      { item: "国际版 Shoei/Arai", cn: "淘宝可买（带 ECE）", au: "合法 · 海运可行" },
      { item: "顶级品牌价格", cn: "Shoei X-15 ¥7-9k", au: "Shoei X-15 A$1500-2000（贵 ~50%）" },
      { item: "国产护具", cn: "赛羽 / 杜汉 / MOTOBOY 主流", au: "无澳洲渠道 · 必海运" },
      { item: "本地店买", cn: "—", au: "AMX / Peter Stevens / MCAS（可现场试戴）" },
    ],
    note: "头盔不要图便宜买淘宝普通款戴上路——警察一查无 AS/NZS 1698 或 ECE 标志直接罚。要买淘宝就买「国际版」「出口版」——这些带 ECE 22.05 标志，合法。",
  },
  practice: {
    title: "中国 ↔ 墨尔本 · 练车与团骑差异",
    en: "CN ↔ MEL · PRACTICE",
    rows: [
      { item: "团骑组织", cn: "微信群 / 摩友会", au: "FB Group / Meetup / Netrider 论坛" },
      { item: "团骑距离", cn: "跟车较紧 / 加油站集合", au: "山路保持 3 秒间隔 / 直路 2 秒" },
      { item: "Lane filter", cn: "随意穿插", au: "≤30 km/h 合法 · 校区/学校/重型车旁禁止" },
      { item: "路上挥手", cn: "少见", au: "对面摩托见到要左手 V 字回礼（社交礼仪）" },
      { item: "进阶训练", cn: "私教零散", au: "Stay Upright Advanced / Track Day 体系完整" },
      { item: "Track Day", cn: "罕见 / 自办", au: "Phillip Island / Sandown 每月开放" },
    ],
    note: "墨尔本骑手挥手文化是真的——长途路上对面摩托过来不挥手会被觉得没礼貌。手势：左手低位伸出，V 字（食指 + 中指）。",
  },
  mountain: {
    title: "中国 ↔ 墨尔本 · 跑山差异",
    en: "CN ↔ MEL · MOUNTAINS",
    rows: [
      { item: "限速 / 测速", cn: "山路常 60-80 / Camera 少", au: "山路 100 km/h 但 Camera 密集（必装 Snitch）" },
      { item: "路面风险", cn: "落石 / 修路 / 货车", au: "袋鼠（清晨黄昏高发）/ 苔藓 / 周末拥堵" },
      { item: "加油", cn: "沿途加油站多", au: "山区加油站稀少 · 必算续航（出门加满）" },
      { item: "紧急号", cn: "110 / 120", au: "000（VIC 通用）+ What3Words app（精准定位给救护）" },
      { item: "夏季风险", cn: "暴雨", au: "山火预警 + 极端高温（必查 VicEmergency）" },
      { item: "冬季风险", cn: "冰雪", au: "山区结冰（Mt Donna Buang/Lake Mountain 最重）" },
    ],
    note: "袋鼠是墨尔本山路最危险的事——清晨日出前 1h、黄昏日落后 1h 是它们出来的高峰，撞上去 100% 摔车。这两个时段尽量不进山。",
  },
  insurance: {
    title: "中国 ↔ 墨尔本 · 保险差异",
    en: "CN ↔ MEL · INSURANCE",
    rows: [
      { item: "强制险", cn: "交强险（人保 / 平安）单独购买", au: "VIC 已含在 reg fee（TAC 无过错保险）" },
      { item: "无过错原则", cn: "事故定责后赔偿", au: "TAC：不论谁错，受伤人都能索赔医疗" },
      { item: "驾龄计算", cn: "汽车驾龄 + 摩托驾龄合并", au: "只算摩托驾龄——汽车老司机也算「新手」" },
      { item: "新手溢价", cn: "约 + 10-30%", au: "持照 < 3 年 → 1.5-3 倍溢价 + 高 excess" },
      { item: "选公司方式", cn: "几大国有 + 三方比价", au: "5+ 家比价（QBE / NRMA / RACV / Insure My Ride / Youi）" },
      { item: "停车防盗", cn: "小区固定停车", au: "墨尔本盗车率高 · Disc lock + chain lock 双重" },
    ],
    note: "中国 D/E 驾照转换者最容易踩的坑：保险公司只看你 VIC 摩托驾龄，不认你国内汽车驾龄。所以即使你 30 岁开了 10 年车，第一年保险费还是按「新手」算。",
  },
};

function CrossCompare({ chapter }) {
  const data = chapterCompare[chapter];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!data) return null;

  return (
    <div style={{
      padding: 'clamp(28px, 4vw, 40px)',
      border: `1px solid ${C.borderStrong}`,
      background: 'rgba(199, 62, 29, 0.03)',
      marginTop: 32, marginBottom: 32,
    }}>
      <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
        · {data.en} ·
      </div>
      <h3 className="f-display" style={{
        fontSize: 'clamp(26px, 3.4vw, 36px)', color: C.cream,
        lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, marginBottom: 28,
      }}>
        {data.title}
      </h3>

      {isMobile ? (
        // 手机：纵向卡片
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {data.rows.map((r, i) => (
            <div key={i} style={{
              padding: 16,
              border: `1px solid ${C.border}`,
              background: C.bg,
            }}>
              <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>
                {r.item}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 1, marginBottom: 4 }}>🇨🇳 中国</div>
                  <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, lineHeight: 1.55 }}>{r.cn}</div>
                </div>
                <div style={{ paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 1, marginBottom: 4 }}>🇦🇺 墨尔本</div>
                  <div className="f-serif" style={{ fontSize: 13, color: C.cream, lineHeight: 1.55 }}>{r.au}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 桌面：表格
        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                <th className="f-mono" style={{ padding: '12px 10px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>项目</th>
                <th className="f-mono" style={{ padding: '12px 10px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>🇨🇳 中国</th>
                <th className="f-mono" style={{ padding: '12px 10px', textAlign: 'left', fontSize: 9, color: C.accent, letterSpacing: 2, fontWeight: 700 }}>🇦🇺 墨尔本</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: i < data.rows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <td className="f-mono" style={{ padding: '14px 10px', fontSize: 11, color: C.creamMute, letterSpacing: 1, fontWeight: 700, verticalAlign: 'top' }}>{r.item}</td>
                  <td className="f-serif" style={{ padding: '14px 10px', fontSize: 13, color: C.creamMute, lineHeight: 1.55, verticalAlign: 'top', borderRight: `1px solid ${C.border}` }}>{r.cn}</td>
                  <td className="f-serif" style={{ padding: '14px 10px', fontSize: 13, color: C.cream, lineHeight: 1.55, verticalAlign: 'top' }}>{r.au}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.note && (
        <div style={{
          marginTop: 20, paddingLeft: 16,
          borderLeft: `2px solid ${C.accent}`,
        }}>
          <p className="f-serif" style={{
            fontSize: 13, color: C.creamMute,
            lineHeight: 1.65, fontWeight: 300, margin: 0,
          }}>
            {data.note}
          </p>
        </div>
      )}
    </div>
  );
}

/* ============ V6 新增：淘宝海运红绿灯组件 ============ */

const taobaoShippingData = {
  green: {
    label: "可海运 · 戴上路合法",
    color: "#4a8b4f",
    items: [
      { name: "国际版 / 出口版头盔", note: "淘宝搜「Shoei 国际版」「Arai 出口版」「AGV ECE」——带 ECE 22.05 标志，合法上路" },
      { name: "手套（夏季 / 冬季 / 雨季）", note: "赛羽 / KOMINE 国内版 / 杜汉，性价比远超本地" },
      { name: "护具马甲 / 护膝 / 护肘", note: "MOTOBOY 拉力服 / 赛羽护具，护甲价格仅本地 1/3" },
      { name: "雨衣 / 反光背心", note: "完全无认证要求" },
      { name: "骑行包 / 油箱包 / 尾包", note: "无认证要求" },
      { name: "通讯耳机（Cardo / Sena 中国版）", note: "国内代理货约 RMB 1500，澳洲价 A$500+" },
    ],
  },
  yellow: {
    label: "可海运 · 但⚠️戴上路违法",
    color: "#c9a233",
    items: [
      { name: "国内 3C 认证头盔（GB 24429）", note: "淘宝大多数普通头盔——只有中国 3C 标志。澳洲警察查到罚 A$300 + 扣 3 分" },
      { name: "仿货 / 山寨皮衣", note: "假 CE 认证标志 = 出事故时护具失效" },
      { name: "改装件：消音器 / 排气", note: "海运没问题，装上去过 RWC（Roadworthy Certificate）困难" },
    ],
  },
  red: {
    label: "禁运 · 海关会扣",
    color: "#c73e1d",
    items: [
      { name: "锂电池类", note: "加热手套 / 加热背心 / 通讯耳机单独邮寄电池——空运严禁，海运需特殊申报" },
      { name: "燃料 / 化学品", note: "防爆罐 / 燃油添加剂 / 链条清洁剂（部分含 carb cleaner）" },
      { name: "气溶胶罐（aerosol）", note: "轮胎补气罐 / 防锈喷雾——快递公司一律拒收" },
      { name: "未授权改装电子件", note: "射灯 / 喇叭等可能涉及电磁兼容（EMC）认证问题" },
    ],
  },
};

const shippingChannels = [
  { name: "淘宝官方集运 · 空运", time: "10-20 天", price: "¥63/kg 起", best: "急件 / 小件 / 头盔单发" },
  { name: "淘宝官方集运 · 海运", time: "40-45 天", price: "¥66/kg 起", best: "大件 / 整套装备 / 不急" },
  { name: "第三方转运（中环 / 4PX / 燕文）", time: "5-15 天", price: "比官方便宜 ~28%", best: "多店多件合并发运" },
  { name: "回国探亲带回", time: "当天", price: "免（行李额内）", best: "头盔 / 大件 / 怕摔的精密装备" },
];

function TaobaoShipping() {
  return (
    <div>
      {/* 三色清单 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {Object.entries(taobaoShippingData).map(([key, group]) => (
          <div key={key} style={{
            border: `1px solid ${C.border}`,
            borderLeft: `4px solid ${group.color}`,
            padding: 'clamp(20px, 3vw, 28px)',
            background: C.surface,
          }}>
            <div className="f-mono" style={{
              fontSize: 11, letterSpacing: 2, fontWeight: 700,
              color: group.color, marginBottom: 16,
            }}>
              {key === 'green' ? '🟢' : key === 'yellow' ? '🟡' : '🔴'} {group.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {group.items.map((it, i) => (
                <div key={i} style={{
                  paddingBottom: i < group.items.length - 1 ? 12 : 0,
                  borderBottom: i < group.items.length - 1 ? `1px solid ${C.border}` : 'none',
                }}>
                  <div className="f-display" style={{ fontSize: 15, color: C.cream, lineHeight: 1.2, marginBottom: 4 }}>
                    {it.name}
                  </div>
                  <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5, fontWeight: 300 }}>
                    {it.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 海运渠道对比 */}
      <div style={{ marginTop: 36 }}>
        <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
          · 海运渠道对比 ·
        </div>
        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                {["渠道", "时效", "价格", "适合"].map((h, i) => (
                  <th key={i} className="f-mono" style={{
                    padding: '12px 10px', textAlign: 'left', fontSize: 9,
                    color: C.mute, letterSpacing: 2, fontWeight: 700,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shippingChannels.map((ch, i) => (
                <tr key={i} style={{
                  borderBottom: i < shippingChannels.length - 1 ? `1px solid ${C.border}` : 'none',
                }}>
                  <td className="f-display" style={{ padding: '14px 10px', fontSize: 14, color: C.cream, lineHeight: 1.2 }}>{ch.name}</td>
                  <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.cream }}>{ch.time}</td>
                  <td className="f-mono" style={{ padding: '14px 10px', fontSize: 12, color: C.accent, whiteSpace: 'nowrap' }}>{ch.price}</td>
                  <td className="f-serif" style={{ padding: '14px 10px', fontSize: 12, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5 }}>{ch.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============ 06 护身 / INSURANCE · 新增章节 ============ */

const insuranceLayers = [
  {
    num: "01",
    type: "CTP / TAC",
    en: "Compulsory Third Party",
    cn: "强制第三方人身险",
    cost: "A$0（已含 reg）",
    cover: "事故造成他人受伤时的医疗赔偿",
    detail: "VIC 已含在车辆注册费里——交了 reg 就有。这是法律最低线。",
    enough: false,
  },
  {
    num: "02",
    type: "Third Party Property",
    en: "TPP",
    cn: "第三方财产险",
    cost: "A$200-500/年",
    cover: "你撞了别人的车 / 财产 → 赔他",
    detail: "你撞了一辆 Tesla 你赔不起的——这险就是为这个买的。",
    enough: false,
  },
  {
    num: "03",
    type: "Comprehensive",
    en: "全险",
    cn: "综合险",
    cost: "A$500-3,800/年",
    cover: "撞别人 + 自己的车 + 偷车 + 火灾 + 泼撒",
    detail: "新车 / 贷款车 / 价值 > A$8k 的车 → 必须买综合险。",
    enough: true,
  },
];

const insuranceCompanies = [
  { name: "QBE", url: "https://www.qbe.com/au/motorcycle-insurance", focus: "新手友好", priceNew: "A$700-1.5k", priceExp: "A$400-700", note: "Inexperienced rider excess 透明，行业标杆" },
  { name: "NRMA", url: "https://www.nrma.com.au/motorcycle-insurance", focus: "全国大型", priceNew: "A$650-1.2k", priceExp: "A$320-600", note: "3M+ 客户，理赔体验稳定" },
  { name: "RACV", url: "https://www.racv.com.au/insurance/motor/motorcycle.html", focus: "VIC 本地", priceNew: "A$700-1.4k", priceExp: "A$380-680", note: "墨尔本骑手首选，与 Swann 同承保" },
  { name: "Insure My Ride", url: "https://www.insuremyride.com.au/", focus: "摩托专属", priceNew: "A$800-3.8k", priceExp: "A$400-900", note: "摩托特化，但新手报价偏高" },
  { name: "Youi", url: "https://www.youi.com.au/motorcycle-insurance", focus: "装备覆盖好", priceNew: "A$750-1.5k", priceExp: "A$420-800", note: "含骑行装备险 + 24h 道路救援" },
];

const newRiderRules = [
  { factor: "持照年限", impact: "< 3 年高溢价", detail: "保险公司只看你 VIC 摩托驾龄。即使你国内开车 10 年——这里也是新手。" },
  { factor: "年龄", impact: "< 25 岁 + 50%", detail: "25 岁是分水岭。30 岁 + 持照 3 年是性价比最高的组合。" },
  { factor: "车辆价值", impact: "决定要不要综合险", detail: "二手 < A$5k 的车买第三方财产就够。新车 / > A$8k 必须综合。" },
  { factor: "停车位置", impact: "锁车库省 10-20%", detail: "申报为「locked garage」比「driveway」便宜。但保险公司可能验证。" },
  { factor: "Rider Training", impact: "完成驾校认证 -5%", detail: "Stay Upright / HART 完成认证课程可享 Rider Training Course Discount。" },
  { factor: "改装", impact: "未申报 = 全部失效", detail: "排气、ECU、踏板——任何改装必须告诉保险公司，否则索赔被拒。" },
];

const theftSpots = [
  { suburb: "CBD / Southbank / Docklands", level: "极高", reason: "公共停车 + 流动人口多 + 监控覆盖低" },
  { suburb: "Footscray / Sunshine / Dandenong", level: "高", reason: "工业区周边，作案后好脱手" },
  { suburb: "Brunswick / Fitzroy / Collingwood", level: "中高", reason: "夜生活区，凌晨高发" },
  { suburb: "South Yarra / Toorak", level: "中", reason: "目标车辆贵，作案有针对性" },
  { suburb: "Box Hill / Glen Waverley", level: "低", reason: "华人聚居，监控密度高" },
];

const lockKit = [
  { item: "Disc Lock + 警报", price: "A$150-200", brand: "Abus Granit Detecto / Xena", role: "前轮锁碟，挪动触发警报" },
  { item: "Chain Lock 18mm+", price: "A$200-300", brand: "Kryptonite New York / Almax Series III", role: "锁后轮到固定物（路桩 / 车架）" },
  { item: "Cover 车罩", price: "A$50-100", brand: "Oxford Aquatex / Nelson-Rigg", role: "「不显眼」是最强防盗——窃贼挑显眼的下手" },
  { item: "Tracker / AirTag", price: "A$45-300", brand: "AirTag / Datatool S4", role: "丢了能找回。AirTag 必须藏车上隐蔽位置" },
];

function InsuranceSection() {
  return (
    <section id="insurance">
      <ChapterIntro
        num="06" cn="护身" en="INSURANCE" type="insurance"
        italic="The fine print."
        lead={[
          "保险是你不想做但必须做的功课。",
          "VIC 强制保险已含在 reg 里——但只覆盖最低线。",
          "真正能让你安心骑车的是 comprehensive + 防盗——而新手溢价是真实的。",
        ]}
      />

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <CrossCompare chapter="insurance" />
      </div>

      {/* § 6.1 三层保险 */}
      <SectionLabel num="6.1" source="QBE PDS · TAC Victoria · Swann Insurance">三层保险体系 · THE STACK</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 40 }}>
          澳洲摩托保险有 3 层。<span style={{ color: C.accent }}>第 1 层是法定基础</span>，第 2-3 层是你的选择。
          <br/>选错一层 → 撞了别人，你倾家荡产。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {insuranceLayers.map((l, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(60px, 80px) 1fr minmax(120px, 180px)',
              gap: 'clamp(16px, 2vw, 32px)',
              padding: 'clamp(28px, 3vw, 36px) 0',
              borderTop: `1px solid ${C.border}`,
              borderBottom: i === insuranceLayers.length - 1 ? `1px solid ${C.border}` : 'none',
              alignItems: 'baseline',
              background: l.enough ? 'rgba(199, 62, 29, 0.03)' : 'transparent',
            }}>
              <div className="f-display" style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: l.enough ? C.accent : C.muteDeep, lineHeight: 0.9 }}>
                {l.num}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span className="f-display" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', color: C.cream, lineHeight: 1 }}>
                    {l.type}
                  </span>
                  <span className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', fontWeight: 300 }}>
                    {l.en} · {l.cn}
                  </span>
                </div>
                <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>
                  COVER · {l.cover}
                </div>
                <div className="f-serif" style={{ fontSize: 14, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                  {l.detail}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="f-mono" style={{ fontSize: 9, color: C.mute, letterSpacing: 2, marginBottom: 4 }}>年费</div>
                <div className="f-display" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: C.cream, lineHeight: 1.1 }}>
                  {l.cost}
                </div>
                {l.enough && (
                  <div className="f-mono" style={{ fontSize: 9, color: C.accent, letterSpacing: 2, marginTop: 8, fontWeight: 700 }}>
                    ✓ 完整保护
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 'clamp(20px, 3vw, 28px)', border: `1px dashed ${C.accent}`, background: 'rgba(199, 62, 29, 0.05)' }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 10 }}>· 选层逻辑 ·</div>
          <p className="f-serif" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', color: C.cream, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
            二手 &lt; <span style={{ color: C.accent }}>A$5k</span> 的车 → 第 1+2 层够（每年 ~A$300）<br/>
            二手 A$5-8k → 第 1+2 层 + 自掏修车（自损时割肉）<br/>
            新车 / &gt; <span style={{ color: C.accent }}>A$8k</span> / 贷款车 → 必须第 1+3 层综合险
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1.5}>{fieldNotes.insurance_1}</FieldNote>
      </div>

      {/* § 6.2 P 牌新手溢价 */}
      <SectionLabel num="6.2" source="Whirlpool 论坛 · 真实骑手报价">P 牌新手溢价 · THE TAX</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 32 }}>
          新手第一年，保险费可能是<span style={{ color: C.accent }}>老司机的 2-3 倍</span>。
          <br/>这 6 个因素决定你被收多少税。
        </p>

        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>因素</th>
                <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>影响</th>
                <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>说明</th>
              </tr>
            </thead>
            <tbody>
              {newRiderRules.map((r, i) => (
                <tr key={i} className="hover-row" style={{ borderBottom: i < newRiderRules.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <td className="f-display" style={{ padding: '18px 12px', fontSize: 16, color: C.cream, whiteSpace: 'nowrap' }}>{r.factor}</td>
                  <td className="f-mono" style={{ padding: '18px 12px', fontSize: 12, color: C.accent, letterSpacing: 1, whiteSpace: 'nowrap' }}>{r.impact}</td>
                  <td className="f-serif" style={{ padding: '18px 12px', fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5, fontWeight: 300 }}>{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="f-serif" style={{ fontSize: 13, color: C.mute, lineHeight: 1.7, fontWeight: 300, marginTop: 16 }}>
          真实数据：Whirlpool 论坛 2024-25 报价 — 学员 Ninja 300 综合险 <span style={{ color: C.cream }}>A$3,800/年</span>（最贵）；学员 CB400 <span style={{ color: C.cream }}>A$720/年</span>（中等）；持照 20 年 + 0 索赔 <span style={{ color: C.cream }}>A$368/年</span>（最便宜）。
        </p>
      </div>

      {/* § 6.3 公司比价 */}
      <SectionLabel num="6.3" source="各公司官网 + 真实骑手反馈">主流公司比价 · COMPARE 5</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>必须比价 3-5 家</span>——同样配置不同公司可能差 2 倍。
          <br/>所有报价都是综合险，按 LAMS 车 + 墨尔本停车估算。
        </p>

        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                {["公司", "定位", "新手 P 牌", "持照 ≥ 3 年", "特点", "报价"].map((h, i) => (
                  <th key={i} className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {insuranceCompanies.map((c, i) => (
                <tr key={i} className="hover-row" style={{ borderBottom: i < insuranceCompanies.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <td className="f-display" style={{ padding: '16px 12px', fontSize: 18, color: C.cream, whiteSpace: 'nowrap' }}>{c.name}</td>
                  <td className="f-mono" style={{ padding: '16px 12px', fontSize: 11, color: C.creamMute, letterSpacing: 1, whiteSpace: 'nowrap' }}>{c.focus}</td>
                  <td className="f-mono" style={{ padding: '16px 12px', fontSize: 12, color: C.accent, whiteSpace: 'nowrap' }}>{c.priceNew}</td>
                  <td className="f-mono" style={{ padding: '16px 12px', fontSize: 12, color: C.cream, whiteSpace: 'nowrap' }}>{c.priceExp}</td>
                  <td className="f-serif" style={{ padding: '16px 12px', fontSize: 12, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5, fontWeight: 300 }}>{c.note}</td>
                  <td>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="f-mono" style={{
                      padding: '8px 12px', fontSize: 9, letterSpacing: 2, fontWeight: 700,
                      color: C.cream, border: `1px solid ${C.cream}`, textDecoration: 'none',
                      display: 'inline-block',
                    }}>报价 ↗</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 24, padding: 'clamp(16px, 2vw, 24px)', border: `1px dashed ${C.border}`, background: C.surface }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>· 提示 · </div>
          <p className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            Swann Insurance 自 2025.06.14 起<span style={{ color: C.accent }}>不再接新单</span>——但 RACV 用同一承保人。Compare The Market / iSelect 这类比价平台不要太依赖，去原网站直接报价更准。
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={1}>{fieldNotes.insurance_2}</FieldNote>
      </div>

      {/* § 6.4 防盗 */}
      <SectionLabel num="6.4" source="Whirlpool · Netrider 真实数据">防盗 · THE LOCKS</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <p className="f-serif" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.creamMute, fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300, maxWidth: 720, marginBottom: 32 }}>
          墨尔本是<span style={{ color: C.accent }}>澳洲摩托盗窃率第二高</span>的城市。
          <br/>保险能赔——但「丢了再赔」远不如「不丢」。
        </p>

        {/* 高发区 */}
        <div style={{ marginBottom: 48 }}>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
            01 · 墨尔本盗车率分布
          </div>
          <div className="table-scroll">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>区域</th>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>盗窃率</th>
                  <th className="f-mono" style={{ padding: '14px 12px', textAlign: 'left', fontSize: 9, color: C.mute, letterSpacing: 2, fontWeight: 700 }}>原因</th>
                </tr>
              </thead>
              <tbody>
                {theftSpots.map((s, i) => (
                  <tr key={i} className="hover-row" style={{ borderBottom: i < theftSpots.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <td className="f-display" style={{ padding: '14px 12px', fontSize: 15, color: C.cream }}>{s.suburb}</td>
                    <td className="f-mono" style={{ padding: '14px 12px', fontSize: 12, color: s.level === '极高' ? C.accent : s.level === '高' ? C.accent : C.creamMute, letterSpacing: 1, fontWeight: 700 }}>{s.level}</td>
                    <td className="f-serif" style={{ padding: '14px 12px', fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.5, fontWeight: 300 }}>{s.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="f-serif" style={{ fontSize: 12, color: C.mute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginTop: 12 }}>
            华人新手最大错误：<span style={{ color: C.accent }}>把 Ninja 400 / MT-07 停在 CBD 街上过夜</span>。这两个车是"被盗 top 5"。
          </p>
        </div>

        {/* 防盗装备 */}
        <div>
          <div className="f-mono" style={{ fontSize: 11, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
            02 · 防盗四件套 / THE KIT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {lockKit.map((k, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 200px) 1fr minmax(100px, 140px)',
                gap: 'clamp(16px, 2vw, 28px)',
                padding: '20px 0',
                borderTop: `1px solid ${C.border}`,
                borderBottom: i === lockKit.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'baseline',
              }}>
                <div>
                  <div className="f-display" style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: C.cream, lineHeight: 1.2 }}>{k.item}</div>
                  <div className="f-mono" style={{ fontSize: 10, color: C.mute, letterSpacing: 1, marginTop: 4 }}>{k.brand}</div>
                </div>
                <div className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>
                  {k.role}
                </div>
                <div className="f-mono" style={{ fontSize: 12, color: C.accent, letterSpacing: 1, textAlign: 'right', whiteSpace: 'nowrap' }}>{k.price}</div>
              </div>
            ))}
          </div>
          <p className="f-serif" style={{ fontSize: 13, color: C.creamMute, fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginTop: 20, maxWidth: 720 }}>
            完整四件套约 <span style={{ color: C.cream }}>A$450-900</span>——比保险一年的免赔额还便宜。AirTag 必须藏到外人摸不到的位置（电瓶舱 / 座垫底层）——窃贼会先扫一遍找 tracker 然后扔掉。
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <FieldNote rotation={-1.5}>{fieldNotes.insurance_3}</FieldNote>
      </div>

      {/* § 6.5 中国驾照转换者注意 */}
      <SectionLabel num="6.5" source="QBE PDS · 真实华人骑手经验">中国驾照转换者注意 · CN LICENCE NOTE</SectionLabel>
      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px) 60px' }}>
        <div style={{
          padding: 'clamp(28px, 4vw, 40px)',
          border: `1px solid ${C.borderStrong}`,
          background: C.surface,
        }}>
          <div className="f-mono" style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 14 }}>· 三个真相 · 3 TRUTHS ·</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="f-display" style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
                01 · 你的国内汽车驾龄不算
              </div>
              <p className="f-serif" style={{ fontSize: 14, color: C.creamMute, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                保险公司只看你<span style={{ color: C.accent }}>VIC 摩托驾龄</span>。即使你国内 D1/E 驾照 + 开车 10 年——澳洲第一年还是按"新手"算。这是行业规则，没有公司例外。
              </p>
            </div>
            <div>
              <div className="f-display" style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
                02 · 但持照 ≥ 3 年转 Full 牌后，你能立刻享受老司机价
              </div>
              <p className="f-serif" style={{ fontSize: 14, color: C.creamMute, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                关键在<span style={{ color: C.accent }}>转 Full 牌的那一刻</span>——保险公司认的是 VIC licence 状态。你拿 Full 牌后报价立刻从 A$1.5k 降到 A$500。所以策略：转 Full 之前买便宜二手 + TPP，转 Full 后再考虑综合险新车。
              </p>
            </div>
            <div>
              <div className="f-display" style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: C.cream, lineHeight: 1.2, marginBottom: 8 }}>
                03 · 报价时务必如实填写
              </div>
              <p className="f-serif" style={{ fontSize: 14, color: C.creamMute, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                保险公司会核查 VicRoads 数据库——任何不实陈述（驾龄、停车、改装）<span style={{ color: C.accent }}>会让你索赔时全部失效</span>。即使省下一年保费，也可能赔进去 A$15k 的整车。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        <ResourceBox chapter="insurance" />
      </div>

      <div className="container" style={{ padding: '40px clamp(20px, 4vw, 64px) 80px', borderTop: `1px solid ${C.border}` }}>
        <div className="f-serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.3, color: C.cream, fontStyle: 'italic', fontWeight: 300, maxWidth: 900 }}>
          保险不是为了让你<span style={{ color: C.accent }}>开心</span>。<br/>
          是为了让你出事时<br/>
          有 <span style={{ color: C.accent }}>back home</span> 的路。
        </div>
        <div className="f-mono" style={{ fontSize: 10, color: C.muteDeep, letterSpacing: 3, marginTop: 24 }}>— FINE PRINT</div>
      </div>

      <ChapterOutro
        summary={[
          "VIC 强制保险 (TAC) 已含在 reg fee 里——无过错医疗险",
          "新手第一年溢价 1.5-3 倍——比价 3-5 家是必修",
          "墨尔本 CBD / Footscray 盗车率最高，防盗四件套 A$450-900",
          "中国驾照转换者：国内汽车驾龄不算，但持 3 年转 Full 后立刻降价",
        ]}
        isLast={true}
      />
    </section>
  );
}
