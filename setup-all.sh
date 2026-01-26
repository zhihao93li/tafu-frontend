#!/bin/bash
# 前端项目一键设置脚本
# 执行此脚本将自动完成所有初始化步骤

set -e  # 遇到错误立即退出

echo "=========================================="
echo "   八字算命系统 - 前端项目初始化脚本"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 项目路径
SOURCE_DIR="/Users/zhihaoli/Documents/项目/bazi/frontend"
TARGET_DIR="/Users/zhihaoli/Documents/项目/bazi-frontend"

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ 错误: 源目录不存在: $SOURCE_DIR${NC}"
    exit 1
fi

# 步骤 1: 复制源代码
echo -e "${YELLOW}步骤 1/6: 复制源代码...${NC}"
if [ -d "$SOURCE_DIR/src" ]; then
    cp -r "$SOURCE_DIR/src" "$TARGET_DIR/"
    echo -e "${GREEN}✅ src/ 目录已复制${NC}"
fi

if [ -d "$SOURCE_DIR/public" ]; then
    cp -r "$SOURCE_DIR/public" "$TARGET_DIR/"
    echo -e "${GREEN}✅ public/ 目录已复制${NC}"
fi

# 复制其他配置文件（如有）
[ -f "$SOURCE_DIR/jsconfig.json" ] && cp "$SOURCE_DIR/jsconfig.json" "$TARGET_DIR/" && echo -e "${GREEN}✅ jsconfig.json 已复制${NC}"
[ -f "$SOURCE_DIR/.eslintrc.json" ] && cp "$SOURCE_DIR/.eslintrc.json" "$TARGET_DIR/" && echo -e "${GREEN}✅ .eslintrc.json 已复制${NC}"
[ -f "$SOURCE_DIR/.prettierrc" ] && cp "$SOURCE_DIR/.prettierrc" "$TARGET_DIR/" && echo -e "${GREEN}✅ .prettierrc 已复制${NC}"

echo ""

# 步骤 2: 安装依赖
echo -e "${YELLOW}步骤 2/6: 安装依赖...${NC}"
cd "$TARGET_DIR"
npm install
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 步骤 3: 配置环境变量
echo -e "${YELLOW}步骤 3/6: 配置环境变量...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env 文件已创建${NC}"
    echo -e "${YELLOW}⚠️  请手动编辑 .env 文件设置 VITE_API_BASE${NC}"
else
    echo -e "${YELLOW}⚠️  .env 文件已存在，跳过${NC}"
fi
echo ""

# 步骤 4: 测试构建
echo -e "${YELLOW}步骤 4/6: 测试构建...${NC}"
npm run build
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 步骤 5: 初始化 Git
echo -e "${YELLOW}步骤 5/6: 初始化 Git 仓库...${NC}"
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "feat: 初始化独立前端项目

- 从 bazi monorepo 抽离前端代码
- 添加完整的部署配置
- 更新项目文档
- 支持多平台部署 (Cloudflare/Vercel/Railway/Docker)"
    echo -e "${GREEN}✅ Git 仓库已初始化并提交${NC}"
else
    echo -e "${YELLOW}⚠️  Git 仓库已存在，跳过${NC}"
fi
echo ""

# 步骤 6: 提示下一步
echo -e "${YELLOW}步骤 6/6: 完成设置${NC}"
echo ""
echo -e "${GREEN}=========================================="
echo "   🎉 前端项目设置完成！"
echo "==========================================${NC}"
echo ""
echo "📋 下一步操作："
echo ""
echo "1. 编辑环境变量："
echo "   ${YELLOW}nano .env${NC}"
echo "   设置 VITE_API_BASE (例如: http://localhost:3000/api)"
echo ""
echo "2. 启动开发服务器："
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "3. 创建 GitHub 仓库："
echo "   ${YELLOW}gh repo create bazi-fortune-frontend --private --source=. --remote=origin${NC}"
echo "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "   或手动创建："
echo "   ${YELLOW}git remote add origin https://github.com/your-username/bazi-fortune-frontend.git${NC}"
echo "   ${YELLOW}git branch -M main${NC}"
echo "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "4. 部署到生产环境："
echo "   参考 ${YELLOW}DEPLOYMENT.md${NC} 文档"
echo ""
echo "📚 相关文档："
echo "   - ${YELLOW}README.md${NC} - 项目介绍"
echo "   - ${YELLOW}SETUP.md${NC} - 快速开始"
echo "   - ${YELLOW}MIGRATION.md${NC} - 迁移指南"
echo "   - ${YELLOW}DEPLOYMENT.md${NC} - 部署文档"
echo "   - ${YELLOW}PROJECT_SUMMARY.md${NC} - 项目总结"
echo ""
echo -e "${GREEN}祝开发愉快！ 🚀${NC}"
