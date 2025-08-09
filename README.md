# R3 (River 3) - 三江源

> 一个专为独立开发者打造的超级脚手架 / A Super Scaffold for Independent Developers

## 🌊 项目哲学 / Project Philosophy

R3 的名字来源于中国三条伟大河流的共同源头 - 三江源（Three Rivers Source）。长江、黄河、澜沧江都发源于此，被誉为"中华水塔"。正如三江源孕育了中华文明的母亲河，R3 旨在成为独立开发者项目的源头，提供清晰、强大、灵活的起点。

The name R3 (River 3) is inspired by the Three Rivers Source region in China, where the Yangtze River, Yellow River, and Lancang River all originate. Known as the "Water Tower of China," this region symbolizes the common source of great flows. Similarly, R3 aims to be the source for independent developers' projects, providing a clear, powerful, and flexible starting point.

### 核心理念 / Core Concepts

- **川流不息 (Continuous Flow)**: 像河流一样持续演进和改进
- **源清流洁 (Pure Source)**: 保持代码的清晰和简洁
- **海纳百川 (Embrace All)**: 支持多种项目类型和技术栈

## 🚀 快速开始 / Quick Start

### 安装 / Installation

```bash
npm install -g r3-scaffold
```

### 创建新项目 / Create New Project

```bash
r3 create my-awesome-project

# 或使用交互式选项 / Or with interactive options
r3 new

# 指定项目类型 / Specify project type
r3 create my-api --type api
```

### 在现有项目中初始化 / Initialize in Existing Project

```bash
cd your-project
r3 init
```

## 📦 支持的项目类型 / Supported Project Types

- **Web Application** (`webapp`) - 现代化的 Web 应用
- **REST API** (`api`) - RESTful API 服务
- **Full Stack** (`fullstack`) - 全栈应用
- **CLI Tool** (`cli`) - 命令行工具
- **Library** (`library`) - NPM 库
- **Mobile App** (`mobile`) - 移动应用
- **Desktop App** (`desktop`) - 桌面应用

## 🛠 功能特性 / Features

### 核心功能 / Core Features

- ✅ **TypeScript** 支持
- ✅ **模板引擎** - 灵活的项目模板系统
- ✅ **智能提示** - 交互式项目配置
- ✅ **最佳实践** - 内置代码规范和项目结构
- ✅ **零配置** - 开箱即用的开发体验

### 可选功能 / Optional Features

根据项目类型，你可以选择：

- 🎨 **UI 框架**: React, Vue, Angular
- 🎯 **样式方案**: Tailwind CSS, Sass, CSS Modules
- 📦 **构建工具**: Vite, Webpack, Rollup
- 🧪 **测试框架**: Jest, Vitest, Cypress
- 📝 **文档工具**: Storybook, VitePress
- 🔧 **开发工具**: ESLint, Prettier, Husky

## 📁 项目结构 / Project Structure

```
my-project/
├── src/
│   ├── components/     # 组件
│   ├── pages/          # 页面
│   ├── utils/          # 工具函数
│   └── index.ts        # 入口文件
├── tests/              # 测试文件
├── docs/               # 文档
├── public/             # 静态资源
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 命令 / Commands

```bash
# 创建项目
r3 create <project-name>

# 查看可用模板
r3 list-templates

# 查看版本
r3 --version

# 获取帮助
r3 --help
```

## 🔧 配置 / Configuration

R3 支持通过 `r3.config.json` 文件进行项目配置：

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "projectType": "webapp",
  "features": ["typescript", "eslint", "prettier"],
  "dependencies": {
    "react": "^18.0.0"
  }
}
```

## 🌟 为什么选择 R3? / Why R3?

1. **专为独立开发者设计** - 理解个人开发者的需求和痛点
2. **灵活且强大** - 支持从简单网页到复杂应用的各种项目
3. **最佳实践** - 集成行业标准和最佳实践
4. **持续更新** - 跟随技术发展不断演进
5. **开源精神** - 完全开源，欢迎贡献

## 🤝 贡献 / Contributing

我们欢迎所有形式的贡献！无论是报告问题、提交 PR、改进文档还是分享想法。

```bash
# Fork 项目
git clone https://github.com/mark/r3-scaffold
cd r3-scaffold
npm install
npm run dev
```

## 📝 许可 / License

MIT License - 自由使用，但请保留版权信息。

## 🙏 致谢 / Acknowledgments

感谢所有为开源社区做出贡献的开发者们。正如三江源滋养大地，你们的贡献让技术世界更加美好。

---

**川流不息，源远流长** / **Like rivers flow endlessly, may your code run eternally**

Made with ❤️ by independent developers, for independent developers.