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
    if (temporaryOutput <= 0.1) return 1.5;  // [0, 0.1] → 1.5
    if (temporaryOutput <= 0.2) return 1.3;  // (0.1, 0.2] → 1.3
    if (temporaryOutput < 0.7) return 1;     // (0.2, 0.7) → 1
    if (temporaryOutput < 0.8) return 0.8;   // [0.7, 0.8) → 0.8
    if (temporaryOutput < 0.9) return 0.6;   // [0.8, 0.9) → 0.6
    return 0.4;                              // [0.9, +∞) → 0.4
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

// 计算期望伤害
function calculateExpectedDamage(peBoxCount, maxPeBox, damageType, damage, egoArmor = null) {
  // 计算PE-BOX数量差
  const boxDiff = maxPeBox - peBoxCount;
  
  if (boxDiff <= 0) {
    return { health: 0, mental: 0 }; // PE-BOX数量达到或超过最大值，无伤害
  }
  
  // 解析伤害值范围
  const damageRange = damage.split('-').map(Number);
  const avgDamage = (damageRange[0] + damageRange[1]) / 2;
  
  // 根据伤害类型计算伤害
  let healthDamage = 0;
  let mentalDamage = 0;
  
  switch (damageType) {
    case '物理':
      healthDamage = avgDamage * boxDiff;
      break;
    case '精神':
      mentalDamage = avgDamage * boxDiff;
      break;
    case '侵蚀':
      healthDamage = avgDamage * boxDiff;
      mentalDamage = avgDamage * boxDiff;
      break;
    case '灵魂':
      // 灵魂伤害是百分比伤害，这里简化处理为固定值
      healthDamage = avgDamage * boxDiff;
      break;
    default:
      break;
  }
  
  // 应用E.G.O护甲抗性
  if (egoArmor && egoArmor.resistances) {
    switch (damageType) {
      case '物理':
        healthDamage *= egoArmor.resistances.physical || 1;
        break;
      case '精神':
        mentalDamage *= egoArmor.resistances.mental || 1;
        break;
      case '侵蚀':
        healthDamage *= egoArmor.resistances.corrosion || 1;
        mentalDamage *= egoArmor.resistances.corrosion || 1;
        break;
      case '灵魂':
        healthDamage *= egoArmor.resistances.soul || 1;
        break;
    }
  }
  
  return { health: healthDamage, mental: mentalDamage };
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
                      researchBonus, clerkLevel, permanentLevel, isElite, 
                      useExpectedDamage = false, maxPeBox = 10, damageType = '物理', damage = '1-2',
                      egoArmor = null) {
  // 计算异想体输出值
  let outputValue = calculateOutputValue(dangerLevel, workLevel);
  
  // 计算健康状态暂时输出值
  let temporaryHealthOutput;
  
  if (useExpectedDamage) {
    // 使用期望伤害计算
    const expectedDamage = calculateExpectedDamage(peBoxCount, maxPeBox, damageType, damage, egoArmor);
    
    if (workType === '压迫') {
      temporaryHealthOutput = 1.5;
    } else if (damageType === '侵蚀') {
      // 侵蚀伤害：无论什么工作类型都同时扣除生命值和精神值
      const expectedAfterHealth = Math.max(1, beforeHealth - expectedDamage.health);
      const expectedAfterMental = Math.max(1, beforeMental - expectedDamage.mental);
      const healthRatio = expectedAfterHealth / beforeHealth;
      const mentalRatio = expectedAfterMental / beforeMental;
      temporaryHealthOutput = (healthRatio + mentalRatio) / 2;
    } else if (workType === '本能') {
      // 本能计算现有生命值（考虑期望伤害）
      const expectedAfterHealth = Math.max(1, beforeHealth - expectedDamage.health);
      temporaryHealthOutput = expectedAfterHealth / beforeHealth;
    } else if (workType === '洞察') {
      // 洞察计算现有精神值（考虑期望伤害）
      const expectedAfterMental = Math.max(1, beforeMental - expectedDamage.mental);
      temporaryHealthOutput = expectedAfterMental / beforeMental;
    } else if (workType === '沟通') {
      // 沟通输出现有生命值和精神值的平均值（考虑期望伤害）
      const expectedAfterHealth = Math.max(1, beforeHealth - expectedDamage.health);
      const expectedAfterMental = Math.max(1, beforeMental - expectedDamage.mental);
      const healthRatio = expectedAfterHealth / beforeHealth;
      const mentalRatio = expectedAfterMental / beforeMental;
      temporaryHealthOutput = (healthRatio + mentalRatio) / 2;
    } else {
      temporaryHealthOutput = 1;
    }
  } else {
    // 使用实际输入的健康状态
    temporaryHealthOutput = calculateTemporaryHealthOutput(
      workType, beforeHealth, afterHealth, beforeMental, afterMental
    );
  }
  
  // 计算健康状态最终输出值
  let finalHealthOutput = healthStatusOutput.getFinalOutput(temporaryHealthOutput);
  
  // 压迫工作特殊处理：等级输出值需要除以3，最终输出值固定为1.5
  if (workType === '压迫') {
    outputValue /= 3;
    finalHealthOutput = 1.5;
  }
  
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
function calculateLevelingExpectations(initialAttribute, addedPerWork) {
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
  const toNextLevel = nextLevelThreshold > currentAttribute && addedPerWork > 0 ? Math.ceil((nextLevelThreshold - currentAttribute) / addedPerWork) : 0;
  
  // 计算到100需要的次数
  const to100 = currentAttribute < 100 && addedPerWork > 0 ? Math.ceil((100 - currentAttribute) / addedPerWork) : 0;
  
  return {
    addedPerWork: Math.round(addedPerWork * 100) / 100,
    toNextLevel,
    to100
  };
}

// 计算完全期望值（根据自律数值计算期望PE-BOX和期望属性点）
function calculateFullExpectation(
  selfDiscipline,
  initialAttribute,
  workType,
  dangerLevel,
  workLevel,
  selectedAbnormality,
  researchBonus,
  clerkLevel,
  permanentLevel,
  isElite,
  egoArmor = null
) {
  const maxPeBox = selectedAbnormality?.maxPeBox || 10;
  const damageType = selectedAbnormality?.damageType || '物理';
  const damage = selectedAbnormality?.damage || '1-2';
  const preferences = selectedAbnormality?.preferences || {};
  
  // 获取工作偏好值
  const workTypeKey = workType === '本能' ? 'instinct' : 
                     workType === '洞察' ? 'insight' : 
                     workType === '沟通' ? 'communication' : 'oppression';
  const baseSuccessRate = preferences[workTypeKey]?.[workLevel - 1] || 50;
  
  // 计算成功率：基础成功率 + 自律属性加成（每点自律增加0.2%）
  const successRate = Math.min(95, baseSuccessRate + (selfDiscipline * 0.2));
  
  // 计算期望PE-BOX产量：最大PE-BOX × 成功率
  const expectedPeBox = maxPeBox * (successRate / 100);
  
  // 计算PE-BOX数量差（用于计算伤害）
  const boxDiff = maxPeBox - expectedPeBox;
  
  // 计算期望伤害
  let expectedHealthDamage = 0;
  let expectedMentalDamage = 0;
  
  if (boxDiff > 0) {
    const damageRange = damage.split('-').map(Number);
    const avgDamage = (damageRange[0] + damageRange[1]) / 2;
    
    switch (damageType) {
      case '物理':
        expectedHealthDamage = avgDamage * boxDiff;
        break;
      case '精神':
        expectedMentalDamage = avgDamage * boxDiff;
        break;
      case '侵蚀':
        expectedHealthDamage = avgDamage * boxDiff;
        expectedMentalDamage = avgDamage * boxDiff;
        break;
      case '灵魂':
        expectedHealthDamage = avgDamage * boxDiff;
        break;
    }
    
    // 应用E.G.O护甲抗性
    if (egoArmor && egoArmor.resistances) {
      switch (damageType) {
        case '物理':
          expectedHealthDamage *= egoArmor.resistances.physical || 1;
          break;
        case '精神':
          expectedMentalDamage *= egoArmor.resistances.mental || 1;
          break;
        case '侵蚀':
          expectedHealthDamage *= egoArmor.resistances.corrosion || 1;
          expectedMentalDamage *= egoArmor.resistances.corrosion || 1;
          break;
        case '灵魂':
          expectedHealthDamage *= egoArmor.resistances.soul || 1;
          break;
      }
    }
  }
  
  // 计算期望健康状态
  const beforeHealth = 100;
  const beforeMental = 100;
  let expectedAfterHealth = 100;
  let expectedAfterMental = 100;
  let temporaryHealthOutput;
  
  if (damageType === '侵蚀') {
    expectedAfterHealth = Math.max(1, beforeHealth - expectedHealthDamage);
    expectedAfterMental = Math.max(1, beforeMental - expectedMentalDamage);
    temporaryHealthOutput = ((expectedAfterHealth / beforeHealth) + (expectedAfterMental / beforeMental)) / 2;
  } else if (workType === '本能') {
    expectedAfterHealth = Math.max(1, beforeHealth - expectedHealthDamage);
    temporaryHealthOutput = expectedAfterHealth / beforeHealth;
  } else if (workType === '洞察') {
    expectedAfterMental = Math.max(1, beforeMental - expectedMentalDamage);
    temporaryHealthOutput = expectedAfterMental / beforeMental;
  } else if (workType === '沟通') {
    expectedAfterHealth = Math.max(1, beforeHealth - expectedHealthDamage);
    expectedAfterMental = Math.max(1, beforeMental - expectedMentalDamage);
    temporaryHealthOutput = ((expectedAfterHealth / beforeHealth) + (expectedAfterMental / beforeMental)) / 2;
  } else {
    temporaryHealthOutput = 1.5;
  }
  
  // 压迫工作特殊处理
  let outputValue = calculateOutputValue(dangerLevel, workLevel);
  let finalHealthOutput = healthStatusOutput.getFinalOutput(temporaryHealthOutput);
  
  if (workType === '压迫') {
    outputValue /= 3;
    finalHealthOutput = 1.5;
  }
  
  // 计算培训部加成
  const trainingOutput = calculateTrainingOutput(researchBonus, clerkLevel, permanentLevel, isElite);
  
  // 计算期望属性点增加值
  const expectedAddedPoints = expectedPeBox * outputValue * finalHealthOutput * trainingOutput;
  
  // 计算到下一个等级和100属性需要的次数
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
    nextLevelThreshold = 100;
  }
  
  const toNextLevel = expectedAddedPoints > 0 && nextLevelThreshold > currentAttribute 
    ? Math.ceil((nextLevelThreshold - currentAttribute) / expectedAddedPoints) 
    : Infinity;
  const to100 = expectedAddedPoints > 0 && currentAttribute < 100 
    ? Math.ceil((100 - currentAttribute) / expectedAddedPoints) 
    : Infinity;
  
  return {
    successRate: Math.round(successRate * 100) / 100,
    expectedPeBox: Math.round(expectedPeBox * 100) / 100,
    expectedAddedPoints: Math.round(expectedAddedPoints * 100) / 100,
    toNextLevel: toNextLevel === Infinity ? '∞' : toNextLevel,
    to100: to100 === Infinity ? '∞' : to100
  };
}

 export { calculateOutputValue, calculateResult, calculateLevelingExpectations, calculateExpectedDamage, calculateFullExpectation };