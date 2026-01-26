# 🚀 快速同步指南

## 一键执行（推荐）

```bash
cd /Users/zhihaoli/Documents/项目/tafu-frontend
chmod +x sync-and-run.sh
./sync-and-run.sh
```

脚本会自动完成：
- ✅ 创建 `src/data` 目录
- ✅ 复制 `city-geo-data.json`
- ✅ 删除旧依赖 `province-city-china`
- ✅ 安装依赖
- ✅ 启动开发服务器

---

## 手动执行（如果脚本失败）

### 步骤 1：复制数据文件

```bash
mkdir -p /Users/zhihaoli/Documents/项目/tafu-frontend/src/data

cp /Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json \
   /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json
```

### 步骤 2：验证文件

```bash
ls -lh /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json
```

应该显示约 **2.7MB** 的文件。

### 步骤 3：更新依赖

```bash
cd /Users/zhihaoli/Documents/项目/tafu-frontend

npm uninstall province-city-china
npm install
```

### 步骤 4：启动开发服务器

```bash
npm run dev
```

---

## ✅ 已完成的代码改动

所有代码改动已自动完成：

1. ✅ **新增**：`src/utils/cityDataProcessor.js`
2. ✅ **更新**：`src/utils/constants.js`（92行 → 16行）
3. ✅ **更新**：`package.json`（删除 province-city-china）
4. ✅ **更新**：`vite.config.js`（更新打包配置）

---

## 🧪 测试清单

完成后请测试：

- [ ] 开发服务器启动成功
- [ ] 地点选择器正常工作
- [ ] 测试香港/澳门/台湾地区

---

## 📚 详细文档

- **完整说明**：查看 `CHANGES_SUMMARY.md`
- **故障排查**：查看 `SYNC_CITY_DATA.md`

---

## ❓ 遇到问题？

### 问题：找不到 city-geo-data.json

**解决**：确认源文件存在

```bash
ls -lh /Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json
```

### 问题：npm 命令失败

**解决**：清除缓存重试

```bash
rm -rf node_modules package-lock.json
npm install
```

---

**需要帮助？** 查看 `CHANGES_SUMMARY.md` 中的故障排查章节。
