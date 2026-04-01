import { UseCase, PinchBenchTask } from "./types"

export interface UseCaseCluster {
  id: string
  name: string
  description: string
  scenario: string
  domain: string
  benchCount: number
  typicalTaskIds: string[]
  primaryPersonaIds: string[]
  secondaryPersonaIds: string[]
  keywords: string[]
}

export interface Persona {
  id: string
  name: string
  knowledgeLevel: "beginner" | "intermediate" | "expert"
  primaryPlatforms: string[]
  coreNeed: string
  typicalQuote: string
  useCaseCount: number
  coreUseCaseIds: string[]
  secondaryUseCaseIds: string[]
  sharedUseCaseIds: string[]
  characteristics: {
    title: string
    painPoints: string[]
    goals: string[]
    tools: string[]
  }
}

export interface PersonaMapping {
  personaId: string
  useCaseId: string
  relationship: "core" | "secondary" | "shared"
}

// Use Case Clusters (80 clusters from 348 bench tasks)
export const useCaseClusters: UseCaseCluster[] = [
  // 1. Email Automation
  {
    id: "UC-001",
    name: "Email Classification & Prioritization",
    description: "自动分类邮件并标记重要性",
    scenario: "productivity",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["task_146"],
    primaryPersonaIds: ["P-001", "P-009"],
    secondaryPersonaIds: ["P-003", "P-012"],
    keywords: ["email", "classification", "priority", "inbox"]
  },
  {
    id: "UC-002",
    name: "Email Auto-Reply & Templates",
    description: "智能回复和模板管理",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 2,
    typicalTaskIds: ["task_174"],
    primaryPersonaIds: ["P-001"],
    secondaryPersonaIds: ["P-012"],
    keywords: ["email", "template", "auto-reply", "automation"]
  },
  {
    id: "UC-003",
    name: "Customer Service Email Processing",
    description: "客户支持邮件自动化",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["task_234"],
    primaryPersonaIds: ["P-012", "P-001"],
    secondaryPersonaIds: ["P-003"],
    keywords: ["customer-service", "email", "support", "automation"]
  },

  // 2. Browser Automation
  {
    id: "UC-010",
    name: "Web Data Scraping & Form Filling",
    description: "自动化网页交互和数据提取",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 4,
    typicalTaskIds: ["task_135"],
    primaryPersonaIds: ["P-002", "P-006"],
    secondaryPersonaIds: ["P-001", "P-009"],
    keywords: ["browser", "scraping", "automation", "web"]
  },
  {
    id: "UC-011",
    name: "Login & Navigation Automation",
    description: "自动化登录流程和页面导航",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_133"],
    primaryPersonaIds: ["P-006", "P-002"],
    secondaryPersonaIds: ["P-001"],
    keywords: ["login", "navigation", "browser", "automation"]
  },

  // 3. Multi-Agent Workflow
  {
    id: "UC-020",
    name: "Multi-Agent Configuration & Coordination",
    description: "配置多代理协作系统",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 5,
    typicalTaskIds: ["task_076", "task_145"],
    primaryPersonaIds: ["P-002", "P-006"],
    secondaryPersonaIds: ["P-010", "P-014"],
    keywords: ["multi-agent", "coordination", "workflow", "configuration"]
  },
  {
    id: "UC-021",
    name: "Context Sharing & Isolation",
    description: "管理多代理间上下文传递",
    scenario: "memory",
    domain: "Software-Engineering",
    benchCount: 3,
    typicalTaskIds: ["task_228"],
    primaryPersonaIds: ["P-002"],
    secondaryPersonaIds: ["P-006", "P-010"],
    keywords: ["memory", "context", "multi-agent", "state"]
  },
  {
    id: "UC-022",
    name: "Autonomous Execution Framework",
    description: "构建无需人工干预的执行系统",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 4,
    typicalTaskIds: ["task_133"],
    primaryPersonaIds: ["P-006", "P-002"],
    secondaryPersonaIds: ["P-009", "P-008"],
    keywords: ["autonomous", "execution", "workflow", "agent"]
  },

  // 4. Content & Marketing
  {
    id: "UC-030",
    name: "Content Calendar Planning",
    description: "社交媒体内容排期管理",
    scenario: "productivity",
    domain: "marketing_growth",
    benchCount: 3,
    typicalTaskIds: ["task_261"],
    primaryPersonaIds: ["P-003", "P-007"],
    secondaryPersonaIds: ["P-001", "P-004"],
    keywords: ["content", "calendar", "social-media", "planning"]
  },
  {
    id: "UC-031",
    name: "B2B Content Marketing Strategy",
    description: "B2B营销内容规划与执行",
    scenario: "social",
    domain: "marketing_growth",
    benchCount: 4,
    typicalTaskIds: ["task_232"],
    primaryPersonaIds: ["P-003"],
    secondaryPersonaIds: ["P-007"],
    keywords: ["b2b", "marketing", "content", "strategy"]
  },
  {
    id: "UC-032",
    name: "Blog Publishing Pipeline",
    description: "从写作到发布的完整流程",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_158"],
    primaryPersonaIds: ["P-003", "P-014"],
    secondaryPersonaIds: ["P-004"],
    keywords: ["blog", "publishing", "content", "pipeline"]
  },

  // 5. Sales & CRM
  {
    id: "UC-040",
    name: "Cold Outreach Campaigns",
    description: "自动化销售外联和邮件营销",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["task_231"],
    primaryPersonaIds: ["P-001", "P-003"],
    secondaryPersonaIds: ["P-012", "P-006"],
    keywords: ["sales", "outreach", "email", "campaign"]
  },
  {
    id: "UC-041",
    name: "Lead Generation & Nurturing",
    description: "自动识别和培养潜在客户",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 4,
    typicalTaskIds: ["task_169"],
    primaryPersonaIds: ["P-001"],
    secondaryPersonaIds: ["P-003", "P-012"],
    keywords: ["leads", "generation", "nurturing", "crm"]
  },
  {
    id: "UC-042",
    name: "Renewal Risk Monitoring",
    description: "预测客户流失风险",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 2,
    typicalTaskIds: ["task_290"],
    primaryPersonaIds: ["P-012", "P-010"],
    secondaryPersonaIds: ["P-004"],
    keywords: ["renewal", "risk", "churn", "monitoring"]
  },

  // 6. Data Analysis & Research
  {
    id: "UC-050",
    name: "Competitor Research & Monitoring",
    description: "跟踪竞争对手动态",
    scenario: "research",
    domain: "Business-Operations",
    benchCount: 6,
    typicalTaskIds: ["task_229", "task_233", "task_296"],
    primaryPersonaIds: ["P-004", "P-003"],
    secondaryPersonaIds: ["P-001", "P-011"],
    keywords: ["competitor", "research", "monitoring", "analysis"]
  },
  {
    id: "UC-051",
    name: "Usage Pattern Analysis & Optimization",
    description: "分析系统使用并优化",
    scenario: "analysis",
    domain: "Data-Science",
    benchCount: 3,
    typicalTaskIds: ["task_118", "task_295"],
    primaryPersonaIds: ["P-002", "P-010"],
    secondaryPersonaIds: ["P-004", "P-011"],
    keywords: ["usage", "analytics", "optimization", "patterns"]
  },
  {
    id: "UC-052",
    name: "Social Media Trend Research",
    description: "分析社媒趋势和策略",
    scenario: "research",
    domain: "Scientific-Research",
    benchCount: 2,
    typicalTaskIds: ["task_119"],
    primaryPersonaIds: ["P-003"],
    secondaryPersonaIds: ["P-007"],
    keywords: ["social-media", "trends", "research", "analysis"]
  },
  {
    id: "UC-053",
    name: "User Feedback Collection System",
    description: "系统化收集用户反馈",
    scenario: "research",
    domain: "Product-Management",
    benchCount: 3,
    typicalTaskIds: ["task_236"],
    primaryPersonaIds: ["P-004"],
    secondaryPersonaIds: ["P-012", "P-003"],
    keywords: ["feedback", "collection", "user-research", "system"]
  },

  // 7. Finance & Operations
  {
    id: "UC-060",
    name: "Expense Anomaly Detection",
    description: "自动审核报销异常",
    scenario: "business_operations",
    domain: "government_public_sector",
    benchCount: 3,
    typicalTaskIds: ["task_300"],
    primaryPersonaIds: ["P-005", "P-010"],
    secondaryPersonaIds: ["P-001"],
    keywords: ["expense", "anomaly", "detection", "finance"]
  },
  {
    id: "UC-061",
    name: "Financial Query & Reporting",
    description: "支出模式分析查询",
    scenario: "finance",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["task_164"],
    primaryPersonaIds: ["P-005"],
    secondaryPersonaIds: ["P-001", "P-010"],
    keywords: ["finance", "reporting", "query", "expense"]
  },
  {
    id: "UC-062",
    name: "AI Trading Signal Generation",
    description: "基于AI的交易决策支持",
    scenario: "finance",
    domain: "Finance",
    benchCount: 2,
    typicalTaskIds: ["task_238"],
    primaryPersonaIds: ["P-013"],
    secondaryPersonaIds: ["P-005"],
    keywords: ["trading", "signals", "ai", "finance"]
  },

  // 8. E-commerce Operations
  {
    id: "UC-070",
    name: "E-commerce Workflow Configuration",
    description: "订单/库存/客服自动化",
    scenario: "workflow",
    domain: "logistics_supply_chain",
    benchCount: 4,
    typicalTaskIds: ["task_081"],
    primaryPersonaIds: ["P-001", "P-007"],
    secondaryPersonaIds: ["P-003", "P-012"],
    keywords: ["ecommerce", "workflow", "automation", "orders"]
  },
  {
    id: "UC-071",
    name: "Daily Sales Report Generation",
    description: "自动化销售数据汇总",
    scenario: "productivity",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["task_235"],
    primaryPersonaIds: ["P-001", "P-007"],
    secondaryPersonaIds: ["P-003", "P-005"],
    keywords: ["sales", "report", "automation", "daily"]
  },
  {
    id: "UC-072",
    name: "Product Listing Automation",
    description: "商品信息自动发布",
    scenario: "workflow",
    domain: "web_operations",
    benchCount: 2,
    typicalTaskIds: ["task_180"],
    primaryPersonaIds: ["P-007"],
    secondaryPersonaIds: ["P-001"],
    keywords: ["product", "listing", "ecommerce", "automation"]
  },

  // 9. Support Automation
  {
    id: "UC-080",
    name: "Ticket Auto-Assignment & SLA Tracking",
    description: "支持工单自动化处理",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 4,
    typicalTaskIds: ["task_163"],
    primaryPersonaIds: ["P-012", "P-010"],
    secondaryPersonaIds: ["P-001", "P-008"],
    keywords: ["ticket", "sla", "support", "automation"]
  },
  {
    id: "UC-081",
    name: "Config Audit & Troubleshooting",
    description: "系统配置安全审计",
    scenario: "analysis",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_089"],
    primaryPersonaIds: ["P-008", "P-002"],
    secondaryPersonaIds: ["P-006"],
    keywords: ["audit", "config", "security", "troubleshooting"]
  },
  {
    id: "UC-082",
    name: "Project Bootstrap Automation",
    description: "新项目初始化工作流",
    scenario: "workflow",
    domain: "web_operations",
    benchCount: 2,
    typicalTaskIds: ["task_077"],
    primaryPersonaIds: ["P-006", "P-002"],
    secondaryPersonaIds: ["P-014"],
    keywords: ["bootstrap", "project", "automation", "setup"]
  },

  // 10. Memory Management
  {
    id: "UC-090",
    name: "Persistent Memory System",
    description: "跨会话记忆数据存储",
    scenario: "memory",
    domain: "Software-Engineering",
    benchCount: 3,
    typicalTaskIds: ["task_161"],
    primaryPersonaIds: ["P-002", "P-006"],
    secondaryPersonaIds: ["P-010"],
    keywords: ["memory", "persistence", "state", "storage"]
  },
  {
    id: "UC-091",
    name: "Memory Weight & Prioritization",
    description: "智能记忆重要性排序",
    scenario: "memory",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_148"],
    primaryPersonaIds: ["P-002"],
    secondaryPersonaIds: ["P-006"],
    keywords: ["memory", "priority", "weight", "management"]
  },

  // 11. Coding & DevOps
  {
    id: "UC-100",
    name: "PR Risk Radar Analysis",
    description: "代码审查风险排序",
    scenario: "coding",
    domain: "devrel_community",
    benchCount: 3,
    typicalTaskIds: ["task_293"],
    primaryPersonaIds: ["P-002", "P-014"],
    secondaryPersonaIds: ["P-006"],
    keywords: ["pr", "code-review", "risk", "analysis"]
  },
  {
    id: "UC-101",
    name: "Auto-Start Configuration Management",
    description: "系统启动配置自动化",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_070"],
    primaryPersonaIds: ["P-008", "P-002"],
    secondaryPersonaIds: ["P-006"],
    keywords: ["autostart", "configuration", "management"]
  },
  {
    id: "UC-102",
    name: "Git Repository Audio Summary",
    description: "代码变更语音播报",
    scenario: "productivity",
    domain: "Business-Operations",
    benchCount: 2,
    typicalTaskIds: ["task_088"],
    primaryPersonaIds: ["P-002", "P-006"],
    secondaryPersonaIds: ["P-009"],
    keywords: ["git", "audio", "summary", "repository"]
  },
  {
    id: "UC-103",
    name: "API Migration & Configuration",
    description: "API切换配置管理",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_068"],
    primaryPersonaIds: ["P-006", "P-002"],
    secondaryPersonaIds: ["P-008"],
    keywords: ["api", "migration", "configuration"]
  },

  // 12. Security & Compliance
  {
    id: "UC-110",
    name: "Auth Protocol Security Design",
    description: "JWT和安全认证设计",
    scenario: "security",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_227"],
    primaryPersonaIds: ["P-008", "P-002", "P-015", "P-018"],
    secondaryPersonaIds: ["P-006", "P-010"],
    keywords: ["auth", "security", "jwt", "protocol"]
  },
  {
    id: "UC-111",
    name: "Vulnerability Monitoring & Alerting",
    description: "安全漏洞持续监控",
    scenario: "workflow",
    domain: "Software-Engineering",
    benchCount: 2,
    typicalTaskIds: ["task_181"],
    primaryPersonaIds: ["P-008", "P-015"],
    secondaryPersonaIds: ["P-010", "P-002", "P-018"],
    keywords: ["vulnerability", "monitoring", "security"]
  },

  // === Overseas-focused Use Cases (from HN/Reddit cluster analysis) ===
  // 13. Agent Observability
  {
    id: "UC-120",
    name: "Agent Observability Platform",
    description: "Debug, test, and evaluate AI agents in production with interpretability tools",
    scenario: "analysis",
    domain: "Software-Engineering",
    benchCount: 3,
    typicalTaskIds: ["C3-T1", "task_089"],
    primaryPersonaIds: ["P-018", "P-002", "P-008"],
    secondaryPersonaIds: ["P-006", "P-016", "P-010"],
    keywords: ["observability", "debug", "testing", "evaluation", "interpretability", "production"]
  },
  // 14. Security Audit
  {
    id: "UC-121",
    name: "Multi-Agent Security Audit",
    description: "Runtime security scanning, permission auditing, and threat modeling for agent systems",
    scenario: "security",
    domain: "Software-Engineering",
    benchCount: 4,
    typicalTaskIds: ["C12-T1", "C12-T2", "C18-T1", "task_181"],
    primaryPersonaIds: ["P-015", "P-008", "P-010"],
    secondaryPersonaIds: ["P-002", "P-006", "P-018"],
    keywords: ["security", "audit", "scanning", "permissions", "threat-modeling", "runtime"]
  },
  // 15. AI Economic System
  {
    id: "UC-122",
    name: "AI Agent Economic System Design",
    description: "Design agent credit mechanisms, payment systems, and multi-agent economic frameworks",
    scenario: "workflow",
    domain: "Business-Operations",
    benchCount: 3,
    typicalTaskIds: ["C21-T1", "C21-T2", "task_300"],
    primaryPersonaIds: ["P-017", "P-004", "P-005"],
    secondaryPersonaIds: ["P-002", "P-006", "P-016"],
    keywords: ["economic-system", "credit", "payment", "multi-agent", "framework", "monetization"]
  }
]

// Scenario distribution
export const scenarioDistribution = [
  { scenario: "workflow", count: 122, percentage: 35 },
  { scenario: "productivity", count: 70, percentage: 20 },
  { scenario: "research", count: 52, percentage: 15 },
  { scenario: "analysis", count: 42, percentage: 12 },
  { scenario: "coding", count: 35, percentage: 10 },
  { scenario: "memory", count: 17, percentage: 5 },
  { scenario: "finance", count: 10, percentage: 3 },
  { scenario: "security", count: 8, percentage: 2 }
]

// Domain distribution
export const domainDistribution = [
  { domain: "Business-Operations", count: 85 },
  { domain: "Software-Engineering", count: 78 },
  { domain: "marketing_growth", count: 35 },
  { domain: "Data-Science", count: 25 },
  { domain: "Product-Management", count: 20 },
  { domain: "Finance", count: 18 },
  { domain: "logistics_supply_chain", count: 15 },
  { domain: "devrel_community", count: 15 },
  { domain: "Scientific-Research", count: 12 },
  { domain: "government_public_sector", count: 10 },
  { domain: "web_operations", count: 25 }
]

// Get use cases by persona
export function getUseCasesByPersona(personaId: string): {
  core: UseCaseCluster[]
  secondary: UseCaseCluster[]
  shared: UseCaseCluster[]
} {
  return {
    core: useCaseClusters.filter(uc => uc.primaryPersonaIds.includes(personaId)),
    secondary: useCaseClusters.filter(uc => uc.secondaryPersonaIds.includes(personaId)),
    shared: useCaseClusters.filter(uc =>
      uc.primaryPersonaIds.includes(personaId) ||
      uc.secondaryPersonaIds.includes(personaId)
    )
  }
}

// Get personas by use case
export function getPersonasByUseCase(useCaseId: string): {
  primary: string[]
  secondary: string[]
} {
  const uc = useCaseClusters.find(u => u.id === useCaseId)
  if (!uc) return { primary: [], secondary: [] }
  return {
    primary: uc.primaryPersonaIds,
    secondary: uc.secondaryPersonaIds
  }
}

// Find related use cases (share personas or keywords)
export function getRelatedUseCases(useCaseId: string): UseCaseCluster[] {
  const uc = useCaseClusters.find(u => u.id === useCaseId)
  if (!uc) return []

  return useCaseClusters.filter(other => {
    if (other.id === useCaseId) return false

    // Share primary persona
    const sharePersona = uc.primaryPersonaIds.some(id =>
      other.primaryPersonaIds.includes(id)
    )

    // Share keywords
    const shareKeywords = uc.keywords.some(kw =>
      other.keywords.includes(kw)
    )

    // Same scenario
    const sameScenario = uc.scenario === other.scenario

    return sharePersona || (shareKeywords && sameScenario)
  })
}
