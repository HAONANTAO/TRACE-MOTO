// 内容数据集中地。改这里 → 浏览器立刻看到效果。
// 频次表：
//   bikeCatalog / bikes  · 每 6 个月
//   schools / certifications / lamsModRules · 每年
//   routes · 每年（季节性提醒）

export const chapters = [
  { num: "01", id: "licence", cn: "拿牌", en: "LICENCE" },
  { num: "02", id: "ride", cn: "选车", en: "RIDE" },
  { num: "03", id: "gear", cn: "装备", en: "GEAR" },
  { num: "04", id: "practice", cn: "修行", en: "PRACTICE" },
  { num: "05", id: "mountain", cn: "入山", en: "MOUNTAIN" },
  { num: "06", id: "insurance", cn: "护身", en: "INSURANCE" },
];

export const fieldNotes = {
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

export const bikes = [
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

export const schools = [
  { name: "HART", brand: "Honda", spots: ["Somerton", "St Kilda"], price2day: 579, type: "国际连锁", note: "教练标准化" },
  { name: "Stay Upright", brand: "—", spots: ["Werribee", "Braeside"], price2day: 599, type: "VIC 主流", note: "全澳最大" },
  { name: "Armstrongs", brand: "—", spots: ["Thomastown"], price2day: 525, type: "本地老牌", note: "性价比" },
  { name: "Ridetek", brand: "—", spots: ["Pakenham"], price2day: 499, type: "性价比", note: "东南区最便宜" },
];

export const certifications = [
  { name: "AS/NZS 1698", region: "澳新", legal: true, note: "澳洲合法上路必须", level: "★★★★" },
  { name: "ECE 22.06", region: "欧盟", legal: false, note: "国际主流，但澳洲法规要求 AS/NZS", level: "★★★★★" },
  { name: "DOT", region: "美国", legal: false, note: "美标，澳洲不承认", level: "★★★" },
  { name: "SNELL M2020", region: "美国", legal: false, note: "赛道级，但澳洲不替代 AS/NZS", level: "★★★★★" },
  { name: "3C", region: "中国", legal: false, note: "国内强制，澳洲无效", level: "★★" },
];

export const gear = [
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

export const drills = [
  { num: "01", title: "直线起停", en: "Stop & Go", desc: "半离合 + 找平衡。最基础也最重要", time: "30min", level: "★" },
  { num: "02", title: "8 字绕桩", en: "Figure Eight", desc: "用视线带车，不用方向。看下下个桩，身体自然跟上", time: "45min", level: "★★" },
  { num: "03", title: "紧急刹车", en: "Emergency Brake", desc: "前 7 后 3，重心后压。模拟从 40km/h 急停", time: "20min", level: "★★" },
  { num: "04", title: "慢速平衡", en: "Slow Balance", desc: "后刹拖着走，越慢越稳。穿过 10 米窄道用 30 秒", time: "30min", level: "★★★" },
  { num: "05", title: "压弯入门", en: "Counter Steer", desc: "推内把，身体微倾。在停车场画 8 字，先慢后快", time: "1hr", level: "★★★" },
];

export const yearRoadmap = [
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

export const groupSignals = [
  { hand: "左臂下摆 · 掌心朝下", meaning: "减速", en: "SLOW DOWN" },
  { hand: "左手食指 + 中指竖起（V 形）", meaning: "改 staggered 队形", en: "STAGGERED" },
  { hand: "左手食指竖起", meaning: "改 single file（单列）", en: "SINGLE FILE" },
  { hand: "左手指地（左侧）/ 右脚指地（右侧）", meaning: "路面危险物", en: "ROAD HAZARD" },
  { hand: "左手指油箱", meaning: "我快没油了", en: "FUEL STOP" },
  { hand: "拳头举起 + 上下挥动", meaning: "停车 / 休息", en: "PIT STOP" },
];

export const groupPitfalls = [
  { wrong: "跟得太紧（中国摩托文化习惯）", right: "Staggered 队形里跟前车 2 秒，斜对角 1 秒——安全冗余高过你想象" },
  { wrong: "弯道里超车 / 改线", right: "进弯前确定位置，弯里只走自己的线。改线 = 撞队友" },
  { wrong: "不打手势（觉得刹车灯就够了）", right: "前 3 个人都要重复 leader 的手势——确保最后的 sweep 也看到" },
  { wrong: "加油 / 厕所不等齐", right: "5-7 人是一个团。先到的等齐了再走，没人掉队" },
  { wrong: "发现走丢了就狂追", right: "靠边停车，等 sweep 来 / 打电话给 leader。骑超你能力的代价是命" },
];

export const accidentSteps = [
  { num: "01", title: "安全 · SAFETY", desc: "如果还能动，把人和车移到路肩 / 紧急车道。后方 50 米放警示三角架（车上常备）。" },
  { num: "02", title: "拨 000", desc: "有人受伤 → 救护车。任何人不能动 → 别碰。火 / 油泄漏 → 消防。一个电话同时叫所有服务。" },
  { num: "03", title: "交换信息", desc: "对方姓名、地址、车牌、保险公司名 + 保单号。VIC 法律：不交换属交通违法。" },
  { num: "04", title: "拍现场", desc: "车辆位置、刹车痕、路况、对方车牌、对方驾照、伤情。多角度拍——TAC 受理这些是核心证据。" },
  { num: "05", title: "找证人", desc: "记下证人姓名 + 电话。证人是 TAC 在你和对方说法不一致时唯一能信的来源。" },
  { num: "06", title: "报警", desc: "VIC 法律强制报警条件：有人受伤 / 对方逃逸 / 财产损失但找不到主人。其他可在线补报：Victoria Police Online。" },
  { num: "07", title: "看医生", desc: "即使感觉没事也去——whiplash / 内出血可能 24-72 小时后才显现。医院能直接帮你 lodge TAC claim。" },
];

export const routes = [
  { name: "Black Spur", cn: "黑刺道", from: "Healesville → Marysville", km: 32, fromCBD: 73, time: "1H", level: "进阶", note: "32 公里连续 sweepers，墨尔本必骑", best: "10-3 月", featured: true, type: "经典", vibe: ["弯道", "森林"] },
  { name: "Reefton Spur", cn: "瑞夫顿", from: "Marysville → Reefton", km: 45, fromCBD: 130, time: "1.5H", level: "高手", note: "Black Spur 进阶版，技术弯多", best: "12-2 月", type: "技术", vibe: ["弯道"] },
  { name: "Kinglake Loop", cn: "金莱克环", from: "St Andrews 出发", km: 60, fromCBD: 50, time: "2H", level: "入门", note: "新手第一次跑山首选", best: "全年", type: "入门", vibe: ["近郊", "温和"] },
  { name: "Mt Donna Buang", cn: "唐娜邦山", from: "Warburton 山顶", km: 38, fromCBD: 90, time: "1.5H", level: "进阶", note: "盘山雨林，路面湿滑", best: "11-3 月", type: "盘山", vibe: ["森林", "弯道"] },
  { name: "Great Ocean Road", cn: "大洋路", from: "Torquay → Apollo Bay", km: 130, fromCBD: 100, time: "半天", level: "进阶", note: "世界级海岸线，注意游客车", best: "10-4 月", type: "风景", vibe: ["海岸", "风景"] },
  { name: "Great Alpine Road", cn: "阿尔卑斯路", from: "Bright → Omeo", km: 200, fromCBD: 320, time: "2 天", level: "高手", note: "雪山公路，冬季危险", best: "11-4 月", type: "长途", vibe: ["长途", "风景"] },
];

export const bikeCatalog = [
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

export const recentQs = [
  { who: "L. 同学", days: "2 天前", q: "中国驾照 4 年，3 月份能转完吗？", aPreview: "完全可以。NAATI 翻译 1 周 + VicRoads 验证 + 2-Day 课程同时安排，3 月底前能拿 Full 牌..." },
  { who: "Yuki", days: "5 天前", q: "168cm 选 MT-03 和 Ninja 400 哪个？", aPreview: "MT-03 座椅 780mm 更友好，Ninja 400 座椅 785mm 但前倾姿势会让你脚更难触地..." },
  { who: "Ben.W", days: "1 周前", q: "Black Spur 现在去合适吗？", aPreview: "5 月已经入秋，桉树叶湿滑路况开始变差。建议改去 Kinglake Loop——海拔低、路况干..." },
];

export const headShapes = [
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

export const lamsModRules = [
  { name: "拆 throttle restrictor / 解禁", legal: false, ins: false, note: "完全违法 + 保险作废，事故全赔" },
  { name: "改 ECU / Tune / 排气", legal: false, ins: false, note: "动力上升即 LAMS 失效" },
  { name: "高流量进气 / Air filter", legal: false, ins: false, note: "动力可能上升，技术上违规" },
  { name: "Lowering link / 降低座椅", legal: false, ins: true, note: "矮个常见改装，原则违规但少被查，必须上报保险" },
  { name: "Frame slider / 车架保护", legal: false, ins: true, note: "原则违规但极少被查，多数保险接受" },
  { name: "Tail tidy / 短尾灯", legal: false, ins: true, note: "原则违规但极少被查" },
  { name: "Bar end mirror / 后视镜", legal: true, ins: true, note: "视野改善反而更安全" },
  { name: "Vinyl wrap / 贴纸 / 喷漆", legal: true, ins: true, note: "外观改装，没问题" },
];
