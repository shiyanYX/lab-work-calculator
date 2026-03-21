// 测试不同伤害类型在不同工作类型下的计算
import { calculateFullExpectation } from './src/utils/calculator.js';

// 测试不同伤害类型的异想体
const testAbnormalities = {
  // 精神伤害（一罪与百善）
  mental: {
    name: '一罪与百善',
    level: 'ZAYIN',
    damageType: '精神',
    damage: '1-2',
    maxPeBox: 10,
    preferences: {
      instinct: [50, 40, 30, 30, 30],
      insight: [70, 70, 50, 50, 50],
      communication: [70, 70, 70, 70, 70],
      oppression: [50, 40, 30, 30, 30]
    }
  },
  // 物理伤害
  physical: {
    name: '韦尔奇乐牌汽水',
    level: 'ZAYIN',
    damageType: '物理',
    damage: '1-2',
    maxPeBox: 10,
    preferences: {
      instinct: [70, 70, 60, 60, 60],
      insight: [70, 70, 60, 60, 60],
      communication: [50, 50, 40, 40, 40],
      oppression: [50, 50, 40, 40, 40]
    }
  },
  // 侵蚀伤害
  corrosion: {
    name: '宇宙碎片',
    level: 'TETH',
    damageType: '侵蚀',
    damage: '1-3',
    maxPeBox: 12,
    preferences: {
      instinct: [30, 30, 20, 20, 20],
      insight: [40, 40, 30, 30, 30],
      communication: [60, 60, 50, 50, 50],
      oppression: [50, 50, 40, 40, 40]
    }
  }
};

// 测试相同自律值下不同工作类型的伤害计算
const selfDiscipline = 30;
const initialAttribute = 50;
const workLevel = 1;
const researchBonus = '有';
const clerkLevel = '一级';
const permanentLevel = '一级';
const isElite = false;

// 测试精神伤害在不同工作类型下的计算
console.log('=== 精神伤害（一罪与百善）测试 ===');
const workTypes = ['本能', '洞察', '沟通'];
workTypes.forEach(workType => {
  const result = calculateFullExpectation(
    selfDiscipline,
    initialAttribute,
    workType,
    testAbnormalities.mental.level,
    workLevel,
    testAbnormalities.mental,
    researchBonus,
    clerkLevel,
    permanentLevel,
    isElite
  );
  console.log(`${workType}工作:`, result);
});

console.log('\n=== 物理伤害测试 ===');
workTypes.forEach(workType => {
  const result = calculateFullExpectation(
    selfDiscipline,
    initialAttribute,
    workType,
    testAbnormalities.physical.level,
    workLevel,
    testAbnormalities.physical,
    researchBonus,
    clerkLevel,
    permanentLevel,
    isElite
  );
  console.log(`${workType}工作:`, result);
});

console.log('\n=== 侵蚀伤害测试 ===');
workTypes.forEach(workType => {
  const result = calculateFullExpectation(
    selfDiscipline,
    initialAttribute,
    workType,
    testAbnormalities.corrosion.level,
    workLevel,
    testAbnormalities.corrosion,
    researchBonus,
    clerkLevel,
    permanentLevel,
    isElite
  );
  console.log(`${workType}工作:`, result);
});
