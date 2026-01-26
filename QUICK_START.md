# ⚡ 快速开始

## 🚀 一键设置（推荐）

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend
chmod +x setup-all.sh
./setup-all.sh
```

这个脚本会自动：
- ✅ 复制源代码
- ✅ 安装依赖
- ✅ 创建环境配置
- ✅ 测试构建
- ✅ 初始化 Git

---

## 📝 手动设置

### 1. 复制源代码

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend
chmod +x copy-source.sh
./copy-source.sh
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

```bash
cp .env.example .env
nano .env  # 设置 VITE_API_BASE
```

### 4. 启动开发

```bash
npm run dev
```

访问: http://localhost:5173

---

## 🎯 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览
npm run preview

# 生产服务器
npm start
```

---

## 📦 推送到 GitHub

```bash
# 使用 GitHub CLI（推荐）
gh repo create bazi-fortune-frontend --private --source=. --remote=origin
git push -u origin main

# 或手动
git remote add origin https://github.com/your-username/bazi-fortune-frontend.git
git branch -M main
git push -u origin main
```

---

## 🚀 部署

### Cloudflare Pages

1. 访问 https://dash.cloudflare.com/
2. Pages → Create → Connect Git
3. Build: `npm run build`
4. Output: `dist`
5. 环境变量: `VITE_API_BASE`

### Vercel

1. 访问 https://vercel.com/
2. Import → 选择仓库
3. Framework: Vite
4. 环境变量: `VITE_API_BASE`

---

## 📚 更多文档

| 文档 | 说明 |
|------|------|
| [README.md](./README.md) | 项目介绍 |
| [SETUP.md](./SETUP.md) | 详细设置 |
| [MIGRATION.md](./MIGRATION.md) | 迁移指南 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 部署文档 |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | 项目总结 |

---

## 🆘 遇到问题？

1. 查看文档中的常见问题
2. 检查日志和错误信息
3. 提交 Issue

---

**准备好了吗？立即开始：**

```bash
cd /Users/zhihaoli/Documents/项目/bazi-frontend && chmod +x setup-all.sh && ./setup-all.sh
```

🎉 祝你顺利！
