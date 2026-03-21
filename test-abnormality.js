// 测试一罪与百善的伤害计算
import { calculateFullExpectation } from './src/utils/calculator.js';

// 一罪与百善数据
const oneSinAndHundredGoods = {
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
};

// 测试数据1：洞察工作，低自律
const test1 = calculateFullExpectation(
  10, // 自律
  50, // 初始属性值
  '洞察', // 工作类型
  'ZAYIN', // 危险等级
  1, // 工作等级
  oneSinAndHundredGoods, // 异想体数据
  '有', // 研究加成
  '一级', // 文职加成
  '一级', // 常驻加成
  false // 培训部精英
);
console.log('测试1 - 一罪与百善（洞察工作，自律10）:', test1);

// 测试数据2：洞察工作，高自律
const test2 = calculateFullExpectation(
  50, // 自律
  50, // 初始属性值
  '洞察', // 工作类型
  'ZAYIN', // 危险等级
  1, // 工作等级
  oneSinAndHundredGoods, // 异想体数据
  '有', // 研究加成
  '一级', // 文职加成
  '一级', // 常驻加成
  false // 培训部精英
);
console.log('测试2 - 一罪与百善（洞察工作，自律50）:', test2);

// 测试数据3：沟通工作
const test3 = calculateFullExpectation(
  30, // 自律
  50, // 初始属性值
  '沟通', // 工作类型
  'ZAYIN', // 危险等级
  1, // 工作等级
  oneSinAndHundredGoods, // 异想体数据
  '有', // 研究加成
  '一级', // 文职加成
  '一级', // 常驻加成
  false // 培训部精英
);
console.log('测试3 - 一罪与百善（沟通工作，自律30）:', test3);

// 测试数据4：本能工作
const test4 = calculateFullExpectation(
  30, // 自律
  50, // 初始属性值
  '本能', // 工作类型
  'ZAYIN', // 危险等级
  1, // 工作等级
  oneSinAndHundredGoods, // 异想体数据
  '有', // 研究加成
  '一级', // 文职加成
  '一级', // 常驻加成
  false // 培训部精英
);
console.log('测试4 - 一罪与百善（本能工作，自律30）:', test4);
