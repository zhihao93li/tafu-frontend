/**
 * 本地命盘同步工具
 * 
 * 登录后将本地命盘异步同步到服务器
 * 处理名称冲突,静默完成
 */

import { api } from '../services/api';
import { getLocalSubjects, deleteLocalSubject } from './localSubjects';

/**
 * 异步同步本地命盘到服务器
 * 
 * 策略:
 * 1. 获取服务器已有命盘列表
 * 2. 遍历本地命盘:
 *    - 名称不冲突: 直接上传
 *    - 名称冲突: 重命名为 "原名称 (本地)" 后上传
 * 3. 同步成功后删除本地存储
 * 4. 静默完成,不打扰用户
 * 
 * @param {Object} queryClient - React Query 的 queryClient 实例 (用于刷新缓存)
 * @param {Function} onComplete - 可选的完成回调,参数为 { synced: number, failed: number }
 */
export async function syncLocalSubjectsToServer(queryClient, onComplete) {
  try {
    // 1. 获取本地命盘
    const localSubjects = getLocalSubjects();
    
    if (localSubjects.length === 0) {
      onComplete?.({ synced: 0, failed: 0 });
      return;
    }

    console.log(`[同步] 开始同步 ${localSubjects.length} 个本地命盘...`);

    // 2. 获取服务器已有命盘的名称列表
    let serverNames = new Set();
    try {
      const page = await api.get('/subjects');
      const serverSubjects = page.content || [];
      serverNames = new Set(serverSubjects.map(s => s.name));
    } catch (error) {
      console.error('[同步] 获取服务器命盘列表失败:', error);
      onComplete?.({ synced: 0, failed: localSubjects.length });
      return;
    }

    // 3. 遍历本地命盘并同步
    let syncedCount = 0;
    let failedCount = 0;

    for (const localSubject of localSubjects) {
      try {
        // 准备上传数据
        const subjectData = {
          name: localSubject.name,
          gender: localSubject.gender,
          calendarType: localSubject.calendarType,
          birthYear: localSubject.birthYear,
          birthMonth: localSubject.birthMonth,
          birthDay: localSubject.birthDay,
          birthHour: localSubject.birthHour,
          birthMinute: localSubject.birthMinute,
          isLeapMonth: localSubject.isLeapMonth,
          location: localSubject.location,
          baziData: localSubject.baziData,
        };

        // 检查名称冲突
        if (serverNames.has(localSubject.name)) {
          // 冲突: 自动重命名
          subjectData.name = `${localSubject.name} (本地)`;
          console.log(`[同步] 检测到名称冲突,重命名: "${localSubject.name}" → "${subjectData.name}"`);
          
          // 更新 serverNames,避免后续冲突
          serverNames.add(subjectData.name);
        }

        // 上传到服务器
        await api.post('/subjects', subjectData);
        
        // 成功后删除本地存储
        deleteLocalSubject(localSubject.id);
        
        syncedCount++;
        console.log(`[同步] 成功同步: ${subjectData.name}`);
      } catch (error) {
        failedCount++;
        console.error(`[同步] 同步失败: ${localSubject.name}`, error);
        // 继续同步其他命盘,不中断流程
      }
    }

    console.log(`[同步] 完成: 成功 ${syncedCount} 个, 失败 ${failedCount} 个`);
    
    // 4. 同步完成后刷新命盘列表缓存
    if (syncedCount > 0 && queryClient) {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      console.log('[同步] 已刷新命盘列表缓存');
    }
    
    onComplete?.({ synced: syncedCount, failed: failedCount });
  } catch (error) {
    console.error('[同步] 同步过程异常:', error);
    onComplete?.({ synced: 0, failed: getLocalSubjects().length });
  }
}
