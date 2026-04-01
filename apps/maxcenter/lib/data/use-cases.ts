import { UseCase } from "./types"

// Use Cases generated from hierarchical clustering analysis (35 use case clusters from 348 bench tasks)
export const useCases: UseCase[] = [
  // Email Automation (consolidated from UC-001, UC-002, UC-003)
  {
    id: 'UC-001',
    name: '邮件自动化处理',
    domain: ['Business-Operations'],
    difficulty: 'Intermediate',
    skills: ['Analysis', 'Communication', 'Writing'],
    background: {
      who: '小企业主、销售团队和客户支持',
      when: '日常邮件管理期间',
      where: '分布式办公环境',
      what: '智能邮件分类、自动回复和工单处理',
      need: '减少收件箱过载，自动化常规邮件沟通'
    },
    duration: { product: 50, technology: 100 },
    userVoices: [
      {
        id: 'uv-001',
        quote: '邮件分类和自动回复真是改变游戏规则，每周都能节省好几个小时。',
        author: { name: '小企业主', role: '创始人', profileUrl: '#' }
      }
    ],
    score: { value: 82, type: 'benchmark', date: '2026-03-15' },
    tech: { tokens: 450000, environment: 'Node.js, OpenAI API', metrics: { accuracy: 87.5, latency_ms: 180, throughput: 3500 } },
    comments: [],
    relatedBenchTasks: ['task_146', 'task_174', 'task_234']
  },

  // Browser Automation
  {
    id: 'UC-010',
    name: '网页数据抓取与表单填写',
    domain: ['Software-Engineering'],
    difficulty: 'Advanced',
    skills: ['Coding', 'Analysis'],
    background: {
      who: '开发者和自动化工程师',
      when: '数据收集任务期间',
      where: '科技公司',
      what: '自动化网页抓取和表单交互系统',
      need: '大规模收集数据，无需人工干预'
    },
    duration: { product: 80, technology: 140 },
    userVoices: [
      {
        id: 'uv-010',
        quote: '浏览器自动化是我首先设置的。每周都能节省好几个小时。',
        author: { name: '技术负责人', role: '高级开发者', profileUrl: '#' }
      }
    ],
    score: { value: 87, type: 'benchmark', date: '2026-03-08' },
    tech: { tokens: 520000, environment: 'Python, Selenium, Docker', metrics: { accuracy: 91.4, latency_ms: 230, throughput: 450 } },
    comments: [],
    relatedBenchTasks: ['task_135']
  },
  {
    id: 'UC-011',
    name: '登录与导航自动化',
    domain: ['Software-Engineering'],
    difficulty: 'Intermediate',
    skills: ['Coding'],
    background: {
      who: 'DevOps工程师和QA团队',
      when: '测试和部署期间',
      where: 'CI/CD流水线',
      what: '自动化认证和导航工作流',
      need: '简化测试流程，减少手动登录步骤'
    },
    duration: { product: 40, technology: 70 },
    userVoices: [
      {
        id: 'uv-011',
        quote: '自动化登录流程让我们的测试速度提升了3倍。',
        author: { name: 'DevOps工程师', role: '平台工程师', profileUrl: '#' }
      }
    ],
    score: { value: 79, type: 'benchmark', date: '2026-03-14' },
    tech: { tokens: 320000, environment: 'Node.js, Playwright', metrics: { accuracy: 88.7, latency_ms: 150, throughput: 1200 } },
    comments: [],
    relatedBenchTasks: ['task_133']
  },

  // Multi-Agent Workflow
  {
    id: 'UC-020',
    name: '多智能体配置与协调',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Design', 'Analysis'],
    background: {
      who: 'AI架构师和平台工程师',
      when: '系统设计期间',
      where: '企业环境',
      what: '多个AI智能体协同工作的配置和编排',
      need: '为复杂工作流构建可扩展的多智能体系统'
    },
    duration: { product: 200, technology: 320 },
    userVoices: [
      {
        id: 'uv-020',
        quote: '大家是怎么处理AI智能体的持久化内存的？多智能体协调是关键。',
        author: { name: '智能体架构师', role: 'AI工程师', profileUrl: '#' }
      }
    ],
    score: { value: 92, type: 'benchmark', date: '2026-03-11' },
    tech: { tokens: 4100000, environment: 'Kubernetes, Python, Redis', metrics: { accuracy: 94.2, latency_ms: 300, throughput: 800 } },
    comments: [],
    relatedBenchTasks: ['task_076', 'task_145']
  },
  {
    id: 'UC-021',
    name: '上下文共享与隔离',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Design'],
    background: {
      who: '系统架构师和后端工程师',
      when: '智能体状态管理期间',
      where: '分布式系统',
      what: '在适当的隔离边界下安全地在智能体之间共享上下文',
      need: '在保持安全和隐私的同时实现协作'
    },
    duration: { product: 160, technology: 240 },
    userVoices: [
      {
        id: 'uv-021',
        quote: '上下文隔离对多智能体安全至关重要。',
        author: { name: '安全研究员', role: 'AI安全专家', profileUrl: '#' }
      }
    ],
    score: { value: 88, type: 'benchmark', date: '2026-03-13' },
    tech: { tokens: 1680000, environment: 'AWS Lambda, FHIR API', metrics: { accuracy: 89.2, latency_ms: 180, throughput: 15000 } },
    comments: [],
    relatedBenchTasks: ['task_228']
  },
  {
    id: 'UC-022',
    name: '自主执行框架',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis', 'Design'],
    background: {
      who: 'AI初创公司创始人和独立开发者',
      when: '产品开发期间',
      where: '初创公司环境',
      what: '构建自主AI智能体系统的框架',
      need: '最小化常规任务执行中的人工干预'
    },
    duration: { product: 180, technology: 280 },
    userVoices: [
      {
        id: 'uv-022',
        quote: 'Show HN: 自主运行、构建和管理AI智能体工作流。',
        author: { name: '独立开发者', role: '创始人', profileUrl: '#' }
      }
    ],
    score: { value: 89, type: 'benchmark', date: '2026-03-09' },
    tech: { tokens: 3800000, environment: 'Kubernetes, TensorFlow Serving', metrics: { accuracy: 91.4, latency_ms: 45, throughput: 2500 } },
    comments: [],
    relatedBenchTasks: ['task_133']
  },

  // Content & Marketing
  {
    id: 'UC-030',
    name: '内容日历规划',
    domain: ['Marketing'],
    difficulty: 'Intermediate',
    skills: ['Design', 'Communication'],
    background: {
      who: '营销专员和内容创作者',
      when: '营销活动规划期间',
      where: '营销团队',
      what: 'AI驱动的内容排期和日历优化',
      need: '在多个平台保持一致的发布计划'
    },
    duration: { product: 60, technology: 100 },
    userVoices: [
      {
        id: 'uv-030',
        quote: '你们是怎么在营销中使用AI智能体的？内容日历是必不可少的。',
        author: { name: '营销专员', role: '增长负责人', profileUrl: '#' }
      }
    ],
    score: { value: 84, type: 'benchmark', date: '2026-03-16' },
    tech: { tokens: 620000, environment: 'Node.js, PostgreSQL', metrics: { accuracy: 87.5, latency_ms: 120, throughput: 1800 } },
    comments: [],
    relatedBenchTasks: ['task_261']
  },
  {
    id: 'UC-031',
    name: 'B2B内容营销策略',
    domain: ['Marketing'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Writing', 'Communication'],
    background: {
      who: 'B2B营销团队',
      when: '策略制定期间',
      where: '企业营销部门',
      what: '面向B2B受众的战略内容规划',
      need: '产生潜在客户并建立思想领导力'
    },
    duration: { product: 100, technology: 160 },
    userVoices: [
      {
        id: 'uv-031',
        quote: 'B2B内容自动化让我们的合格潜在客户增加了3倍。',
        author: { name: '营销总监', role: '营销副总裁', profileUrl: '#' }
      }
    ],
    score: { value: 86, type: 'benchmark', date: '2026-03-12' },
    tech: { tokens: 1200000, environment: 'Python, HubSpot API', metrics: { accuracy: 90.1, latency_ms: 200, throughput: 1200 } },
    comments: [],
    relatedBenchTasks: ['task_232']
  },
  {
    id: 'UC-032',
    name: '博客发布流水线',
    domain: ['Software-Engineering', 'Marketing'],
    difficulty: 'Intermediate',
    skills: ['Writing', 'Coding'],
    background: {
      who: '内容团队和独立开发者',
      when: '内容生产期间',
      where: '远程内容团队',
      what: '端到端博客创作和发布自动化',
      need: '在不牺牲质量的前提下扩大内容生产规模'
    },
    duration: { product: 70, technology: 120 },
    userVoices: [
      {
        id: 'uv-032',
        quote: '自动发布让我们的产出增加了5倍。',
        author: { name: '内容经理', role: '编辑', profileUrl: '#' }
      }
    ],
    score: { value: 81, type: 'benchmark', date: '2026-03-18' },
    tech: { tokens: 450000, environment: 'Next.js, Markdown', metrics: { accuracy: 86.8, latency_ms: 150, throughput: 2000 } },
    comments: [],
    relatedBenchTasks: ['task_158']
  },

  // Sales & CRM
  {
    id: 'UC-040',
    name: '冷启动外联活动',
    domain: ['Business-Operations'],
    difficulty: 'Intermediate',
    skills: ['Communication', 'Writing'],
    background: {
      who: '销售开发代表',
      when: '潜在客户挖掘期间',
      where: '销售团队',
      what: '大规模自动化个性化外联',
      need: '在保持个性化的同时提高回复率'
    },
    duration: { product: 50, technology: 90 },
    userVoices: [
      {
        id: 'uv-040',
        quote: 'AI个性化外联让我们的会议预约量翻了一番。',
        author: { name: 'SDR', role: '销售代表', profileUrl: '#' }
      }
    ],
    score: { value: 83, type: 'benchmark', date: '2026-03-15' },
    tech: { tokens: 380000, environment: 'Salesforce, OpenAI', metrics: { accuracy: 87.2, latency_ms: 180, throughput: 1500 } },
    comments: [],
    relatedBenchTasks: ['task_231']
  },
  {
    id: 'UC-041',
    name: '潜在客户生成与培育',
    domain: ['Business-Operations'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Communication', 'Coding'],
    background: {
      who: '增长团队和销售运营',
      when: '漏斗优化期间',
      where: '增长营销',
      what: '自动化潜在客户识别和培育工作流',
      need: '无需人工干预即可筛选和培育潜在客户'
    },
    duration: { product: 120, technology: 200 },
    userVoices: [
      {
        id: 'uv-041',
        quote: '自动化潜在客户培育让我们的转化率提高了40%。',
        author: { name: '增长经理', role: '增长负责人', profileUrl: '#' }
      }
    ],
    score: { value: 88, type: 'benchmark', date: '2026-03-11' },
    tech: { tokens: 950000, environment: 'HubSpot, Python', metrics: { accuracy: 91.5, latency_ms: 220, throughput: 1000 } },
    comments: [],
    relatedBenchTasks: ['task_169']
  },
  {
    id: 'UC-042',
    name: '续约风险监控',
    domain: ['Business-Operations'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Coding'],
    background: {
      who: '客户成功经理',
      when: '账户审核期间',
      where: 'SaaS公司',
      what: 'AI驱动的流失预测和干预',
      need: '主动识别并挽救有风险的账户'
    },
    duration: { product: 80, technology: 140 },
    userVoices: [
      {
        id: 'uv-042',
        quote: '客户续约风险想提前预警，能监控吗？AI预测至关重要。',
        author: { name: 'CS经理', role: '客户成功', profileUrl: '#' }
      }
    ],
    score: { value: 90, type: 'benchmark', date: '2026-03-10' },
    tech: { tokens: 720000, environment: 'Python, Scikit-learn', metrics: { accuracy: 93.1, latency_ms: 200, throughput: 800 } },
    comments: [],
    relatedBenchTasks: ['task_290']
  },

  // Data Analysis & Research
  {
    id: 'UC-050',
    name: '竞品研究与监控',
    domain: ['Business-Operations'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Writing'],
    background: {
      who: '产品经理和市场研究员',
      when: '战略规划期间',
      where: '产品团队',
      what: '自动化竞品追踪和分析',
      need: '自动了解市场动态'
    },
    duration: { product: 100, technology: 180 },
    userVoices: [
      {
        id: 'uv-050',
        quote: '如何系统性地收集用户反馈？竞品监控是其中一部分。',
        author: { name: '产品经理', role: 'PM', profileUrl: '#' }
      }
    ],
    score: { value: 85, type: 'benchmark', date: '2026-03-14' },
    tech: { tokens: 580000, environment: 'Python, Scrapy', metrics: { accuracy: 88.9, latency_ms: 250, throughput: 600 } },
    comments: [],
    relatedBenchTasks: ['task_229', 'task_233', 'task_296']
  },
  {
    id: 'UC-051',
    name: '使用模式分析与优化',
    domain: ['Data-Science'],
    difficulty: 'Expert',
    skills: ['Analysis', 'Coding'],
    background: {
      who: '数据科学家和产品分析师',
      when: '产品优化期间',
      where: '分析团队',
      what: '用户行为模式的深度分析',
      need: '从使用数据中识别优化机会'
    },
    duration: { product: 140, technology: 240 },
    userVoices: [
      {
        id: 'uv-051',
        quote: '使用模式分析揭示了我们从未知道的洞察。',
        author: { name: '数据科学家', role: '分析负责人', profileUrl: '#' }
      }
    ],
    score: { value: 91, type: 'benchmark', date: '2026-03-09' },
    tech: { tokens: 1450000, environment: 'Python, Pandas, TensorFlow', metrics: { accuracy: 94.5, latency_ms: 300, throughput: 400 } },
    comments: [],
    relatedBenchTasks: ['task_118', 'task_295']
  },
  {
    id: 'UC-052',
    name: '社交媒体趋势研究',
    domain: ['Scientific-Research', 'Marketing'],
    difficulty: 'Intermediate',
    skills: ['Analysis', 'Communication'],
    background: {
      who: '营销研究员和策略师',
      when: '趋势分析期间',
      where: '社交媒体团队',
      what: 'AI驱动的社交趋势识别和分析',
      need: '在竞争对手之前抓住新兴趋势'
    },
    duration: { product: 60, technology: 100 },
    userVoices: [
      {
        id: 'uv-052',
        quote: '社交趋势研究让我们保持领先。',
        author: { name: '社交媒体经理', role: 'SMM', profileUrl: '#' }
      }
    ],
    score: { value: 79, type: 'benchmark', date: '2026-03-17' },
    tech: { tokens: 420000, environment: 'Python, NLP APIs', metrics: { accuracy: 85.7, latency_ms: 180, throughput: 900 } },
    comments: [],
    relatedBenchTasks: ['task_119']
  },
  {
    id: 'UC-053',
    name: '用户反馈收集系统',
    domain: ['Product-Management'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Communication'],
    background: {
      who: '产品经理和UX研究员',
      when: '产品开发期间',
      where: '产品团队',
      what: '系统化用户反馈收集和分析',
      need: '做出数据驱动的产品决策'
    },
    duration: { product: 90, technology: 160 },
    userVoices: [
      {
        id: 'uv-053',
        quote: '如何系统性地收集用户反馈？这个系统改变了我们的产品路线图。',
        author: { name: '产品经理', role: '高级PM', profileUrl: '#' }
      }
    ],
    score: { value: 87, type: 'benchmark', date: '2026-03-13' },
    tech: { tokens: 680000, environment: 'TypeScript, Airtable API', metrics: { accuracy: 89.8, latency_ms: 150, throughput: 1200 } },
    comments: [],
    relatedBenchTasks: ['task_236']
  },

  // Finance & Operations
  {
    id: 'UC-060',
    name: '费用异常检测',
    domain: ['Finance', 'Business-Operations'],
    difficulty: 'Expert',
    skills: ['Analysis', 'Coding'],
    background: {
      who: '财务分析师和财务主管',
      when: '费用审核期间',
      where: '财务部门',
      what: 'AI驱动的费用审计和异常检测',
      need: '自动发现错误和欺诈'
    },
    duration: { product: 120, technology: 200 },
    userVoices: [
      {
        id: 'uv-060',
        quote: '我们为财务领域开发了OpenClaw。费用检测是一个关键用例。',
        author: { name: '财务分析师', role: '财务主管', profileUrl: '#' }
      }
    ],
    score: { value: 93, type: 'benchmark', date: '2026-03-10' },
    tech: { tokens: 1120000, environment: 'Python, XGBoost', metrics: { accuracy: 95.8, latency_ms: 280, throughput: 500 } },
    comments: [],
    relatedBenchTasks: ['task_300']
  },
  {
    id: 'UC-061',
    name: '财务查询与报告',
    domain: ['Finance', 'Business-Operations'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Communication'],
    background: {
      who: '财务团队和高管',
      when: '报告周期期间',
      where: '财务部门',
      what: '自然语言财务报告和查询',
      need: '让财务数据访问更加民主化'
    },
    duration: { product: 100, technology: 180 },
    userVoices: [
      {
        id: 'uv-061',
        quote: '自然语言查询彻底改变了我们访问财务数据的方式。',
        author: { name: 'CFO', role: '财务负责人', profileUrl: '#' }
      }
    ],
    score: { value: 88, type: 'benchmark', date: '2026-03-12' },
    tech: { tokens: 850000, environment: 'Python, GPT-4, SQL', metrics: { accuracy: 91.2, latency_ms: 220, throughput: 700 } },
    comments: [],
    relatedBenchTasks: ['task_164']
  },
  {
    id: 'UC-062',
    name: 'AI交易信号生成',
    domain: ['Finance'],
    difficulty: 'Expert',
    skills: ['Analysis', 'Coding'],
    background: {
      who: '加密货币交易员和量化分析师',
      when: '交易时段',
      where: '交易台',
      what: 'AI驱动的交易信号和风险分析',
      need: '识别交易机会并管理风险'
    },
    duration: { product: 160, technology: 280 },
    userVoices: [
      {
        id: 'uv-062',
        quote: '我能用openclaw自动交易股票吗？信号生成是第一步。',
        author: { name: '加密货币交易员', role: '量化交易员', profileUrl: '#' }
      }
    ],
    score: { value: 86, type: 'benchmark', date: '2026-03-08' },
    tech: { tokens: 1380000, environment: 'Python, PyTorch', metrics: { accuracy: 87.5, latency_ms: 150, throughput: 2000 } },
    comments: [],
    relatedBenchTasks: ['task_238']
  },

  // E-commerce Operations
  {
    id: 'UC-070',
    name: '电商工作流配置',
    domain: ['E-commerce', 'Business-Operations'],
    difficulty: 'Intermediate',
    skills: ['Coding', 'Communication'],
    background: {
      who: '电商运营人员和卖家',
      when: '店铺管理期间',
      where: '在线零售',
      what: '自动化订单、库存和客户服务工作流',
      need: '在不按比例增加人手的情况下扩大运营规模'
    },
    duration: { product: 80, technology: 140 },
    userVoices: [
      {
        id: 'uv-070',
        quote: '关于电商工作流配置的系统检索结果 - 电商自动化是必不可少的。',
        author: { name: '电商卖家', role: '店主', profileUrl: '#' }
      }
    ],
    score: { value: 84, type: 'benchmark', date: '2026-03-15' },
    tech: { tokens: 520000, environment: 'Shopify API, Node.js', metrics: { accuracy: 88.3, latency_ms: 200, throughput: 1500 } },
    comments: [],
    relatedBenchTasks: ['task_081']
  },
  {
    id: 'UC-071',
    name: '每日销售报告生成',
    domain: ['Business-Operations'],
    difficulty: 'Beginner',
    skills: ['Analysis', 'Communication'],
    background: {
      who: '电商卖家和运营经理',
      when: '每日结束时',
      where: '在线业务',
      what: '自动化销售数据汇总和报告',
      need: '无需手动编译数据即可追踪业绩'
    },
    duration: { product: 30, technology: 50 },
    userVoices: [
      {
        id: 'uv-071',
        quote: '以前每日报告要花几个小时。现在都是自动的。',
        author: { name: '运营经理', role: '运营负责人', profileUrl: '#' }
      }
    ],
    score: { value: 81, type: 'benchmark', date: '2026-03-16' },
    tech: { tokens: 180000, environment: 'Python, Google Sheets API', metrics: { accuracy: 99.1, latency_ms: 120, throughput: 3000 } },
    comments: [],
    relatedBenchTasks: ['task_235']
  },
  {
    id: 'UC-072',
    name: '商品上架自动化',
    domain: ['E-commerce', 'Web-Operations'],
    difficulty: 'Intermediate',
    skills: ['Coding', 'Writing'],
    background: {
      who: '电商卖家',
      when: '目录更新期间',
      where: '在线市场',
      what: '自动化商品信息创建和发布',
      need: '高效扩大商品目录规模'
    },
    duration: { product: 60, technology: 100 },
    userVoices: [
      {
        id: 'uv-072',
        quote: '商品上架自动化让我们的目录规模扩大了10倍。',
        author: { name: '卖家', role: '电商店主', profileUrl: '#' }
      }
    ],
    score: { value: 83, type: 'benchmark', date: '2026-03-14' },
    tech: { tokens: 350000, environment: 'Python, OpenAI API', metrics: { accuracy: 86.7, latency_ms: 180, throughput: 1200 } },
    comments: [],
    relatedBenchTasks: ['task_180']
  },

  // Support Automation
  {
    id: 'UC-080',
    name: '工单自动分配与SLA追踪',
    domain: ['Business-Operations'],
    difficulty: 'Advanced',
    skills: ['Coding', 'Analysis'],
    background: {
      who: '支持经理和IT团队',
      when: '工单处理期间',
      where: '支持中心',
      what: '智能工单路由和SLA监控',
      need: '缩短响应时间并满足SLA'
    },
    duration: { product: 100, technology: 180 },
    userVoices: [
      {
        id: 'uv-080',
        quote: '自动分配让我们的响应时间缩短了70%。',
        author: { name: '支持经理', role: 'IT负责人', profileUrl: '#' }
      }
    ],
    score: { value: 89, type: 'benchmark', date: '2026-03-11' },
    tech: { tokens: 720000, environment: 'Zendesk API, Python', metrics: { accuracy: 92.4, latency_ms: 200, throughput: 900 } },
    comments: [],
    relatedBenchTasks: ['task_163']
  },
  {
    id: 'UC-081',
    name: '配置审计与故障排查',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis'],
    background: {
      who: 'DevOps工程师和SRE',
      when: '事件响应期间',
      where: '平台团队',
      what: '自动化配置审计和调试辅助',
      need: '减少MTTR并防止配置错误'
    },
    duration: { product: 140, technology: 240 },
    userVoices: [
      {
        id: 'uv-081',
        quote: '配置审计预防了很多次宕机。',
        author: { name: 'DevOps工程师', role: 'SRE', profileUrl: '#' }
      }
    ],
    score: { value: 92, type: 'benchmark', date: '2026-03-09' },
    tech: { tokens: 1100000, environment: 'Python, Kubernetes API', metrics: { accuracy: 94.1, latency_ms: 250, throughput: 600 } },
    comments: [],
    relatedBenchTasks: ['task_089']
  },
  {
    id: 'UC-082',
    name: '项目启动自动化',
    domain: ['Software-Engineering', 'Web-Operations'],
    difficulty: 'Intermediate',
    skills: ['Coding'],
    background: {
      who: '开发者和开源贡献者',
      when: '启动新项目时',
      where: '开发团队',
      what: '自动化项目设置和初始化',
      need: '标准化新项目创建'
    },
    duration: { product: 50, technology: 80 },
    userVoices: [
      {
        id: 'uv-082',
        quote: '项目启动自动化让每个新仓库都能节省数小时。',
        author: { name: '开发者', role: '工程师', profileUrl: '#' }
      }
    ],
    score: { value: 85, type: 'benchmark', date: '2026-03-13' },
    tech: { tokens: 280000, environment: 'Node.js, CLI tools', metrics: { accuracy: 97.5, latency_ms: 100, throughput: 2000 } },
    comments: [],
    relatedBenchTasks: ['task_077']
  },

  // Memory Management
  {
    id: 'UC-090',
    name: '持久化内存系统',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Design'],
    background: {
      who: 'AI架构师和开发者',
      when: '智能体开发期间',
      where: 'AI工程团队',
      what: '跨会话内存和状态持久化',
      need: '让智能体能够记住跨对话的上下文'
    },
    duration: { product: 200, technology: 320 },
    userVoices: [
      {
        id: 'uv-090',
        quote: '大家是怎么处理AI智能体的持久化内存的？这很关键。',
        author: { name: '技术负责人', role: 'AI架构师', profileUrl: '#' }
      }
    ],
    score: { value: 91, type: 'benchmark', date: '2026-03-10' },
    tech: { tokens: 1680000, environment: 'Python, Vector DB', metrics: { accuracy: 89.5, latency_ms: 180, throughput: 1200 } },
    comments: [],
    relatedBenchTasks: ['task_161']
  },
  {
    id: 'UC-091',
    name: '内存权重与优先级',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis', 'Design'],
    background: {
      who: 'AI研究员和工程师',
      when: '内存优化期间',
      where: 'AI实验室',
      what: '智能内存重要性排序和剪枝',
      need: '有效管理有限的上下文窗口'
    },
    duration: { product: 180, technology: 280 },
    userVoices: [
      {
        id: 'uv-091',
        quote: '内存权重优化是长期智能体性能的关键。',
        author: { name: 'AI研究员', role: '研究工程师', profileUrl: '#' }
      }
    ],
    score: { value: 87, type: 'benchmark', date: '2026-03-12' },
    tech: { tokens: 1250000, environment: 'Python, PyTorch', metrics: { accuracy: 88.2, latency_ms: 200, throughput: 800 } },
    comments: [],
    relatedBenchTasks: ['task_148']
  },

  // Coding & DevOps
  {
    id: 'UC-100',
    name: 'PR风险雷达分析',
    domain: ['DevRel', 'Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis'],
    background: {
      who: '工程经理和高级开发者',
      when: '代码审核期间',
      where: '开发团队',
      what: 'AI驱动的代码审核风险评估',
      need: '优先处理审核工作并发现关键问题'
    },
    duration: { product: 120, technology: 200 },
    userVoices: [
      {
        id: 'uv-100',
        quote: 'TraderAlice刚刚开源了他们的整个交易智能体引擎。PR分析至关重要。',
        author: { name: '开源贡献者', role: '维护者', profileUrl: '#' }
      }
    ],
    score: { value: 90, type: 'benchmark', date: '2026-03-11' },
    tech: { tokens: 980000, environment: 'GitHub API, Python', metrics: { accuracy: 93.7, latency_ms: 280, throughput: 500 } },
    comments: [],
    relatedBenchTasks: ['task_293']
  },
  {
    id: 'UC-101',
    name: '自动启动配置管理',
    domain: ['Software-Engineering'],
    difficulty: 'Intermediate',
    skills: ['Coding'],
    background: {
      who: 'DevOps工程师',
      when: '系统配置期间',
      where: '平台团队',
      what: '自动化服务启动和配置管理',
      need: '确保系统初始化的一致性'
    },
    duration: { product: 60, technology: 100 },
    userVoices: [
      {
        id: 'uv-101',
        quote: '自动启动配置消除了手动设置错误。',
        author: { name: 'DevOps工程师', role: '平台工程师', profileUrl: '#' }
      }
    ],
    score: { value: 86, type: 'benchmark', date: '2026-03-14' },
    tech: { tokens: 350000, environment: 'Ansible, Python', metrics: { accuracy: 96.8, latency_ms: 150, throughput: 1000 } },
    comments: [],
    relatedBenchTasks: ['task_070']
  },
  {
    id: 'UC-102',
    name: 'Git仓库语音摘要',
    domain: ['Productivity', 'Software-Engineering'],
    difficulty: 'Advanced',
    skills: ['Coding', 'Communication'],
    background: {
      who: '开发者和团队负责人',
      when: '每日站会期间',
      where: '远程团队',
      what: '基于语音的代码变更摘要',
      need: '在处理多任务时了解团队进展'
    },
    duration: { product: 80, technology: 140 },
    userVoices: [
      {
        id: 'uv-102',
        quote: '语音摘要帮助我在通勤时追踪变更。',
        author: { name: '开发者', role: '工程师', profileUrl: '#' }
      }
    ],
    score: { value: 84, type: 'benchmark', date: '2026-03-15' },
    tech: { tokens: 520000, environment: 'Node.js, TTS API', metrics: { accuracy: 88.9, latency_ms: 220, throughput: 700 } },
    comments: [],
    relatedBenchTasks: ['task_088']
  },
  {
    id: 'UC-103',
    name: 'API迁移与配置',
    domain: ['Software-Engineering'],
    difficulty: 'Advanced',
    skills: ['Coding', 'Analysis'],
    background: {
      who: 'API开发者和平台团队',
      when: 'API过渡期间',
      where: '工程团队',
      what: '自动化API迁移和配置管理',
      need: '简化破坏性变更和版本升级'
    },
    duration: { product: 100, technology: 180 },
    userVoices: [
      {
        id: 'uv-103',
        quote: 'API迁移自动化让我们的升级时间减少了80%。',
        author: { name: 'API开发者', role: '平台工程师', profileUrl: '#' }
      }
    ],
    score: { value: 88, type: 'benchmark', date: '2026-03-12' },
    tech: { tokens: 720000, environment: 'Node.js, OpenAPI', metrics: { accuracy: 91.3, latency_ms: 200, throughput: 600 } },
    comments: [],
    relatedBenchTasks: ['task_068']
  },

  // Security & Compliance
  {
    id: 'UC-110',
    name: '认证协议安全设计',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Design', 'Analysis'],
    background: {
      who: '安全工程师和架构师',
      when: '安全设计期间',
      where: '安全团队',
      what: 'JWT和认证协议安全设计',
      need: '确保稳健的认证和授权'
    },
    duration: { product: 180, technology: 280 },
    userVoices: [
      {
        id: 'uv-110',
        quote: '95%运行AI智能体的企业已经发生过严重事件。安全至关重要。',
        author: { name: '企业IT管理员', role: 'CISO', profileUrl: '#' }
      }
    ],
    score: { value: 94, type: 'benchmark', date: '2026-03-09' },
    tech: { tokens: 1450000, environment: 'Python, JWT libraries', metrics: { accuracy: 97.2, latency_ms: 180, throughput: 1500 } },
    comments: [],
    relatedBenchTasks: ['task_227']
  },
  {
    id: 'UC-111',
    name: '漏洞监控与告警',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis'],
    background: {
      who: '安全团队和DevOps',
      when: '持续监控期间',
      where: 'SOC和平台团队',
      what: '持续安全漏洞扫描和告警',
      need: '快速检测和响应威胁'
    },
    duration: { product: 160, technology: 260 },
    userVoices: [
      {
        id: 'uv-111',
        quote: '你是如何在生产环境前评估工具调用AI智能体的？安全监控至关重要。',
        author: { name: '安全研究员', role: '应用安全专家', profileUrl: '#' }
      }
    ],
    score: { value: 91, type: 'benchmark', date: '2026-03-10' },
    tech: { tokens: 1250000, environment: 'Python, Security scanners', metrics: { accuracy: 94.8, latency_ms: 250, throughput: 800 } },
    comments: [],
    relatedBenchTasks: ['task_181']
  },

  // === Overseas-focused Use Cases (from HN/Reddit cluster analysis) ===
  // 13. Agent Observability
  {
    id: 'UC-120',
    name: '智能体可观测性平台',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis', 'Design'],
    background: {
      who: '可观测性工程师和平台团队',
      when: '生产监控期间',
      where: '平台工程',
      what: '通过可解释性工具在生产环境中调试、测试和评估AI智能体',
      need: '理解智能体行为并排查生产环境问题'
    },
    duration: { product: 200, technology: 320 },
    userVoices: [
      {
        id: 'uv-120',
        quote: '在生产环境中调试、测试和评估AI智能体。我们需要可观测性。',
        author: { name: '可观测性工程师', role: 'SRE', profileUrl: '#' }
      }
    ],
    score: { value: 89, type: 'benchmark', date: '2026-03-08' },
    tech: { tokens: 1680000, environment: 'Python, OpenTelemetry', metrics: { accuracy: 90.5, latency_ms: 200, throughput: 1000 } },
    comments: [],
    relatedBenchTasks: ['C3-T1', 'task_089']
  },
  // 14. Security Audit
  {
    id: 'UC-121',
    name: '多智能体安全审计',
    domain: ['Software-Engineering'],
    difficulty: 'Expert',
    skills: ['Coding', 'Analysis', 'Design'],
    background: {
      who: 'AI安全研究员和审计师',
      when: '安全评估期间',
      where: '安全咨询',
      what: '针对智能体系统的运行时安全扫描、权限审计和威胁建模',
      need: '确保多智能体系统安全合规'
    },
    duration: { product: 240, technology: 380 },
    userVoices: [
      {
        id: 'uv-121',
        quote: '我无视所有红旗给OpenClaw root访问我生活的权限。安全审计是必须的。',
        author: { name: 'AI安全研究员', role: '安全工程师', profileUrl: '#' }
      }
    ],
    score: { value: 93, type: 'benchmark', date: '2026-03-09' },
    tech: { tokens: 2100000, environment: 'Python, Sandboxing', metrics: { accuracy: 95.2, latency_ms: 300, throughput: 400 } },
    comments: [],
    relatedBenchTasks: ['C12-T1', 'C12-T2', 'C18-T1']
  },
  // 15. AI Economic System
  {
    id: 'UC-122',
    name: 'AI智能体经济系统设计',
    domain: ['Business-Operations'],
    difficulty: 'Expert',
    skills: ['Analysis', 'Design', 'Coding'],
    background: {
      who: 'AI初创公司创始人和产品策略师',
      when: '产品设计期间',
      where: 'AI初创公司',
      what: '设计智能体信用机制、支付系统和多智能体经济框架',
      need: '为AI智能体生态系统创建可持续的商业模式'
    },
    duration: { product: 180, technology: 280 },
    userVoices: [
      {
        id: 'uv-122',
        quote: 'Show HN: 一个根据职位描述创建AI智能体的平台。经济设计是关键。',
        author: { name: 'AI初创公司创始人', role: 'CEO', profileUrl: '#' }
      }
    ],
    score: { value: 87, type: 'benchmark', date: '2026-03-11' },
    tech: { tokens: 1350000, environment: 'Solidity, Node.js', metrics: { accuracy: 88.7, latency_ms: 250, throughput: 600 } },
    comments: [],
    relatedBenchTasks: ['C21-T1', 'C21-T2']
  }
]
