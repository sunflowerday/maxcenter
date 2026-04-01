// Insights 数据同步服务
// 每3小时从云端获取工作洞察报告

import { WorkInsightReport, defaultReport } from "./insights-types"

const INSIGHTS_API_URL = process.env.NEXT_PUBLIC_INSIGHTS_API || 'http://localhost:3002'

/**
 * 获取最新的工作洞察报告
 */
export async function fetchLatestReport(): Promise<WorkInsightReport | null> {
  try {
    const response = await fetch(`${INSIGHTS_API_URL}/api/insights/latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn('Insights API unavailable (backend not running)')
      return null
    }

    const data = await response.json()
    return data.report || null
  } catch (error) {
    console.error('Failed to fetch insights:', error)
    return null
  }
}

/**
* 获取历史报告列表
 */
export async function fetchReportHistory(limit: number = 10): Promise<WorkInsightReport[]> {
  try {
    const response = await fetch(`${INSIGHTS_API_URL}/api/insights/history?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.reports || []
  } catch (error) {
    console.error('Failed to fetch report history:', error)
    return []
  }
}

/**
 * 触发新的 insights 生成（手动调用）
 */
export async function triggerInsightsGeneration(): Promise<boolean> {
  try {
    const response = await fetch(`${INSIGHTS_API_URL}/api/insights/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.ok
  } catch (error) {
    console.error('Failed to trigger insights:', error)
    return false
  }
}

/**
 * 模拟报告数据（用于开发和测试）
 */
export function getMockReport(): WorkInsightReport {
  return {
    id: 'mock-001',
    timestamp: new Date().toISOString(),
    period: {
      start: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
    },
    dimensions: {
      mainFocus: {
        summary: '**MaxTeam** 系统开发与 MaxCenter 集成',
        details: `在过去3小时内，主要专注于完成 **MaxTeam 云端工作看板系统**的开发，包括：

### 完成内容

1. ✅ 完成前端 UI 组件（AgentCard、TeamStats、Timeline）
2. ✅ 实现服务端 API（/ingest、/dashboard、/health）
3. ✅ 开发 Python 客户端用于会话数据同步
4. ✅ 将 MaxTeam 数据集成到 MaxCenter 的**相邑卡片**

> 核心目标是实现工作数据的自动收集、同步和可视化展示。`
      },
      parallelProjects: {
        summary: '同时进行 **MaxTeam**、**MaxCenter** 改造和 **Insights** 报告系统',
        details: `当前并行的项目包括：

| 项目 | 进度 | 状态 |
|------|------|------|
| **MaxTeam 云端看板** | 80% | ✅ 数据流已跑通 |
| **MaxCenter UI 改造** | 60% | 🔄 相邑卡片改造中 |
| **Insights 报告系统** | 30% | 🆕 刚刚启动设计 |

### 项目依赖关系

形成完整的数据流闭环。`
      },
      outputAndLearning: {
        summary: '完成**端到端数据流**，掌握多项目并行管理技巧',
        details: `## 主要产出

### 1. 完整系统架构
设计并实现了从 **Claude 会话 → Next.js API → React 前端**的完整数据流

### 2. 代码质量提升
修复了多个 bug：
- SQL 语法错误 ✅ 已修复
- API 路径问题 ✅ 已修复
- 时间戳格式 ✅ 已修复

### 3. 新技能习得
- [x] 使用 **OKLCH** 色彩空间设计工业精密风格 UI
- [x] Python 正则提取和 LLM 混合分析模式
- [x] PostgreSQL JSONB 存储和聚合查询

> 💡 **经验收获**：先定义数据模型和 API，再实现展示层，可以减少返工。`
      },
      lessons: {
        summary: '定时任务可靠性不足，需要更好的**错误恢复机制**',
        details: `## 教训总结

### ❌ 遇到的问题

1. **API 路径不一致**
   - 客户端调用 /ingest
   - 服务端实际是 /api/v1/ingest
   - 导致 404 错误

2. **时间戳格式问题**
   - 错误格式缺少时区信息
   - 应使用 ISO 8601 标准格式

3. **SQL 语法错误**
   - 复制粘贴时混入额外字符

### 🔧 改进措施

- [ ] 统一 API 路径配置到环境变量
- [ ] 添加输入数据验证和格式化
- [ ] SQL 语句使用模板字符串前进行语法检查`
      },
      helpNeeded: {
        summary: '需要设置可靠的**定时任务调度**，优化 Insights 数据存储',
        details: `## 需要的帮助

### 1. 定时任务调度 ⏰
目前需要手动运行客户端，需要设置 crontab 或 systemd timer 实现每3小时自动同步

### 2. Insights 后端 API 🚀
需要创建 Node.js/Python 服务来存储和提供报告数据

### 3. 数据持久化 💾
考虑使用 SQLite 或 PostgreSQL 存储历史报告，支持趋势分析

### 4. Claude SDK 集成 🤖
研究如何使用 Claude SDK 程序化调用 /insights 并解析输出

---

> **建议下一步**：先搭建简单的 Insights 后端，支持接收和存储报告数据。`
      }
    },
    meta: {
      sessionCount: 12,
      messageCount: 156,
      toolCalls: 89,
      filesModified: 15
    }
  }
}
