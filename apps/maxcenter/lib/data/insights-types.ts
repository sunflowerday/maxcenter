// 工作洞察报告数据类型
// 每3小时由 /insights + claudecode 生成

export interface WorkInsightReport {
  id: string
  timestamp: string
  period: {
    start: string
    end: string
  }

  // 五个核心维度
  dimensions: {
    mainFocus: {
      summary: string
      details: string
    }
    parallelProjects: {
      summary: string
      details: string
    }
    outputAndLearning: {
      summary: string
      details: string
    }
    lessons: {
      summary: string
      details: string
    }
    helpNeeded: {
      summary: string
      details: string
    }
  }

  // 元数据
  meta: {
    sessionCount: number
    messageCount: number
    toolCalls: number
    filesModified: number
  }
}

// 默认报告（当没有数据时使用）
export const defaultReport: WorkInsightReport = {
  id: 'default',
  timestamp: new Date().toISOString(),
  period: {
    start: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  dimensions: {
    mainFocus: {
      summary: '等待数据同步...',
      details: '系统将在下次定时任务后更新工作洞察数据。'
    },
    parallelProjects: {
      summary: '暂无项目数据',
      details: '请等待 /insights 分析完成后查看并行项目情况。'
    },
    outputAndLearning: {
      summary: '等待产出分析',
      details: '正在收集最近3小时的工作产出和学习经验。'
    },
    lessons: {
      summary: '教训分析中',
      details: '系统正在分析工作模式中的教训和改进点。'
    },
    helpNeeded: {
      summary: '需要帮助？',
      details: '分析完成后将显示你可能需要的帮助和支持。'
    }
  },
  meta: {
    sessionCount: 0,
    messageCount: 0,
    toolCalls: 0,
    filesModified: 0
  }
}
