/**
 * YAML Task Parser - Server-safe version
 * 优先从编译好的 bench-tasks.ts 导入数据
 * 在 Vercel 部署时也可以正常工作
 */

import { migratedBenchTasks, MigratedBenchTask } from './bench-tasks'

// Swipe 页面需要的格式
export interface SwipeTask {
  id: string
  cnName: string
  type: string
  initialUserMessage: string
  hiddenContext: string
}

// 转换 MigratedBenchTask 为 SwipeTask 格式
function convertToSwipeTask(task: MigratedBenchTask): SwipeTask {
  return {
    id: task.id,
    cnName: task.titleZh || task.titleEn || '未命名任务',
    type: task.type || 'openclaw',
    initialUserMessage: task.initialMessageZh || task.initialMessageEn || '',
    hiddenContext: task.hiddenContextZh || task.hiddenContextEn || '',
  }
}

// 导出转换后的任务数据
export const yamlTasks: SwipeTask[] = migratedBenchTasks.map(convertToSwipeTask)

console.log(`Loaded ${yamlTasks.length} tasks from compiled bench-tasks.ts`)
