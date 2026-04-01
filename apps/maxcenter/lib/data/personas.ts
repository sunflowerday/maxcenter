import { UseCaseCluster, Persona } from "./use-case-clusters"

// Personas (14 personas from hierarchical clustering)
export const personas: Persona[] = [
  {
    id: "P-001",
    name: "Small Business Owner",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit", "YouTube", "Discord"],
    coreNeed: "业务自动化、省时省力",
    typicalQuote: "Anyone actually using AI agents in a small business?",
    useCaseCount: 45,
    coreUseCaseIds: [
      "UC-001", "UC-040", "UC-070", "UC-030", "UC-041",
      "UC-071", "UC-003", "UC-020"
    ],
    secondaryUseCaseIds: [
      "UC-010", "UC-050", "UC-163", "UC-290", "UC-021"
    ],
    sharedUseCaseIds: ["UC-010", "UC-020", "UC-090", "UC-100"],
    characteristics: {
      title: "小企业主/个体创业者",
      painPoints: [
        "时间不足，需要同时处理多个业务",
        "缺乏技术团队，需要易于使用的工具",
        "希望降低运营成本"
      ],
      goals: [
        "自动化重复性任务",
        "提高工作效率",
        "专注于业务增长"
      ],
      tools: [
        "邮件营销工具",
        "CRM系统",
        "电商平台"
      ]
    }
  },
  {
    id: "P-002",
    name: "Tech Lead",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/LocalLLM", "Discord", "HackerNews"],
    coreNeed: "开发效率、代码质量、团队协作",
    typicalQuote: "How are people handling persistent memory for AI agents?",
    useCaseCount: 38,
    coreUseCaseIds: [
      "UC-100", "UC-090", "UC-021", "UC-102",
      "UC-020", "UC-051", "UC-101"
    ],
    secondaryUseCaseIds: [
      "UC-103", "UC-110", "UC-110", "UC-163"
    ],
    sharedUseCaseIds: ["UC-001", "UC-090", "UC-020"],
    characteristics: {
      title: "技术团队负责人",
      painPoints: [
        "代码审查耗时",
        "团队协作效率低",
        "技术债务累积"
      ],
      goals: [
        "提高代码质量",
        "优化开发流程",
        "构建可维护的系统"
      ],
      tools: [
        "GitHub/GitLab",
        "CI/CD工具",
        "监控系统"
      ]
    }
  },
  {
    id: "P-003",
    name: "Marketing Specialist",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit r/DigitalMarketing", "YouTube", "Twitter"],
    coreNeed: "内容创作、社媒运营、竞品洞察",
    typicalQuote: "How are you actually using AI agents in your marketing?",
    useCaseCount: 32,
    coreUseCaseIds: [
      "UC-030", "UC-031", "UC-050", "UC-052"
    ],
    secondaryUseCaseIds: [
      "UC-032", "UC-041", "UC-053", "UC-040", "UC-071"
    ],
    sharedUseCaseIds: ["UC-001", "UC-030", "UC-040"],
    characteristics: {
      title: "营销/增长专家",
      painPoints: [
        "内容创作效率低",
        "社媒管理耗时",
        "难以跟踪竞品动态"
      ],
      goals: [
        "自动化内容创作",
        "提高社媒互动",
        "获取竞品洞察"
      ],
      tools: [
        "社媒管理工具",
        "内容日历",
        "分析平台"
      ]
    }
  },
  {
    id: "P-004",
    name: "Product Manager",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/ProductManagement", "Discord", "Zhihu"],
    coreNeed: "用户洞察、竞品分析、数据驱动决策",
    typicalQuote: "How to systematically collect user feedback?",
    useCaseCount: 28,
    coreUseCaseIds: [
      "UC-053", "UC-050", "UC-296", "UC-051"
    ],
    secondaryUseCaseIds: [
      "UC-290", "UC-163", "UC-119", "UC-030"
    ],
    sharedUseCaseIds: ["UC-040", "UC-070", "UC-090"],
    characteristics: {
      title: "产品经理",
      painPoints: [
        "用户反馈收集困难",
        "竞品信息获取不及时",
        "数据分散难以分析"
      ],
      goals: [
        "理解用户需求",
        "跟踪市场动态",
        "基于数据决策"
      ],
      tools: [
        "产品分析工具",
        "用户调研平台",
        "竞品监控"
      ]
    }
  },
  {
    id: "P-005",
    name: "Finance Analyst",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit r/investing", "Zhihu"],
    coreNeed: "费用控制、财务分析、风险预警",
    typicalQuote: "We built OpenClaw for finance",
    useCaseCount: 22,
    coreUseCaseIds: [
      "UC-060", "UC-061", "UC-300", "UC-295"
    ],
    secondaryUseCaseIds: [
      "UC-238", "UC-164"
    ],
    sharedUseCaseIds: ["UC-071", "UC-051"],
    characteristics: {
      title: "财务/运营分析师",
      painPoints: [
        "手动处理报销耗时",
        "费用异常难以及时发现",
        "财务报告生成繁琐"
      ],
      goals: [
        "自动化财务流程",
        "实时风险预警",
        "提高分析效率"
      ],
      tools: [
        "ERP系统",
        "财务分析工具",
        "报表系统"
      ]
    }
  },
  {
    id: "P-006",
    name: "Indie Developer",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/SideProject", "r/openclaw", "HackerNews"],
    coreNeed: "快速开发、自动化、一人全栈",
    typicalQuote: "Show HN: Run, build, and govern AI agent workflows",
    useCaseCount: 35,
    coreUseCaseIds: [
      "UC-010", "UC-103", "UC-110", "UC-020",
      "UC-090", "UC-133", "UC-135"
    ],
    secondaryUseCaseIds: [
      "UC-101", "UC-089", "UC-133"
    ],
    sharedUseCaseIds: ["UC-100", "UC-088"],
    characteristics: {
      title: "独立开发者",
      painPoints: [
        "资源有限，需要全栈能力",
        "希望快速验证想法",
        "运维工作繁重"
      ],
      goals: [
        "快速构建产品",
        "自动化部署运维",
        "提高开发效率"
      ],
      tools: [
        "云平台",
        "开源工具",
        "自动化脚本"
      ]
    }
  },
  {
    id: "P-007",
    name: "Chinese Content Creator",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Xiaohongshu", "Douyin", "Bilibili", "Zhihu"],
    coreNeed: "内容自动化、社媒运营、电商变现",
    typicalQuote: "关于电商工作流配置的系统检索结果",
    useCaseCount: 25,
    coreUseCaseIds: [
      "UC-070", "UC-030", "UC-081", "UC-261"
    ],
    secondaryUseCaseIds: [
      "UC-232", "UC-031", "UC-050"
    ],
    sharedUseCaseIds: ["UC-040", "UC-158"],
    characteristics: {
      title: "中文内容创作者",
      painPoints: [
        "多平台内容分发困难",
        "电商运营效率低",
        "缺乏技术背景"
      ],
      goals: [
        "自动化内容发布",
        "提高电商运营效率",
        "多渠道变现"
      ],
      tools: [
        "社媒管理工具",
        "电商平台",
        "内容创作工具"
      ]
    }
  },
  {
    id: "P-008",
    name: "DevOps Engineer",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/devops", "Discord", "HackerNews"],
    coreNeed: "系统监控、自动化运维、安全合规",
    typicalQuote: "How are you evaluating tool-calling AI agents before production?",
    useCaseCount: 30,
    coreUseCaseIds: [
      "UC-089", "UC-181", "UC-227", "UC-070"
    ],
    secondaryUseCaseIds: [
      "UC-295", "UC-051", "UC-133"
    ],
    sharedUseCaseIds: ["UC-163", "UC-020"],
    characteristics: {
      title: "DevOps/平台工程师",
      painPoints: [
        "系统故障排查困难",
        "安全漏洞监控不足",
        "运维工作重复性高"
      ],
      goals: [
        "自动化运维流程",
        "实时安全监控",
        "提高系统可靠性"
      ],
      tools: [
        "容器编排",
        "监控工具",
        "CI/CD"
      ]
    }
  },
  {
    id: "P-009",
    name: "Remote Productivity Seeker",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit r/overemployed", "r/AiForSmallBusiness"],
    coreNeed: "效率提升、远程协作、自动化",
    typicalQuote: "Using AI to improve productivity? More tips?",
    useCaseCount: 40,
    coreUseCaseIds: [
      "UC-001", "UC-146", "UC-121", "UC-085"
    ],
    secondaryUseCaseIds: [
      "UC-088", "UC-071", "UC-030"
    ],
    sharedUseCaseIds: ["UC-010", "UC-133"],
    characteristics: {
      title: "远程工作/效率追求者",
      painPoints: [
        "远程工作效率低",
        "多任务管理困难",
        "协作沟通成本高"
      ],
      goals: [
        "提高工作效率",
        "自动化重复任务",
        "优化时间管理"
      ],
      tools: [
        "效率工具",
        "协作平台",
        "自动化脚本"
      ]
    }
  },
  {
    id: "P-010",
    name: "Enterprise IT Admin",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/sysadmin", "Discord", "HackerNews"],
    coreNeed: "企业级自动化、安全合规、成本优化",
    typicalQuote: "95% of enterprises running AI agents have already had a serious incident",
    useCaseCount: 20,
    coreUseCaseIds: [
      "UC-290", "UC-300", "UC-089", "UC-163"
    ],
    secondaryUseCaseIds: [
      "UC-295", "UC-051", "UC-181"
    ],
    sharedUseCaseIds: ["UC-020", "UC-110"],
    characteristics: {
      title: "企业IT管理员",
      painPoints: [
        "合规要求严格",
        "成本控制压力大",
        "系统安全风险高"
      ],
      goals: [
        "确保安全合规",
        "优化成本结构",
        "提高运维效率"
      ],
      tools: [
        "企业级监控",
        "合规平台",
        "成本分析工具"
      ]
    }
  },
  {
    id: "P-011",
    name: "Researcher",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/LocalLLaMA", "YouTube", "HackerNews"],
    coreNeed: "深度研究、竞品分析、知识管理",
    typicalQuote: "Open Source Deep Research Platform - beats OpenAI",
    useCaseCount: 18,
    coreUseCaseIds: [
      "UC-296", "UC-229", "UC-233", "UC-119"
    ],
    secondaryUseCaseIds: [
      "UC-053", "UC-052", "UC-051"
    ],
    sharedUseCaseIds: ["UC-050", "UC-030"],
    characteristics: {
      title: "研究者/分析师",
      painPoints: [
        "信息收集耗时",
        "难以整合多源数据",
        "研究报告生成繁琐"
      ],
      goals: [
        "自动化研究流程",
        "深度竞品分析",
        "知识系统化"
      ],
      tools: [
        "研究工具",
        "数据分析",
        "知识库"
      ]
    }
  },
  {
    id: "P-012",
    name: "Customer Success Manager",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit r/CustomerSuccess", "Discord"],
    coreNeed: "客户健康监控、续约管理、支持自动化",
    typicalQuote: "客户续约风险想提前预警, 能Monitoring吗?",
    useCaseCount: 15,
    coreUseCaseIds: [
      "UC-290", "UC-163", "UC-234"
    ],
    secondaryUseCaseIds: [
      "UC-053", "UC-300"
    ],
    sharedUseCaseIds: ["UC-041", "UC-040", "UC-070"],
    characteristics: {
      title: "客户成功经理",
      painPoints: [
        "客户流失难以预测",
        "支持工单处理耗时",
        "跨部门协作困难"
      ],
      goals: [
        "预测客户风险",
        "自动化支持流程",
        "提高续约率"
      ],
      tools: [
        "CRM系统",
        "客户成功平台",
        "工单系统"
      ]
    }
  },
  {
    id: "P-013",
    name: "Crypto Trader",
    knowledgeLevel: "intermediate",
    primaryPlatforms: ["Reddit r/CryptoMoonShots", "r/investing"],
    coreNeed: "自动交易、风险管理、市场监控",
    typicalQuote: "Can I use openclaw to automatically trade stocks?",
    useCaseCount: 10,
    coreUseCaseIds: [
      "UC-238", "UC-164"
    ],
    secondaryUseCaseIds: [
      "UC-295"
    ],
    sharedUseCaseIds: ["UC-061"],
    characteristics: {
      title: "加密货币/交易者",
      painPoints: [
        "市场波动难预测",
        "交易机会稍纵即逝",
        "风险管理复杂"
      ],
      goals: [
        "自动化交易",
        "实时风险监控",
        "提高交易收益"
      ],
      tools: [
        "交易平台",
        "数据分析",
        "预警系统"
      ]
    }
  },
  {
    id: "P-014",
    name: "Open Source Contributor",
    knowledgeLevel: "expert",
    primaryPlatforms: ["Reddit r/OpenClawInstall", "GitHub", "Discord"],
    coreNeed: "代码贡献、社区协作、工具链集成",
    typicalQuote: "TraderAlice just open-sourced their entire trading agent engine",
    useCaseCount: 22,
    coreUseCaseIds: [
      "UC-100", "UC-293", "UC-088", "UC-102"
    ],
    secondaryUseCaseIds: [
      "UC-020", "UC-090"
    ],
    sharedUseCaseIds: ["UC-110", "UC-089"],
    characteristics: {
      title: "开源贡献者",
      painPoints: [
        "代码审查耗时",
        "社区协作困难",
        "项目文档不全"
      ],
      goals: [
        "提高代码质量",
        "促进社区协作",
        "构建工具生态"
      ],
      tools: [
        "GitHub/GitLab",
        "CI/CD",
        "社区工具"
      ]
    }
  },
  // === Overseas-focused Personas (from HN/Reddit cluster analysis) ===
  {
    id: "P-015",
    name: "AI Security Researcher",
    knowledgeLevel: "expert",
    primaryPlatforms: ["HackerNews", "Reddit r/netsec", "GitHub"],
    coreNeed: "Agent runtime security, permission auditing, threat modeling",
    typicalQuote: "I ignored all red flags to give OpenClaw root access to my life. What are y'all ACTUALLY using it for?",
    useCaseCount: 12,
    coreUseCaseIds: [
      "UC-110", "UC-111", "UC-121"
    ],
    secondaryUseCaseIds: [
      "UC-081", "UC-089", "UC-020"
    ],
    sharedUseCaseIds: ["UC-100", "UC-090"],
    characteristics: {
      title: "AI安全研究员",
      painPoints: [
        "Agent权限边界不清晰",
        "技能市场存在恶意插件",
        "运行时安全难以监控"
      ],
      goals: [
        "建立Agent安全审计框架",
        "识别潜在攻击向量",
        "设计安全隔离机制"
      ],
      tools: [
        "Security scanners",
        "Sandbox environments",
        "Audit logging systems"
      ]
    }
  },
  {
    id: "P-016",
    name: "Agent Architect",
    knowledgeLevel: "expert",
    primaryPlatforms: ["HackerNews", "Reddit r/LocalLLaMA", "Discord"],
    coreNeed: "Multi-agent protocol design, MCP routing, skill architecture",
    typicalQuote: "How are people handling persistent memory for AI agents?",
    useCaseCount: 18,
    coreUseCaseIds: [
      "UC-020", "UC-021", "UC-090"
    ],
    secondaryUseCaseIds: [
      "UC-091", "UC-022", "UC-103"
    ],
    sharedUseCaseIds: ["UC-010", "UC-100", "UC-082"],
    characteristics: {
      title: "Agent系统架构师",
      painPoints: [
        "多Agent协作协议复杂",
        "上下文传递机制不明确",
        "Skill-MCP-LLM路由效率低"
      ],
      goals: [
        "设计高效的Agent协作架构",
        "优化上下文管理机制",
        "标准化Skill接口协议"
      ],
      tools: [
        "Protocol analyzers",
        "Architecture diagrams",
        "Performance profilers"
      ]
    }
  },
  {
    id: "P-017",
    name: "AI Startup Founder",
    knowledgeLevel: "expert",
    primaryPlatforms: ["HackerNews", "Reddit r/SideProject", "Twitter"],
    coreNeed: "AI agent economic system, product-market fit, rapid prototyping",
    typicalQuote: "Show HN: A platform that creates AI Agents using 'job descriptions'",
    useCaseCount: 15,
    coreUseCaseIds: [
      "UC-122", "UC-040", "UC-032"
    ],
    secondaryUseCaseIds: [
      "UC-022", "UC-050", "UC-053"
    ],
    sharedUseCaseIds: ["UC-030", "UC-010", "UC-020"],
    characteristics: {
      title: "AI创业公司创始人",
      painPoints: [
        "需要快速验证产品假设",
        "多Agent经济系统复杂",
        "资源有限需要全栈能力"
      ],
      goals: [
        "构建可落地的AI产品",
        "设计Agent经济激励机制",
        "快速迭代验证PMF"
      ],
      tools: [
        "Rapid prototyping tools",
        "MCP frameworks",
        "Analytics platforms"
      ]
    }
  },
  {
    id: "P-018",
    name: "Observability Engineer",
    knowledgeLevel: "expert",
    primaryPlatforms: ["HackerNews", "Reddit r/devops", "GitHub"],
    coreNeed: "Agent debugging, testing framework, production monitoring",
    typicalQuote: "Debug, test, and evaluate AI agents in production",
    useCaseCount: 14,
    coreUseCaseIds: [
      "UC-120", "UC-081", "UC-101"
    ],
    secondaryUseCaseIds: [
      "UC-089", "UC-051", "UC-103"
    ],
    sharedUseCaseIds: ["UC-110", "UC-100", "UC-008"],
    characteristics: {
      title: "可观测性工程师",
      painPoints: [
        "Agent行为难以追踪",
        "缺乏标准化的测试框架",
        "生产环境故障诊断困难"
      ],
      goals: [
        "建立Agent可观测性平台",
        "设计自动化测试框架",
        "实现实时性能监控"
      ],
      tools: [
        "Observability platforms",
        "Tracing systems",
        "Test automation frameworks"
      ]
    }
  }
]

// Platform distribution
export const platformDistribution = [
  { platform: "Reddit", coverage: "All Personas", primaryPersonas: ["P-001", "P-002", "P-003", "P-006", "P-008", "P-009", "P-015", "P-016", "P-017"] },
  { platform: "中文平台(小红书/抖音/知乎/B站)", coverage: "E-commerce, Content", primaryPersonas: ["P-007"] },
  { platform: "Discord", coverage: "Technical Community", primaryPersonas: ["P-002", "P-008", "P-010", "P-014", "P-016"] },
  { platform: "YouTube", coverage: "Tutorials, Marketing", primaryPersonas: ["P-001", "P-003", "P-007", "P-011"] },
  { platform: "HackerNews", coverage: "Technical Deep Dive, Security, Architecture", primaryPersonas: ["P-002", "P-006", "P-008", "P-010", "P-011", "P-015", "P-016", "P-017", "P-018"] }
]

// Knowledge level distribution
export const knowledgeLevelDistribution = [
  { level: "Beginner", focus: "Business Automation, Email, E-commerce" },
  { level: "Intermediate", coverage: "Most Use Cases" },
  { level: "Expert", focus: "Memory Systems, Security, DevOps, Multi-agent" }
]

// Shared Use Cases (used by 3+ personas)
export const sharedUseCases = [
  { useCaseId: "UC-001", useCaseName: "Email Classification", personas: ["P-001", "P-009", "P-003", "P-012"] },
  { useCaseId: "UC-010", useCaseName: "Browser Automation", personas: ["P-001", "P-002", "P-006", "P-009", "P-017"] },
  { useCaseId: "UC-020", useCaseName: "Multi-Agent Configuration", personas: ["P-002", "P-006", "P-010", "P-014", "P-016", "P-017"] },
  { useCaseId: "UC-030", useCaseName: "Content Calendar", personas: ["P-003", "P-007", "P-001", "P-011", "P-017"] },
  { useCaseId: "UC-040", useCaseName: "Cold Outreach", personas: ["P-001", "P-003", "P-012", "P-007", "P-017"] },
  { useCaseId: "UC-050", useCaseName: "Competitor Monitoring", personas: ["P-004", "P-003", "P-011", "P-007", "P-017"] },
  { useCaseId: "UC-070", useCaseName: "E-commerce Operations", personas: ["P-001", "P-007", "P-012", "P-003"] },
  { useCaseId: "UC-090", useCaseName: "Memory System", personas: ["P-002", "P-006", "P-014", "P-016"] },
  { useCaseId: "UC-163", useCaseName: "Support Automation", personas: ["P-012", "P-001", "P-010", "P-008"] },
  // New overseas-focused shared use cases
  { useCaseId: "UC-110", useCaseName: "Security Protocol Design", personas: ["P-008", "P-002", "P-015", "P-018"] },
  { useCaseId: "UC-100", useCaseName: "Code Review Automation", personas: ["P-002", "P-006", "P-014", "P-015", "P-018"] },
  { useCaseId: "UC-089", useCaseName: "System Monitoring", personas: ["P-008", "P-010", "P-015", "P-018"] }
]

// Get persona by ID
export function getPersonaById(id: string): Persona | undefined {
  return personas.find(p => p.id === id)
}

// Get personas by knowledge level
export function getPersonasByKnowledgeLevel(level: "beginner" | "intermediate" | "expert"): Persona[] {
  return personas.filter(p => p.knowledgeLevel === level)
}

// Get personas by platform
export function getPersonasByPlatform(platform: string): Persona[] {
  return personas.filter(p =>
    p.primaryPlatforms.some(plat =>
      plat.toLowerCase().includes(platform.toLowerCase())
    )
  )
}

// Get use case relationship strength between two personas
export function getPersonaRelationship(p1: string, p2: string): {
  sharedCore: number
  sharedSecondary: number
  sharedTotal: number
  strength: "weak" | "medium" | "strong"
} {
  const persona1 = getPersonaById(p1)
  const persona2 = getPersonaById(p2)

  if (!persona1 || !persona2) {
    return { sharedCore: 0, sharedSecondary: 0, sharedTotal: 0, strength: "weak" }
  }

  const sharedCore = persona1.coreUseCaseIds.filter(id =>
    persona2.coreUseCaseIds.includes(id)
  ).length

  const sharedSecondary = persona1.secondaryUseCaseIds.filter(id =>
    persona2.secondaryUseCaseIds.includes(id)
  ).length

  const sharedTotal = sharedCore + sharedSecondary

  let strength: "weak" | "medium" | "strong" = "weak"
  if (sharedTotal >= 5) strength = "strong"
  else if (sharedTotal >= 2) strength = "medium"

  return { sharedCore, sharedSecondary, sharedTotal, strength }
}

// Get persona network (personas with shared use cases)
export function getPersonaNetwork(personaId: string): {
  persona: Persona
  strength: "weak" | "medium" | "strong"
  sharedUseCases: string[]
}[] {
  const target = getPersonaById(personaId)
  if (!target) return []

  return personas
    .filter(p => p.id !== personaId)
    .map(p => {
      const allUC1 = [...target.coreUseCaseIds, ...target.secondaryUseCaseIds]
      const allUC2 = [...p.coreUseCaseIds, ...p.secondaryUseCaseIds]
      const shared = allUC1.filter(id => allUC2.includes(id))

      let strength: "weak" | "medium" | "strong" = "weak"
      if (shared.length >= 5) strength = "strong"
      else if (shared.length >= 2) strength = "medium"

      return { persona: p, strength, sharedUseCases: shared }
    })
    .filter(n => n.sharedUseCases.length > 0)
    .sort((a, b) => b.sharedUseCases.length - a.sharedUseCases.length)
}
