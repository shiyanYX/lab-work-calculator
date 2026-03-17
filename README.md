# 员工属性点计算器

一个用于计算《脑叶公司》游戏中员工属性点增加的工具，支持桌面应用和网页版本。

## ✨ 功能特点

- 🧮 **核心计算**：根据工作类型、异想体危险等级、工作等级等参数计算属性点增加
- 📱 **响应式设计**：支持桌面和移动设备
- 🖥️ **桌面应用**：使用 Tauri 构建的跨平台桌面应用
- 📊 **异想体输出值表**：内置完整的异想体输出值参考表格
- ⚡ **实时计算**：输入参数后立即计算结果
- 🎨 **美观界面**：简洁现代的用户界面

## 🛠️ 技术栈

- **前端**：React + Vite
- **样式**：CSS3（响应式设计）
- **桌面应用**：Tauri 2
- **构建工具**：Vite
- **版本控制**：Git

## 📦 安装和使用

### 网页版本

1. 克隆仓库：
   ```bash
   git clone https://github.com/shiyanYX/lab-work-calculator.git
   cd lab-work-calculator
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中访问：`http://localhost:3000`

### 桌面应用

1. 确保已安装 Rust 和 Visual Studio Build Tools

2. 构建桌面应用：
   ```bash
   npx tauri build
   ```

3. 安装包位置：
   - MSI 安装包：`src-tauri/target/release/bundle/msi/`
   - NSIS 安装包：`src-tauri/target/release/bundle/nsis/`

## 📋 使用说明

1. **输入参数**：
   - 初始属性值
   - 工作类型（本能、洞察、沟通、压迫）
   - 异想体危险等级（ZAYIN、TETH、HE、WAW、ALEPH）
   - 工作等级（Ⅰ-Ⅴ）
   - 工作前后的生命值和精神值
   - 培训加成、文职加成、常驻加成

2. **点击计算**：
   - 点击「计算」按钮获取属性点增加结果

3. **参考表格**：
   - 右侧表格显示异想体输出值参考数据

## 📁 项目结构

```
lab-work-calculator/
├── public/            # 静态资源
├── src/               # 前端源码
│   ├── assets/        # 图片资源
│   ├── utils/         # 工具函数
│   │   └── calculator.js  # 核心计算逻辑
│   ├── App.jsx        # 主应用组件
│   ├── App.css        # 样式文件
│   └── main.jsx       # 应用入口
├── src-tauri/         # Tauri 配置和源码
│   ├── icons/         # 应用图标
│   ├── src/           # Rust 源码
│   └── tauri.conf.json # Tauri 配置
├── package.json       # 项目配置和依赖
├── vite.config.js     # Vite 配置
└── README.md          # 项目文档
```

## 🔧 核心计算逻辑

核心计算逻辑位于 `src/utils/calculator.js`，主要功能：

1. **异想体输出值计算**：根据危险等级和工作等级获取基础输出值
2. **加成计算**：应用培训、文职和常驻加成
3. **状态影响**：考虑生命值和精神值变化对结果的影响
4. **结果计算**：综合所有因素计算最终属性点增加

## 🎯 后续规划

- [ ] 添加员工属性点历史记录
- [ ] 支持批量计算
- [ ] 添加异想体数据库
- [ ] 实现深色模式
- [ ] 增加更多游戏相关工具

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 仓库
2. 创建分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add your feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 打开 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 灵感来源于 [员工属性点计算器](https://lob-cc.pages.dev/)
- 感谢 Tauri 团队提供的跨平台桌面应用解决方案
- 感谢 React 和 Vite 生态系统

---

**享受游戏，愉快计算！** 🎮