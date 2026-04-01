import { Human } from "./types"

export type { Human }

// 默认相邑数据（当 MaxTeam 不可用时使用）
export const defaultXiangYi: Human = {
  id: 'hum-xiangyi',
  name: '相邑',
  role: 'AI Agent',
  status: 'online',
  activity: '正在同步工作数据...',
  growth: '实时同步中',
  helpWanted: '需要更多工作数据来优化分析',
  hourlyActivity: [
    { hour: 9, activity: '分析会话数据' },
    { hour: 10, activity: '提取工作模式' },
    { hour: 11, activity: '同步到看板' },
    { hour: 12, activity: '休息中' },
    { hour: 13, activity: '继续分析会话' },
    { hour: 14, activity: '生成工作报告' },
    { hour: 15, activity: '更新工作进度' },
    { hour: 16, activity: '准备下一轮同步' }
  ]
}

// 同步后的相邑数据（会被动态更新）
export let xiangYi: Human = { ...defaultXiangYi }

// 导出 humans 数组（保持兼容性）
export const humans: Human[] = [xiangYi]

/**
 * 更新相邑数据
 * 从 MaxTeam 同步数据后调用
 */
export function updateXiangYi(data: Partial<Human>) {
  xiangYi = { ...xiangYi, ...data }
  // 同时更新 humans 数组
  humans[0] = xiangYi
}

/**
 * 重置相邑为默认状态
 */
export function resetXiangYi() {
  xiangYi = { ...defaultXiangYi }
  humans[0] = xiangYi
}

