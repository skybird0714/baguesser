// 游戏状态
let gameState = {
    mode: null, // 'normal' 或 'infinite'
    targetCharacter: null,
    attempts: 0,
    maxAttempts: 6,
    guesses: [],
    gameOver: false,
    gaveUp: false,
    startTime: null,
    guessedCharacters: new Set() // 记录已猜测的角色
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
      "学院": "SRT特种学院",
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
      "站位": "后排",
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
      "学院": "百鬼夜行联合学园",
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
    infiniteBest: 'baguesser_infinite_best'
};

// DOM 元素
const modeSelection = document.getElementById('mode-selection');
const gamePlay = document.getElementById('game-play');
const normalModeBtn = document.getElementById('normal-mode');
const infiniteModeBtn = document.getElementById('infinite-mode');
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

// 初始化游戏
function init() {
    loadBestScores();
    
    // 模式选择事件监听
    normalModeBtn.addEventListener('click', () => startGame('normal'));
    infiniteModeBtn.addEventListener('click', () => startGame('infinite'));
    
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
}

// 加载最佳成绩
function loadBestScores() {
    const normalBest = localStorage.getItem(STORAGE_KEYS.normalBest) || '--';
    const infiniteBest = localStorage.getItem(STORAGE_KEYS.infiniteBest) || '--';
    
    document.getElementById('normal-best').textContent = normalBest;
    document.getElementById('infinite-best').textContent = infiniteBest;
}

// 保存最佳成绩
function saveBestScore() {
    // 确保游戏已结束
    if (!gameState.gameOver) return;
    
    // 如果玩家放弃，不保存成绩
    if (gameState.gaveUp) return;
    
    // 确保有猜测记录
    if (gameState.guesses.length === 0) return;
    
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
        modeSelection.style.display = 'block';
        modeSelection.classList.add('fade-in');
        setTimeout(() => {
            modeSelection.classList.remove('fade-in');
        }, 500);
        
        // 重新加载最佳成绩
        loadBestScores();
    }, 300);
}

// 开始游戏
function startGame(mode) {
    console.log(`开始${mode === 'normal' ? '常规' : '无限'}模式游戏`);
    
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
        guessedCharacters: new Set() // 重置已猜测角色集合
    };
    
    console.log("目标角色:", gameState.targetCharacter.name);
    
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
    
    // 隐藏结果区域
    resultArea.style.display = 'none';
    
    // 设置模式标题
    gameModeTitle.textContent = mode === 'normal' ? '常规模式' : '无限模式';
    updateAttemptsDisplay();
    
    // 重置游戏界面
    guessesContainer.innerHTML = '';
    characterSearch.value = '';
    characterList.innerHTML = '';
    characterList.style.display = 'none';
    
    // 启用放弃按钮
    giveUpBtn.disabled = false;
    giveUpBtn.classList.remove('disabled');
}

// 获取随机角色
function getRandomCharacter() {
    // 过滤掉不完整的角色数据
    const validCharacters = characters.filter(char => 
        char && char.name && char.school && char.club && 
        char.weaponType && char.rarity && char.attackType && 
        char.defenseType && char.position && char.role && 
        char.limited && char.avatar_url && char.intro_link
    );
    
    if (validCharacters.length === 0) {
        console.error('没有有效的角色数据');
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * validCharacters.length);
    return validCharacters[randomIndex];
}

// 显示角色列表
function showCharacterList() {
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
        item.className = isGuessed ? 'character-item guessed' : 'character-item';
        
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
        
        // 只有未猜测过的角色才能点击
        if (!isGuessed) {
            item.addEventListener('click', () => makeGuess(char));
        }
        
        characterList.appendChild(item);
    });
}

// 筛选角色
function filterCharacters() {
    const searchTerm = characterSearch.value.toLowerCase();
    
    // 先清空列表内容
    characterList.innerHTML = '';
    
    // 确保列表可见
    characterList.style.display = 'block';
    
    // 筛选并渲染符合条件的角色
    const filtered = characters.filter(char => 
        char && char.name && char.name.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length > 0) {
        filtered.forEach(char => {
            const item = document.createElement('div');
            
            // 检查角色是否已经猜测过
            const isGuessed = gameState.guessedCharacters.has(char.name);
            item.className = isGuessed ? 'character-item guessed' : 'character-item';
            
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
            
            // 只有未猜测过的角色才能点击
            if (!isGuessed) {
                item.addEventListener('click', () => makeGuess(char));
            }
            
            characterList.appendChild(item);
        });
    } else {
        // 如果没有匹配的角色，显示提示信息
        characterList.innerHTML = '<div class="no-results">没有找到匹配的角色</div>';
    }
}

// 进行猜测
function makeGuess(character) {
    if (gameState.gameOver) return;
    
    // 添加到已猜测角色集合
    gameState.guessedCharacters.add(character.name);
    
    const result = checkGuess(character);
    gameState.guesses.push({ character, result });
    
    renderGuess(character, result);
    characterList.style.display = 'none';
    characterSearch.value = '';
    
    // 检查是否猜对
    if (result.isCorrect) {
        endGame(true);
        return; // 确保在游戏结束后不再执行后续代码
    }
    
    // 减少尝试次数并更新显示
    if (gameState.mode === 'normal') {
        gameState.attempts--;
        
        // 立即检查是否用完尝试次数
        if (gameState.attempts <= 0) {
            console.log("常规模式尝试次数用完，游戏结束");
            updateAttemptsDisplay(); // 先更新显示
            endGame(false);
            return;
        }
    }
    
    // 更新尝试次数显示
    updateAttemptsDisplay();
    
    // 滚动到最新猜测
    guessesContainer.scrollTop = 0;
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
    
    // 将结果区域插入到猜测列表的顶部，而不是底部
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
        
        // 隐藏结果区域
        resultArea.style.display = 'none';
        resultArea.classList.remove('fade-out');
        gamePlay.classList.remove('fade-out');
        
        // 开始新游戏
        startGame(gameState.mode);
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
    
    // 确保结果区域显示
    resultArea.style.display = 'block';
    
    // 添加动画效果
    resultArea.classList.add('fade-in');
    setTimeout(() => {
        resultArea.classList.remove('fade-in');
    }, 500);
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', init); 