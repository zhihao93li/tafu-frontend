# 八字算命系统 - 前端应用

基于 React 18 + Vite + Ant Design 的八字命理分析前端应用。

## ✨ 特性

- 🎨 基于 Ant Design 6 的现代化 UI
- ⚡ Vite 5 极速开发体验
- 🔄 React Router v6 路由管理
- 🎭 Framer Motion 流畅动画
- 📱 响应式设计，完美支持移动端
- 🔐 完善的用户认证系统
- 🎯 八字排盘与命理分析
- 👤 个人资料管理
- 💰 积分与订单系统
- 👑 管理后台

## 🛠️ 技术栈

- **React 18** - UI 框架
- **React Router v6** - 路由管理
- **Ant Design 6** - UI 组件库
- **Vite 5** - 构建工具
- **Framer Motion** - 动画库
- **@tanstack/react-query** - 数据请求与缓存
- **Lunar TypeScript** - 农历与八字计算
- **QRCode.react** - 二维码生成

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并配置后端 API 地址：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_API_BASE="http://localhost:3000/api"
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
bazi-frontend/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── admin/         # 管理后台组件
│   │   └── ...            # 其他通用组件
│   ├── pages/             # 页面组件
│   │   ├── HomePage.jsx   # 首页
│   │   ├── ProfilePage.jsx # 个人资料
│   │   ├── AdminPage.jsx  # 管理后台
│   │   └── ...            # 其他页面
│   ├── services/          # API 服务
│   │   ├── api.js         # 用户端 API
│   │   └── adminApi.js    # 管理端 API
│   ├── styles/            # 全局样式
│   ├── App.jsx            # 应用入口
│   └── main.jsx           # 渲染入口
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎯 核心功能

### 用户端功能

1. **用户认证**
   - 手机号注册/登录
   - 验证码认证
   - 自动登录保持

2. **八字排盘**
   - 出生信息输入
   - 自动时区校正
   - 真太阳时计算
   - 八字命盘展示

3. **命理分析**
   - 五行分析
   - 十神关系
   - 大运流年
   - 性格特征

4. **个人中心**
   - 资料管理
   - 历史记录
   - 积分查询
   - 订单管理

### 管理端功能

1. **用户管理**
   - 用户列表
   - 积分充值
   - 用户状态管理

2. **订单管理**
   - 订单列表
   - 订单详情
   - 状态跟踪

3. **系统配置**
   - 参数设置
   - 价格配置

## 🔗 API 集成

前端通过环境变量 `VITE_API_BASE` 配置后端 API 地址：

- **开发环境**: `http://localhost:3000/api`
- **生产环境**: `https://your-backend-domain.com/api`

主要 API 端点：

- `/auth/*` - 认证相关
- `/bazi/*` - 八字排盘
- `/user/*` - 用户信息
- `/admin/*` - 管理功能

## 🚀 部署

### Cloudflare Pages（推荐）

1. 登录 Cloudflare Dashboard
2. 创建 Pages 项目
3. 连接 Git 仓库
4. 配置构建命令：
   ```
   Build command: npm run build
   Build output directory: dist
   ```
5. 添加环境变量：
   ```
   VITE_API_BASE=https://your-backend-api.com/api
   ```

### Vercel

1. 导入 Git 仓库
2. Framework Preset 选择 `Vite`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. 添加环境变量 `VITE_API_BASE`

### Netlify

1. 导入 Git 仓库
2. Build command: `npm run build`
3. Publish directory: `dist`
4. 添加环境变量 `VITE_API_BASE`

### Docker 部署

使用项目中的 `Dockerfile`:

```bash
docker build -t bazi-frontend .
docker run -p 3000:3000 -e VITE_API_BASE=https://api.example.com/api bazi-frontend
```

## ⚙️ 配置说明

### 代码分割优化

`vite.config.js` 中配置了智能代码分割：

- `react-vendor`: React 核心库
- `framer-motion`: 动画库
- `china-geo`: 省市区数据
- `icons`: 图标库
- `utils`: 工具库

这样可以有效减少首屏加载时间。

### 路由配置

主要路由：

- `/` - 首页
- `/profile` - 个人资料
- `/admin` - 管理后台
- `/login` - 登录页
- `/*` - 404 页面

## 🔧 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.jsx` 中添加路由
3. 如需认证，使用 `ProtectedRoute` 包装

### 调用 API

使用 `src/services/api.js` 中的封装方法：

```javascript
import api from '../services/api';

// GET 请求
const data = await api.get('/endpoint');

// POST 请求
const result = await api.post('/endpoint', { data });
```

### 状态管理

使用 React Query 进行数据管理：

```javascript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: () => api.get('/endpoint')
});
```

## 🐛 常见问题

### Q: 开发环境无法连接后端？

A: 检查：
1. 后端是否正常运行
2. `.env` 文件中的 `VITE_API_BASE` 配置是否正确
3. 后端的 CORS 配置是否允许前端域名

### Q: 构建后白屏？

A: 检查：
1. `vite.config.js` 中的 `base` 配置
2. 部署平台的路由配置（需要支持 SPA）
3. 浏览器控制台的错误信息

### Q: 生产环境 API 请求失败？

A: 检查：
1. 部署平台的环境变量是否正确设置
2. 后端 CORS 配置是否包含生产域名
3. HTTPS 混合内容问题（HTTPS 页面调用 HTTP API）

## 📄 相关文档

- [后端 API 仓库](https://github.com/your-username/bazi-backend)
- [部署指南](./docs/deployment.md)
- [API 文档](./docs/api.md)

## 📝 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题，请通过以下方式联系：

- 提交 Issue
- 邮件: your-email@example.com
