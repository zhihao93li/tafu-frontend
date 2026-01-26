# 城市数据统一化同步说明

## ✅ 已完成的改动

### 1. 创建新文件
- ✅ `src/utils/cityDataProcessor.js` - 城市数据处理工具

### 2. 更新的文件
- ✅ `src/utils/constants.js` - 简化为使用单一数据源
- ✅ `package.json` - 删除 `province-city-china` 依赖

## ⚠️ 需要手动操作

### 必须步骤：复制 city-geo-data.json

由于文件较大（约2.7MB），需要手动复制：

```bash
# 创建目录
mkdir -p /Users/zhihaoli/Documents/项目/tafu-frontend/src/data

# 复制数据文件
cp /Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json \
   /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json
```

### 验证文件是否存在

```bash
ls -lh /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json
```

应该显示约 2.7MB 的文件。

## 🚀 完成同步后的操作

```bash
cd /Users/zhihaoli/Documents/项目/tafu-frontend

# 1. 删除旧依赖
npm uninstall province-city-china

# 2. 重新安装依赖（如果有其他依赖变更）
npm install

# 3. 启动开发服务器测试
npm run dev
```

## 🧪 测试清单

完成同步后，请测试以下功能：

1. ✅ 打开地点选择器
2. ✅ 验证全国省市区数据显示正常
3. ✅ 特别测试港澳台地区：
   - 香港（18个区）
   - 澳门（7个堂区）
   - 台湾（368个区县）
4. ✅ 选择任意地点后，确认经纬度正确

## 📊 改进效果

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| **数据源** | 3个文件 | 1个文件 |
| **命名一致性** | ❌ 不一致 | ✅ 完全一致 |
| **代码行数** | ~92行 | ~16行 |
| **维护复杂度** | 高 | 低 |

## 📝 技术细节

### 数据来源
- **唯一数据源**：`src/data/city-geo-data.json`
- **数据量**：27,026条完整记录
- **覆盖范围**：全国所有省市区（含港澳台）
- **数据字段**：省/市/区/经度/纬度

### 架构优势
1. 前后端使用相同的省市区命名（如"香港"而非"香港特别行政区"）
2. 无需额外的名称映射或转换
3. 删除了冗余的 `HK-MO-TW.json` 和 `EXTRA_LONGITUDES` 硬编码
4. 代码更简洁，易于维护

## 🔗 相关文档

详细迁移说明请参考：`/Users/zhihaoli/Documents/项目/bazi/MIGRATION_SUMMARY.md`
