# 🚀 前端项目快速启动指南

## 📋 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

检查版本：

```bash
node --version
npm --version
git --version
```

## ⚡ 快速开始

### 1. 复制源代码

```bash
# 进入项目目录
cd /Users/zhihaoli/Documents/项目/bazi-frontend

# 赋予执行权限
chmod +x copy-source.sh

# 运行复制脚本
./copy-source.sh
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
# VITE_API_BASE="http://localhost:3000/api"
```

### 4. 启动开发

```bash
npm run dev
```

访问: http://localhost:5173

## 📦 可用命令

```bash
# 开发服务器 (带热重载)
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 启动生产服务器 (需先 build)
npm start
```

## 🔧 开发配置

### VS Code 推荐扩展

创建 `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dsznajder.es7-react-js-snippets",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### 代码格式化

如果原项目有 `.prettierrc` 或 `.eslintrc.json`，它们会被自动复制。

## 🌐 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_BASE` | 后端 API 地址 | `http://localhost:3000/api` |

**注意**: 所有以 `VITE_` 开头的环境变量会被嵌入到前端代码中，**不要存放敏感信息**！

## 🐳 Docker 开发

```bash
# 构建镜像
docker build -t bazi-frontend --build-arg VITE_API_BASE=http://localhost:3000/api .

# 运行容器
docker run -p 3000:3000 bazi-frontend

# 或使用 docker-compose（如有）
docker-compose up
```

## 🧪 测试后端连接

启动开发服务器后，打开浏览器控制台：

```javascript
// 测试 API 连接
fetch(import.meta.env.VITE_API_BASE + '/health')
  .then(r => r.json())
  .then(console.log)
```

## 🔗 相关链接

- 后端仓库: https://github.com/your-username/bazi
- 部署文档: [MIGRATION.md](./MIGRATION.md)
- 项目文档: [README.md](./README.md)

## 💡 常见问题

### 端口冲突

如果 5173 端口被占用：

```bash
# 指定其他端口
npm run dev -- --port 5174
```

### 依赖安装失败

```bash
# 清理缓存
npm cache clean --force

# 删除依赖重装
rm -rf node_modules package-lock.json
npm install
```

### 无法连接后端

1. 确认后端已启动 (http://localhost:3000)
2. 检查 `.env` 中的 `VITE_API_BASE`
3. 检查后端 CORS 配置

## 📞 获取帮助

遇到问题？

1. 查看 [MIGRATION.md](./MIGRATION.md) 中的常见问题
2. 查看后端项目文档
3. 提交 Issue

---

祝开发愉快！🎉
