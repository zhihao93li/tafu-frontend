# 🚀 部署指南

本文档详细说明如何将前端项目部署到各个平台。

## 📋 部署前准备

### 1. 确保项目可以正常构建

```bash
npm run build
```

### 2. 准备生产环境 API 地址

确定后端 API 的生产地址，例如：
- `https://api.example.com/api`
- `https://your-backend.railway.app/api`
- `https://your-backend.zeabur.app/api`

## 🌐 部署平台

### 1️⃣ Cloudflare Pages (推荐)

**优势**: 免费、快速、CDN、无限流量

#### 通过 Dashboard 部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create application → Pages → Connect to Git
3. 选择你的 GitHub 仓库
4. 配置构建设置：
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: (留空)
   ```
5. 添加环境变量：
   ```
   VITE_API_BASE = https://your-backend-api.com/api
   ```
6. Save and Deploy

#### 通过 Wrangler CLI 部署

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler pages deploy dist
```

#### 自动部署

每次 push 到 main 分支会自动触发部署。

---

### 2️⃣ Vercel

**优势**: 开发者友好、自动 HTTPS、预览部署

#### 通过 Dashboard 部署

1. 登录 [Vercel](https://vercel.com/)
2. New Project → Import Git Repository
3. 选择仓库
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. 添加环境变量：
   ```
   VITE_API_BASE = https://your-backend-api.com/api
   ```
8. Deploy

#### 通过 Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

### 3️⃣ Netlify

**优势**: 免费、简单、表单处理、Serverless Functions

#### 通过 Dashboard 部署

1. 登录 [Netlify](https://www.netlify.com/)
2. New site from Git
3. 选择 GitHub 仓库
4. 构建设置：
   ```
   Build command: npm run build
   Publish directory: dist
   ```
5. 添加环境变量：
   ```
   VITE_API_BASE = https://your-backend-api.com/api
   ```
6. Deploy site

#### 通过 Netlify CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

---

### 4️⃣ Railway

**优势**: 支持 Dockerfile、数据库、简单配置

#### 部署步骤

1. 登录 [Railway](https://railway.app/)
2. New Project → Deploy from GitHub repo
3. 选择仓库
4. 添加环境变量：
   ```
   VITE_API_BASE = https://your-backend.railway.app/api
   PORT = 3000
   ```
5. Railway 会自动检测 `Dockerfile` 并构建

**注意**: 项目已包含 `Dockerfile` 和 `railway.toml`，无需额外配置。

---

### 5️⃣ Docker 部署

**适用场景**: 自托管、VPS、云服务器

#### 构建镜像

```bash
docker build -t bazi-frontend \
  --build-arg VITE_API_BASE=https://your-backend.com/api \
  .
```

#### 运行容器

```bash
docker run -d \
  --name bazi-frontend \
  -p 3000:3000 \
  bazi-frontend
```

#### 使用 Docker Compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      args:
        VITE_API_BASE: https://your-backend.com/api
    ports:
      - "3000:3000"
    restart: unless-stopped
```

启动：

```bash
docker-compose up -d
```

---

## 🔐 环境变量配置

所有部署平台都需要配置 `VITE_API_BASE` 环境变量：

| 环境 | 值 |
|------|-----|
| 开发 | `http://localhost:3000/api` |
| 预发布 | `https://staging-api.example.com/api` |
| 生产 | `https://api.example.com/api` |

**重要**: 
- 不要包含尾部斜杠 `/`
- 必须是完整的 URL (包括 `https://`)
- 前端会将此值嵌入到构建产物中

---

## ⚙️ 后端 CORS 配置

确保后端允许前端域名跨域访问。

**示例** (Node.js + Hono):

```typescript
import { cors } from 'hono/cors'

app.use('/*', cors({
  origin: [
    'http://localhost:5173',  // 本地开发
    'https://your-frontend.pages.dev',  // Cloudflare
    'https://your-frontend.vercel.app',  // Vercel
    'https://your-frontend.netlify.app',  // Netlify
    // 添加其他生产域名
  ],
  credentials: true
}))
```

---

## 🧪 部署后验证

### 1. 检查构建状态

访问部署平台的 Dashboard，确认构建成功。

### 2. 访问网站

打开部署后的 URL，检查：
- ✅ 页面正常加载
- ✅ 样式正确显示
- ✅ 路由跳转正常

### 3. 测试 API 连接

打开浏览器控制台：

```javascript
// 检查环境变量
console.log('API Base:', import.meta.env.VITE_API_BASE)

// 测试 API 请求
fetch(import.meta.env.VITE_API_BASE + '/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### 4. 功能测试

- [ ] 用户登录/注册
- [ ] 八字排盘
- [ ] 个人资料
- [ ] 管理后台（如适用）

---

## 🔄 持续部署 (CI/CD)

### GitHub Actions

项目已包含 `.github/workflows/deploy.yml`。

每次 push 到 `main` 分支会自动：
1. 安装依赖
2. 运行构建
3. 上传构建产物

如需自动部署到特定平台，可添加部署步骤。

### Cloudflare Pages

自动集成 GitHub，无需额外配置。

### Vercel/Netlify

连接 GitHub 后自动启用 CI/CD。

---

## 🐛 部署问题排查

### 问题 1: 构建失败

**可能原因**:
- 依赖安装失败
- 环境变量未设置
- Node.js 版本不匹配

**解决方法**:
```bash
# 本地测试构建
npm ci
npm run build

# 检查日志
# 部署平台 → Build logs
```

### 问题 2: 白屏或 404

**可能原因**:
- SPA 路由配置错误
- `base` 配置错误

**解决方法**:
- 检查 `vite.config.js` 中的 `base` 配置
- 确认 `_redirects` 或 `vercel.json` 存在
- 检查浏览器控制台错误

### 问题 3: API 请求失败

**可能原因**:
- CORS 未配置
- API 地址错误
- HTTPS 混合内容

**解决方法**:
1. 检查后端 CORS 配置
2. 确认 `VITE_API_BASE` 正确
3. 检查网络请求（浏览器 Network 面板）

### 问题 4: 环境变量不生效

**原因**: 环境变量在构建时被嵌入，运行时无法修改。

**解决方法**:
1. 在部署平台的设置中添加环境变量
2. 重新触发构建（不是重启）
3. 清除缓存后重新构建

---

## 📊 性能优化

### 1. 启用 Gzip/Brotli 压缩

大多数部署平台默认启用。自托管需配置服务器。

### 2. CDN 加速

- Cloudflare Pages: 自动全球 CDN
- Vercel: 自动 Edge Network
- 自托管: 考虑使用 Cloudflare CDN

### 3. 缓存策略

静态资源自动 hash 命名，配置长期缓存：

```
Cache-Control: public, max-age=31536000, immutable
```

`vercel.json` 和 Cloudflare Pages 已自动配置。

---

## 🎯 多环境部署

### 开发环境 (dev)

```bash
# 本地开发
npm run dev
```

### 预发布环境 (staging)

在部署平台创建 staging 分支部署：

```bash
git checkout -b staging
git push origin staging
```

配置不同的 `VITE_API_BASE`:
```
VITE_API_BASE=https://staging-api.example.com/api
```

### 生产环境 (production)

```bash
git checkout main
git push origin main
```

---

## 📞 获取帮助

部署遇到问题？

1. 查看部署平台的官方文档
2. 检查构建日志和错误信息
3. 在项目中提交 Issue

---

**祝部署顺利！** 🚀
