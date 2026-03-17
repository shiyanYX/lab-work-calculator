import { useState } from 'react'
import './App.css'
import { calculateResult } from './utils/calculator'

function App() {
  const [initialAttributes, setInitialAttributes] = useState('')
  const [workType, setWorkType] = useState('本能')
  const [dangerLevel, setDangerLevel] = useState('ZAYIN')
  const [workLevel, setWorkLevel] = useState(1)
  const [beforeHealth, setBeforeHealth] = useState('')
  const [afterHealth, setAfterHealth] = useState('')
  const [beforeMental, setBeforeMental] = useState('')
  const [afterMental, setAfterMental] = useState('')
  const [trainingBonus, setTrainingBonus] = useState('有')
  const [clerkBonus, setClerkBonus] = useState('一级')
  const [permanentBonus, setPermanentBonus] = useState('一级')
  const [result, setResult] = useState('')

  const handleCalculate = () => {
    const resultValue = calculateResult(
      initialAttributes,
      workType,
      dangerLevel,
      workLevel,
      parseFloat(beforeHealth) || 0,
      parseFloat(afterHealth) || 0,
      parseFloat(beforeMental) || 0,
      parseFloat(afterMental) || 0,
      trainingBonus,
      clerkBonus,
      permanentBonus
    )
    setResult(resultValue)
  }

  return (
    <div className="app">
      <h1>员工属性点计算器</h1>
      
      <div className="main-content">
        <div className="form-section">
          <div className="input-group">
            <label>初始属性值：</label>
            <input 
              type="text" 
              value={initialAttributes} 
              onChange={(e) => setInitialAttributes(e.target.value)}
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
              value={beforeHealth} 
              onChange={(e) => setBeforeHealth(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作后生命值：</label>
            <input 
              type="number" 
              value={afterHealth} 
              onChange={(e) => setAfterHealth(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作前精神值：</label>
            <input 
              type="number" 
              value={beforeMental} 
              onChange={(e) => setBeforeMental(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>工作后精神值：</label>
            <input 
              type="number" 
              value={afterMental} 
              onChange={(e) => setAfterMental(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>培训加成：</label>
            <select value={trainingBonus} onChange={(e) => setTrainingBonus(e.target.value)}>
              <option value="有">有</option>
              <option value="无">无</option>
            </select>
          </div>

          <div className="input-group">
            <label>文职加成：</label>
            <select value={clerkBonus} onChange={(e) => setClerkBonus(e.target.value)}>
              <option value="一级">一级</option>
              <option value="二级">二级</option>
              <option value="三级">三级</option>
              <option value="常驻加成（四级没加成）">常驻加成（四级没加成）</option>
            </select>
          </div>

          <div className="input-group">
            <label>常驻加成：</label>
            <select value={permanentBonus} onChange={(e) => setPermanentBonus(e.target.value)}>
              <option value="一级">一级</option>
              <option value="二级">二级</option>
              <option value="三级">三级</option>
              <option value="四级">四级</option>
            </select>
          </div>

          <button className="calculate-button" onClick={handleCalculate}>
            计算
          </button>

          <div className="result">
            <label>结果(增加)：</label>
            <span>{result}</span>
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
        </div>
      </div>
    </div>
  )
}

export default App