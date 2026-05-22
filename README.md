# STUDIO · 3D 创作平台原型

一个用 React + Babel Standalone 在浏览器中即时编译运行的 3D AI 平台界面原型。包含首页、定价弹窗、账户弹窗和实时调参面板。

## 在线预览

部署后访问：<https://youzhaoyang.github.io/3d-studio/>

## 本地预览

任意静态服务器即可，例如：

```bash
python3 -m http.server 8000
# 然后打开 http://localhost:8000
```

## 文件结构

| 文件 | 作用 |
|---|---|
| `index.html` | 入口页（与 `pricing.html` 内容相同，供 GitHub Pages 默认载入） |
| `app.jsx` | 顶层 React 组件，串联 Homepage 与各弹窗 |
| `homepage.jsx` | 首页布局：顶导航、Hero、画廊 |
| `pricing-modal.jsx` | 定价方案弹窗（年/月计费切换、套餐对比） |
| `account-modal.jsx` | 账户/订阅/邀请弹窗 |
| `tweaks-panel.jsx` | 右下角实时调参面板（页头风格、计费、强调色等） |
| `uploads/` | 截图与示意图素材 |

## 技术栈

- React 18.3.1（UMD）
- Babel Standalone 7.29.0（浏览器内 JSX 转译）
- 无构建步骤、无包管理器，纯静态文件部署
