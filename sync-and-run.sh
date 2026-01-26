#!/bin/bash
# 同步城市数据并启动开发服务器
set -e

echo "🔄 开始同步城市数据..."

# 定义路径
SOURCE_FILE="/Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json"
TARGET_DIR="/Users/zhihaoli/Documents/项目/tafu-frontend/src/data"
TARGET_FILE="$TARGET_DIR/city-geo-data.json"

# 1. 创建目录
echo "📁 创建数据目录..."
mkdir -p "$TARGET_DIR"

# 2. 复制数据文件
echo "📋 复制 city-geo-data.json..."
if [ -f "$SOURCE_FILE" ]; then
    cp "$SOURCE_FILE" "$TARGET_FILE"
    echo "✅ 数据文件复制成功！"
    
    # 显示文件大小
    FILE_SIZE=$(du -h "$TARGET_FILE" | cut -f1)
    echo "   文件大小: $FILE_SIZE"
else
    echo "❌ 错误：源文件不存在: $SOURCE_FILE"
    exit 1
fi

# 3. 检查文件是否存在
if [ ! -f "$TARGET_FILE" ]; then
    echo "❌ 错误：数据文件复制失败"
    exit 1
fi

# 4. 进入项目目录
cd /Users/zhihaoli/Documents/项目/tafu-frontend

# 5. 删除旧依赖
echo ""
echo "🗑️  删除旧依赖 province-city-china..."
npm uninstall province-city-china 2>/dev/null || true

# 6. 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

# 7. 启动开发服务器
echo ""
echo "🚀 启动开发服务器..."
echo ""
echo "======================================"
echo "  同步完成！开发服务器即将启动..."
echo "======================================"
echo ""

npm run dev
