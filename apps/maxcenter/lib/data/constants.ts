import {
  IconTool,
  IconPackage,
  IconUsers,
  IconCurrencyDollar,
  IconSearch,
} from "@tabler/icons-react"

// ============================================================================
// Customer Card Constants
// ============================================================================

export const CLUSTER_COLORS: Record<number, string> = {
  0: "text-blue-500",
  1: "text-green-500",
  2: "text-purple-500",
  3: "text-orange-500",
}

export const CLUSTER_LABELS: Record<number, string> = {
  0: "业务运营",
  1: "营销增长",
  2: "数据分析",
  3: "技术开发",
}

// ============================================================================
// Agent Card Constants
// ============================================================================

export const categoryConfig = {
  workflow: {
    icon: IconTool,
    variant: "secondary" as const,
    label: "工作流",
  },
  product: {
    icon: IconPackage,
    variant: "default" as const,
    label: "产品",
  },
  collaboration: {
    icon: IconUsers,
    variant: "default" as const,
    label: "协作",
  },
  cost: {
    icon: IconCurrencyDollar,
    variant: "outline" as const,
    label: "成本",
  },
  discovery: {
    icon: IconSearch,
    variant: "secondary" as const,
    label: "探索",
  },
}

// ============================================================================
// Bench Page Constants
// ============================================================================

export const scenarioColors: Record<string, string> = {
  workflow: "bg-purple-500",
  productivity: "bg-blue-500",
  coding: "bg-green-500",
  research: "bg-amber-500",
  analysis: "bg-cyan-500",
  social: "bg-pink-500",
  content: "bg-indigo-500",
  memory: "bg-orange-500",
  finance: "bg-emerald-500",
  files: "bg-violet-500",
  health: "bg-rose-500",
  creative: "bg-fuchsia-500",
}

export const scenarioBgColors: Record<string, string> = {
  workflow: "bg-purple-500/10 text-purple-500",
  productivity: "bg-blue-500/10 text-blue-500",
  coding: "bg-green-500/10 text-green-500",
  research: "bg-amber-500/10 text-amber-500",
  analysis: "bg-cyan-500/10 text-cyan-500",
  social: "bg-pink-500/10 text-pink-500",
  content: "bg-indigo-500/10 text-indigo-500",
  memory: "bg-orange-500/10 text-orange-500",
  finance: "bg-emerald-500/10 text-emerald-500",
  files: "bg-violet-500/10 text-violet-500",
  health: "bg-rose-500/10 text-rose-500",
  creative: "bg-fuchsia-500/10 text-fuchsia-500",
}

// ============================================================================
// Filter Options Constants (Chinese labels, no region)
// ============================================================================

export const FILTER_OPTIONS = {
  domain: ['业务运营', '软件工程', '营销增长', '数据科学', '产品管理', '金融', '电商'],
  difficulty: ['入门', '进阶', '高级', '专家'],
  skills: ['编程', '写作', '分析', '设计', '沟通'],
}

export const PLATFORM_OPTIONS = [
  { value: 'all', label: '全部平台' },
  { value: 'bilibili', label: 'B站' },
  { value: 'douyin', label: '抖音' },
  { value: 'zhihu', label: '知乎' },
  { value: 'xiaohongshu', label: '小红书' },
  { value: 'weibo', label: '微博' },
  { value: 'twitter', label: 'Twitter' }
]

export const PINCHBENCH_FILTER_OPTIONS = {
  scenario: [
    { value: 'all', label: '全部场景' },
    { value: 'workflow', label: '工作流' },
    { value: 'productivity', label: '生产力' },
    { value: 'coding', label: '编程' },
    { value: 'research', label: '研究' },
    { value: 'analysis', label: '分析' },
    { value: 'social', label: '社交' },
    { value: 'content', label: '内容' },
    { value: 'memory', label: '记忆' },
    { value: 'finance', label: '金融' },
    { value: 'files', label: '文件' },
    { value: 'health', label: '健康' },
  ],
  domain: [
    { value: 'all', label: '全部领域' },
    { value: 'Business-Operations', label: '业务运营' },
    { value: 'Software-Engineering', label: '软件工程' },
    { value: 'Scientific-Research', label: '科学研究' },
    { value: 'Data-Science', label: '数据科学' },
    { value: 'Creative', label: '创意' },
    { value: 'OS-Operations', label: '系统运维' },
    { value: 'Education', label: '教育' },
    { value: 'Product-Management', label: '产品管理' },
    { value: 'Healthcare', label: '医疗健康' },
    { value: 'Media-Entertainment', label: '媒体娱乐' },
    { value: 'Finance', label: '金融' },
    { value: 'Customer-Service', label: '客户服务' },
  ],
  difficulty: [
    { value: 'all', label: '全部难度' },
    { value: 'short', label: '短任务' },
    { value: 'medium', label: '中等' },
    { value: 'long', label: '长任务' },
    { value: 'single_step', label: '单步' },
  ],
  agentRole: [
    { value: 'all', label: '全部角色' },
    { value: 'Autonomous-Executor', label: '自主执行' },
    { value: 'Collaborator', label: '协作者' },
    { value: 'Reviewer', label: '审阅者' },
    { value: 'Knowledge-Base', label: '知识库' },
    { value: 'Accelerator', label: '加速器' },
  ],
}
