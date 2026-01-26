#!/bin/bash
# 前端源代码复制脚本
# 请在执行前确认路径正确

SOURCE_DIR="/Users/zhihaoli/Documents/项目/bazi/frontend"
TARGET_DIR="/Users/zhihaoli/Documents/项目/bazi-frontend"

echo "开始复制前端源代码..."

# 复制 src 目录
if [ -d "$SOURCE_DIR/src" ]; then
  echo "复制 src/ 目录..."
  cp -r "$SOURCE_DIR/src" "$TARGET_DIR/"
fi

# 复制 public 目录
if [ -d "$SOURCE_DIR/public" ]; then
  echo "复制 public/ 目录..."
  cp -r "$SOURCE_DIR/public" "$TARGET_DIR/"
fi

# 复制其他重要文件
echo "复制其他文件..."
[ -f "$SOURCE_DIR/jsconfig.json" ] && cp "$SOURCE_DIR/jsconfig.json" "$TARGET_DIR/"
[ -f "$SOURCE_DIR/.eslintrc.json" ] && cp "$SOURCE_DIR/.eslintrc.json" "$TARGET_DIR/"
[ -f "$SOURCE_DIR/.prettierrc" ] && cp "$SOURCE_DIR/.prettierrc" "$TARGET_DIR/"

echo "✅ 源代码复制完成！"
echo ""
echo "接下来请执行："
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  cp .env.example .env"
echo "  npm run dev"
