# 改动总结 - 统一城市数据源

## 📅 更新时间
2026年1月26日

## 🎯 改动目标
将 `tafu-frontend` 项目的城市数据源统一为 `city-geo-data.json`，与主项目 `bazi` 保持一致。

---

## ✅ 已完成的文件改动

### 1. 新增文件

#### `src/utils/cityDataProcessor.js`
- **作用**：从 `city-geo-data.json` 构建省市区三级树结构
- **功能**：
  - `buildProvinceTree()` - 构建树形数据
  - `getProvinces()` - 获取缓存的省份数据
- **特点**：自动去重，性能优化

### 2. 修改的文件

#### `src/utils/constants.js`
**改动前（92行）：**
```javascript
import provincesData from 'province-city-china/dist/province.json';
import citiesData from 'province-city-china/dist/city.json';
import areasData from 'province-city-china/dist/area.json';
import hkMoTwData from '../../../docs/HK-MO-TW.json';
// ... 复杂的数据处理逻辑 ...
```

**改动后（16行）：**
```javascript
import { getProvinces } from './cityDataProcessor';
// ... 简洁的常量定义 ...
export const PROVINCES = getProvinces();
```

**减少代码量：82% ⬇️**

#### `package.json`
**删除依赖：**
```diff
- "province-city-china": "^8.5.8",
```

### 3. 新增文档

- ✅ `SYNC_CITY_DATA.md` - 同步说明文档
- ✅ `sync-and-run.sh` - 一键同步脚本
- ✅ `CHANGES_SUMMARY.md` - 本文档

---

## ⚠️ 需要手动完成的操作

### 关键步骤：复制数据文件

数据文件 `city-geo-data.json` 太大（2.7MB），需要手动复制：

**方式一：使用提供的脚本（推荐）**
```bash
cd /Users/zhihaoli/Documents/项目/tafu-frontend
chmod +x sync-and-run.sh
./sync-and-run.sh
```

**方式二：手动执行命令**
```bash
# 1. 创建目录
mkdir -p /Users/zhihaoli/Documents/项目/tafu-frontend/src/data

# 2. 复制文件
cp /Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json \
   /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json

# 3. 进入项目
cd /Users/zhihaoli/Documents/项目/tafu-frontend

# 4. 删除旧依赖
npm uninstall province-city-china

# 5. 安装依赖
npm install

# 6. 启动开发服务器
npm run dev
```

---

## 📊 改进效果对比

| 指标 | 改动前 | 改动后 | 改进 |
|------|--------|--------|------|
| **数据源数量** | 3个文件 | 1个文件 | ⬇️ 67% |
| **constants.js 代码行数** | 92行 | 16行 | ⬇️ 82% |
| **NPM 依赖** | 需要 province-city-china | 无额外依赖 | ⬇️ 1个包 |
| **命名一致性** | ❌ 不一致 | ✅ 完全一致 | ✅ 100% |
| **维护复杂度** | 高 | 低 | ⬇️ 显著降低 |
| **数据完整性** | 部分缺失 | 完整 | ✅ 27,026条 |

---

## 🧪 测试验证清单

完成同步后，请按照以下清单测试：

### 基础功能
- [ ] 开发服务器能正常启动
- [ ] 没有控制台错误
- [ ] 页面正常渲染

### 地点选择器
- [ ] 选择器能正常打开
- [ ] 省份列表完整显示
- [ ] 城市列表能正常联动
- [ ] 区县列表能正常显示

### 港澳台地区（重点测试）
- [ ] 香港：显示 18个区
- [ ] 澳门：显示 7个堂区  
- [ ] 台湾：显示完整的县市区

### 经纬度查询
- [ ] 选择北京市/东城区，能正确返回经纬度
- [ ] 选择香港/中西区，能正确返回经纬度
- [ ] 选择台湾/台北市/大安区，能正确返回经纬度

---

## 🔧 故障排查

### 问题1：导入 city-geo-data.json 失败
**症状**：`Cannot find module '../data/city-geo-data.json'`

**解决方案**：
```bash
# 确认文件存在
ls -lh /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/city-geo-data.json

# 如果不存在，手动复制
cp /Users/zhihaoli/Documents/项目/bazi/src/lib/bazi/city-geo-data.json \
   /Users/zhihaoli/Documents/项目/tafu-frontend/src/data/
```

### 问题2：province-city-china 依赖错误
**症状**：`Cannot find module 'province-city-china'`

**解决方案**：
```bash
# 删除 node_modules 和 package-lock.json 重新安装
cd /Users/zhihaoli/Documents/项目/tafu-frontend
rm -rf node_modules package-lock.json
npm install
```

### 问题3：地点选择器数据为空
**症状**：选择器打开后没有数据

**解决方案**：
1. 检查浏览器控制台是否有错误
2. 确认 `city-geo-data.json` 文件存在且内容正确
3. 清除浏览器缓存后刷新

---

## 📚 技术架构说明

### 数据流
```
city-geo-data.json (27,026条记录)
        ↓
cityDataProcessor.js (构建树形结构)
        ↓
constants.js (导出 PROVINCES)
        ↓
组件使用 (级联选择器)
```

### 数据结构
```javascript
// city-geo-data.json 原始数据
{
  "province": "北京",
  "city": "北京市",
  "area": "东城区",
  "lng": "116.416357",
  "lat": "39.928353"
}

// 转换后的树形结构
{
  value: "北京",
  label: "北京",
  cities: [
    {
      value: "北京市",
      label: "北京市",
      districts: [
        { value: "东城区", label: "东城区" },
        // ...
      ]
    }
  ]
}
```

---

## 🔗 相关资源

- **主项目迁移文档**：`/Users/zhihaoli/Documents/项目/bazi/MIGRATION_SUMMARY.md`
- **同步说明**：`./SYNC_CITY_DATA.md`
- **一键脚本**：`./sync-and-run.sh`

---

## ✨ 总结

这次改动大大简化了项目架构，实现了：
1. ✅ **单一数据源**：只需维护 `city-geo-data.json`
2. ✅ **前后端统一**：命名完全一致，无需转换
3. ✅ **代码精简**：减少 82% 的数据处理代码
4. ✅ **数据完整**：27,026条完整记录，包含港澳台

**下一步**：执行 `./sync-and-run.sh` 完成同步并测试！
