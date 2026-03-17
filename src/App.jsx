import { useState } from 'react'
import './App.css'
import { calculateResult } from './utils/calculator'

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
  const [researchBonus, setResearchBonus] = useState('有')
  const [clerkLevel, setClerkLevel] = useState('一级')
  const [permanentLevel, setPermanentLevel] = useState('一级')
  const [isElite, setIsElite] = useState(false)
  const [result, setResult] = useState('')


  const handleCalculate = () => {
    const resultValue = calculateResult(
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
      isElite
    )
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
            <label>异想体危险等级：</label>
            <select value={dangerLevel} onChange={(e) => setDangerLevel(e.target.value)}>
              <option value="ZAYIN">ZAYIN</option>
              <option value="TETH">TETH</option>
              <option value="HE">HE</option>
              <option value="WAW">WAW</option>
              <option value="ALEPH">ALEPH</option>
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
            />
          </div>

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

          <div className="result">
            <label>增加的属性点：</label>
            <span>{result.addedPoints || 0}</span>
          </div>
          <div className="result">
            <label>最终属性值：</label>
            <span>{result.finalAttribute || 0}</span>
          </div>
        </div>

        <div className="table-section">
          <h3>异想体输出值表</h3>
          <table>
            <thead>
              <tr>
                <th>等级</th>
                <th>ZAYIN</th>
                <th>TETH</th>
                <th>HE</th>
                <th>WAW</th>
                <th>ALEPH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ⅰ</td>
                <td>0.6</td>
                <td>0.6</td>
                <td>0.72</td>
                <td>0.84</td>
                <td>0.6</td>
              </tr>
              <tr>
                <td>Ⅱ</td>
                <td>0.44</td>
                <td>0.55</td>
                <td>0.55</td>
                <td>0.66</td>
                <td>0.77</td>
              </tr>
              <tr>
                <td>Ⅲ</td>
                <td>0.3</td>
                <td>0.4</td>
                <td>0.5</td>
                <td>0.5</td>
                <td>0.6</td>
              </tr>
              <tr>
                <td>Ⅳ</td>
                <td>0.18</td>
                <td>0.27</td>
                <td>0.36</td>
                <td>0.45</td>
                <td>0.45</td>
              </tr>
              <tr>
                <td>Ⅴ</td>
                <td>0.08</td>
                <td>0.16</td>
                <td>0.24</td>
                <td>0.32</td>
                <td>0.4</td>
              </tr>
            </tbody>
          </table>

          <h3>健康状态输出值表</h3>
          <table>
            <thead>
              <tr>
                <th>暂时输出值范围</th>
                <th>最终输出值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>[0, 0.1]</td>
                <td>1.5</td>
              </tr>
              <tr>
                <td>(0.1, 0.2]</td>
                <td>1.3</td>
              </tr>
              <tr>
                <td>(0.2, 0.7)</td>
                <td>1</td>
              </tr>
              <tr>
                <td>[0.7, 0.8)</td>
                <td>0.8</td>
              </tr>
              <tr>
                <td>[0.8, 0.9)</td>
                <td>0.6</td>
              </tr>
              <tr>
                <td>[0.9, +∞)</td>
                <td>0.4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App