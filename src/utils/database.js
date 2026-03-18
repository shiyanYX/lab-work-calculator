// 数据库操作工具

// 数据库名称和版本
const DB_NAME = 'lobotomy-corporation';
const DB_VERSION = 15;
let db = null;

// 伤害类型定义
const DAMAGE_TYPES = {
  RED: {
    name: '物理伤害',
    color: '红色',
    description: '扣除职员的生命值',
    formula: '扣除职员的生命值为：基础伤害值经过增伤-减伤公式再乘算受击员工的物理伤害抗性点生命值'
  },
  WHITE: {
    name: '精神伤害',
    color: '白色',
    description: '扣除职员的精神值',
    formula: '扣除职员精神值为：基础伤害值经过增伤-减伤公式再乘算受击员工的精神伤害抗性点精神值'
  },
  BLACK: {
    name: '侵蚀伤害',
    color: '黑色',
    description: '同时扣除职员的生命值和精神值',
    formula: '同时扣除职员生命值和精神值为：基础伤害值经过增伤-减伤公式再乘算受击员工的侵蚀伤害抗性点生命值和精神值'
  },
  PALE: {
    name: '灵魂伤害',
    color: '蓝色',
    description: '百分比扣除职员的生命值',
    formula: '扣除职员生命值为：基础伤害值作为百分比乘算受击员工的最大生命值后，经过增伤-减伤公式再乘算受击员工的灵魂伤害抗性点生命值'
  }
};

// 成功率公式定义
const SUCCESS_RATE_FORMULA = {
  base: '基础成功率 = 异想体工作偏好值',
  attribute_bonus: '属性加成 = 员工对应属性值 × 0.2%',
  total: '最终成功率 = 基础成功率 + 属性加成，上限95%',
  special: {
    WAW: 'WAW级异想体拥有"逆卡巴拉能量过载"能力，每次工作后基础成功率上限减少4%，最多叠加至-32%，触发逆卡巴拉熔毁警报后重置',
    ALEPH: 'ALEPH级异想体拥有"逆卡巴拉能量过载"能力，每次工作后基础成功率上限减少6%，最多叠加至-30%，触发逆卡巴拉熔毁警报后重置'
  },
  note: '紫色的成功率就是员工的自律属性'
};

// 打开数据库
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('数据库打开失败:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // 创建异想体表
      if (!db.objectStoreNames.contains('abnormalities')) {
        const store = db.createObjectStore('abnormalities', { keyPath: 'id' });
        store.createIndex('level', 'level', { unique: false });
        store.createIndex('damageType', 'damageType', { unique: false });
      }
      
      // 创建E.G.O护甲表
      if (!db.objectStoreNames.contains('egoArmor')) {
        const store = db.createObjectStore('egoArmor', { keyPath: 'name' });
        store.createIndex('level', 'level', { unique: false });
      }
    };
  });
}

// 初始化数据库并添加异想体数据
async function initializeDatabase() {
  await openDatabase();
  
  // 检查是否已有异想体数据
  const count = await countAbnormalities();
  if (count === 0) {
    // 添加脑叶公司的异想体数据
    await addAbnormalities(getAbnormalityData());
  }
  
  // 检查是否已有E.G.O护甲数据
  const armorCount = await countEgoArmor();
  if (armorCount === 0) {
    // 添加E.G.O护甲数据
    await addEgoArmor(getEgoArmorData());
  }
}

// 获取E.G.O护甲数据
function getEgoArmorData() {
  return [
    // ZAYIN级
    { name: '忏悔', level: 'ZAYIN', resistances: { physical: 0.9, mental: 0.8, corrosion: 0.9, soul: 2.0 } },
    { name: '美味苏打', level: 'ZAYIN', resistances: { physical: 0.8, mental: 1.0, corrosion: 1.0, soul: 2.0 } },
    { name: '翅振', level: 'ZAYIN', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.0, soul: 2.0 } },
    { name: '谢顶之灾', level: 'ZAYIN', resistances: { physical: 1.0, mental: 1.0, corrosion: 0.8, soul: 2.0 } },
    
    // TETH级
    { name: '终末火柴之光', level: 'TETH', resistances: { physical: 0.6, mental: 1.0, corrosion: 1.2, soul: 2.0 } },
    { name: '孤独', level: 'TETH', resistances: { physical: 1.5, mental: 0.8, corrosion: 0.8, soul: 2.0 } },
    { name: '刺耳嚎叫', level: 'TETH', resistances: { physical: 1.2, mental: 0.6, corrosion: 1.0, soul: 2.0 } },
    { name: '噪音', level: 'TETH', resistances: { physical: 1.2, mental: 0.7, corrosion: 0.6, soul: 2.0 } },
    { name: '赤瞳', level: 'TETH', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 2.0 } },
    { name: '犄角', level: 'TETH', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.2, soul: 2.0 } },
    { name: '割腕者', level: 'TETH', resistances: { physical: 1.0, mental: 0.6, corrosion: 1.2, soul: 2.0 } },
    { name: '悔恨', level: 'TETH', resistances: { physical: 0.7, mental: 1.2, corrosion: 0.8, soul: 2.0 } },
    { name: '小喙', level: 'TETH', resistances: { physical: 0.7, mental: 0.8, corrosion: 1.2, soul: 2.0 } },
    { name: '彼方的裂片', level: 'TETH', resistances: { physical: 1.0, mental: 1.2, corrosion: 0.6, soul: 2.0 } },
    { name: '决死之心', level: 'TETH', resistances: { physical: 0.6, mental: 0.9, corrosion: 0.9, soul: 2.0 } },
    { name: '诱捕幻灯', level: 'TETH', resistances: { physical: 0.8, mental: 0.7, corrosion: 1.2, soul: 2.0 } },
    { name: '此刻的神色', level: 'TETH', resistances: { physical: 0.7, mental: 0.6, corrosion: 1.5, soul: 2.0 } },
    { name: '迷魂梦境', level: 'TETH', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.7, soul: 2.0 } },
    { name: '落樱', level: 'TETH', resistances: { physical: 1.2, mental: 0.6, corrosion: 0.7, soul: 2.0 } },
    { name: '超特么可爱！！！', level: 'TETH', resistances: { physical: 0.8, mental: 1.5, corrosion: 0.8, soul: 2.0 } },
    
    // HE级
    { name: '熊熊抱', level: 'HE', resistances: { physical: 0.8, mental: 1.0, corrosion: 1.0, soul: 1.5 } },
    { name: '血之渴望', level: 'HE', resistances: { physical: 0.5, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '泣婴', level: 'HE', resistances: { physical: 1.2, mental: 0.5, corrosion: 0.8, soul: 1.5 } },
    { name: '伐木工', level: 'HE', resistances: { physical: 0.8, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '霜之碎片', level: 'HE', resistances: { physical: 1.3, mental: 0.6, corrosion: 0.8, soul: 1.5 } },
    { name: '粉碎机Mk4', level: 'HE', resistances: { physical: 0.6, mental: 1.3, corrosion: 0.9, soul: 1.5 } },
    { name: '悲惨圣诞', level: 'HE', resistances: { physical: 0.8, mental: 0.6, corrosion: 1.3, soul: 1.5 } },
    { name: '小小银河', level: 'HE', resistances: { physical: 0.8, mental: 0.8, corrosion: 1.2, soul: 1.5 } },
    { name: '蕾蒂希娅', level: 'HE', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '圣宣', level: 'HE', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.5, soul: 1.5 } },
    { name: '魔弹', level: 'HE', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '凝视', level: 'HE', resistances: { physical: 1.0, mental: 0.8, corrosion: 1.0, soul: 1.5 } },
    { name: '猎头长耙', level: 'HE', resistances: { physical: 0.6, mental: 0.8, corrosion: 1.3, soul: 1.5 } },
    { name: '因乐癫狂', level: 'HE', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.8, soul: 1.5 } },
    
    // WAW级
    { name: '以爱与恨之名', level: 'WAW', resistances: { physical: 0.7, mental: 0.8, corrosion: 0.4, soul: 2.0 } },
    { name: '目灯', level: 'WAW', resistances: { physical: 0.8, mental: 0.7, corrosion: 0.4, soul: 1.5 } },
    { name: '绿色枝干', level: 'WAW', resistances: { physical: 0.8, mental: 1.2, corrosion: 0.6, soul: 1.5 } },
    { name: '黄蜂', level: 'WAW', resistances: { physical: 0.7, mental: 0.7, corrosion: 0.7, soul: 1.5 } },
    { name: '余香', level: 'WAW', resistances: { physical: 1.2, mental: 0.6, corrosion: 0.8, soul: 1.5 } },
    { name: '猩红创痕', level: 'WAW', resistances: { physical: 0.6, mental: 0.6, corrosion: 0.6, soul: 1.5 } },
    { name: '郁蓝创痕', level: 'WAW', resistances: { physical: 0.4, mental: 0.8, corrosion: 0.7, soul: 2.0 } },
    { name: '闪金冲锋', level: 'WAW', resistances: { physical: 0.4, mental: 0.7, corrosion: 0.8, soul: 2.0 } },
    { name: '荧光菌孢', level: 'WAW', resistances: { physical: 0.8, mental: 0.6, corrosion: 1.2, soul: 1.5 } },
    { name: '黑天鹅', level: 'WAW', resistances: { physical: 0.6, mental: 1.2, corrosion: 0.8, soul: 1.5 } },
    { name: '沉醉', level: 'WAW', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 1.5 } },
    { name: '穿刺极乐', level: 'WAW', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.6, soul: 1.5 } },
    { name: '盈泪之剑', level: 'WAW', resistances: { physical: 0.8, mental: 0.8, corrosion: 0.8, soul: 0.8 } },
    { name: '脱落之皮', level: 'WAW', resistances: { physical: 0.6, mental: 0.8, corrosion: 1.2, soul: 1.5 } },
    { name: '荣耀之羽', level: 'WAW', resistances: { physical: 0.6, mental: 0.6, corrosion: 1.3, soul: 2.0 } },
    { name: '不和', level: 'WAW', resistances: { physical: 1.2, mental: 0.8, corrosion: 0.6, soul: 1.5 } },
    { name: '月光', level: 'WAW', resistances: { physical: 0.8, mental: 0.4, corrosion: 0.7, soul: 2.0 } },
    { name: '伪善', level: 'WAW', resistances: { physical: 0.7, mental: 0.5, corrosion: 1.3, soul: 1.5 } },
    { name: '无量', level: 'WAW', resistances: { physical: 0.5, mental: 1.3, corrosion: 0.7, soul: 1.5 } },

    // ALEPH级
    { name: '拟态', level: 'ALEPH', resistances: { physical: 0.2, mental: 0.5, corrosion: 0.5, soul: 1.0 } },
    { name: 'Da Capo', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.2, corrosion: 0.5, soul: 1.5 } },
    { name: '失乐园', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.5, soul: 0.3 } },
    { name: '正义裁决者', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.5, soul: 0.5 } },
    { name: '薄暝', level: 'ALEPH', resistances: { physical: 0.3, mental: 0.3, corrosion: 0.3, soul: 0.5 } },
    { name: '笑靥', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.5, corrosion: 0.2, soul: 1.0 } },
    { name: '新星之声', level: 'ALEPH', resistances: { physical: 0.4, mental: 0.4, corrosion: 0.4, soul: 1.0 } },
    { name: '粉红军备', level: 'ALEPH', resistances: { physical: 0.5, mental: 0.3, corrosion: 0.4, soul: 1.0 } },
    { name: '爱慕', level: 'ALEPH', resistances: { physical: 0.3, mental: 0.6, corrosion: 0.3, soul: 1.0 } }
  ];
}

// 获取异想体数据
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

// 统计异想体数量
function countAbnormalities() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 添加多个异想体
function addAbnormalities(abnormalities) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readwrite');
    const store = transaction.objectStore('abnormalities');

    let count = 0;
    const total = abnormalities.length;

    abnormalities.forEach(abnormality => {
      const request = store.put(abnormality);
      request.onsuccess = () => {
        count++;
        if (count === total) {
          resolve(count);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// 获取所有异想体
function getAllAbnormalities() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据等级获取异想体
function getAbnormalitiesByLevel(level) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const index = store.index('level');
    const request = index.getAll(level);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据ID获取异想体
function getAbnormalityById(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('abnormalities', 'readonly');
    const store = transaction.objectStore('abnormalities');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 统计E.G.O护甲数量
function countEgoArmor() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    // 检查egoArmor表是否存在
    if (!db.objectStoreNames.contains('egoArmor')) {
      resolve(0);
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 添加多个E.G.O护甲
function addEgoArmor(armors) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readwrite');
    const store = transaction.objectStore('egoArmor');

    let count = 0;
    const total = armors.length;

    armors.forEach(armor => {
      const request = store.put(armor);
      request.onsuccess = () => {
        count++;
        if (count === total) {
          resolve(count);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// 获取所有E.G.O护甲
function getAllEgoArmor() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据等级获取E.G.O护甲
function getEgoArmorByLevel(level) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const index = store.index('level');
    const request = index.getAll(level);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 根据ID获取E.G.O护甲
function getEgoArmorById(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('数据库未打开'));
      return;
    }

    const transaction = db.transaction('egoArmor', 'readonly');
    const store = transaction.objectStore('egoArmor');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export { 
  openDatabase, 
  initializeDatabase, 
  getAllAbnormalities, 
  getAbnormalitiesByLevel, 
  getAbnormalityById,
  getAllEgoArmor,
  getEgoArmorByLevel,
  getEgoArmorById,
  DAMAGE_TYPES,
  SUCCESS_RATE_FORMULA
};