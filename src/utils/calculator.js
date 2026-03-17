// 异想体输出值表格数据
const outputValues = {
  ZAYIN: [0.6, 0.44, 0.3, 0.18, 0.08],
  TETH: [0.6, 0.55, 0.4, 0.27, 0.16],
  HE: [0.72, 0.55, 0.5, 0.36, 0.24],
  WAW: [0.84, 0.66, 0.5, 0.45, 0.32],
  ALEPH: [0.6, 0.77, 0.6, 0.45, 0.4]
};

// 计算异想体输出值
function calculateOutputValue(dangerLevel, workLevel) {
  if (!outputValues[dangerLevel]) {
    return 0;
  }
  const index = workLevel - 1; // 工作等级从1开始，数组索引从0开始
  if (index < 0 || index >= outputValues[dangerLevel].length) {
    return 0;
  }
  return outputValues[dangerLevel][index];
}

// 计算结果（增加的属性点）
function calculateResult(initialAttributes, workType, dangerLevel, workLevel, 
                      beforeHealth, afterHealth, beforeMental, afterMental, 
                      trainingBonus, clerkBonus, permanentBonus) {
  // 计算异想体输出值
  const outputValue = calculateOutputValue(dangerLevel, workLevel);
  
  // 计算生命值变化
  const healthChange = afterHealth - beforeHealth;
  
  // 计算精神值变化
  const mentalChange = afterMental - beforeMental;
  
  // 计算基础结果
  let baseResult = outputValue;
  
  // 应用培训加成
  if (trainingBonus === '有') {
    baseResult *= 1.2; // 假设培训加成为20%
  }
  
  // 应用文职加成
  const clerkBonusMultiplier = {
    '一级': 1.1,
    '二级': 1.2,
    '三级': 1.3,
    '常驻加成（四级没加成）': 1.0
  }[clerkBonus] || 1.0;
  baseResult *= clerkBonusMultiplier;
  
  // 应用常驻加成
  const permanentBonusMultiplier = {
    '一级': 1.05,
    '二级': 1.1,
    '三级': 1.15,
    '四级': 1.0
  }[permanentBonus] || 1.0;
  baseResult *= permanentBonusMultiplier;
  
  // 考虑生命值和精神值变化
  if (healthChange < 0) {
    baseResult *= 0.8; // 生命值减少时降低结果
  }
  if (mentalChange < 0) {
    baseResult *= 0.8; // 精神值减少时降低结果
  }
  
  // 四舍五入到两位小数
  return Math.round(baseResult * 100) / 100;
}

export { calculateOutputValue, calculateResult };