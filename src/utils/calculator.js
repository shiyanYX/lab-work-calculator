// 异想体输出值表格数据
const outputValues = {
  ZAYIN: [0.6, 0.44, 0.3, 0.18, 0.08],
  TETH: [0.6, 0.55, 0.4, 0.27, 0.16],
  HE: [0.72, 0.55, 0.5, 0.36, 0.24],
  WAW: [0.84, 0.66, 0.5, 0.45, 0.32],
  ALEPH: [0.6, 0.77, 0.6, 0.45, 0.4]
};

// 健康状态最终输出值转换表
const healthStatusOutput = {
  getFinalOutput(temporaryOutput) {
    if (temporaryOutput <= 0.1) return 1.5;
    if (temporaryOutput <= 0.2) return 1.3;
    if (temporaryOutput < 0.7) return 1;
    if (temporaryOutput < 0.8) return 0.8;
    if (temporaryOutput < 0.9) return 0.6;
    return 0.4;
  }
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

// 计算健康状态暂时输出值
function calculateTemporaryHealthOutput(workType, beforeHealth, afterHealth, beforeMental, afterMental) {
  if (workType === '压迫') {
    // 压迫工作特殊处理
    return 1.5;
  } else if (workType === '本能') {
    // 本能计算现有生命值
    return afterHealth / beforeHealth;
  } else if (workType === '洞察') {
    // 洞察计算现有精神值
    return afterMental / beforeMental;
  } else if (workType === '沟通') {
    // 沟通输出现有生命值和精神值的平均值
    const healthRatio = afterHealth / beforeHealth;
    const mentalRatio = afterMental / beforeMental;
    return (healthRatio + mentalRatio) / 2;
  }
  return 1;
}

// 计算培训部相关影响输出值
function calculateTrainingOutput(researchBonus, clerkLevel, permanentLevel, isElite) {
  // 培训部精英不享受加成
  if (isElite) {
    return 1;
  }
  
  let totalBonus = 1;
  
  // 研究加成：普及培训手册
  if (researchBonus === '有') {
    totalBonus += 0.5;
  }
  
  // 文职加成
  const clerkBonuses = {
    '一级': 0.01,
    '二级': 0.03,
    '三级': 0.05,
    '常驻加成（四级没加成）': 0
  };
  totalBonus += clerkBonuses[clerkLevel] || 0;
  
  // 常驻加成
  const permanentBonuses = {
    '一级': 0.05,
    '二级': 0.1,
    '三级': 0.15,
    '四级': 0
  };
  totalBonus += permanentBonuses[permanentLevel] || 0;
  
  return totalBonus;
}

// 计算结果（增加的属性点）
function calculateResult(peBoxCount, initialAttribute, workType, dangerLevel, workLevel, 
                      beforeHealth, afterHealth, beforeMental, afterMental, 
                      researchBonus, clerkLevel, permanentLevel, isElite) {
  // 计算异想体输出值
  let outputValue = calculateOutputValue(dangerLevel, workLevel);
  
  // 压迫工作特殊处理：等级输出值需要除以3
  if (workType === '压迫') {
    outputValue /= 3;
  }
  
  // 计算健康状态暂时输出值
  const temporaryHealthOutput = calculateTemporaryHealthOutput(
    workType, beforeHealth, afterHealth, beforeMental, afterMental
  );
  
  // 计算健康状态最终输出值
  const finalHealthOutput = healthStatusOutput.getFinalOutput(temporaryHealthOutput);
  
  // 计算培训部相关影响输出值
  const trainingOutput = calculateTrainingOutput(researchBonus, clerkLevel, permanentLevel, isElite);
  
  // 计算增加的属性点
  const addedPoints = peBoxCount * outputValue * finalHealthOutput * trainingOutput;
  
  // 计算最终属性值（初始属性值 + 增加的属性点）
  const finalAttribute = parseFloat(initialAttribute) + addedPoints;
  
  // 四舍五入到两位小数
  return {
    addedPoints: Math.round(addedPoints * 100) / 100,
    finalAttribute: Math.round(finalAttribute * 100) / 100
  };
}

// PE-BOX最大值表
const peBoxMax = {
  ZAYIN: 10,
  TETH: 12,
  HE: 18,
  WAW: 22,
  ALEPH: 33
};

// 品质等级阈值
const qualityLevelThresholds = {
  I: 1,
  II: 30,
  III: 45,
  IV: 65,
  V: 85,
  EX: 100
};

// 计算练级期望值
function calculateLevelingExpectations(initialAttribute, workType, dangerLevel, workLevel, researchBonus, clerkLevel, permanentLevel, isElite) {
  // 计算一半的PE-BOX数量（取最大值的一半）
  const halfPeBox = peBoxMax[dangerLevel] / 2;
  
  // 计算扣血扣精神一半的情况
  const beforeHealth = 100;
  const afterHealth = 50; // 扣一半
  const beforeMental = 100;
  const afterMental = 50; // 扣一半
  
  // 计算一次工作的属性增加量
  const result = calculateResult(
    halfPeBox,
    initialAttribute,
    workType,
    dangerLevel,
    workLevel,
    beforeHealth,
    afterHealth,
    beforeMental,
    afterMental,
    researchBonus,
    clerkLevel,
    permanentLevel,
    isElite
  );
  
  const addedPerWork = result.addedPoints;
  
  // 计算到下一个等级需要的次数
  let nextLevelThreshold = 0;
  const currentAttribute = parseFloat(initialAttribute);
  
  if (currentAttribute < qualityLevelThresholds.II) {
    nextLevelThreshold = qualityLevelThresholds.II;
  } else if (currentAttribute < qualityLevelThresholds.III) {
    nextLevelThreshold = qualityLevelThresholds.III;
  } else if (currentAttribute < qualityLevelThresholds.IV) {
    nextLevelThreshold = qualityLevelThresholds.IV;
  } else if (currentAttribute < qualityLevelThresholds.V) {
    nextLevelThreshold = qualityLevelThresholds.V;
  } else if (currentAttribute < qualityLevelThresholds.EX) {
    nextLevelThreshold = qualityLevelThresholds.EX;
  } else {
    nextLevelThreshold = 100; // 已经达到EX等级，以100为目标
  }
  
  // 计算到下一个等级需要的次数
  const toNextLevel = nextLevelThreshold > currentAttribute ? Math.ceil((nextLevelThreshold - currentAttribute) / addedPerWork) : 0;
  
  // 计算到100需要的次数
  const to100 = currentAttribute < 100 ? Math.ceil((100 - currentAttribute) / addedPerWork) : 0;
  
  return {
    addedPerWork: Math.round(addedPerWork * 100) / 100,
    toNextLevel,
    to100
  };
}

export { calculateOutputValue, calculateResult, calculateLevelingExpectations };