// 异想体基础数据
function getAbnormalityData() {
  return [
    // ZAYIN级
    { id: 'O-03-03', name: '一罪与百善', level: 'ZAYIN', damageType: '精神', damage: '1-2', maxPeBox: 10, preferences: { instinct: [50, 40, 30, 30, 30], insight: [70, 70, 50, 50, 50], communication: [70, 70, 70, 70, 70], oppression: [50, 40, 30, 30, 30] } },
    { id: 'O-01-45', name: '疫医', level: 'ZAYIN', damageType: '精神', damage: '1-2', maxPeBox: 10, preferences: { instinct: [40, 40, 40, 40, 40], insight: [60, 60, 60, 60, 60], communication: [60, 60, 60, 60, 60], oppression: [60, 60, 60, 60, 60] } },
    { id: 'F-05-52', name: '韦尔奇乐牌汽水', level: 'ZAYIN', damageType: '物理', damage: '1-2', maxPeBox: 10, preferences: { instinct: [70, 70, 60, 60, 60], insight: [70, 70, 60, 60, 60], communication: [50, 50, 40, 40, 40], oppression: [50, 50, 40, 40, 40] } },
    { id: 'F-04-83', name: '精灵盛宴', level: 'ZAYIN', damageType: '物理', damage: '1-2', maxPeBox: 10, preferences: { instinct: [70, 70, 70, 70, 70], insight: [50, 40, 30, 30, 30], communication: [70, 60, 50, 50, 50], oppression: [50, 40, 30, 30, 30] } },
    { id: 'D-01-106', name: '深黯 "军团"', level: 'ZAYIN', damageType: '精神', damage: '7-9', maxPeBox: 30, preferences: { instinct: [0, 0, 0, 0, 0], insight: [40, 40, 40, 40, 40], communication: [50, 50, 50, 50, 50], oppression: [30, 30, 30, 30, 30] } },
    { id: 'ZAYIN-001', name: '秃头-真是-太棒啦! 你是个秃子...', level: 'ZAYIN', damageType: '侵蚀', damage: '1-2', maxPeBox: 6, preferences: { instinct: [0, 0, 0, 0, 0], insight: [0, 0, 0, 0, 0], communication: [0, 0, 0, 0, 0], oppression: [0, 0, 0, 0, 0] } },

    // TETH级
    { id: 'F-01-02', name: '焦化少女', level: 'TETH', damageType: '物理', damage: '2-4', maxPeBox: 12, preferences: { instinct: [40, 40, 40, 40, 40], insight: [60, 60, 50, 50, 50], communication: [30, 15, 0, -40, -50], oppression: [50, 50, 40, 40, 40] } },
    { id: 'O-01-12', name: '老妇人', level: 'TETH', damageType: '精神', damage: '1-3', maxPeBox: 14, preferences: { instinct: [45, 45, 40, 40, 40], insight: [45, 45, 50, 50, 50], communication: [65, 65, 60, 60, 60], oppression: [30, 30, 30, 30, 30] } },
    { id: 'F-01-18', name: '面壁女', level: 'TETH', damageType: '精神', damage: '2-3', maxPeBox: 14, preferences: { instinct: [55, 55, 55, 55, 55], insight: [45, 45, 0, 0, 0], communication: [100, 100, 100, 100, 100], oppression: [55, 55, 30, 30, 30] } },
    { id: 'T-06-27', name: '1.76兆赫', level: 'TETH', damageType: '精神', damage: '2-4', maxPeBox: 12, preferences: { instinct: [40, 40, 40, 40, 40], insight: [40, 30, 20, 20, 20], communication: [20, 10, 0, 0, 0], oppression: [55, 55, 60, 60, 60] } },
    { id: 'T-02-43', name: '蜘蛛巢', level: 'TETH', damageType: '物理', damage: '2-3', maxPeBox: 14, preferences: { instinct: [60, 60, 65, 65, 65], insight: [-50, -50, -50, -50, -50], communication: [50, 50, 55, 55, 55], oppression: [40, 40, 45, 45, 45] } },
    { id: 'F-02-44', name: '美女和野兽', level: 'TETH', damageType: '精神', damage: '2-4', maxPeBox: 12, preferences: { instinct: [40, 20, -20, -20, -20], insight: [50, 50, 40, 30, 30], communication: [30, 15, -50, -50, -50], oppression: [65, 65, 65, 65, 65] } },
    { id: 'T-05-51', name: '血浴缸', level: 'TETH', damageType: '精神', damage: '2-4', maxPeBox: 14, preferences: { instinct: [55, 55, 50, 50, 50], insight: [45, 45, 40, 40, 40], communication: [60, 60, 60, 60, 60], oppression: [30, 20, 10, 0, 0] } },
    { id: 'T-01-54', name: '被遗弃的杀人魔', level: 'TETH', damageType: '物理', damage: '2-3', maxPeBox: 14, preferences: { instinct: [60, 60, 50, 50, 50], insight: [40, 40, 30, 30, 30], communication: [50, 50, 40, 40, 40], oppression: [30, 20, 0, -80, -80] } },
    { id: 'O-02-56', name: '惩戒鸟', level: 'TETH', damageType: '物理', damage: '2-4', maxPeBox: 12, preferences: { instinct: [40, 40, 45, 45, 45], insight: [60, 60, 60, 60, 60], communication: [55, 55, 50, 50, 50], oppression: [30, 20, 10, 0, 0] } },
    { id: 'O-03-60', name: '宇宙碎片', level: 'TETH', damageType: '侵蚀', damage: '1-3', maxPeBox: 12, preferences: { instinct: [30, 30, 20, 20, 20], insight: [40, 40, 30, 30, 30], communication: [60, 60, 50, 50, 50], oppression: [50, 50, 40, 40, 40] } },
    { id: 'O-05-61', name: '破裂盔甲', level: 'TETH', damageType: '物理', damage: '2-4', maxPeBox: 12, preferences: { instinct: [50, 50, 55, 55, 60], insight: [40, 40, 40, 40, 40], communication: [0, 0, 0, 0, 0], oppression: [60, 60, 65, 65, 70] } },
    { id: 'O-04-84', name: '陆生', level: 'TETH', damageType: '精神', damage: '1-3', maxPeBox: 14, preferences: { instinct: [45, 45, 50, 55, 55], insight: [60, 60, 60, 60, 60], communication: [45, 45, 45, 45, 45], oppression: [30, 30, 30, 30, 30] } },
    { id: 'O-01-92', name: '今天也很害羞', level: 'TETH', damageType: '侵蚀', damage: '2-3', maxPeBox: 12, preferences: { instinct: [50, 45, 45, 40, 40], insight: [50, 45, 45, 40, 40], communication: [50, 45, 45, 40, 40], oppression: [50, 45, 45, 40, 40] } },
    { id: 'T-02-99', name: '空虚之梦', level: 'TETH', damageType: '侵蚀', damage: '1-3', maxPeBox: 14, preferences: { instinct: [45, 45, 45, 45, 45], insight: [45, 45, 45, 45, 45], communication: [60, 60, 60, 60, 60], oppression: [20, 20, 20, 20, 20] } },
    { id: 'O-04-100', name: '樱下墓', level: 'TETH', damageType: '精神', damage: '2-4', maxPeBox: 12, preferences: { instinct: [40, 40, 40, 40, 40], insight: [55, 55, 55, 55, 55], communication: [55, 55, 55, 55, 55], oppression: [20, 20, 20, 20, 20] } },
    { id: 'D-02-107', name: '波迪', level: 'TETH', damageType: '物理', damage: '2-3', maxPeBox: 12, preferences: { instinct: [60, 60, 60, 60, 60], insight: [40, 40, 40, 40, 40], communication: [40, 40, 40, 40, 40], oppression: [40, 40, 40, 40, 40] } },

    // HE级
    { id: 'T-04-06', name: '快乐泰迪', level: 'HE', damageType: '精神', damage: '2-4', maxPeBox: 15, preferences: { instinct: [0, 0, 0, 0, 0], insight: [40, 45, 45, 35, 35], communication: [60, 60, 60, 50, 45], oppression: [40, 45, 45, 40, 35] } },
    { id: 'O-04-08', name: '红舞鞋', level: 'HE', damageType: '物理', damage: '4-6', maxPeBox: 16, preferences: { instinct: [50, 50, 45, 50, 65], insight: [50, 60, 55, 55, 55], communication: [99, 99, 50, 40, 30], oppression: [0, 0, 0, 0, 0] } },
    { id: 'O-01-15', name: '无名怪婴', level: 'HE', damageType: '物理', damage: '4-6', maxPeBox: 18, preferences: { instinct: [40, 50, 60, 60, 60], insight: [20, 30, 30, 30, 30], communication: [20, 30, 30, 30, 30], oppression: [20, 30, 30, 30, 30] } },
    { id: 'O-05-30', name: '歌唱机', level: 'HE', damageType: '精神', damage: '4-6', maxPeBox: 18, preferences: { instinct: [55, 55, 60, 60, 60], insight: [50, 50, 50, 50, 50], communication: [0, 0, 0, 30, 30], oppression: [40, 40, 40, 40, 40] } },
    { id: 'F-05-32', name: '热心的樵夫', level: 'HE', damageType: '精神', damage: '3-5', maxPeBox: 18, preferences: { instinct: [45, 45, 45, 45, 45], insight: [45, 45, 45, 45, 45], communication: [50, 60, 70, 80, 90], oppression: [45, 45, 45, 45, 45] } },
    { id: 'F-01-37', name: '冰雪女皇', level: 'HE', damageType: '精神', damage: '4-5', maxPeBox: 18, preferences: { instinct: [30, 30, 40, 40, 50], insight: [50, 50, 60, 60, 70], communication: [40, 40, 50, 50, 60], oppression: [0, 0, 0, 0, 0] } },
    { id: 'T-05-41', name: '小帮手', level: 'HE', damageType: '物理', damage: '3-5', maxPeBox: 16, preferences: { instinct: [50, 55, 55, 50, 45], insight: [0, 0, -30, -60, -90], communication: [35, 40, 40, 35, 30], oppression: [50, 55, 55, 50, 45] } },
    { id: 'F-02-49', name: '雪橇鲁道夫', level: 'HE', damageType: '精神', damage: '3-4', maxPeBox: 18, preferences: { instinct: [20, 40, 40, 35, 0], insight: [50, 60, 60, 55, 50], communication: [40, 50, 50, 45, 40], oppression: [0, 0, 0, 0, 0] } },
    { id: 'O-01-55', name: '银河之子', level: 'HE', damageType: '侵蚀', damage: '2-3', maxPeBox: 16, preferences: { instinct: [45, 45, 45, 45, 45], insight: [45, 45, 45, 45, 45], communication: [45, 45, 45, 45, 45], oppression: [45, 45, 45, 45, 45] } },
    { id: 'O-01-67', name: '蕾蒂希娅', level: 'HE', damageType: '侵蚀', damage: '2-4', maxPeBox: 16, preferences: { instinct: [40, 45, 50, 50, 50], insight: [40, 40, 40, 40, 40], communication: [60, 60, 60, 65, 65], oppression: [0, 0, 0, 0, 0] } },
    { id: 'T-01-68', name: '亡蝶葬仪', level: 'HE', damageType: '精神', damage: '4-6', maxPeBox: 16, preferences: { instinct: [50, 45, 40, 0, 0], insight: [50, 50, 50, 50, 50], communication: [0, 0, 0, 0, 0], oppression: [0, 0, 60, 60, 60] } },
    { id: 'F-01-69', name: '魔弹射手', level: 'HE', damageType: '侵蚀', damage: '3-4', maxPeBox: 18, preferences: { instinct: [40, 40, 40, 40, 40], insight: [50, 50, 50, 50, 50], communication: [30, 30, 30, 30, 30], oppression: [0, 0, 60, 60, 60] } },
    { id: 'O-05-76', name: '幸灾乐祸', level: 'HE', damageType: '物理', damage: '3-6', maxPeBox: 18, preferences: { instinct: [0, 0, 0, 0, 0], insight: [30, 40, 40, 50, 50], communication: [40, 40, 40, 30, 20], oppression: [40, 45, 50, 55, 60] } },
    { id: 'F-01-87', name: '索求智慧的稻草人', level: 'HE', damageType: '精神', damage: '2-6', maxPeBox: 18, preferences: { instinct: [45, 45, 45, 45, 45], insight: [50, 60, 70, 80, 90], communication: [45, 45, 45, 45, 45], oppression: [45, 45, 45, 45, 45] } },
    { id: 'O-02-98', name: '棘刺公交', level: 'HE', damageType: '侵蚀', damage: '1-5', maxPeBox: 18, preferences: { instinct: [60, 60, 60, 60, 60], insight: [40, 40, 40, 40, 40], communication: [50, 50, 50, 50, 50], oppression: [30, 30, 30, 30, 30] } },

    // WAW级
    { id: 'O-01-04', name: '憎恶女王', level: 'WAW', damageType: '侵蚀', damage: '3-4', maxPeBox: 22, preferences: { instinct: [30, 40, 50, 50, 50], insight: [45, 45, 45, 45, 45], communication: [50, 50, 55, 55, 60], oppression: [20, 20, 20, 0, 0] } },
    { id: 'O-02-40', name: '大鸟', level: 'WAW', damageType: '侵蚀', damage: '2-6', maxPeBox: 20, preferences: { instinct: [45, 45, 45, 50, 50], insight: [35, 35, 35, 35, 35], communication: [40, 45, 50, 55, 55], oppression: [25, 20, 15, 10, 0] } },
    { id: 'F-04-42', name: '白雪公主的苹果', level: 'WAW', damageType: '侵蚀', damage: '3-5', maxPeBox: 20, preferences: { instinct: [0, 0, 40, 40, 40], insight: [10, 20, 45, 45, 50], communication: [0, 0, 0, 0, 0], oppression: [20, 30, 55, 55, 60] } },
    { id: 'T-04-50', name: '蜂后', level: 'WAW', damageType: '物理', damage: '4-6', maxPeBox: 22, preferences: { instinct: [0, 0, 45, 45, 50], insight: [0, 0, 55, 55, 60], communication: [0, 0, 40, 40, 40], oppression: [0, 0, 0, 0, 0] } },
    { id: 'T-04-53', name: '爱娜温', level: 'WAW', damageType: '精神', damage: '4-6', maxPeBox: 22, preferences: { instinct: [0, 0, 40, 50, 60], insight: [0, 0, 55, 55, 55], communication: [0, 0, 40, 30, 20], oppression: [0, 0, 0, 0, 0] } },
    { id: 'F-01-57', name: '小红帽雇佣兵', level: 'WAW', damageType: '物理', damage: '4-6', maxPeBox: 20, preferences: { instinct: [0, 0, 45, 45, 50], insight: [45, 50, 50, 55, 55], communication: [0, 0, 0, 0, 0], oppression: [30, 30, 30, 30, 30] } },
    { id: 'F-02-58', name: '又大又可能很坏的狼', level: 'WAW', damageType: '物理', damage: '4-8', maxPeBox: 22, preferences: { instinct: [40, 40, 45, 45, 50], insight: [30, 30, 30, 20, 20], communication: [45, 50, 50, 55, 55], oppression: [0, 0, 0, 0, 0] } },
    { id: 'O-02-62', name: '审判鸟', level: 'WAW', damageType: '灵魂', damage: '5-7', maxPeBox: 24, preferences: { instinct: [20, 20, 35, 45, 45], insight: [20, 20, 40, 50, 50], communication: [20, 20, 35, 45, 45], oppression: [0, 0, 0, 0, 0] } },
    { id: 'O-01-64', name: '贪婪女王', level: 'WAW', damageType: '物理', damage: '5-7', maxPeBox: 22, preferences: { instinct: [25, 25, 50, 50, 55], insight: [0, 0, 0, 0, 0], communication: [0, 0, 50, 50, 55], oppression: [0, 0, 40, 40, 40] } },
    { id: 'O-04-66', name: '小王子', level: 'WAW', damageType: '侵蚀', damage: '3-4', maxPeBox: 24, preferences: { instinct: [0, 0, 40, 40, 40], insight: [25, 30, 35, 40, 45], communication: [0, 0, 50, 50, 55], oppression: [0, 0, 50, 50, 55] } },
    { id: 'F-02-70', name: '黑天鹅之梦', level: 'WAW', damageType: '精神', damage: '5-6', maxPeBox: 24, preferences: { instinct: [0, 0, 45, 50, 55], insight: [0, 0, 40, 45, 50], communication: [0, 0, 0, 0, 0], oppression: [0, 0, 45, 50, 55] } },
    { id: 'T-02-71', name: '梦中的洋流', level: 'WAW', damageType: '精神', damage: '3-6', maxPeBox: 20, preferences: { instinct: [50, 50, 60, 55, 55], insight: [0, 0, 0, 0, 0], communication: [45, 45, 45, 50, 55], oppression: [45, 45, 45, 45, 45] } },
    { id: 'O-04-72', name: '穿刺乐园', level: 'WAW', damageType: '侵蚀', damage: '4-5', maxPeBox: 24, preferences: { instinct: [0, 0, 0, 0, 0], insight: [0, 0, 35, 40, 45], communication: [50, 50, 50, 55, 55], oppression: [0, 0, 45, 50, 55] } },
    { id: 'O-01-73', name: '绝望骑士', level: 'WAW', damageType: '精神', damage: '4-6', maxPeBox: 22, preferences: { instinct: [0, 0, 0, 0, 0], insight: [45, 45, 45, 45, 45], communication: [50, 50, 55, 55, 60], oppression: [40, 40, 40, 35, 30] } },
    { id: 'O-02-74', name: '裸巢', level: 'WAW', damageType: '物理', damage: '5-7', maxPeBox: 22, preferences: { instinct: [40, 45, 50, 50, 55], insight: [0, 0, 0, 0, 0], communication: [0, 0, 45, 45, 50], oppression: [40, 40, 40, 40, 40] } },
    { id: 'O-03-88', name: '次元衍射变体', level: 'WAW', damageType: '精神', damage: '4-7', maxPeBox: 22, preferences: { instinct: [0, 0, 40, 40, 40], insight: [35, 40, 45, 50, 55], communication: [0, 0, 40, 40, 40], oppression: [0, 0, 40, 40, 40] } },
    { id: 'O-02-101', name: '炎雀', level: 'WAW', damageType: '物理', damage: '3-4', maxPeBox: 24, preferences: { instinct: [55, 55, 50, 50, 60], insight: [30, 30, 25, 25, 35], communication: [45, 45, 40, 40, 50], oppression: [45, 45, 40, 40, 50] } },
    { id: 'O-05-102', name: '阴', level: 'WAW', damageType: '侵蚀', damage: '4-6', maxPeBox: 20, preferences: { instinct: [0, 0, 40, 40, 40], insight: [0, 0, 55, 55, 55], communication: [0, 0, 0, 0, 0], oppression: [0, 0, 40, 40, 40] } },
    { id: 'D-01-105', name: '月光女神', level: 'WAW', damageType: '精神', damage: '5-7', maxPeBox: 20, preferences: { instinct: [20, 30, 40, 50, 55], insight: [40, 45, 45, 55, 55], communication: [30, 30, 30, 30, 30], oppression: [30, 30, 30, 30, 30] } },
    { id: 'D-04-108', name: '寄生树', level: 'WAW', damageType: '精神', damage: '5-6', maxPeBox: 24, preferences: { instinct: [45, 45, 45, 45, 45], insight: [40, 40, 40, 45, 45], communication: [50, 50, 50, 50, 50], oppression: [20, 20, 20, 20, 20] } },
    { id: 'D-01-110', name: '风云法师', level: 'WAW', damageType: '精神', damage: '4-6', maxPeBox: 22, preferences: { instinct: [0, 0, 0, 0, 0], insight: [20, 20, 55, 55, 55], communication: [20, 45, 45, 45, 45], oppression: [40, 20, 40, 40, 40] } },

    // ALEPH级
    { id: 'O-06-20', name: '「一无所有」', level: 'ALEPH', damageType: '物理', damage: '6-9', maxPeBox: 33, preferences: { instinct: [0, 0, 35, 40, 45], insight: [0, 0, 0, 0, 0], communication: [50, 50, 50, 50, 50], oppression: [0, 0, 0, 0, 0] } },
    { id: 'T-01-31', name: '沉默乐团', level: 'ALEPH', damageType: '精神', damage: '7-9', maxPeBox: 30, preferences: { instinct: [0, 0, 0, 0, 0], insight: [0, 0, 30, 30, 40], communication: [0, 0, 40, 40, 50], oppression: [0, 0, 10, 20, 30] } },
    { id: 'T-03-46', name: '白夜', level: 'ALEPH', damageType: '灵魂', damage: '7-8', maxPeBox: 35, preferences: { instinct: [0, 0, 0, 0, 0], insight: [0, 0, 30, 30, 40], communication: [30, 30, 35, 40, 45], oppression: [30, 30, 35, 40, 45] } },
    { id: 'T-01-75', name: '微笑的尸山', level: 'ALEPH', damageType: '侵蚀', damage: '6-8', maxPeBox: 30, preferences: { instinct: [0, 0, 0, 50, 55], insight: [0, 0, 0, 0, 0], communication: [0, 0, 0, 0, 0], oppression: [0, 0, 0, 50, 55] } },
    { id: 'O-03-89', name: '"CENSORED"', level: 'ALEPH', damageType: '侵蚀', damage: '5-10', maxPeBox: 32, preferences: { instinct: [80, 70, 60, 50, 40], insight: [90, 80, 70, 60, 50], communication: [70, 60, 50, 40, 30], oppression: [0, 0, 0, 0, 0] } },
    { id: 'O-03-93', name: '碧蓝新星', level: 'ALEPH', damageType: '精神', damage: '6-9', maxPeBox: 33, preferences: { instinct: [30, 30, 30, 30, 30], insight: [50, 50, 50, 50, 50], communication: [0, 0, 0, 0, 0], oppression: [40, 40, 40, 40, 40] } },
    { id: 'D-03-109', name: '溶解之爱', level: 'ALEPH', damageType: '侵蚀', damage: '4-10', maxPeBox: 32, preferences: { instinct: [20, 20, 30, 40, 40], insight: [40, 40, 40, 45, 45], communication: [20, 30, 40, 50, 55], oppression: [0, 0, 0, 0, 0] } }
  ];
}

export { getAbnormalityData };
