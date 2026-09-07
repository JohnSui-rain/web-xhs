# 小红书套图模板生成器 React 项目版

这是从单文件 Demo 拆分出来的正式 React 项目版本，基于 **Vite + React + Canvas**。

## 运行方式

```bash
cd xhs-series-react
npm install
npm run dev
```

构建测试已通过：

```bash
npm run build
```

## 项目结构

```text
xhs-series-react/
├── package.json
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── CanvasPreview.jsx
│   │   ├── EditorPanel.jsx
│   │   └── Sidebar.jsx
│   ├── canvas/
│   │   └── draw.js
│   ├── data/
│   │   ├── contentTemplates.js
│   │   └── themes.js
│   └── utils/
│       ├── color.js
│       ├── generateContent.js
│       └── zip.js
```

## 已内置内容模板

目前已扩展到 **12 类小红书内容模板**：

1. AI 产品拆解
2. 工具教程 / 使用指南
3. 商业案例分析
4. 读书笔记 / 知识卡片
5. 旅行攻略 / City Walk
6. 个人成长 / 方法论
7. 美妆护肤 / 好物种草
8. 健身减脂 / 饮食计划
9. 探店美食 / 菜单攻略
10. 母婴育儿 / 成长指南
11. 行业报告 / 趋势洞察
12. 职场求职 / 招聘攻略

每个内容模板都支持：

- 5 页精简版
- 8 页标准版
- 12 页深度版

## 新增风格包

目前内置 7 套风格包：

1. 酒红知识卡
2. 科技蓝报告
3. 紫色 AI 未来感
4. 薄荷成长清单
5. 暖橙商业媒体
6. 黑金深度报告
7. 小红书爆款大字

风格包会一键联动：

- 主题色
- 视觉版式
- 字体方案

## 字体选择

已新增字体选择能力，当前内置：

1. 系统黑体
2. 小红书醒目黑体
3. 宋体知识感
4. 圆体亲和风
5. 科技等宽风

字体会影响 Canvas 渲染出来的导出图片，而不只是页面 UI。

## 现有核心功能

### 内容生成

- 选择内容模板
- 选择 5 / 8 / 12 页
- 输入主题 / 长文资料
- 本地规则生成套图内容

### 视觉配置

- 6 套基础主题色
- 自定义品牌色
- 7 套风格包
- 3 套视觉版式
- 5 套字体方案

### 编辑管理

- 全局信息编辑
- 当前页字段编辑
- 表格编辑
- 图片上传
- 左侧真实缩略图
- 页面拖拽排序
- 上移 / 复制 / 删除
- 字数提示
- 导出检查

### 导出

- 导出当前页 PNG
- 导出全套 PNG
- 导出 ZIP

### 账号模板

- 保存账号模板
- 载入账号模板
- 删除账号模板
- localStorage 本地持久化

## 关键文件说明

### 内容模板配置

```text
src/data/contentTemplates.js
```

负责定义不同内容类型、页数结构和默认页面生成逻辑。

### 主题 / 风格 / 字体配置

```text
src/data/themes.js
```

负责定义：

- THEMES：基础主题色
- LAYOUTS：视觉版式
- FONT_PRESETS：字体方案
- STYLE_PACKS：风格包

### Canvas 绘制

```text
src/canvas/draw.js
```

负责把页面数据渲染为 1080 × 1440 图片。

## 下一步建议

1. 接入后端 API，代理真实 AI 调用
2. 支持文章 URL 抓取生成套图
3. 支持更多风格包版式差异
4. 增加用户登录和云端模板保存
5. 增加素材库和品牌资产库
6. 增加模板市场 / 会员模板
