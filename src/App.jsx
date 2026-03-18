import { useState, useEffect } from 'react'
import './App.css'
import { calculateResult, calculateLevelingExpectations, calculateExpectedDamage, calculateFullExpectation } from './utils/calculator'
import { initializeDatabase, getAllAbnormalities, getAllEgoArmor } from './utils/database'

function App() {
  const [peBoxCount, setPeBoxCount] = useState(1)
  const [initialAttribute, setInitialAttribute] = useState(0)
  const [workType, setWorkType] = useState('本能')
  const [dangerLevel, setDangerLevel] = useState('ZAYIN')
  const [workLevel, setWorkLevel] = useState(1)
  const [beforeHealth, setBeforeHealth] = useState(100)
  const [afterHealth, setAfterHealth] = useState(100)
  const [beforeMental, setBeforeMental] = useState(100)
  const [afterMental, setAfterMental] = useState(100)
  const [useExpectedDamage, setUseExpectedDamage] = useState(false)
  const [useFullExpectation, setUseFullExpectation] = useState(false)
  const [selfDiscipline, setSelfDiscipline] = useState(0)
  const [researchBonus, setResearchBonus] = useState('有')
  const [clerkLevel, setClerkLevel] = useState('一级')
  const [permanentLevel, setPermanentLevel] = useState('一级')
  const [isElite, setIsElite] = useState(false)
  const [result, setResult] = useState({})
  const [levelingExpectations, setLevelingExpectations] = useState({})
  const [abnormalities, setAbnormalities] = useState([])
  const [selectedAbnormality, setSelectedAbnormality] = useState(null)
  const [filterLevel, setFilterLevel] = useState('ZAYIN')
  const [egoArmors, setEgoArmors] = useState([])
  const [selectedEgoArmor, setSelectedEgoArmor] = useState(null)
  const [filterArmorLevel, setFilterArmorLevel] = useState('ZAYIN')


  // 初始化数据库和加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        await initializeDatabase();
        const abnormalitiesData = await getAllAbnormalities();
        setAbnormalities(abnormalitiesData);
        
        const armorsData = await getAllEgoArmor();
        setEgoArmors(armorsData);
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    };
    loadData();
  }, []);

  const handleCalculate = () => {
    let resultValue;
    
    // 完全期望计算
    if (useFullExpectation && selectedAbnormality) {
      const fullExpectation = calculateFullExpectation(
        parseFloat(selfDiscipline) || 0,
        parseFloat(initialAttribute) || 0,
        workType,
        dangerLevel,
        workLevel,
        selectedAbnormality,
        researchBonus,
        clerkLevel,
        permanentLevel,
        isElite,
        selectedEgoArmor
      )
      setLevelingExpectations(fullExpectation)
      
      // 使用完全期望计算的结果作为属性点增加
      resultValue = {
        addedPoints: fullExpectation.expectedAddedPoints,
        finalAttribute: parseFloat(initialAttribute) || 0 + fullExpectation.expectedAddedPoints
      }
    } else {
      // 普通计算
      resultValue = calculateResult(
        parseFloat(peBoxCount) || 1,
        parseFloat(initialAttribute) || 0,
        workType,
        dangerLevel,
        workLevel,
        parseFloat(beforeHealth) || 100,
        parseFloat(afterHealth) || 100,
        parseFloat(beforeMental) || 100,
        parseFloat(afterMental) || 100,
        researchBonus,
        clerkLevel,
        permanentLevel,
        isElite,
        useExpectedDamage,
        selectedAbnormality?.maxPeBox || 10,
        selectedAbnormality?.damageType || '物理',
        selectedAbnormality?.damage || '1-2',
        selectedEgoArmor
      )
      setResult(resultValue)

      // 当使用期望伤害计算时，更新工作后的状态值
      if (useExpectedDamage && selectedAbnormality) {
        const expectedDamage = calculateExpectedDamage(
          parseFloat(peBoxCount) || 1,
          selectedAbnormality?.maxPeBox || 10,
          selectedAbnormality?.damageType || '物理',
          selectedAbnormality?.damage || '1-2',
          selectedEgoArmor
        )
        
        let newAfterHealth = parseFloat(beforeHealth) || 100;
        let newAfterMental = parseFloat(beforeMental) || 100;
        const damageType = selectedAbnormality?.damageType || '物理';
        
        // 侵蚀伤害：无论什么工作类型都同时扣除生命值和精神值
        if (damageType === '侵蚀') {
          newAfterHealth = Math.max(1, newAfterHealth - expectedDamage.health);
          newAfterMental = Math.max(1, newAfterMental - expectedDamage.mental);
        } else {
          // 其他伤害类型：按工作类型决定
          if (workType === '本能' || workType === '沟通') {
            newAfterHealth = Math.max(1, newAfterHealth - expectedDamage.health);
          }
          if (workType === '洞察' || workType === '沟通') {
            newAfterMental = Math.max(1, newAfterMental - expectedDamage.mental);
          }
        }
        
        setAfterHealth(newAfterHealth);
        setAfterMental(newAfterMental);
      }
      
      // 计算练级期望值
      const expectations = calculateLevelingExpectations(
        parseFloat(initialAttribute) || 0,
        resultValue.addedPoints
      )
      setLevelingExpectations(expectations)
    }
    
    setResult(resultValue)
    // 更新初始属性值为最终属性值
    setInitialAttribute(resultValue.finalAttribute)
  }



  return (
    <div className="app">
      <h1>员工属性点计算器</h1>
      
      <div className="main-content">
        <div className="form-section">
          <div className="input-group">
            <label>PE-BOX 数量：</label>
            <input 
              type="number" 
              min="1" 
              value={peBoxCount} 
              onChange={(e) => setPeBoxCount(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>初始属性值：</label>
            <input 
              type="number" 
              min="0" 
              value={initialAttribute} 
              onChange={(e) => setInitialAttribute(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作类型：</label>
            <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
              <option value="本能">本能</option>
              <option value="洞察">洞察</option>
              <option value="沟通">沟通</option>
              <option value="压迫">压迫</option>
            </select>
          </div>

          <div className="input-group">
            <label>异想体等级：</label>
            <select value={filterLevel} onChange={(e) => {
              setFilterLevel(e.target.value);
              setSelectedAbnormality(null);
            }}>
              <option value="ZAYIN">ZAYIN</option>
              <option value="TETH">TETH</option>
              <option value="HE">HE</option>
              <option value="WAW">WAW</option>
              <option value="ALEPH">ALEPH</option>
            </select>
          </div>

          <div className="input-group">
            <label>异想体：</label>
            <select 
              value={selectedAbnormality?.id || ''} 
              onChange={(e) => {
                const id = e.target.value;
                const abnormality = abnormalities.find(a => a.id === id);
                setSelectedAbnormality(abnormality);
                if (abnormality) {
                  setDangerLevel(abnormality.level);
                }
              }}
            >
              <option value="">请选择异想体</option>
              {abnormalities
                .filter(abnormality => abnormality.level === filterLevel)
                .map(abnormality => (
                  <option key={abnormality.id} value={abnormality.id}>
                    {abnormality.id} - {abnormality.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-group">
            <label>E.G.O护甲等级：</label>
            <select value={filterArmorLevel} onChange={(e) => {
              setFilterArmorLevel(e.target.value);
              setSelectedEgoArmor(null);
            }}>
              <option value="ZAYIN">ZAYIN</option>
              <option value="TETH">TETH</option>
              <option value="HE">HE</option>
              <option value="WAW">WAW</option>
              <option value="ALEPH">ALEPH</option>
            </select>
          </div>

          <div className="input-group">
            <label>E.G.O护甲：</label>
            <select 
              value={selectedEgoArmor?.name || ''} 
              onChange={(e) => {
                const name = e.target.value;
                const armor = egoArmors.find(a => a.name === name);
                setSelectedEgoArmor(armor);
              }}
            >
              <option value="">请选择E.G.O护甲</option>
              {egoArmors
                .filter(armor => armor.level === filterArmorLevel)
                .map(armor => (
                  <option key={armor.name} value={armor.name}>
                    {armor.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-group">
            <label>工作等级：</label>
            <select value={workLevel} onChange={(e) => setWorkLevel(parseInt(e.target.value))}>
              <option value={1}>Ⅰ</option>
              <option value={2}>Ⅱ</option>
              <option value={3}>Ⅲ</option>
              <option value={4}>Ⅳ</option>
              <option value={5}>Ⅴ</option>
            </select>
          </div>

          <div className="input-group">
            <label>工作前生命值：</label>
            <input 
              type="number" 
              min="1" 
              value={beforeHealth} 
              onChange={(e) => setBeforeHealth(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作后生命值：</label>
            <input 
              type="number" 
              min="1" 
              value={afterHealth} 
              onChange={(e) => setAfterHealth(e.target.value)}
              disabled={useExpectedDamage}
            />
          </div>

          <div className="input-group">
            <label>工作前精神值：</label>
            <input 
              type="number" 
              min="1" 
              value={beforeMental} 
              onChange={(e) => setBeforeMental(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作后精神值：</label>
            <input 
              type="number" 
              min="1" 
              value={afterMental} 
              onChange={(e) => setAfterMental(e.target.value)}
              disabled={useExpectedDamage}
            />
          </div>

          <div className="input-group">
            <label>使用期望伤害计算：</label>
            <input 
              type="checkbox" 
              checked={useExpectedDamage} 
              onChange={(e) => {
                setUseExpectedDamage(e.target.checked);
                if (!e.target.checked) {
                  setUseFullExpectation(false);
                }
              }}
            />
          </div>

          {useExpectedDamage && (
            <>
              <div className="input-group">
                <label>完全期望计算：</label>
                <input 
                  type="checkbox" 
                  checked={useFullExpectation} 
                  onChange={(e) => setUseFullExpectation(e.target.checked)}
                />
              </div>

              {useFullExpectation && (
                <div className="input-group">
                  <label>员工自律数值：</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={selfDiscipline} 
                    onChange={(e) => setSelfDiscipline(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          <div className="input-group">
            <label>研究加成(培训手册)：</label>
            <select value={researchBonus} onChange={(e) => setResearchBonus(e.target.value)}>
              <option value="有">有</option>
              <option value="无">无</option>
            </select>
          </div>

          <div className="input-group">
            <label>文职加成：</label>
            <select value={clerkLevel} onChange={(e) => setClerkLevel(e.target.value)}>
              <option value="一级">一级</option>
              <option value="二级">二级</option>
              <option value="三级">三级</option>
              <option value="常驻加成（四级没加成）">常驻加成（四级没加成）</option>
            </select>
          </div>

          <div className="input-group">
            <label>常驻加成：</label>
            <select value={permanentLevel} onChange={(e) => setPermanentLevel(e.target.value)}>
              <option value="一级">一级</option>
              <option value="二级">二级</option>
              <option value="三级">三级</option>
              <option value="四级">四级</option>
            </select>
          </div>

          <div className="input-group">
            <label>培训部精英：</label>
            <input 
              type="checkbox" 
              checked={isElite} 
              onChange={(e) => setIsElite(e.target.checked)}
            />
          </div>

          <button className="calculate-button" onClick={handleCalculate}>
            计算
          </button>

        </div>

        <div className="result-section">
          <h3>计算结果</h3>
          <div className="result">
            <label>增加的属性点：</label>
            <span>{result.addedPoints || 0}</span>
          </div>
          <div className="result">
            <label>最终属性值：</label>
            <span>{result.finalAttribute || 0}</span>
          </div>

          {useFullExpectation ? (
            <>
              <h3>完全期望值</h3>
              <div className="result">
                <label>成功率：</label>
                <span>{levelingExpectations.successRate || 0}%</span>
              </div>
              <div className="result">
                <label>期望PE-BOX产量：</label>
                <span>{levelingExpectations.expectedPeBox || 0}</span>
              </div>
              <div className="result">
                <label>每次工作平均增加：</label>
                <span>{levelingExpectations.expectedAddedPoints || 0}</span>
              </div>
              <div className="result">
                <label>到下一个等级需要：</label>
                <span>{levelingExpectations.toNextLevel || 0} 次</span>
              </div>
              <div className="result">
                <label>到100属性需要：</label>
                <span>{levelingExpectations.to100 || 0} 次</span>
              </div>
            </>
          ) : (
            <>
              <h3>粗略练级期望值</h3>
              <div className="result">
                <label>每次工作平均增加：</label>
                <span>{levelingExpectations.addedPerWork || 0}</span>
              </div>
              <div className="result">
                <label>到下一个等级需要：</label>
                <span>{levelingExpectations.toNextLevel || 0} 次</span>
              </div>
              <div className="result">
                <label>到100属性需要：</label>
                <span>{levelingExpectations.to100 || 0} 次</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App