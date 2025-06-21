//新增内容提示说明：新增角色时需要添加角色数据和拼音解析
// 调试模式开关，true时控制台显示目标角色，false时不显示
const DEBUG_MODE = false;

// 游戏状态
let gameState = {
    mode: null, // 'normal'、'infinite' 或 'challenge'
    targetCharacter: null,
    attempts: 0,
    maxAttempts: 6,
    guesses: [],
    gameOver: false,
    gaveUp: false,
    startTime: null,
    guessedCharacters: new Set(), // 记录已猜测的角色
    // 挑战模式特有属性
    challengeScore: 0,
    challengeTimer: null,
    challengeTimeLeft: 100,
    challengeHints: [],
    currentHintLevel: 0,
    isGameStarted: false
};

// 角色数据
const charactersData = {
    "1": {
      "name": "圣园 未花",
      "intro_link": "https://kivo.wiki/data/character/1",
      "avatar_url": "https://static.kivo.wiki/images/students/圣园未花/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "茶话会",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "是"
    },
    "2": {
      "name": "才羽 桃",
      "intro_link": "https://kivo.wiki/data/character/2",
      "avatar_url": "https://static.kivo.wiki/images/students/才羽桃井/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "3": {
      "name": "白洲 梓",
      "intro_link": "https://kivo.wiki/data/character/3",
      "avatar_url": "https://static.kivo.wiki/images/students/白洲梓/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "4": {
      "name": "春原 心奈",
      "intro_link": "https://kivo.wiki/data/character/4",
      "avatar_url": "https://static.kivo.wiki/images/students/春原心奈/avatar.png",
      "学院": "山海经高等学院",
      "社团": "梅花园",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "治疗",
      "限定": "否"
    },
    "6": {
      "name": "月雪 宫子",
      "intro_link": "https://kivo.wiki/data/character/6",
      "avatar_url": "https://static.kivo.wiki/images/students/月雪宫子/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "7": {
      "name": "风仓 萌绘",
      "intro_link": "https://kivo.wiki/data/character/7",
      "avatar_url": "https://static.kivo.wiki/images/students/风仓萌绘/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "8": {
      "name": "空井 咲",
      "intro_link": "https://kivo.wiki/data/character/8",
      "avatar_url": "https://static.kivo.wiki/images/students/空井咲/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "9": {
      "name": "霞泽 美游",
      "intro_link": "https://kivo.wiki/data/character/9",
      "avatar_url": "https://static.kivo.wiki/images/students/霞泽美游/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "10": {
      "name": "栗村 爱理",
      "intro_link": "https://kivo.wiki/data/character/10",
      "avatar_url": "https://static.kivo.wiki/images/students/栗村%20爱莉/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "甜点部",
      "武器类型": "冲锋枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "11": {
      "name": "狐坂 若藻",
      "intro_link": "https://kivo.wiki/data/character/11",
      "avatar_url": "https://static.kivo.wiki/images/students/狐坂若藻/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "七囚人",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "18": {
      "name": "冰室 濑名",
      "intro_link": "https://kivo.wiki/data/character/18",
      "avatar_url": "https://static.kivo.wiki/images/students/冰室濑名/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "急救医学部",
      "武器类型": "榴弹发射器",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "T.S.",
      "限定": "否"
    },
    "20": {
      "name": "各务 千寻",
      "intro_link": "https://kivo.wiki/data/character/20",
      "avatar_url": "https://static.kivo.wiki/images/students/各务千寻/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "22": {
      "name": "水羽 三森",
      "intro_link": "https://kivo.wiki/data/character/22",
      "avatar_url": "https://static.kivo.wiki/images/students/水羽弥守/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "修行部",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "23": {
      "name": "古关 忧",
      "intro_link": "https://kivo.wiki/data/character/23",
      "avatar_url": "https://static.kivo.wiki/images/students/古关%20忧/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "图书管理部",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "24": {
      "name": "室笠 茜",
      "intro_link": "https://kivo.wiki/data/character/24",
      "avatar_url": "https://static.kivo.wiki/images/students/室笠%20茜/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "手枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "25": {
      "name": "桐藤 渚",
      "intro_link": "https://kivo.wiki/data/character/25",
      "avatar_url": "https://static.kivo.wiki/images/students/桐藤%20渚/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "茶话会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "是"
    },
    "26": {
      "name": "若叶 日向",
      "intro_link": "https://kivo.wiki/data/character/26",
      "avatar_url": "https://static.kivo.wiki/images/students/若叶%20日向/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "姐妹会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "27": {
      "name": "才羽 绿",
      "intro_link": "https://kivo.wiki/data/character/27",
      "avatar_url": "https://static.kivo.wiki/images/students/才羽绿/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "28": {
      "name": "生盐 诺亚",
      "intro_link": "https://kivo.wiki/data/character/28",
      "avatar_url": "https://static.kivo.wiki/images/students/生盐%20诺亚/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "研讨会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "29": {
      "name": "勇美 枫",
      "intro_link": "https://kivo.wiki/data/character/29",
      "avatar_url": "https://static.kivo.wiki/images/students/勇美%20枫/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "修行部",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "32": {
      "name": "大野 月咏",
      "intro_link": "https://kivo.wiki/data/character/32",
      "avatar_url": "https://static.kivo.wiki/images/students/大野%20月咏/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "忍术研究部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "33": {
      "name": "戒野 美咲",
      "intro_link": "https://kivo.wiki/data/character/33",
      "avatar_url": "https://static.kivo.wiki/images/students/戒野%20美咲/avatar.png",
      "学院": "阿里乌斯分校",
      "社团": "阿里乌斯战术小队",
      "武器类型": "导弹发射器",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "34": {
      "name": "槌永 日和",
      "intro_link": "https://kivo.wiki/data/character/34",
      "avatar_url": "https://static.kivo.wiki/images/students/槌永%20日和/avatar.png",
      "学院": "阿里乌斯分校",
      "社团": "阿里乌斯战术小队",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "35": {
      "name": "秤 亚津子",
      "intro_link": "https://kivo.wiki/data/character/35",
      "avatar_url": "https://static.kivo.wiki/images/students/秤%20亚津子/avatar.png",
      "学院": "阿里乌斯分校",
      "社团": "阿里乌斯战术小队",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "36": {
      "name": "锭前 纱织",
      "intro_link": "https://kivo.wiki/data/character/36",
      "avatar_url": "https://static.kivo.wiki/images/students/锭前%20纱织/avatar.png",
      "学院": "阿里乌斯分校",
      "社团": "阿里乌斯战术小队",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "37": {
      "name": "杏山 和纱",
      "intro_link": "https://kivo.wiki/data/character/37",
      "avatar_url": "https://static.kivo.wiki/images/students/杏山%20和纱/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "甜点部",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "38": {
      "name": "枣 伊吕波",
      "intro_link": "https://kivo.wiki/data/character/38",
      "avatar_url": "https://static.kivo.wiki/images/students/枣%20伊吕波/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "万魔殿",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "T.S.",
      "限定": "否"
    },
    "39": {
      "name": "天雨 亚子",
      "intro_link": "https://kivo.wiki/data/character/39",
      "avatar_url": "https://static.kivo.wiki/images/students/天雨%20亚子/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "40": {
      "name": "十六夜 野宫（泳装）",
      "intro_link": "https://kivo.wiki/data/character/40",
      "avatar_url": "https://static.kivo.wiki/images/students/十六夜%20野宫/泳装/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "41": {
      "name": "狐坂 若藻（泳装）",
      "intro_link": "https://kivo.wiki/data/character/41",
      "avatar_url": "https://static.kivo.wiki/images/students/狐坂%20若藻/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "七囚人",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "42": {
      "name": "小鸟游 星野（泳装）",
      "intro_link": "https://kivo.wiki/data/character/42",
      "avatar_url": "https://static.kivo.wiki/images/students/小鸟游%20星野/泳装/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "辅助",
      "限定": "是"
    },
    "44": {
      "name": "黑见 芹香（新年）",
      "intro_link": "https://kivo.wiki/data/character/44",
      "avatar_url": "https://static.kivo.wiki/images/students/黑见%20芹香/正月/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "45": {
      "name": "池仓 真里奈",
      "intro_link": "https://kivo.wiki/data/character/45",
      "avatar_url": "https://static.kivo.wiki/images/students/池仓%20玛利娜/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "红冬事务局",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "46": {
      "name": "久田 泉奈（泳装）",
      "intro_link": "https://kivo.wiki/data/character/46",
      "avatar_url": "https://static.kivo.wiki/images/students/久田%20泉奈/泳装/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "忍术研究部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "是"
    },
    "47": {
      "name": "奥空 绫音（泳装）",
      "intro_link": "https://kivo.wiki/data/character/47",
      "avatar_url": "https://static.kivo.wiki/images/students/奥空%20绫音/泳装/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "手枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "T.S.",
      "限定": "是"
    },
    "48": {
      "name": "和乐 千世（泳装）",
      "intro_link": "https://kivo.wiki/data/character/48",
      "avatar_url": "https://static.kivo.wiki/images/students/和乐%20千世/泳装/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "阴阳部",
      "武器类型": "榴弹发射器",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "是"
    },
    "49": {
      "name": "爱清 风香（新年）",
      "intro_link": "https://kivo.wiki/data/character/49",
      "avatar_url": "https://static.kivo.wiki/images/students/爱清%20枫香/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "供餐部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "是"
    },
    "50": {
      "name": "河和 静子（泳装）",
      "intro_link": "https://kivo.wiki/data/character/50",
      "avatar_url": "https://static.kivo.wiki/images/students/河和%20静子/泳装/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "庆典运营管理部",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "是"
    },
    "51": {
      "name": "猫冢 响（应援团）",
      "intro_link": "https://kivo.wiki/data/character/51",
      "avatar_url": "https://static.kivo.wiki/images/students/猫塚%20响/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "迫击炮",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "52": {
      "name": "早濑 优香",
      "intro_link": "https://kivo.wiki/data/character/52",
      "avatar_url": "https://static.kivo.wiki/images/students/早瀬%20优香/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "研讨会",
      "武器类型": "冲锋枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "53": {
      "name": "白石 歌原（应援团）",
      "intro_link": "https://kivo.wiki/data/character/53",
      "avatar_url": "https://static.kivo.wiki/images/students/白石%20歌原/应援团/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "54": {
      "name": "早濑 优香（体操服）",
      "intro_link": "https://kivo.wiki/data/character/54",
      "avatar_url": "https://static.kivo.wiki/images/students/早濑%20优香/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "研讨会",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "是"
    },
    "55": {
      "name": "伊落 玛丽（体操服）",
      "intro_link": "https://kivo.wiki/data/character/55",
      "avatar_url": "https://static.kivo.wiki/images/students/伊落%20玛丽/体育服/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "姐妹会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "治疗",
      "限定": "是"
    },
    "56": {
      "name": "水羽 三森（泳装）",
      "intro_link": "https://kivo.wiki/data/character/56",
      "avatar_url": "https://static.kivo.wiki/images/students/水羽%20弥守/泳装/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "修行部",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "57": {
      "name": "丰见 琴里（应援团）",
      "intro_link": "https://kivo.wiki/data/character/57",
      "avatar_url": "https://static.kivo.wiki/images/students/丰见%20小鸟/应援团/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "58": {
      "name": "砂狼 白子（泳装）",
      "intro_link": "https://kivo.wiki/data/character/58",
      "avatar_url": "https://static.kivo.wiki/images/students/砂狼%20白子/泳装/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "60": {
      "name": "羽川 莲见（体操服）",
      "intro_link": "https://kivo.wiki/data/character/60",
      "avatar_url": "https://static.kivo.wiki/images/students/羽川%20莲见/体育服/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "狙击枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "62": {
      "name": "明星 日鞠",
      "intro_link": "https://kivo.wiki/data/character/62",
      "avatar_url": "https://static.kivo.wiki/images/students/明星%20日鞠/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "超自然现象调查部",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "63": {
      "name": "合欢垣 吹雪",
      "intro_link": "https://kivo.wiki/data/character/63",
      "avatar_url": "https://static.kivo.wiki/images/students/合欢垣%20吹雪/avatar.png",
      "学院": "瓦尔基丽警员学院",
      "社团": "生活安全局",
      "武器类型": "狙击枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "68": {
      "name": "初音 未来",
      "intro_link": "https://kivo.wiki/data/character/68",
      "avatar_url": "https://static.kivo.wiki/images/students/初音%20未来/avatar.png",
      "学院": "沙勒",
      "社团": "VOCALOID",
      "武器类型": "榴弹发射器",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "是"
    },
    "69": {
      "name": "猫冢 响",
      "intro_link": "https://kivo.wiki/data/character/69",
      "avatar_url": "https://static.kivo.wiki/images/students/猫冢%20响/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "迫击炮",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "70": {
      "name": "阿慈谷 日富美（泳装）",
      "intro_link": "https://kivo.wiki/data/character/70",
      "avatar_url": "https://static.kivo.wiki/images/students/阿慈谷%20日富美/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "T.S.",
      "限定": "否"
    },
    "71": {
      "name": "空崎 日奈",
      "intro_link": "https://kivo.wiki/data/character/71",
      "avatar_url": "https://static.kivo.wiki/images/students/空崎%20日奈/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "72": {
      "name": "银镜 伊织",
      "intro_link": "https://kivo.wiki/data/character/72",
      "avatar_url": "https://static.kivo.wiki/images/students/银镜%20伊织/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "73": {
      "name": "狮子堂 泉",
      "intro_link": "https://kivo.wiki/data/character/73",
      "avatar_url": "https://static.kivo.wiki/images/students/狮子堂%20泉/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "74": {
      "name": "阿慈谷 日富美",
      "intro_link": "https://kivo.wiki/data/character/74",
      "avatar_url": "https://static.kivo.wiki/images/students/阿慈谷%20日富美/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "75": {
      "name": "狮子堂 泉（泳装）",
      "intro_link": "https://kivo.wiki/data/character/75",
      "avatar_url": "https://static.kivo.wiki/images/students/狮子堂%20泉/泳装/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "是"
    },
    "76": {
      "name": "小鸟游 星野",
      "intro_link": "https://kivo.wiki/data/character/76",
      "avatar_url": "https://static.kivo.wiki/images/students/小鸟游%20星野/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "77": {
      "name": "飞鸟马 时",
      "intro_link": "https://kivo.wiki/data/character/77",
      "avatar_url": "https://static.kivo.wiki/images/students/飞鸟马%20时/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "弹性装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "是"
    },
    "78": {
      "name": "十六夜 野宫",
      "intro_link": "https://kivo.wiki/data/character/78",
      "avatar_url": "https://static.kivo.wiki/images/students/十六夜%20野宫/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "重机枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "79": {
      "name": "静山 真白",
      "intro_link": "https://kivo.wiki/data/character/79",
      "avatar_url": "https://static.kivo.wiki/images/students/静山%20真白/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "80": {
      "name": "静山 真白（泳装）",
      "intro_link": "https://kivo.wiki/data/character/80",
      "avatar_url": "https://static.kivo.wiki/images/students/静山%20真白/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "是"
    },
    "81": {
      "name": "花冈 柚子",
      "intro_link": "https://kivo.wiki/data/character/81",
      "avatar_url": "https://static.kivo.wiki/images/students/花冈%20柚子/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "榴弹发射器",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "82": {
      "name": "花冈 柚子（女仆）",
      "intro_link": "https://kivo.wiki/data/character/82",
      "avatar_url": "https://static.kivo.wiki/images/students/花冈%20柚子/女仆/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "榴弹发射器",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "弹性装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "是"
    },
    "83": {
      "name": "黑见 芹香",
      "intro_link": "https://kivo.wiki/data/character/83",
      "avatar_url": "https://static.kivo.wiki/images/students/黑见%20芹香/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "84": {
      "name": "和乐 千世",
      "intro_link": "https://kivo.wiki/data/character/84",
      "avatar_url": "https://static.kivo.wiki/images/students/和乐%20千世/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "阴阳部",
      "武器类型": "榴弹发射器",
      "稀有度": "2",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "85": {
      "name": "奥空 绫音",
      "intro_link": "https://kivo.wiki/data/character/85",
      "avatar_url": "https://static.kivo.wiki/images/students/奥空%20绫音/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "手枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "86": {
      "name": "砂狼 白子",
      "intro_link": "https://kivo.wiki/data/character/86",
      "avatar_url": "https://static.kivo.wiki/images/students/砂狼%20白子/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "87": {
      "name": "砂狼 白子（骑行）",
      "intro_link": "https://kivo.wiki/data/character/87",
      "avatar_url": "https://static.kivo.wiki/images/students/砂狼%20白子/单车/avatar.png",
      "学院": "阿拜多斯高等学院",
      "社团": "对策委员会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "88": {
      "name": "药子 纱绫",
      "intro_link": "https://kivo.wiki/data/character/88",
      "avatar_url": "https://static.kivo.wiki/images/students/药子%20纱绫/avatar.png",
      "学院": "山海经高等学院",
      "社团": "炼丹研究会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "89": {
      "name": "药子 纱绫（便服）",
      "intro_link": "https://kivo.wiki/data/character/89",
      "avatar_url": "https://static.kivo.wiki/images/students/药子%20纱绫/私服/avatar.png",
      "学院": "山海经高等学院",
      "社团": "炼丹研究会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "90": {
      "name": "春原 瞬",
      "intro_link": "https://kivo.wiki/data/character/90",
      "avatar_url": "https://static.kivo.wiki/images/students/春原%20瞬/avatar.png",
      "学院": "山海经高等学院",
      "社团": "梅花园",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "91": {
      "name": "鹫见 芹娜",
      "intro_link": "https://kivo.wiki/data/character/91",
      "avatar_url": "https://static.kivo.wiki/images/students/鹫见%20芹娜/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "救护骑士团",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "92": {
      "name": "浦和 花子",
      "intro_link": "https://kivo.wiki/data/character/92",
      "avatar_url": "https://static.kivo.wiki/images/students/浦和%20花子/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "93": {
      "name": "春日 椿",
      "intro_link": "https://kivo.wiki/data/character/93",
      "avatar_url": "https://static.kivo.wiki/images/students/春日%20椿/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "修行部",
      "武器类型": "冲锋枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "94": {
      "name": "剑先 鹤城",
      "intro_link": "https://kivo.wiki/data/character/94",
      "avatar_url": "https://static.kivo.wiki/images/students/剑先%20鹤城/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "95": {
      "name": "佐城 巴",
      "intro_link": "https://kivo.wiki/data/character/95",
      "avatar_url": "https://static.kivo.wiki/images/students/佐城%20智惠/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "红冬事务局",
      "武器类型": "狙击枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "是"
    },
    "96": {
      "name": "河和 静子",
      "intro_link": "https://kivo.wiki/data/character/96",
      "avatar_url": "https://static.kivo.wiki/images/students/河和%20静子/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "庆典运营管理部",
      "武器类型": "霰弹枪",
      "稀有度": "2",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "97": {
      "name": "爱清 风香",
      "intro_link": "https://kivo.wiki/data/character/97",
      "avatar_url": "https://static.kivo.wiki/images/students/爱清%20枫香/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "供餐部",
      "武器类型": "冲锋枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "98": {
      "name": "朝颜 花江",
      "intro_link": "https://kivo.wiki/data/character/98",
      "avatar_url": "https://static.kivo.wiki/images/students/朝颜%20花江/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "救护骑士团",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "99": {
      "name": "伊落 玛丽",
      "intro_link": "https://kivo.wiki/data/character/99",
      "avatar_url": "https://static.kivo.wiki/images/students/伊落%20玛丽/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "姐妹会",
      "武器类型": "手枪",
      "稀有度": "2",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "100": {
      "name": "中务 桐乃",
      "intro_link": "https://kivo.wiki/data/character/100",
      "avatar_url": "https://static.kivo.wiki/images/students/中务%20桐乃/avatar.png",
      "学院": "瓦尔基丽警员学院",
      "社团": "生活安全局",
      "武器类型": "手枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "101": {
      "name": "黑崎 小雪",
      "intro_link": "https://kivo.wiki/data/character/101",
      "avatar_url": "https://static.kivo.wiki/images/students/黑崎%20小雪/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "研讨会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "102": {
      "name": "陆八魔 爱露（新年）",
      "intro_link": "https://kivo.wiki/data/character/102",
      "avatar_url": "https://static.kivo.wiki/images/students/陆八魔%20阿露/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "103": {
      "name": "赤司 纯子",
      "intro_link": "https://kivo.wiki/data/character/103",
      "avatar_url": "https://static.kivo.wiki/images/students/赤司%20纯子/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "104": {
      "name": "阿洛娜",
      "intro_link": "https://kivo.wiki/data/character/104",
      "avatar_url": "https://static.kivo.wiki/images/students/阿罗娜/avatar.png",
      "学院": "?",
      "社团": "?",
      "武器类型": "?",
      "稀有度": "?",
      "攻击类型": "?",
      "防御类型": "?",
      "站位": "?",
      "职能定位": "?",
      "限定": "?"
    },
    "106": {
      "name": "间宵 时雨",
      "intro_link": "https://kivo.wiki/data/character/106",
      "avatar_url": "https://static.kivo.wiki/images/students/间宵%20时雨/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "227号特别班",
      "武器类型": "榴弹发射器",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "107": {
      "name": "浅黄 睦月",
      "intro_link": "https://kivo.wiki/data/character/107",
      "avatar_url": "https://static.kivo.wiki/images/students/浅黄%20睦月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "重机枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "108": {
      "name": "天童 爱丽丝",
      "intro_link": "https://kivo.wiki/data/character/108",
      "avatar_url": "https://static.kivo.wiki/images/students/天童%20爱丽丝/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "轨道炮",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "109": {
      "name": "春原 瞬（小）",
      "intro_link": "https://kivo.wiki/data/character/109",
      "avatar_url": "https://static.kivo.wiki/images/students/春原%20瞬/幼女/avatar.png",
      "学院": "山海经高等学院",
      "社团": "梅花园",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "110": {
      "name": "鳄渊 明里",
      "intro_link": "https://kivo.wiki/data/character/110",
      "avatar_url": "https://static.kivo.wiki/images/students/鳄渊%20明里/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "111": {
      "name": "羽川 莲见",
      "intro_link": "https://kivo.wiki/data/character/111",
      "avatar_url": "https://static.kivo.wiki/images/students/羽川%20莲见/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "狙击枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "112": {
      "name": "陆八魔 爱露",
      "intro_link": "https://kivo.wiki/data/character/112",
      "avatar_url": "https://static.kivo.wiki/images/students/陆八魔%20阿露/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "113": {
      "name": "一之濑 明日奈",
      "intro_link": "https://kivo.wiki/data/character/113",
      "avatar_url": "https://static.kivo.wiki/images/students/一之瀬%20明日奈/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "114": {
      "name": "仲正 一花",
      "intro_link": "https://kivo.wiki/data/character/114",
      "avatar_url": "https://static.kivo.wiki/images/students/仲正%20一花/original/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "振动",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "116": {
      "name": "鬼怒川 霞",
      "intro_link": "https://kivo.wiki/data/character/116",
      "avatar_url": "https://static.kivo.wiki/images/students/鬼怒川%20霞/original/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "温泉开发部",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "振动",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "117": {
      "name": "火宫 千夏",
      "intro_link": "https://kivo.wiki/data/character/117",
      "avatar_url": "https://static.kivo.wiki/images/students/火宫%20千夏/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "手枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "118": {
      "name": "伊原木 好美",
      "intro_link": "https://kivo.wiki/data/character/118",
      "avatar_url": "https://static.kivo.wiki/images/students/伊原木%20好美/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "甜点部",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "119": {
      "name": "天见 和香",
      "intro_link": "https://kivo.wiki/data/character/119",
      "avatar_url": "https://static.kivo.wiki/images/students/天见%20和香/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "227号特别班",
      "武器类型": "冲锋枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "是"
    },
    "120": {
      "name": "天见 和香（温泉）",
      "intro_link": "https://kivo.wiki/data/character/120",
      "avatar_url": "https://static.kivo.wiki/images/students/天见%20和香/温泉/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "227号特别班",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "121": {
      "name": "空崎 日奈（泳装）",
      "intro_link": "https://kivo.wiki/data/character/121",
      "avatar_url": "https://static.kivo.wiki/images/students/空崎%20日奈/泳装/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "122": {
      "name": "银镜 伊织（泳装）",
      "intro_link": "https://kivo.wiki/data/character/122",
      "avatar_url": "https://static.kivo.wiki/images/students/银镜%20伊织/泳装/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "123": {
      "name": "鬼方 佳代子",
      "intro_link": "https://kivo.wiki/data/character/123",
      "avatar_url": "https://static.kivo.wiki/images/students/鬼方%20佳代子/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "124": {
      "name": "伊草 春香（新年）",
      "intro_link": "https://kivo.wiki/data/character/124",
      "avatar_url": "https://static.kivo.wiki/images/students/伊草%20遥香/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "128": {
      "name": "朱城 瑠海",
      "intro_link": "https://kivo.wiki/data/character/128",
      "avatar_url": "https://static.kivo.wiki/images/students/朱城%20留美/avatar.png",
      "学院": "山海经高等学院",
      "社团": "玄武商会",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "治疗",
      "限定": "否"
    },
    "129": {
      "name": "苍森 美祢",
      "intro_link": "https://kivo.wiki/data/character/129",
      "avatar_url": "https://static.kivo.wiki/images/students/苍森%20美弥/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "救护骑士团",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "130": {
      "name": "一之濑 明日奈（邦尼）",
      "intro_link": "https://kivo.wiki/data/character/130",
      "avatar_url": "https://static.kivo.wiki/images/students/一之濑%20明日奈/兔女郎/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "131": {
      "name": "近卫 南",
      "intro_link": "https://kivo.wiki/data/character/131",
      "avatar_url": "https://static.kivo.wiki/images/students/佐藤%20南/avatar.png",
      "学院": "山海经高等学院",
      "社团": "玄龙门",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "132": {
      "name": "室笠 茜（邦尼）",
      "intro_link": "https://kivo.wiki/data/character/132",
      "avatar_url": "https://static.kivo.wiki/images/students/室笠%20茜/兔女郎/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "137": {
      "name": "角楯 花凛（邦尼）",
      "intro_link": "https://kivo.wiki/data/character/137",
      "avatar_url": "https://static.kivo.wiki/images/students/角楯%20花凛/兔女郎/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "138": {
      "name": "美甘 妮露（邦尼）",
      "intro_link": "https://kivo.wiki/data/character/138",
      "avatar_url": "https://static.kivo.wiki/images/students/美甘%20尼禄/兔女郎/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "是"
    },
    "139": {
      "name": "柚鸟 夏",
      "intro_link": "https://kivo.wiki/data/character/139",
      "avatar_url": "https://static.kivo.wiki/images/students/柚鸟%20夏/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "甜点部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "140": {
      "name": "火宫 千夏（温泉）",
      "intro_link": "https://kivo.wiki/data/character/140",
      "avatar_url": "https://static.kivo.wiki/images/students/火宫%20千夏/温泉/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "风纪委员会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "141": {
      "name": "连河 切里诺（温泉）",
      "intro_link": "https://kivo.wiki/data/character/141",
      "avatar_url": "https://static.kivo.wiki/images/students/连河%20切利诺/温泉/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "红冬事务局",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "T.S.",
      "限定": "否"
    },
    "142": {
      "name": "宇泽 玲纱",
      "intro_link": "https://kivo.wiki/data/character/142",
      "avatar_url": "https://static.kivo.wiki/images/students/宇泽%20玲纱/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "崔尼蒂自警团",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "143": {
      "name": "桑上 果穗",
      "intro_link": "https://kivo.wiki/data/character/143",
      "avatar_url": "https://static.kivo.wiki/images/students/桑上%20果穗/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "阴阳部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "144": {
      "name": "尾刃 康娜",
      "intro_link": "https://kivo.wiki/data/character/144",
      "avatar_url": "https://static.kivo.wiki/images/students/尾刃%20叶渚/avatar.png",
      "学院": "瓦尔基丽警员学院",
      "社团": "公共安全局",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "145": {
      "name": "黑馆 晴奈（新年）",
      "intro_link": "https://kivo.wiki/data/character/145",
      "avatar_url": "https://static.kivo.wiki/images/students/黑馆%20晴奈/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "146": {
      "name": "赤司 纯子（新年）",
      "intro_link": "https://kivo.wiki/data/character/146",
      "avatar_url": "https://static.kivo.wiki/images/students/赤司%20纯子/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "是"
    },
    "152": {
      "name": "天童 爱丽丝（女仆）",
      "intro_link": "https://kivo.wiki/data/character/152",
      "avatar_url": "https://static.kivo.wiki/images/students/天童%20爱丽丝/女仆/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "游戏开发部",
      "武器类型": "轨道炮",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "153": {
      "name": "鹫见 芹娜（圣诞）",
      "intro_link": "https://kivo.wiki/data/character/153",
      "avatar_url": "https://static.kivo.wiki/images/students/鹫见%20芹娜/圣诞节/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "救护骑士团",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "154": {
      "name": "黑馆 晴奈（体操服）",
      "intro_link": "https://kivo.wiki/data/character/154",
      "avatar_url": "https://static.kivo.wiki/images/students/黑馆%20晴奈/体育服/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "振动",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "157": {
      "name": "下江 小春",
      "intro_link": "https://kivo.wiki/data/character/157",
      "avatar_url": "https://static.kivo.wiki/images/students/下江%20小春/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "治疗",
      "限定": "否"
    },
    "158": {
      "name": "和泉元 艾米",
      "intro_link": "https://kivo.wiki/data/character/158",
      "avatar_url": "https://static.kivo.wiki/images/students/和泉元%20艾米/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "超自然现象调查部",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "160": {
      "name": "小钩 晴",
      "intro_link": "https://kivo.wiki/data/character/160",
      "avatar_url": "https://static.kivo.wiki/images/students/小钩%20晴/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "突击步枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "166": {
      "name": "安守 实梨",
      "intro_link": "https://kivo.wiki/data/character/166",
      "avatar_url": "https://static.kivo.wiki/images/students/安守%20未乃里/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "工务部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "167": {
      "name": "秋泉 红叶",
      "intro_link": "https://kivo.wiki/data/character/167",
      "avatar_url": "https://static.kivo.wiki/images/students/秋泉%20红叶/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "知识解放战线",
      "武器类型": "导弹发射器",
      "稀有度": "2",
      "攻击类型": "振动",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "175": {
      "name": "角楯 花凛",
      "intro_link": "https://kivo.wiki/data/character/175",
      "avatar_url": "https://static.kivo.wiki/images/students/角楯%20花凛/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "176": {
      "name": "鬼方 佳代子",
      "intro_link": "https://kivo.wiki/data/character/176",
      "avatar_url": "https://static.kivo.wiki/images/students/鬼方%20佳代子/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "手枪",
      "稀有度": "2",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "177": {
      "name": "浅黄 睦月（新年）",
      "intro_link": "https://kivo.wiki/data/character/177",
      "avatar_url": "https://static.kivo.wiki/images/students/浅黄%20睦月/正月/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "178": {
      "name": "朝颜 花江（圣诞）",
      "intro_link": "https://kivo.wiki/data/character/178",
      "avatar_url": "https://static.kivo.wiki/images/students/朝颜%20花江/圣诞节/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "救护骑士团",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "SPECIAL",
      "职能定位": "治疗",
      "限定": "否"
    },
    "179": {
      "name": "连河 切里诺",
      "intro_link": "https://kivo.wiki/data/character/179",
      "avatar_url": "https://static.kivo.wiki/images/students/连河%20切里诺/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "红冬事务局",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "180": {
      "name": "久田 泉奈",
      "intro_link": "https://kivo.wiki/data/character/180",
      "avatar_url": "https://static.kivo.wiki/images/students/久田%20泉奈/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "忍术研究部",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "181": {
      "name": "守月 铃美",
      "intro_link": "https://kivo.wiki/data/character/181",
      "avatar_url": "https://static.kivo.wiki/images/students/守月%20铃美/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "崔尼蒂自警团",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "182": {
      "name": "小涂 真纪",
      "intro_link": "https://kivo.wiki/data/character/182",
      "avatar_url": "https://static.kivo.wiki/images/students/小涂%20真纪/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "185": {
      "name": "白石 歌原",
      "intro_link": "https://kivo.wiki/data/character/185",
      "avatar_url": "https://static.kivo.wiki/images/students/白石%20歌原/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "冲锋枪",
      "稀有度": "2",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "否"
    },
    "186": {
      "name": "牛牧 朱莉",
      "intro_link": "https://kivo.wiki/data/character/186",
      "avatar_url": "https://static.kivo.wiki/images/students/牛牧%20茱莉/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "供餐部",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "187": {
      "name": "乙花 堇",
      "intro_link": "https://kivo.wiki/data/character/187",
      "avatar_url": "https://static.kivo.wiki/images/students/乙花%20堇/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "健身部",
      "武器类型": "霰弹枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "192": {
      "name": "伊草 春香",
      "intro_link": "https://kivo.wiki/data/character/192",
      "avatar_url": "https://static.kivo.wiki/images/students/伊草%20春香/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "便利屋68",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "194": {
      "name": "圆堂 志美子",
      "intro_link": "https://kivo.wiki/data/character/194",
      "avatar_url": "https://static.kivo.wiki/images/students/圆堂%20志美子/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "图书管理部",
      "武器类型": "突击步枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "195": {
      "name": "黑馆 晴奈",
      "intro_link": "https://kivo.wiki/data/character/195",
      "avatar_url": "https://static.kivo.wiki/images/students/黑馆%20晴奈/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "美食研究会",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "203": {
      "name": "歌住 樱子",
      "intro_link": "https://kivo.wiki/data/character/203",
      "avatar_url": "https://static.kivo.wiki/images/students/歌住%20樱子/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "姐妹会",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "211": {
      "name": "丰见 琴里",
      "intro_link": "https://kivo.wiki/data/character/211",
      "avatar_url": "https://static.kivo.wiki/images/students/丰见%20小鸟/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "工程部",
      "武器类型": "重机枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "212": {
      "name": "音濑 小玉",
      "intro_link": "https://kivo.wiki/data/character/212",
      "avatar_url": "https://static.kivo.wiki/images/students/音濑%20小玉/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "手枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "辅助",
      "限定": "否"
    },
    "213": {
      "name": "美甘 妮露",
      "intro_link": "https://kivo.wiki/data/character/213",
      "avatar_url": "https://static.kivo.wiki/images/students/美甘%20尼禄/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "214": {
      "name": "千鸟 满",
      "intro_link": "https://kivo.wiki/data/character/214",
      "avatar_url": "https://static.kivo.wiki/images/students/千鸟%20满/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "忍术研究部",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "是"
    },
    "215": {
      "name": "朝比奈 菲娜",
      "intro_link": "https://kivo.wiki/data/character/215",
      "avatar_url": "https://static.kivo.wiki/images/students/朝比奈%20菲娜/avatar.png",
      "学院": "百鬼夜行联合学院",
      "社团": "庆典运营管理部",
      "武器类型": "重机枪",
      "稀有度": "1",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "否"
    },
    "228": {
      "name": "白洲 梓（泳装）",
      "intro_link": "https://kivo.wiki/data/character/228",
      "avatar_url": "https://static.kivo.wiki/images/students/白洲%20梓/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "神秘",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "是"
    },
    "229": {
      "name": "下仓 惠",
      "intro_link": "https://kivo.wiki/data/character/229",
      "avatar_url": "https://static.kivo.wiki/images/students/下仓%20惠/avatar.png",
      "学院": "歌赫娜学院",
      "社团": "温泉开发部",
      "武器类型": "喷火器",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "否"
    },
    "230": {
      "name": "飞鸟马 时（邦尼）",
      "intro_link": "https://kivo.wiki/data/character/230",
      "avatar_url": "https://static.kivo.wiki/images/students/飞鸟马%20时/兔女郎/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "C&C",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "264": {
      "name": "姬木 芽瑠",
      "intro_link": "https://kivo.wiki/data/character/264",
      "avatar_url": "https://static.kivo.wiki/images/students/姬木%20梅露/original/avatar.png",
      "学院": "红冬联邦学院",
      "社团": "知识解放战线",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "否"
    },
    "269": {
      "name": "剑先 鹤城（泳装）",
      "intro_link": "https://kivo.wiki/data/character/269",
      "avatar_url": "https://static.kivo.wiki/images/students/剑先%20鹤城/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "正义实现委员会",
      "武器类型": "霰弹枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "特殊装甲",
      "站位": "前排",
      "职能定位": "输出",
      "限定": "是"
    },
    "278": {
      "name": "霞泽 美游（泳装）",
      "intro_link": "https://kivo.wiki/data/character/278",
      "avatar_url": "https://static.kivo.wiki/images/students/霞泽%20美游/泳装/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "狙击枪",
      "稀有度": "1",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "是"
    },
    "279": {
      "name": "空井 咲（泳装）",
      "intro_link": "https://kivo.wiki/data/character/279",
      "avatar_url": "https://static.kivo.wiki/images/students/空井%20咲/泳装/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "重机枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "280": {
      "name": "月雪 宫子（泳装）",
      "intro_link": "https://kivo.wiki/data/character/280",
      "avatar_url": "https://static.kivo.wiki/images/students/月雪%20宫子/泳装/avatar.png",
      "学院": "SRT特殊学院",
      "社团": "RABBIT小队",
      "武器类型": "冲锋枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "重装甲",
      "站位": "前排",
      "职能定位": "坦克",
      "限定": "否"
    },
    "299": {
      "name": "下江 小春（泳装）",
      "intro_link": "https://kivo.wiki/data/character/299",
      "avatar_url": "https://static.kivo.wiki/images/students/下江%20小春/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "狙击枪",
      "稀有度": "1",
      "攻击类型": "神秘",
      "防御类型": "重装甲",
      "站位": "后排",
      "职能定位": "输出",
      "限定": "是"
    },
    "300": {
      "name": "浦和 花子（泳装）",
      "intro_link": "https://kivo.wiki/data/character/300",
      "avatar_url": "https://static.kivo.wiki/images/students/浦和%20花子/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "补习部",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "振动",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "输出",
      "限定": "是"
    },
    "301": {
      "name": "若叶 日向（泳装）",
      "intro_link": "https://kivo.wiki/data/character/301",
      "avatar_url": "https://static.kivo.wiki/images/students/若叶%20日向/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "姐妹会",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "SPECIAL",
      "职能定位": "输出",
      "限定": "是"
    },
    "302": {
      "name": "古关 忧（泳装）",
      "intro_link": "https://kivo.wiki/data/character/302",
      "avatar_url": "https://static.kivo.wiki/images/students/古关%20忧/泳装/avatar.png",
      "学院": "崔尼蒂综合学院",
      "社团": "图书管理部",
      "武器类型": "狙击枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "弹性装甲",
      "站位": "后排",
      "职能定位": "辅助",
      "限定": "是"
    },
    "340": {
      "name": "小钩 晴（露营）",
      "intro_link": "https://kivo.wiki/data/character/340",
      "avatar_url": "https://static.kivo.wiki/images/students/小钩%20晴/露营/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "突击步枪",
      "稀有度": "3",
      "攻击类型": "爆发",
      "防御类型": "轻装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    },
    "341": {
      "name": "音濑 小玉（露营）",
      "intro_link": "https://kivo.wiki/data/character/341",
      "avatar_url": "https://static.kivo.wiki/images/students/音濑%20小玉/露营/avatar.png",
      "学院": "千禧年科技学院",
      "社团": "真理社",
      "武器类型": "手枪",
      "稀有度": "3",
      "攻击类型": "贯穿",
      "防御类型": "重装甲",
      "站位": "中排",
      "职能定位": "辅助",
      "限定": "否"
    }
  };

// 将对象转换为数组格式
let characters = Object.values(charactersData).map(char => ({
    name: char.name,
    school: char.学院,
    club: char.社团,
    weaponType: char.武器类型,
    rarity: char.稀有度,
    attackType: char.攻击类型,
    defenseType: char.防御类型,
    position: char.站位,
    role: char.职能定位,
    limited: char.限定,
    avatar_url: char.avatar_url,
    intro_link: char.intro_link
}));

// 本地存储键
const STORAGE_KEYS = {
    normalBest: 'baguesser_normal_best',
    infiniteBest: 'baguesser_infinite_best',
    challengeBest: 'baguesser_challenge_best'
};

// 挑战模式配置
const CHALLENGE_CONFIG = {
    totalTime: 100, // 总时间（秒）
    hintLevels: [
        { range: [1, 5], count: 1 }, // 1-5分，1个提示
        { range: [6, 10], count: 2 }, // 6-10分，2个提示
        { range: [11, 20], count: 3 }, // 11-20分，3个提示
        { range: [21, Infinity], count: 4 } // 大于20分，4个提示
    ]
};

// 模式介绍文本
const MODE_INTRO_TEXTS = {
    normal: '在常规模式中，你有6次机会猜出正确的角色。当一个词条猜对时该词条显示<span class="text-green">绿色</span>，错误时是<span class="text-gray">灰色</span>，其中学院和社团合并，猜出正确的社团或学院任意一个显<span class="text-yellow">黄色</span>，全对才是<span class="text-green">绿色</span>。',
    infinite: '在无限模式中，你可以无限次尝试猜测，直到猜出正确角色。这是一个练习模式，可以帮助你熟悉游戏规则和角色特征。',
    challenge: '在挑战模式中，你需要根据线索选择任意一个符合所有条件的角色。随着分数增加，线索数量也会增加：1-5分时1个线索，6-10分时2个线索，11-20分时3个线索，20分以上4个线索。在100秒内得分越高越好！'
};

// DOM 元素
const modeSelection = document.getElementById('mode-selection');
const gamePlay = document.getElementById('game-play');
const normalModeBtn = document.getElementById('normal-mode');
const infiniteModeBtn = document.getElementById('infinite-mode');
const challengeModeBtn = document.getElementById('challenge-mode');
const gameModeTitle = document.getElementById('game-mode-title');
const attemptsEl = document.getElementById('attempts');
const characterSearch = document.getElementById('character-search');
const characterList = document.getElementById('character-list');
const guessesContainer = document.getElementById('guesses');
const resultArea = document.getElementById('result-area');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again-btn');
const returnToMenuBtn = document.getElementById('return-to-menu-btn');
const giveUpBtn = document.getElementById('give-up-btn');
const confirmModal = document.getElementById('confirm-modal');
const confirmGiveUpBtn = document.getElementById('confirm-give-up');
const cancelGiveUpBtn = document.getElementById('cancel-give-up');
const resetBestScoreBtn = document.getElementById('reset-best-score');
const resetScoreModal = document.getElementById('reset-score-modal');
const confirmResetBtn = document.getElementById('confirm-reset');
const cancelResetBtn = document.getElementById('cancel-reset');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const skipBtn = document.getElementById('skip-btn');
const startBtn = document.getElementById('start-btn');
const gameIntroText = document.getElementById('game-intro-text');

// 初始化游戏
function init() {
    loadBestScores();
    
    // 模式选择事件监听
    normalModeBtn.addEventListener('click', () => selectMode('normal'));
    infiniteModeBtn.addEventListener('click', () => selectMode('infinite'));
    challengeModeBtn.addEventListener('click', () => selectMode('challenge'));
    
    // 搜索框事件监听
    characterSearch.addEventListener('focus', () => {
        showCharacterList(); // 聚焦时显示列表
    });
    
    characterSearch.addEventListener('input', () => {
        filterCharacters(); // 输入时筛选角色
    });
    
    // 点击外部区域关闭列表
    document.addEventListener('click', (e) => {
        if (!characterSearch.contains(e.target) && !characterList.contains(e.target)) {
            characterList.style.display = 'none';
        }
    });
    
    // 其他按钮事件监听
    playAgainBtn.addEventListener('click', restartGame);
    returnToMenuBtn.addEventListener('click', returnToMenu);
    
    // 重新绑定放弃按钮事件
    giveUpBtn.addEventListener('click', function() {
        if (!gameState.gameOver) {
            showGiveUpConfirmation();
        }
    });
    
    confirmGiveUpBtn.addEventListener('click', function() {
        giveUp();
    });
    
    cancelGiveUpBtn.addEventListener('click', function() {
        hideGiveUpConfirmation();
    });
    
    // 添加重置最佳成绩按钮事件
    resetBestScoreBtn.addEventListener('click', function() {
        showResetScoreConfirmation();
    });
    
    confirmResetBtn.addEventListener('click', function() {
        resetBestScores();
        hideResetScoreConfirmation();
    });
    
    cancelResetBtn.addEventListener('click', function() {
        hideResetScoreConfirmation();
    });
    
    // 挑战模式按钮事件监听
    skipBtn.addEventListener('click', skipChallenge);
    startBtn.addEventListener('click', startChallenge);
    
    // 模式选择悬停事件 - 更新介绍文本
    normalModeBtn.addEventListener('mouseenter', () => updateIntroText('normal'));
    infiniteModeBtn.addEventListener('mouseenter', () => updateIntroText('infinite'));
    challengeModeBtn.addEventListener('mouseenter', () => updateIntroText('challenge'));
    
    // 确保首次加载时立即显示常规模式介绍
    gameIntroText.innerHTML = MODE_INTRO_TEXTS.normal;
}

// 加载最佳成绩
function loadBestScores() {
    const normalBest = localStorage.getItem(STORAGE_KEYS.normalBest) || '--';
    const infiniteBest = localStorage.getItem(STORAGE_KEYS.infiniteBest) || '--';
    const challengeBest = localStorage.getItem(STORAGE_KEYS.challengeBest) || '--';
    
    document.getElementById('normal-best').textContent = normalBest;
    document.getElementById('infinite-best').textContent = infiniteBest;
    document.getElementById('challenge-best').textContent = challengeBest;
}

// 重置最佳成绩
function resetBestScores() {
    localStorage.removeItem(STORAGE_KEYS.normalBest);
    localStorage.removeItem(STORAGE_KEYS.infiniteBest);
    localStorage.removeItem(STORAGE_KEYS.challengeBest);
    loadBestScores();
}

// 显示重置成绩确认框
function showResetScoreConfirmation() {
    resetScoreModal.style.display = 'flex';
}

// 隐藏重置成绩确认框
function hideResetScoreConfirmation() {
    resetScoreModal.style.display = 'none';
}

// 保存最佳成绩
function saveBestScore() {
    // 确保游戏已结束
    if (!gameState.gameOver) return;
    
    // 如果玩家放弃，不保存成绩
    if (gameState.gaveUp) return;
    
    // 确保有猜测记录
    if (gameState.guesses.length === 0 && gameState.mode !== 'challenge') return;
    
    // 常规模式保存时间
    if (gameState.mode === 'normal') {
        const currentTime = (Date.now() - gameState.startTime) / 1000;
        const bestTime = localStorage.getItem(STORAGE_KEYS.normalBest);
        
        console.log("尝试保存常规模式成绩:", currentTime);
        
        if (!bestTime || bestTime === '--' || currentTime < parseFloat(bestTime)) {
            localStorage.setItem(STORAGE_KEYS.normalBest, currentTime.toFixed(1));
            document.getElementById('normal-best').textContent = currentTime.toFixed(1);
            console.log("保存了新的常规模式最佳成绩:", currentTime.toFixed(1));
        }
    } 
    // 无限模式保存猜测次数
    else if (gameState.mode === 'infinite') {
        const currentAttempts = gameState.guesses.length;
        const bestAttempts = localStorage.getItem(STORAGE_KEYS.infiniteBest);
        
        console.log("尝试保存无限模式成绩:", currentAttempts);
        
        if (!bestAttempts || bestAttempts === '--' || currentAttempts < parseInt(bestAttempts)) {
            localStorage.setItem(STORAGE_KEYS.infiniteBest, currentAttempts.toString());
            document.getElementById('infinite-best').textContent = currentAttempts.toString();
            console.log("保存了新的无限模式最佳成绩:", currentAttempts);
        }
    }
    // 挑战模式保存分数
    else if (gameState.mode === 'challenge') {
        const currentScore = gameState.challengeScore;
        const bestScore = localStorage.getItem(STORAGE_KEYS.challengeBest);
        
        console.log("尝试保存挑战模式成绩:", currentScore);
        
        if (!bestScore || bestScore === '--' || currentScore > parseInt(bestScore)) {
            localStorage.setItem(STORAGE_KEYS.challengeBest, currentScore.toString());
            document.getElementById('challenge-best').textContent = currentScore.toString();
            console.log("保存了新的挑战模式最佳成绩:", currentScore);
        }
    }
}

// 返回到模式选择菜单
function returnToMenu() {
    console.log("返回到模式选择菜单");
    
    // 添加淡出动画
    gamePlay.classList.add('fade-out');
    
    setTimeout(() => {
        // 确保清空角色列表，防止闪退
        characterList.innerHTML = '';
        characterList.style.display = 'none';
        characterSearch.value = '';
        
        // 隐藏结果区域和游戏区域
        resultArea.style.display = 'none';
        gamePlay.style.display = 'none';
        gamePlay.classList.remove('fade-out');
        
        // 显示模式选择并添加淡入动画
        modeSelection.style.display = 'flex'; // 修改为flex以修复布局问题
        modeSelection.classList.add('fade-in');
        setTimeout(() => {
            modeSelection.classList.remove('fade-in');
        }, 500);
        
        // 重新加载最佳成绩
        loadBestScores();
        
        // 修复bug：重置游戏状态中的isGameStarted标志
        gameState.isGameStarted = false;
    }, 300);
}

// 开始游戏
function startGame(mode) {
    console.log(`开始${mode === 'normal' ? '常规' : mode === 'infinite' ? '无限' : '挑战'}模式游戏`);
    
    // 初始化游戏状态
    gameState = {
        mode: mode,
        targetCharacter: getRandomCharacter(),
        attempts: mode === 'normal' ? 6 : Infinity,
        maxAttempts: mode === 'normal' ? 6 : Infinity,
        guesses: [],
        gameOver: false,
        gaveUp: false,
        startTime: Date.now(),
        guessedCharacters: new Set(), // 重置已猜测角色集合
        // 挑战模式特有属性
        challengeScore: 0,
        challengeTimer: null,
        challengeTimeLeft: CHALLENGE_CONFIG.totalTime,
        challengeHints: [],
        currentHintLevel: 0,
        isGameStarted: mode !== 'challenge'
    };
    
    // 根据调试模式决定是否显示目标角色
    if (DEBUG_MODE) {
        console.log("目标角色:", gameState.targetCharacter ? gameState.targetCharacter.name : "未设置");
    }
    
    // 隐藏结果区域
    resultArea.style.display = 'none';
    
    // 重置游戏界面
    guessesContainer.innerHTML = '';
    characterSearch.value = '';
    characterList.innerHTML = '';
    characterList.style.display = 'none';
    
    // 更新尝试次数显示
    updateAttemptsDisplay();
    
    // 如果是挑战模式，不要立即开始，等待用户点击开始按钮
    if (mode === 'challenge') {
        // 显示开始按钮，隐藏跳过按钮
        startBtn.style.display = 'block';
        skipBtn.style.display = 'none';
        
        // 更新计时器和分数显示
        timerEl.textContent = `剩余时间: ${gameState.challengeTimeLeft}秒`;
        scoreEl.textContent = `得分: ${gameState.challengeScore}`;
        
        // 禁用搜索框
        characterSearch.disabled = true;
    } else {
    // 启用放弃按钮
    giveUpBtn.disabled = false;
    giveUpBtn.classList.remove('disabled');
        
        // 启用搜索框
        characterSearch.disabled = false;
    }
}

// 重置挑战模式状态
function resetChallengeState() {
    // 清除之前的计时器
    if (gameState.challengeTimer) {
        clearInterval(gameState.challengeTimer);
        gameState.challengeTimer = null;
    }
    
    // 重置挑战模式特有状态
    gameState.challengeScore = 0;
    gameState.challengeTimeLeft = CHALLENGE_CONFIG.totalTime;
    gameState.challengeHints = [];
    gameState.currentHintLevel = 0;
    gameState.isGameStarted = false;
    gameState.guessedCharacters = new Set(); // 确保清空已猜测角色
    
    // 更新UI
    timerEl.textContent = `剩余时间: ${gameState.challengeTimeLeft}秒`;
    timerEl.classList.remove('warning'); // 移除警告样式
    scoreEl.textContent = `得分: ${gameState.challengeScore}`;
    
    // 确保搜索框可用
    characterSearch.disabled = false;
    
    // 清空提示区域
    guessesContainer.innerHTML = '';
}

// 开始挑战模式
function startChallenge() {
    // 隐藏开始按钮，显示跳过按钮
    startBtn.style.display = 'none';
    skipBtn.style.display = 'block';
    
    // 设置游戏已开始标志
    gameState.isGameStarted = true;
    
    // 添加调试日志，帮助跟踪isGameStarted状态
    console.log("挑战模式已开始，isGameStarted =", gameState.isGameStarted);
    
    // 启用搜索框
    characterSearch.disabled = false;
    
    // 调试日志 - 打印角色数据示例
    if (DEBUG_MODE && characters.length > 0) {
        console.log("角色数据示例:", characters[0]);
    }
    
    // 生成第一个挑战
    generateNewChallenge();
    
    // 启动计时器
    startChallengeTimer();
}

// 启动挑战模式计时器
function startChallengeTimer() {
    gameState.challengeTimer = setInterval(() => {
        // 减少剩余时间
        gameState.challengeTimeLeft--;
        
        // 更新计时器显示
        timerEl.textContent = `剩余时间: ${gameState.challengeTimeLeft}秒`;
        
        // 当剩余时间少于20秒时，添加警告样式
        if (gameState.challengeTimeLeft <= 20) {
            timerEl.classList.add('warning');
        }
        
        // 时间用完，结束游戏
        if (gameState.challengeTimeLeft <= 0) {
            endChallengeGame();
        }
    }, 1000);
}

// 生成新的挑战
function generateNewChallenge() {
    // 清空当前猜测记录
    gameState.guesses = [];
    gameState.guessedCharacters.clear();
    
    // 确定当前提示数量
    let hintCount = 1; // 默认为1个提示
    
    // 根据当前得分确定提示数量
    for (const level of CHALLENGE_CONFIG.hintLevels) {
        if (gameState.challengeScore + 1 >= level.range[0] && gameState.challengeScore + 1 <= level.range[1]) {
            hintCount = level.count;
            break;
        }
    }
    
    // 如果当前分数超过最后一个范围，使用最后一个配置
    if (gameState.challengeScore + 1 > CHALLENGE_CONFIG.hintLevels[CHALLENGE_CONFIG.hintLevels.length - 1].range[0]) {
        hintCount = CHALLENGE_CONFIG.hintLevels[CHALLENGE_CONFIG.hintLevels.length - 1].count;
    }

    // 获取随机角色
    const targetCharacter = getRandomCharacter();
    
    if (!targetCharacter) {
        console.error("无法获取有效的目标角色");
        return;
    }
    
    gameState.targetCharacter = targetCharacter;
    
    // 根据调试模式决定是否显示目标角色
    if (DEBUG_MODE) {
        console.log("挑战模式目标角色:", targetCharacter.name, "提示数量:", hintCount);
        console.log("目标角色完整数据:", targetCharacter);
    }
    
    // 获取可用的属性列表
    const availableProperties = [
        { key: 'school', label: '学院' },
        { key: 'club', label: '社团' },
        { key: 'weaponType', label: '武器类型' },
        { key: 'rarity', label: '稀有度' },
        { key: 'attackType', label: '攻击类型' },
        { key: 'defenseType', label: '防御类型' },
        { key: 'position', label: '站位' },
        { key: 'role', label: '职能定位' },
        { key: 'limited', label: '限定' }
    ];
    
    // 随机选择指定数量的属性作为提示
    const selectedProperties = [];
    const shuffledProperties = [...availableProperties].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < hintCount && i < shuffledProperties.length; i++) {
        selectedProperties.push(shuffledProperties[i]);
    }
    
    // 保存当前提示
    gameState.challengeHints = selectedProperties.map(prop => {
        // 获取目标角色的属性值
        let value;
        
        switch(prop.key) {
            case 'school':
                value = targetCharacter.school;
                break;
            case 'club':
                value = targetCharacter.club;
                break;
            case 'weaponType':
                value = targetCharacter.weaponType;
                break;
            case 'rarity':
                value = targetCharacter.rarity;
                break;
            case 'attackType':
                value = targetCharacter.attackType;
                break;
            case 'defenseType':
                value = targetCharacter.defenseType;
                break;
            case 'position':
                value = targetCharacter.position;
                break;
            case 'role':
                value = targetCharacter.role;
                break;
            case 'limited':
                value = targetCharacter.limited;
                break;
            default:
                console.error("未知的属性类型:", prop.key);
                value = null;
        }
        
        if (DEBUG_MODE) {
            console.log(`设置提示 ${prop.label}: ${value}`);
        }
        
        return {
            key: prop.key,
            label: prop.label,
            value: value
        };
    });
    
    if (DEBUG_MODE) {
        console.log("生成的挑战提示:", gameState.challengeHints);
    }
    
    // 显示提示卡片
    renderChallengeHints();
}

// 渲染挑战模式提示
function renderChallengeHints() {
    // 清空提示区域
    guessesContainer.innerHTML = '';
    
    // 创建提示卡片
    const hintCard = document.createElement('div');
    hintCard.className = 'hint-card';
    
    // 添加标题
    const hintTitle = document.createElement('div');
    hintTitle.className = 'hint-title';
    hintTitle.textContent = `挑战 #${gameState.challengeScore + 1} - 请猜出符合以下条件的角色`;
    hintCard.appendChild(hintTitle);
    
    // 添加提示内容
    const hintContent = document.createElement('div');
    hintContent.className = 'hint-content';
    
    gameState.challengeHints.forEach(hint => {
        const hintItem = document.createElement('div');
        hintItem.className = 'hint-item';
        hintItem.textContent = `${hint.label}: ${hint.value}`;
        hintContent.appendChild(hintItem);
    });
    
    hintCard.appendChild(hintContent);
    guessesContainer.appendChild(hintCard);
}

// 跳过当前挑战
function skipChallenge() {
    // 生成新的挑战
    generateNewChallenge();
}

// 结束挑战模式游戏
function endChallengeGame() {
    // 清除计时器
    if (gameState.challengeTimer) {
        clearInterval(gameState.challengeTimer);
        gameState.challengeTimer = null;
    }
    
    // 设置游戏结束标志
    gameState.gameOver = true;
    
    // 保存最佳分数
    saveBestScore();
    
    // 准备结果内容
    resultMessage.innerHTML = `
        <h3>挑战结束!</h3>
        <p>你的得分: ${gameState.challengeScore}</p>
        <p>最佳记录: ${localStorage.getItem(STORAGE_KEYS.challengeBest) || '--'}</p>
    `;
    
    // 禁用搜索框和跳过按钮
    characterSearch.disabled = true;
    skipBtn.style.display = 'none';
    
    // 将结果区域插入到猜测列表的顶部
    resultArea.style.display = 'block';
    guessesContainer.insertBefore(resultArea, guessesContainer.firstChild);
    
    // 添加动画效果
    resultArea.classList.add('fade-in');
    setTimeout(() => {
        resultArea.classList.remove('fade-in');
    }, 500);
    
    // 确保滚动到顶部，使结果可见
    guessesContainer.scrollTop = 0;
    window.scrollTo(0, 0);
}

// 检查挑战模式猜测
function checkChallengeGuess(character) {
    if (DEBUG_MODE) {
        console.log("检查角色是否符合条件:", character.name);
        console.log("挑战提示:", gameState.challengeHints);
        console.log("目标角色:", gameState.targetCharacter.name);
    }
    
    // 检查角色是否符合所有提示条件
    for (const hint of gameState.challengeHints) {
        // 获取角色属性值
        let characterValue;
        
        // 属性映射
        switch(hint.key) {
            case 'school':
                characterValue = character.学院 || character.school;
                break;
            case 'club':
                characterValue = character.社团 || character.club;
                break;
            case 'weaponType':
                characterValue = character.武器类型 || character.weaponType;
                break;
            case 'rarity':
                characterValue = character.稀有度 || character.rarity;
                break;
            case 'attackType':
                characterValue = character.攻击类型 || character.attackType;
                break;
            case 'defenseType':
                characterValue = character.防御类型 || character.defenseType;
                break;
            case 'position':
                characterValue = character.站位 || character.position;
                break;
            case 'role':
                characterValue = character.职能定位 || character.role;
                break;
            case 'limited':
                characterValue = character.限定 || character.limited;
                break;
            default:
                console.error("未知的属性类型:", hint.key);
                characterValue = null;
        }
        
        if (DEBUG_MODE) {
            console.log(`比较属性 ${hint.label}: 角色值=${characterValue}, 目标值=${hint.value}`);
        }
        
        // 特殊处理学院和社团
        if (hint.key === 'school') {
            if (characterValue !== hint.value) {
                if (DEBUG_MODE) console.log("学院不匹配");
                return false;
            }
        } 
        else if (hint.key === 'club') {
            if (characterValue !== hint.value) {
                if (DEBUG_MODE) console.log("社团不匹配");
                return false;
            }
        }
        // 其他属性必须完全匹配
        else if (characterValue !== hint.value) {
            if (DEBUG_MODE) console.log(`属性 ${hint.label} 不匹配: ${characterValue} !== ${hint.value}`);
            return false;
        }
    }
    
    if (DEBUG_MODE) console.log("角色符合所有条件:", character.name);
    return true;
}

// 修改makeGuess函数，添加挑战模式支持
function makeGuess(character) {
    // 添加调试日志，显示当前状态
    console.log("尝试选择角色:", character.name, "当前模式:", gameState.mode, "游戏已开始:", gameState.isGameStarted, "游戏已结束:", gameState.gameOver);
    
    // 如果游戏已结束或未开始，不处理猜测
    if (gameState.gameOver || !gameState.isGameStarted) return;
    
    // 如果角色已经猜过，不重复处理
    if (gameState.guessedCharacters.has(character.name)) return;
    
    // 记录已猜测的角色
    gameState.guessedCharacters.add(character.name);
    
    // 隐藏角色列表
    characterList.style.display = 'none';
    characterSearch.value = '';
    
    // 挑战模式特殊处理
    if (gameState.mode === 'challenge') {
        // 检查猜测是否正确
        const isCorrect = checkChallengeGuess(character);
        
        // 显示结果提示图片
        showResultImage(isCorrect);
        
        if (isCorrect) {
            // 增加分数
            gameState.challengeScore++;
            
            // 更新分数显示
            scoreEl.textContent = `得分: ${gameState.challengeScore}`;
            
            // 生成新的挑战
            generateNewChallenge();
        } else {
            // 创建详细的错误提示
            renderChallengeGuessResult(character);
        }
        
        return;
    }
    
    // 常规模式和无限模式的处理逻辑
    if (DEBUG_MODE) {
        console.log(`猜测: ${character.name}`);
    }
    
    // 检查猜测结果
    const result = checkGuess(character);
    
    // 显示结果提示图片
    showResultImage(result.isCorrect);
    
    // 添加到猜测历史
    gameState.guesses.unshift({ character, result });
    
    // 渲染猜测结果
    renderGuess(character, result);
    
    // 减少剩余尝试次数（仅常规模式）
    if (gameState.mode === 'normal') {
        gameState.attempts--;
    }
    
    // 更新尝试次数显示
    updateAttemptsDisplay();
    
    // 检查游戏是否结束
    if (character.name === gameState.targetCharacter.name) {
        // 猜对了，游戏胜利
        endGame(true);
    } else if (gameState.mode === 'normal' && gameState.attempts <= 0) {
        // 常规模式尝试次数用完，游戏失败
        endGame(false);
    }
}

// 添加显示结果提示图片的函数
function showResultImage(isCorrect) {
    // 创建结果图片元素
    const resultImg = document.createElement('img');
    resultImg.src = isCorrect ? 'right.png' : 'wrong.png';
    resultImg.className = 'result-image';
    resultImg.style.position = 'fixed';
    resultImg.style.right = '20px';
    resultImg.style.top = '50%';
    resultImg.style.transform = 'translateY(-50%)';
    resultImg.style.width = '80px';
    resultImg.style.height = 'auto';
    resultImg.style.zIndex = '1000';
    resultImg.style.opacity = '0';
    resultImg.style.transition = 'opacity 0.3s ease';
    
    // 添加到文档
    document.body.appendChild(resultImg);
    
    // 显示图片
    setTimeout(() => {
        resultImg.style.opacity = '1';
        
        // 2秒后淡出并移除
        setTimeout(() => {
            resultImg.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(resultImg);
            }, 300);
        }, 2000);
    }, 10);
}

// 添加新函数：渲染挑战模式猜测结果
function renderChallengeGuessResult(character) {
    // 创建猜测项
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    
    // 添加动画类
    guessItem.classList.add('flip');
    
    // 添加点击事件，点击任何地方都会跳转到角色介绍
    guessItem.addEventListener('click', () => {
        window.open(character.intro_link, '_blank');
    });
    
    // 角色头像
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'guess-avatar';
    
    // 创建图片元素并添加加载中图片
    const avatarImg = document.createElement('img');
    avatarImg.src = 'loading.gif'; // 默认显示loading图片
    avatarImg.alt = character.name;
    
    // 创建真实头像对象进行预加载
    const realAvatar = new Image();
    realAvatar.onload = function() {
        avatarImg.src = character.avatar_url; // 加载完成后替换为真实头像
    };
    realAvatar.onerror = function() {
        avatarImg.src = 'loading.gif'; // 加载失败时保持loading图片
        console.error('头像加载失败:', character.name);
    };
    realAvatar.src = character.avatar_url;
    
    avatarDiv.appendChild(avatarImg);
    guessItem.appendChild(avatarDiv);
    
    // 检查每个提示条件，添加属性并标记正确或错误
    const targetCharacter = gameState.targetCharacter;
    const hintKeys = gameState.challengeHints.map(hint => hint.key);
    
    // 检查学院和社团是否在提示中
    const schoolInHints = hintKeys.includes('school');
    const clubInHints = hintKeys.includes('club');
    
    // 属性映射
    const propertyMap = [
        { key: 'name', label: '姓名', charValue: character.name, targetValue: targetCharacter.name },
        { key: 'school', label: '学院/社团', charValue: `${character.学院 || character.school}/${character.社团 || character.club}`, 
          targetValue: `${targetCharacter.学院 || targetCharacter.school}/${targetCharacter.社团 || targetCharacter.club}`,
          isSpecial: true, schoolMatch: (character.学院 || character.school) === (targetCharacter.学院 || targetCharacter.school),
          clubMatch: (character.社团 || character.club) === (targetCharacter.社团 || targetCharacter.club),
          schoolInHints: schoolInHints, clubInHints: clubInHints },
        { key: 'weaponType', label: '武器类型', charValue: character.武器类型 || character.weaponType, targetValue: targetCharacter.武器类型 || targetCharacter.weaponType },
        { key: 'rarity', label: '稀有度', charValue: character.稀有度 || character.rarity, targetValue: targetCharacter.稀有度 || targetCharacter.rarity },
        { key: 'attackType', label: '攻击类型', charValue: character.攻击类型 || character.attackType, targetValue: targetCharacter.攻击类型 || targetCharacter.attackType },
        { key: 'defenseType', label: '防御类型', charValue: character.防御类型 || character.defenseType, targetValue: targetCharacter.防御类型 || targetCharacter.defenseType },
        { key: 'position', label: '站位', charValue: character.站位 || character.position, targetValue: targetCharacter.站位 || targetCharacter.position },
        { key: 'role', label: '职能', charValue: character.职能定位 || character.role, targetValue: targetCharacter.职能定位 || targetCharacter.role },
        { key: 'limited', label: '限定', charValue: character.限定 || character.limited, targetValue: targetCharacter.限定 || targetCharacter.limited }
    ];
    
    // 添加每个属性
    for (const prop of propertyMap) {
        let className;
        
        if (prop.isSpecial) {
            // 学院和社团特殊处理
            if (prop.schoolInHints || prop.clubInHints) {
                // 只有当学院或社团在提示中时，才根据匹配情况显示颜色
                if ((prop.schoolInHints && prop.schoolMatch) && (prop.clubInHints && prop.clubMatch)) {
                    className = 'correct'; // 全对为绿色
                } else if ((prop.schoolInHints && prop.schoolMatch) || (prop.clubInHints && prop.clubMatch)) {
                    className = 'partial'; // 部分正确为黄色
                } else {
                    className = 'incorrect'; // 全错为红色
                }
            } else {
                // 如果学院和社团都不在提示中，显示为红色
                className = 'incorrect';
            }
        } else {
            // 其他属性
            const isHinted = hintKeys.includes(prop.key);
            const isMatch = prop.charValue === prop.targetValue;
            
            if (prop.key === 'name') {
                // 名称总是显示红色（不符合条件）
                className = 'incorrect';
            } else if (isHinted) {
                // 如果是提示的属性，检查是否匹配
                className = isMatch ? 'correct' : 'incorrect';
            } else {
                // 如果不是提示的属性，使用红色样式
                className = 'incorrect';
            }
        }
        
        // 添加属性
        const propDiv = document.createElement('div');
        propDiv.className = `guess-property ${className}`;
        propDiv.innerHTML = `
            <div class="property-label">${prop.label}</div>
            <div class="property-value">${prop.charValue}</div>
        `;
        guessItem.appendChild(propDiv);
    }
    
    // 将猜测结果添加到猜测容器的顶部
    guessesContainer.insertBefore(guessItem, guessesContainer.firstChild);
    
    // 隐藏角色列表
    characterList.style.display = 'none';
    characterSearch.value = '';
}

// 显示角色列表
function showCharacterList() {
    // 如果是挑战模式且游戏未开始，则不显示角色列表
    if (gameState.mode === 'challenge' && !gameState.isGameStarted) {
        return;
    }
    
    // 先清空列表内容
    characterList.innerHTML = '';
    
    // 确保列表可见
    characterList.style.display = 'block';
    
    // 渲染所有角色
    const validChars = characters.filter(char => char && char.name && char.avatar_url);
    
    // 如果有很多角色，添加搜索提示
    if (validChars.length > 20) {
        const searchTip = document.createElement('div');
        searchTip.className = 'search-tip';
        searchTip.textContent = '输入关键词可以筛选角色';
        characterList.appendChild(searchTip);
    }
    
    validChars.forEach(char => {
        const item = document.createElement('div');
        
        // 检查角色是否已经猜测过
        const isGuessed = gameState.guessedCharacters.has(char.name);
        
        // 挑战模式且游戏未开始时，添加额外的类
        if (gameState.mode === 'challenge' && !gameState.isGameStarted) {
            item.className = 'character-item guessed no-select';
        } else {
            item.className = isGuessed ? 'character-item guessed' : 'character-item';
        }
        
        // 创建头像元素并添加加载中图片
        const avatarImg = document.createElement('img');
        avatarImg.src = 'loading.gif'; // 默认显示loading图片
        avatarImg.alt = char.name;
        avatarImg.className = 'character-avatar';
        
        // 创建真实头像对象进行预加载
        const realAvatar = new Image();
        realAvatar.onload = function() {
            avatarImg.src = char.avatar_url; // 加载完成后替换为真实头像
        };
        realAvatar.onerror = function() {
            avatarImg.src = 'loading.gif'; // 加载失败时保持loading图片
        };
        realAvatar.src = char.avatar_url;
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = char.name;
        
        item.appendChild(avatarImg);
        item.appendChild(nameSpan);
        
        // 只有未猜测过的角色且不是未开始的挑战模式才能点击
        if (!isGuessed && !(gameState.mode === 'challenge' && !gameState.isGameStarted)) {
            item.addEventListener('click', () => makeGuess(char));
        }
        
        characterList.appendChild(item);
    });
}

// 筛选角色
function filterCharacters() {
    // 如果是挑战模式且游戏未开始，则不显示角色列表
    if (gameState.mode === 'challenge' && !gameState.isGameStarted) {
        characterList.style.display = 'none';
        return;
    }
    
    const searchTerm = characterSearch.value.toLowerCase();
    
    // 先清空列表内容
    characterList.innerHTML = '';
    
    // 确保列表可见
    characterList.style.display = 'block';
    
    // 筛选并渲染符合条件的角色
    const filtered = characters.filter(char => {
        if (!char || !char.name) return false;
        
        // 名称匹配
        const nameMatch = char.name.toLowerCase().includes(searchTerm);
        
        // 拼音匹配（简单实现，使用预先生成的拼音字段）
        let pinyinMatch = false;
        
        // 如果角色有拼音字段，检查拼音匹配
        if (char.pinyin) {
            pinyinMatch = char.pinyin.toLowerCase().includes(searchTerm);
        } else {
            // 为角色名生成简单拼音
            const pinyin = generateSimplePinyin(char.name);
            // 缓存拼音结果
            char.pinyin = pinyin;
            pinyinMatch = pinyin.toLowerCase().includes(searchTerm);
        }
        
        return nameMatch || pinyinMatch;
    });
    
    if (filtered.length > 0) {
        filtered.forEach(char => {
            const item = document.createElement('div');
            
            // 检查角色是否已经猜测过
            const isGuessed = gameState.guessedCharacters.has(char.name);
            
            // 挑战模式且游戏未开始时，添加额外的类
            if (gameState.mode === 'challenge' && !gameState.isGameStarted) {
                item.className = 'character-item guessed no-select';
            } else {
                item.className = isGuessed ? 'character-item guessed' : 'character-item';
            }
            
            // 创建头像元素并添加加载中图片
            const avatarImg = document.createElement('img');
            avatarImg.src = 'loading.gif'; // 默认显示loading图片
            avatarImg.alt = char.name;
            avatarImg.className = 'character-avatar';
            
            // 创建真实头像对象进行预加载
            const realAvatar = new Image();
            realAvatar.onload = function() {
                avatarImg.src = char.avatar_url; // 加载完成后替换为真实头像
            };
            realAvatar.onerror = function() {
                avatarImg.src = 'loading.gif'; // 加载失败时保持loading图片
            };
            realAvatar.src = char.avatar_url;
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = char.name;
            
            item.appendChild(avatarImg);
            item.appendChild(nameSpan);
            
            // 只有未猜测过的角色且不是未开始的挑战模式才能点击
            if (!isGuessed && !(gameState.mode === 'challenge' && !gameState.isGameStarted)) {
                item.addEventListener('click', () => makeGuess(char));
            }
            
            characterList.appendChild(item);
        });
    } else {
        // 如果没有匹配的角色，显示提示信息
        characterList.innerHTML = '<div class="no-results">没有找到匹配的角色</div>';
    }
}

// 简单拼音转换函数
function generateSimplePinyin(text) {
    if (!text) return '';
    
    // 移除空格
    text = text.replace(/\s+/g, '');
    
    // 常见汉字拼音映射
    const pinyinMap = {
        "一": "yi", "三": "san", "上": "shang", "下": "xia", "世": "shi", "丝": "si", "中": "zhong", 
        "丰": "feng", "丽": "li", "乃": "nai", "久": "jiu", "之": "zhi", "乐": "le", "乙": "yi", 
        "井": "jing", "亚": "ya", "仆": "pu", "仓": "cang", "代": "dai", "仲": "zhong", "伊": "yi", 
        "优": "you", "住": "zhu", "佐": "zuo", "体": "ti", "佳": "jia", "便": "bian", "元": "yuan", 
        "先": "xian", "八": "ba", "六": "liu", "关": "guan", "冈": "gang", "冢": "zhong", "冰": "bing", 
        "凛": "lin", "刃": "ren", "切": "qie", "初": "chu", "前": "qian", "剑": "jian", "务": "wu", 
        "勇": "yong", "十": "shi", "千": "qian", "南": "nan", "卫": "wei", "原": "yuan", "古": "gu", 
        "叶": "ye", "司": "si", "各": "ge", "合": "he", "名": "ming", "向": "xiang", "吕": "lv", 
        "吹": "chui", "和": "he", "咏": "yong", "咲": "xiao", "响": "xiang", "团": "tuan", "园": "yuan", 
        "圆": "yuan", "圣": "sheng", "坂": "ban", "垣": "yuan", "城": "cheng", "堂": "tang", "堇": "jin", 
        "夏": "xia", "夜": "ye", "大": "da", "天": "tian", "奈": "nai", "奥": "ao", "女": "nv", "好": "hao", 
        "妮": "ni", "姬": "ji", "娜": "na", "子": "zi", "宇": "yu", "守": "shou", "安": "an", "实": "shi", 
        "室": "shi", "宫": "gong", "宵": "xiao", "富": "fu", "寻": "xun", "小": "xiao", "尼": "ni", 
        "尾": "wei", "山": "shan", "崎": "qi", "川": "chuan", "巴": "ba", "年": "nian", "应": "ying", 
        "康": "kang", "心": "xin", "志": "zhi", "忧": "you", "怒": "nu", "惠": "hui", "慈": "ci", 
        "戒": "jie", "才": "cai", "援": "yuan", "操": "cao", "新": "xin", "方": "fang", "日": "ri", 
        "早": "zao", "时": "shi", "明": "ming", "星": "xing", "春": "chun", "晴": "qing", "月": "yue", 
        "服": "fu", "朝": "chao", "木": "mu", "未": "wei", "朱": "zhu", "杏": "xing", "村": "cun", 
        "来": "lai", "果": "guo", "枣": "zao", "枫": "feng", "柚": "you", "栗": "li", "桃": "tao", 
        "桐": "tong", "桑": "sang", "梓": "zi", "梨": "li", "森": "sen", "椿": "chun", "楯": "dun", 
        "槌": "chui", "樱": "ying", "欢": "huan", "歌": "ge", "正": "zheng", "比": "bi", "水": "shui", 
        "永": "yong", "江": "jiang", "池": "chi", "河": "he", "泉": "quan", "波": "bo", "泳": "yong", 
        "泽": "ze", "洛": "luo", "津": "jin", "洲": "zhou", "浅": "qian", "浦": "pu", "海": "hai", 
        "涂": "tu", "清": "qing", "渊": "yuan", "渚": "zhu", "温": "wen", "游": "you", "满": "man", 
        "濑": "lai", "火": "huo", "爱": "ai", "牛": "niu", "牧": "mu", "狐": "hu", "狮": "shi", "狼": "lang", 
        "猫": "mao", "玉": "yu", "玛": "ma", "玲": "ling", "理": "li", "琴": "qin", "瑠": "liu", "甘": "gan", 
        "生": "sheng", "田": "tian", "白": "bai", "盐": "yan", "真": "zhen", "睦": "mu", "瞬": "shun", 
        "石": "shi", "砂": "sha", "祢": "mi", "秋": "qiu", "秤": "cheng", "穗": "sui", "空": "kong", 
        "童": "tong", "笠": "li", "米": "mi", "红": "hong", "纪": "ji", "纯": "chun", "纱": "sha", 
        "织": "zhi", "绘": "hui", "绫": "ling", "绿": "lv", "美": "mei", "羽": "yu", "艾": "ai", 
        "花": "hua", "芹": "qin", "芽": "ya", "苍": "cang", "若": "ruo", "茜": "qian", "草": "cao", 
        "药": "yao", "莉": "li", "莲": "lian", "菲": "fei", "萌": "meng", "营": "ying", "落": "luo", 
        "藤": "teng", "藻": "zao", "行": "xing", "装": "zhuang", "见": "jian", "角": "jiao", "诞": "dan", 
        "诺": "nuo", "谷": "gu", "赤": "chi", "近": "jin", "连": "lian", "邦": "bang", "里": "li", 
        "野": "ye", "钩": "gou", "铃": "ling", "银": "yin", "锭": "ding", "镜": "jing", "间": "jian", 
        "阿": "a", "陆": "lu", "雨": "yu", "雪": "xue", "霞": "xia", "露": "lu", "静": "jing", "鞠": "ju", 
        "音": "yin", "颜": "yan", "风": "feng", "飞": "fei", "馆": "guan", "香": "xiang", "马": "ma", 
        "骑": "qi", "鬼": "gui", "魔": "mo", "鳄": "e", "鸟": "niao", "鹤": "he", "鹫": "jiu", "黄": "huang", "黑": "hei"
    };
    
    // 将汉字转换为拼音
    let pinyin = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // 检查是否是汉字
        if (/[\u4e00-\u9fa5]/.test(char)) {
            // 使用拼音映射表
            pinyin += pinyinMap[char] || char;
        } else {
            pinyin += char; // 非汉字字符保持不变
        }
    }
    
    return pinyin;
}

// 更新尝试次数显示
function updateAttemptsDisplay() {
    if (gameState.mode === 'normal') {
        attemptsEl.textContent = `剩余尝试: ${gameState.attempts}`;
    } else {
        // 无限模式显示已尝试次数
        attemptsEl.textContent = `已尝试: ${gameState.guesses.length}`;
    }
}

// 结束游戏
function endGame(isWin) {
    console.log("游戏结束，胜利状态:", isWin);
    
    // 确保游戏状态被正确设置
    gameState.gameOver = true;
    
    // 禁用放弃按钮
    giveUpBtn.disabled = true;
    giveUpBtn.classList.add('disabled');
    
    // 显示结果消息
    if (isWin) {
        resultMessage.textContent = `${gameState.targetCharacter.name}是正确的猜测！`;
        saveBestScore();
    } else {
        resultMessage.textContent = `游戏结束！正确答案是：${gameState.targetCharacter.name}`;
    }
    
    // 将结果区域插入到猜测列表的顶部
    guessesContainer.insertBefore(resultArea, guessesContainer.firstChild);
    
    // 确保结果区域显示
    resultArea.style.display = 'block';
    
    // 添加动画效果
    resultArea.classList.add('fade-in');
    setTimeout(() => {
        resultArea.classList.remove('fade-in');
    }, 500);
    
    // 滚动到顶部确保结果可见
    guessesContainer.scrollTop = 0;
}

// 重新开始游戏
function restartGame() {
    console.log("重新开始游戏");
    
    // 添加淡出动画
    resultArea.classList.add('fade-out');
    gamePlay.classList.add('fade-out');
    
    setTimeout(() => {
        // 确保清空角色列表，防止闪退
        characterList.innerHTML = '';
        characterList.style.display = 'none';
        characterSearch.value = '';
        characterSearch.disabled = false; // 重新启用搜索框
        
        // 隐藏结果区域
        resultArea.style.display = 'none';
        resultArea.classList.remove('fade-out');
        gamePlay.classList.remove('fade-out');
        
        // 移除计时器警告样式
        timerEl.classList.remove('warning');
        
        // 重置游戏状态
        gameState.guessedCharacters = new Set(); // 清空已猜测角色记录
        gameState.gameOver = false; // 重置游戏结束标志
        gameState.isGameStarted = false; // 重置游戏开始标志（挑战模式需要）
        
        // 开始新游戏
        if (gameState.mode === 'challenge') {
            // 挑战模式需要完全重置状态
            resetChallengeState();
            // 显示开始按钮
            startBtn.style.display = 'block';
            // 隐藏跳过按钮
            skipBtn.style.display = 'none';
        } else {
            startGame(gameState.mode);
        }
    }, 300);
}

// 显示放弃确认
function showGiveUpConfirmation() {
    if (gameState.gameOver) return; // 如果游戏已结束，不显示确认框
    
    confirmModal.style.display = 'flex';
}

// 隐藏放弃确认
function hideGiveUpConfirmation() {
    confirmModal.style.display = 'none';
}

// 放弃游戏
function giveUp() {
    // 先隐藏确认框
    hideGiveUpConfirmation();
    
    console.log("玩家放弃游戏");
    
    // 设置游戏状态
    gameState.gameOver = true;
    gameState.gaveUp = true;
    
    // 禁用放弃按钮
    giveUpBtn.disabled = true;
    giveUpBtn.classList.add('disabled');
    
    // 显示结果消息
    resultMessage.textContent = `已放弃！正确答案是：${gameState.targetCharacter.name}`;
    
    // 将结果区域插入到猜测列表的顶部
    guessesContainer.insertBefore(resultArea, guessesContainer.firstChild);
    
    // 确保结果区域显示
    resultArea.style.display = 'block';
    
    // 添加动画效果
    resultArea.classList.add('fade-in');
    setTimeout(() => {
        resultArea.classList.remove('fade-in');
    }, 500);
    
    // 滚动到顶部确保结果可见
    guessesContainer.scrollTop = 0;
}

// 更新介绍文本
function updateIntroText(mode) {
    // 添加淡出效果
    gameIntroText.classList.add('changing');
    
    // 延迟更新文本内容，等待淡出动画完成
    setTimeout(() => {
        gameIntroText.innerHTML = MODE_INTRO_TEXTS[mode];
        gameIntroText.classList.remove('changing');
    }, 300);
}

// 选择游戏模式
function selectMode(mode) {
    // 设置当前模式
    gameState.mode = mode;
    
    // 添加过渡动画
    modeSelection.classList.add('fade-out');
    
    setTimeout(() => {
        modeSelection.style.display = 'none';
        modeSelection.classList.remove('fade-out');
        gamePlay.classList.add('fade-in');
        gamePlay.style.display = 'block';
        
        setTimeout(() => {
            gamePlay.classList.remove('fade-in');
        }, 500);
    }, 300);
    
    // 设置模式标题
    let modeTitle;
    if (mode === 'normal') modeTitle = '常规模式';
    else if (mode === 'infinite') modeTitle = '无限模式';
    else modeTitle = '挑战模式';
    
    gameModeTitle.textContent = modeTitle;
    
    // 根据模式显示/隐藏相应元素
    if (mode === 'challenge') {
        attemptsEl.style.display = 'none';
        timerEl.style.display = 'block';
        scoreEl.style.display = 'block';
        skipBtn.style.display = 'none'; // 修复：初始时隐藏跳过按钮
        startBtn.style.display = 'block';
        giveUpBtn.style.display = 'none';
        
        // 重置挑战模式状态
        resetChallengeState();
    } else {
        // 常规模式或无限模式
        attemptsEl.style.display = 'block';
        timerEl.style.display = 'none';
        scoreEl.style.display = 'none';
        skipBtn.style.display = 'none';
        startBtn.style.display = 'none';
        giveUpBtn.style.display = 'block';
        
        // 直接开始游戏
        startGame(mode);
    }
}

// 检查猜测结果
function checkGuess(character) {
    const target = gameState.targetCharacter;
    const result = {
        name: character.name === target.name,
        school: character.school === target.school,
        club: character.club === target.club,
        weaponType: character.weaponType === target.weaponType,
        rarity: character.rarity === target.rarity,
        attackType: character.attackType === target.attackType,
        defenseType: character.defenseType === target.defenseType,
        position: character.position === target.position,
        role: character.role === target.role,
        limited: character.limited === target.limited,
        isCorrect: character.name === target.name
    };
    
    return result;
}

// 渲染猜测结果
function renderGuess(character, result) {
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    
    // 添加点击事件，点击任何地方都会跳转到角色介绍
    guessItem.addEventListener('click', () => {
        window.open(character.intro_link, '_blank');
    });
    
    // 角色头像
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'guess-avatar';
    
    // 创建图片元素并添加加载中图片
    const avatarImg = document.createElement('img');
    avatarImg.src = 'loading.gif'; // 默认显示loading图片
    avatarImg.alt = character.name;
    
    // 创建真实头像对象进行预加载
    const realAvatar = new Image();
    realAvatar.onload = function() {
        avatarImg.src = character.avatar_url; // 加载完成后替换为真实头像
    };
    realAvatar.onerror = function() {
        avatarImg.src = 'loading.gif'; // 加载失败时保持loading图片
        console.error('头像加载失败:', character.name);
    };
    realAvatar.src = character.avatar_url;
    
    avatarDiv.appendChild(avatarImg);
    guessItem.appendChild(avatarDiv);
    
    // 添加各个属性
    addProperty(guessItem, '姓名', character.name, result.name ? 'correct' : 'incorrect');
    
    // 学院和社团合并处理
    let schoolClubStatus = '';
    if (result.school && result.club) {
        schoolClubStatus = 'correct'; // 全对为绿色
    } else if (result.school || result.club) {
        schoolClubStatus = 'partial'; // 部分正确为黄色
    } else {
        schoolClubStatus = 'incorrect'; // 全错为灰色
    }
    addProperty(guessItem, '学院/社团', `${character.school}/${character.club}`, schoolClubStatus);
    
    addProperty(guessItem, '武器类型', character.weaponType, result.weaponType ? 'correct' : 'incorrect');
    addProperty(guessItem, '稀有度', character.rarity, result.rarity ? 'correct' : 'incorrect');
    addProperty(guessItem, '攻击类型', character.attackType, result.attackType ? 'correct' : 'incorrect');
    addProperty(guessItem, '防御类型', character.defenseType, result.defenseType ? 'correct' : 'incorrect');
    addProperty(guessItem, '站位', character.position, result.position ? 'correct' : 'incorrect');
    addProperty(guessItem, '职能', character.role, result.role ? 'correct' : 'incorrect');
    addProperty(guessItem, '限定', character.limited, result.limited ? 'correct' : 'incorrect');
    
    // 将最新猜测添加到顶部
    guessesContainer.prepend(guessItem);
}

// 添加属性元素
function addProperty(container, label, value, className) {
    const propDiv = document.createElement('div');
    propDiv.className = `guess-property ${className}`;
    
    propDiv.innerHTML = `
        <div class="property-label">${label}</div>
        <div class="property-value">${value}</div>
    `;
    
    container.appendChild(propDiv);
}

// 获取随机角色
function getRandomCharacter() {
    if (DEBUG_MODE) {
        console.log("开始获取随机角色");
        console.log("角色总数:", characters.length);
    }
    
    if (characters.length === 0) {
        console.error("角色数组为空");
        return null;
    }
    
    // 过滤掉不完整的角色数据
    const validCharacters = characters.filter(char => {
        if (!char) {
            if (DEBUG_MODE) console.log("发现无效角色对象");
            return false;
        }
        
        const isValid = char.name && char.school && char.club && 
            char.weaponType && char.rarity && char.attackType && 
            char.defenseType && char.position && char.role && 
            char.limited && char.avatar_url && char.intro_link;
            
        if (!isValid && DEBUG_MODE) {
            console.log("发现不完整的角色数据:", char);
        }
        
        return isValid;
    });
    
    if (DEBUG_MODE) {
        console.log("有效角色数量:", validCharacters.length);
    }
    
    if (validCharacters.length === 0) {
        console.error('没有有效的角色数据');
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * validCharacters.length);
    const selectedCharacter = validCharacters[randomIndex];
    
    if (DEBUG_MODE) {
        console.log("选中的随机角色:", selectedCharacter.name);
    }
    
    return selectedCharacter;
}

// 在DOM加载完成后添加CSS样式并初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 添加no-select类和default类的样式
    const style = document.createElement('style');
    style.textContent = `
        .no-select {
            cursor: not-allowed !important;
            opacity: 0.6 !important;
        }
        .guess-property.default {
            background: rgba(240, 240, 245, 0.8);
            border: 1px solid rgba(200, 200, 210, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    // 初始化游戏
    init();
});