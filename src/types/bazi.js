/**
 * 八字数据类型定义 (JSDoc)
 *
 * 提供 IDE 智能提示和类型检查，确保前后端数据格式统一
 *
 * @author Zhihao Li
 * @since 2026-01-26
 */

/**
 * 天干
 * @typedef {Object} HeavenlyStem
 * @property {string} chinese - 天干中文（如"甲"）
 * @property {'wood'|'fire'|'earth'|'metal'|'water'} element - 五行
 * @property {'yang'|'yin'} yinYang - 阴阳
 */

/**
 * 地支
 * @typedef {Object} EarthlyBranch
 * @property {string} chinese - 地支中文（如"子"）
 * @property {'wood'|'fire'|'earth'|'metal'|'water'} element - 五行
 */

/**
 * 单柱（年/月/日/时柱）
 * @typedef {Object} Pillar
 * @property {HeavenlyStem} heavenlyStem - 天干
 * @property {EarthlyBranch} earthlyBranch - 地支
 * @property {string} naYin - 纳音（如"海中金"）
 * @property {string[]} hiddenStems - 藏干列表
 * @property {string} [tenGod] - 十神（相对日主）
 */

/**
 * 四柱
 * @typedef {Object} FourPillars
 * @property {Pillar} year - 年柱
 * @property {Pillar} month - 月柱
 * @property {Pillar} day - 日柱
 * @property {Pillar} hour - 时柱
 */

/**
 * 大运
 * @typedef {Object} DaYun
 * @property {number} index - 大运序号（0-9）
 * @property {number} startAge - 起始年龄
 * @property {number} endAge - 结束年龄
 * @property {string} ganZhi - 完整干支（如"甲子"）- 兼容旧版
 * @property {string} gan - 天干（如"甲"）⭐ 新增
 * @property {string} zhi - 地支（如"子"）⭐ 新增
 * @property {number} startYear - 起始年份
 * @property {number} endYear - 结束年份
 */

/**
 * 大运信息
 * @typedef {Object} YunInfo
 * @property {number} startAge - 起运年龄
 * @property {boolean} forward - 是否顺行
 * @property {DaYun[]} daYunList - 十步大运列表
 */

/**
 * 日主分析
 * @typedef {Object} DayMasterAnalysis
 * @property {number} deLing - 得令分数（0-100）
 * @property {string} deLingDesc - 得令描述
 * @property {number} deDi - 得地分数
 * @property {string} deDiDesc - 得地描述
 * @property {number} tianGanHelp - 天干帮扶分数
 * @property {string} tianGanHelpDesc - 天干帮扶描述
 * @property {number} totalScore - 总分（0-100）
 */

/**
 * 日主
 * @typedef {Object} DayMaster
 * @property {string} gan - 日主天干
 * @property {'weak'|'balanced'|'strong'} strength - 强弱
 * @property {DayMasterAnalysis} [analysis] - 详细分析
 */

/**
 * 五行分析
 * @typedef {Object} FiveElements
 * @property {Object.<string, number>} distribution - 五行分布（带权重）
 * @property {Object.<string, number>} counts - 五行个数（天干+本气）
 * @property {string} strongest - 最旺五行
 * @property {string} weakest - 最弱五行
 * @property {string[]} favorable - 喜用五行
 * @property {string[]} unfavorable - 忌讳五行
 * @property {Object.<string, string>} elementStates - 五行旺衰状态
 * @property {string} monthElement - 月令五行
 */

/**
 * 十神信息
 * @typedef {Object} TenGodInfo
 * @property {string} name - 十神名称
 * @property {number} count - 出现次数
 * @property {string[]} positions - 出现位置
 */

/**
 * 十神分析
 * @typedef {Object} TenGodsAnalysis
 * @property {Object.<string, TenGodInfo>} gods - 十神映射
 */

/**
 * 格局信息
 * @typedef {Object} Pattern
 * @property {string} name - 格局名称（如"正财格"）
 * @property {'normal'|'special'} category - 分类
 * @property {string} description - 格局描述
 * @property {string} [monthStem] - 月令本气（可选）
 * @property {string} [monthStemTenGod] - 月令十神（可选）
 * @property {boolean} [isTransparent] - 是否透出（可选）
 */

/**
 * 神煞信息
 * @typedef {Object} ShenSha
 * @property {string[]} year - 年柱神煞
 * @property {string[]} month - 月柱神煞
 * @property {string[]} day - 日柱神煞
 * @property {string[]} hour - 时柱神煞
 */

/**
 * 真太阳时
 * @typedef {Object} TrueSolarTime
 * @property {number} year - 年
 * @property {number} month - 月
 * @property {number} day - 日
 * @property {number} hour - 时
 * @property {number} minute - 分
 */

/**
 * 八字数据（顶层类型）
 * @typedef {Object} BaziData
 *
 * @property {string} gender - 性别："male" | "female"
 * @property {string} solarDate - 公历日期时间
 * @property {string} lunarDate - 农历日期描述
 * @property {TrueSolarTime} trueSolarTime - 真太阳时信息
 *
 * @property {FourPillars} fourPillars - 四柱（年月日时）
 * @property {Object.<string, string>} fourPillarsShiShen - 十神分布
 * @property {Object.<string, string>} fourPillarsXunKong - 空亡信息
 *
 * @property {DayMaster} dayMaster - 日主强弱分析
 * @property {FiveElements} fiveElements - 五行统计
 * @property {TenGodsAnalysis} tenGods - 十神分析
 * @property {Pattern} pattern - 格局判断
 * @property {YunInfo} yun - 大运信息
 *
 * @property {ShenSha} shenSha - 神煞
 * @property {string} shengXiao - 生肖
 * @property {string} taiYuan - 胎元
 * @property {string} mingGong - 命宫
 * @property {string} shenGong - 身宫
 * @property {string} xunKong - 空亡
 * @property {string[]} dayMasterCharacteristics - 日主特征描述
 */

// 导出类型（虽然 JSDoc 不需要 export，但为了明确性添加注释）
export {};
