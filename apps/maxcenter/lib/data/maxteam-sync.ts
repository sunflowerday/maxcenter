// MaxTeam 数据同步服务
// 从 MaxTeam API 获取数据并同步到相邑

import { Human, HourlyActivity } from "@/lib/data/types"

interface MaxTeamAgentCard {
  agent_id: string
  agent_name?: string
  last_report_hour: string
  summary: {
    completed: string[]
    blocked: string[]
    patterns: string[]
  }
  stats: {
    total_messages: number
    user_messages: number
    ai_messages: number
    commands_executed: number
    sessions_analyzed: number
  }
  domains: Record<string, number>
  health: 'active' | 'idle' | 'stalled'
}

interface MaxTeamDashboard {
  status: string
  data: {
    agent_cards?: MaxTeamAgentCard[]
    timestamp?: string
  }
}

const MAXTEAM_API_URL = process.env.NEXT_PUBLIC_MAXTEAM_API || 'http://localhost:3000'

/**
 * 从 MaxTeam 获取最新数据
 */
export async function fetchMaxTeamData(): Promise<MaxTeamAgentCard | null> {
  try {
    const response = await fetch(`${MAXTEAM_API_URL}/api/v1/dashboard?latest=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('MaxTeam API error:', response.status)
      return null
    }

    const data: MaxTeamDashboard = await response.json()

    if (!data.data?.agent_cards || data.data.agent_cards.length === 0) {
      return null
    }

    // 返回第一个 agent 的数据（或可以按 agent_id 筛选）
    return data.data.agent_cards[0]
  } catch (error) {
    console.error('Failed to fetch MaxTeam data:', error)
    return null
  }
}

/**
 * 将 MaxTeam 数据转换为相邑的 Human 对象
 */
export function convertToXiangYi(agentData: MaxTeamAgentCard): Partial<Human> {
  // 构建当前活动描述
  const completedTasks = agentData.summary.completed.slice(0, 2).join('、') || '暂无完成项'
  const blockedTasks = agentData.summary.blocked.slice(0, 2).join('、') || '无卡点'

  // 构建 hourly activity
  const hourlyActivity: HourlyActivity[] = [
    { hour: 9, activity: '分析会话数据' },
    { hour: 10, activity: completedTasks || '处理工作任务' },
    { hour: 11, activity: agentData.summary.patterns[0] || '优化工作流程' },
    { hour: 12, activity: '休息中' },
    { hour: 13, activity: blockedTasks !== '无卡点' ? `解决卡点: ${blockedTasks}` : '继续工作' },
    { hour: 14, activity: `已处理 ${agentData.stats.total_messages} 条消息` },
    { hour: 15, activity: `执行了 ${agentData.stats.commands_executed} 个命令` },
    { hour: 16, activity: '准备下一轮同步' },
  ]

  return {
    id: 'hum-xiangyi',
    name: '相邑',
    role: 'AI Agent',
    status: agentData.health === 'active' ? 'online' : agentData.health === 'idle' ? 'idle' : 'offline',
    activity: `最近: ${completedTasks}`,
    growth: `${agentData.stats.sessions_analyzed} 个会话已分析`,
    helpWanted: blockedTasks !== '无卡点' ? `需要解决: ${blockedTasks}` : '运行正常，无需帮助',
    hourlyActivity,
  }
}

/**
 * 同步 MaxTeam 数据到相邑
 * 返回更新后的相邑 Human 对象
 */
export async function syncXiangYiFromMaxTeam(): Promise<Human | null> {
  const agentData = await fetchMaxTeamData()

  if (!agentData) {
    return null
  }

  return {
    id: 'hum-xiangyi',
    name: '相邑',
    role: 'AI Agent',
    status: agentData.health === 'active' ? 'online' : agentData.health === 'idle' ? 'idle' : 'offline',
    activity: `处理 ${agentData.stats.total_messages} 条消息`,
    growth: `${agentData.stats.sessions_analyzed} 个会话已分析`,
    helpWanted: agentData.summary.blocked.length > 0
      ? `卡点: ${agentData.summary.blocked[0]}`
      : '运行正常',
    hourlyActivity: [
      { hour: 9, activity: '开始分析会话数据' },
      { hour: 10, activity: agentData.summary.completed[0] || '处理工作任务' },
      { hour: 11, activity: agentData.summary.patterns[0] || '优化工作流程' },
      { hour: 12, activity: '休息中' },
      { hour: 13, activity: agentData.summary.completed[1] || '继续分析' },
      { hour: 14, activity: `已处理 ${agentData.stats.total_messages} 条消息` },
      { hour: 15, activity: `执行了 ${agentData.stats.commands_executed} 个命令` },
      { hour: 16, activity: '准备下一轮同步' },
    ],
  }
}
