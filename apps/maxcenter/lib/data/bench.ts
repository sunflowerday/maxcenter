import { PinchBenchTask } from "./types"

export const pinchBenchTasks: PinchBenchTask[] = [
  {
    id: "task_000",
    cnName: "基础功能验证",
    type: "openclaw",
    initialUserMessage: "嗨！想确认一下你是否正常运行。我整个上午都在尝试配置这个AI助手，不确定操作是否正确。能帮我确认一下收到了吗？",
    hiddenContext: "【用户画像】\n角色: 初级用户\n沟通风格: 随意、对话式\n专业背景: 刚接触AI助手，测试基础功能\n性格特征: 好奇、略带不确定、有条理\n情绪状态: 中立但寻求确认",
    grading: "### 准则 1: 基础响应能力 (权重: 100%)\n\n**1.0 分**: Agent 成功响应用户问候，给出任何合理的回复内容（不少于 5 个字符的文本回复）。",
  },
  {
    id: "task_001",
    cnName: "日历事件创建",
    type: "openclaw",
    initialUserMessage: "Schedule a team meeting for tomorrow at 2pm with a 30 minute reminder",
    hiddenContext: "【用户画像】\n角色: 团队经理\n沟通风格: 清晰、直接\n专业背景: 熟悉日历工具\n性格特征: 有条理、时间意识强\n情绪状态: 中立",
    grading: "### 准则 1: 创建日历事件 (权重: 100%)\n\n创建正确日期/时间的日历事件，设置提醒。",
  },
]

// 保留过滤选项用于表单选择
export const PINCHBENCH_FILTER_OPTIONS = {
  type: [
    { value: 'all', label: '全部类型' },
    { value: 'manus', label: 'Manus' },
    { value: 'openclaw', label: 'OpenClaw' },
    { value: 'claude co-work', label: 'Claude Co-work' },
  ],
}
