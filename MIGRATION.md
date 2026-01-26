# 前端项目迁移指南

本文档记录了从 monorepo 结构中抽离独立前端项目的完整步骤。

## 📋 迁移概览

- **原项目**: `bazi` (monorepo)
- **新项目**: `bazi-frontend` (独立前端项目)
- **迁移日期**: 2026-01-26
- **技术栈**: React 18 + Vite 5 + Ant Design 6

## 🎯 迁移目标

将前端代码从 monorepo 中完全抽离，创建独立的前端仓库，实现：

- ✅ 独立的版本控制
- ✅ 独立的部署流程
- ✅ 更清晰的职责分离
- ✅ 更灵活的团队协作

## ✅ 已完成的配置

### 1. 项目配置文件

已创建以下配置文件：

- ✅ `package.json` - 项目依赖和脚本
- ✅ `vite.config.js` - Vite 构建配置
- ✅ `.env.example` - 环境变量模板
- ✅ `README.md` - 项目文档
- ✅ `.gitignore` - Git 忽略规则
- ✅ `.gitattributes` - Git 属性配置

### 2. 部署配置文件

已创建多平台部署配置：

- ✅ `Dockerfile` - Docker 容器化部署
- ✅ `Caddyfile` - Caddy 服务器配置
- ✅ `railway.toml` - Railway 部署配置
- ✅ `wrangler.toml` - Cloudflare Pages 配置
- ✅ `vercel.json` - Vercel 部署配置
- ✅ `_redirects` - Netlify 重定向规则

### 3. 辅助脚本

- ✅ `copy-source.sh` - 源代码复制脚本

## 🚀 完成迁移的步骤

### 步骤 1: 复制源代码

运行复制脚本：

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend
chmod +x copy-source.sh
./copy-source.sh
```

或手动复制：

```bash
# 复制 src 目录
cp -r /Users/zhihaoli/Documents/项目/bazi/frontend/src /Users/zhihaoli/Documents/项目/bazi-frontend/

# 复制 public 目录
cp -r /Users/zhihaoli/Documents/项目/bazi/frontend/public /Users/zhihaoli/Documents/项目/bazi-frontend/

# 复制其他配置文件（如有）
cp /Users/zhihaoli/Documents/项目/bazi/frontend/jsconfig.json /Users/zhihaoli/Documents/项目/bazi-frontend/ 2>/dev/null || true
cp /Users/zhihaoli/Documents/项目/bazi/frontend/.eslintrc.json /Users/zhihaoli/Documents/项目/bazi-frontend/ 2>/dev/null || true
```

### 步骤 2: 安装依赖

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend
npm install
```

### 步骤 3: 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置后端 API 地址：

```env
VITE_API_BASE="http://localhost:3000/api"
```

### 步骤 4: 测试运行

```bash
# 启动开发服务器
npm run dev

# 在浏览器中访问 http://localhost:5173
# 测试所有功能是否正常
```

### 步骤 5: 初始化 Git 仓库

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend

# 初始化 Git
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "feat: 初始化独立前端项目

- 从 bazi monorepo 抽离前端代码
- 添加完整的部署配置
- 更新项目文档
- 支持多平台部署 (Cloudflare/Vercel/Railway/Docker)"
```

### 步骤 6: 创建 GitHub 仓库

```bash
# 使用 GitHub CLI（需先安装 gh）
gh repo create bazi-fortune-frontend --private --source=. --remote=origin

# 推送代码
git push -u origin main
```

或在 GitHub 网站上手动创建仓库，然后：

```bash
git remote add origin https://github.com/your-username/bazi-fortune-frontend.git
git branch -M main
git push -u origin main
```

## 🔗 后端项目更新

### 更新 CORS 配置

确保后端允许前端域名跨域访问。编辑后端 `src/index.ts`：

```typescript
app.use('/*', cors({
  origin: [
    'http://localhost:5173',  // 本地开发
    'https://bazi-frontend.pages.dev',  // Cloudflare Pages
    'https://your-frontend.vercel.app',  // Vercel
    // 添加其他部署域名
  ],
  credentials: true
}))
```

### 更新后端 README

在原 `bazi` 项目的 README.md 中添加：

```markdown
## 项目架构

本项目采用前后端分离架构：

- **后端仓库**: [bazi](当前仓库) - Node.js + Hono + Prisma
- **前端仓库**: [bazi-frontend](https://github.com/your-username/bazi-frontend) - React + Vite + Ant Design

### 本地开发

1. 启动后端：`npm run dev` (运行在 http://localhost:3000)
2. 启动前端：进入前端仓库，运行 `npm run dev` (运行在 http://localhost:5173)
```

### (可选) 删除原 frontend 目录

```bash
cd /Users/zhihaoli/Documents/项目/bazi

# 从 Git 中移除
git rm -rf frontend

# 提交更改
git commit -m "refactor: 移除前端代码，已迁移至独立仓库

前端项目现已独立：https://github.com/your-username/bazi-frontend"

git push
```

## 📦 部署指南

### Cloudflare Pages (推荐)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pages → Create a project
3. 连接 GitHub 仓库
4. 配置：
   - Build command: `npm run build`
   - Build output directory: `dist`
   - 环境变量: `VITE_API_BASE=https://your-backend.com/api`

### Vercel

1. 登录 [Vercel](https://vercel.com)
2. Import Git Repository
3. Framework Preset: Vite
4. 添加环境变量: `VITE_API_BASE`

### Railway

1. 登录 [Railway](https://railway.app)
2. New Project → Deploy from GitHub repo
3. 添加环境变量: `VITE_API_BASE`

### Docker

```bash
# 构建镜像
docker build -t bazi-frontend --build-arg VITE_API_BASE=https://api.example.com/api .

# 运行容器
docker run -p 3000:3000 bazi-frontend
```

## ✅ 迁移验证清单

完成以下检查确保迁移成功：

- [ ] 源代码已完整复制（src, public 目录）
- [ ] `npm install` 成功安装所有依赖
- [ ] 开发服务器正常启动 (`npm run dev`)
- [ ] 可以正常连接后端 API
- [ ] 所有页面路由正常工作
- [ ] 用户认证功能正常
- [ ] 八字排盘功能正常
- [ ] 管理后台功能正常
- [ ] 生产构建成功 (`npm run build`)
- [ ] Git 仓库已初始化并推送
- [ ] 后端 CORS 配置已更新
- [ ] 至少一个部署平台配置成功

## 🐛 常见问题

### Q: 复制脚本执行失败？

A: 检查源路径和目标路径是否正确，或使用手动复制命令。

### Q: npm install 失败？

A: 
1. 检查 Node.js 版本 (需要 >= 18)
2. 清理缓存: `npm cache clean --force`
3. 删除 `node_modules` 和 `package-lock.json`，重新安装

### Q: 开发服务器启动后无法连接后端？

A:
1. 确认后端服务已启动
2. 检查 `.env` 中的 `VITE_API_BASE` 配置
3. 检查后端 CORS 配置是否允许 `http://localhost:5173`

### Q: 部署后白屏？

A:
1. 检查部署平台的构建日志
2. 确认环境变量 `VITE_API_BASE` 已正确设置
3. 检查浏览器控制台错误信息
4. 确认 SPA 路由配置正确（`_redirects` 或 `vercel.json`）

### Q: 生产环境 API 调用失败？

A:
1. 确认 `VITE_API_BASE` 指向正确的生产 API 地址
2. 检查后端 CORS 是否包含前端部署域名
3. 检查是否存在 HTTPS 混合内容问题

## 📚 相关资源

- [Vite 官方文档](https://vitejs.dev/)
- [React Router 文档](https://reactrouter.com/)
- [Ant Design 文档](https://ant.design/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vercel 部署文档](https://vercel.com/docs)

## 🎉 迁移完成

完成所有步骤后，你将拥有：

- ✅ 一个完全独立的前端项目仓库
- ✅ 清晰的项目结构和文档
- ✅ 多平台部署能力
- ✅ 灵活的开发和协作流程

祝你部署顺利！🚀
