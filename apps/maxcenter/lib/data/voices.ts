import { Voice } from "./types"

export const voices: Voice[] = [
  {
    id: 'v-001',
    content: '这个AI工具真的太棒了，帮我节省了大量时间！以前需要3天完成的风险评估，现在只需要4小时。准确性也提高了很多。',
    platform: 'zhihu',
    type: 'post',
    author: {
      name: '金融分析师小王',
      profileUrl: 'https://zhihu.com/people/wang'
    },
    url: 'https://zhihu.com/p/123456',
    qualityScore: 95,
    likes: 128,
    timestamp: '2026-03-20T10:30:00Z'
  },
  {
    id: 'v-002',
    content: '医疗AI的诊断准确率真的很高，但是作为医生，我还是希望它能解释为什么会做出这样的判断。',
    platform: 'bilibili',
    type: 'comment',
    author: {
      name: '医生李教授',
      profileUrl: 'https://space.bilibili.com/12345'
    },
    url: 'https://www.bilibili.com/video/BV123456',
    qualityScore: 88,
    likes: 256,
    timestamp: '2026-03-19T14:20:00Z'
  },
  {
    id: 'v-003',
    content: '教育平台的课程推荐真的很准，完全理解了我的职业规划。以前选课很盲目，现在有了方向。',
    platform: 'xiaohongshu',
    type: 'post',
    author: {
      name: '大学生小美',
      profileUrl: 'https://xiaohongshu.com/user/mei'
    },
    url: 'https://xiaohongshu.com/discovery/item/123',
    qualityScore: 92,
    likes: 342,
    timestamp: '2026-03-18T09:15:00Z'
  },
  {
    id: 'v-004',
    content: '电商推荐的个性化做的很好，感觉就像有个懂我的购物顾问。转化率提升了35%，数据说话。',
    platform: 'weibo',
    type: 'post',
    author: {
      name: '电商运营总监',
      profileUrl: 'https://weibo.com/zhang'
    },
    url: 'https://weibo.com/123456',
    qualityScore: 90,
    likes: 89,
    timestamp: '2026-03-17T16:45:00Z'
  },
  {
    id: 'v-005',
    content: '智能日程助手帮我解决了跨时区会议的难题，终于不用再算来算去了。EU团队的时间也能完美对齐。',
    platform: 'twitter',
    type: 'post',
    author: {
      name: 'TechLead_John',
      profileUrl: 'https://twitter.com/john'
    },
    url: 'https://twitter.com/john/status/123456',
    qualityScore: 87,
    likes: 67,
    timestamp: '2026-03-16T11:00:00Z'
  },
  {
    id: 'v-006',
    content: '代码审查AI找到的漏洞让我惊讶，之前其他工具都没发现。GitHub集成也很顺滑。',
    platform: 'zhihu',
    type: 'comment',
    author: {
      name: '程序员阿强',
      profileUrl: 'https://zhihu.com/people/qiang'
    },
    url: 'https://zhihu.com/p/654321',
    qualityScore: 94,
    likes: 178,
    timestamp: '2026-03-15T13:30:00Z'
  },
  {
    id: 'v-007',
    content: '患者分诊系统在急诊室帮了大忙，AI预警让我们提前发现了3个危重病例。毫无疑问救了命。',
    platform: 'bilibili',
    type: 'post',
    author: {
      name: '急诊科主任',
      profileUrl: 'https://space.bilibili.com/67890'
    },
    url: 'https://www.bilibili.com/video/BV654321',
    qualityScore: 98,
    likes: 512,
    timestamp: '2026-03-14T08:00:00Z'
  },
  {
    id: 'v-008',
    content: '自动报告生成对放射科医生来说太有用了，可以把更多时间花在复杂病例上。',
    platform: 'xiaohongshu',
    type: 'comment',
    author: {
      name: '放射科医生Lisa',
      profileUrl: 'https://xiaohongshu.com/user/lisa'
    },
    url: 'https://xiaohongshu.com/discovery/item/456',
    qualityScore: 91,
    likes: 234,
    timestamp: '2026-03-13T15:20:00Z'
  },
  {
    id: 'v-009',
    content: '作为一名老师，课程推荐引擎让我能更好地指导学生选课。学生 retention 率提高了20%。',
    platform: 'weibo',
    type: 'post',
    author: {
      name: '大学教授陈老师',
      profileUrl: 'https://weibo.com/chen'
    },
    url: 'https://weibo.com/789012',
    qualityScore: 93,
    likes: 156,
    timestamp: '2026-03-12T10:00:00Z'
  },
  {
    id: 'v-010',
    content: '购物推荐越来越懂我了，跨设备同步也很棒。手机上看的商品，电脑上继续浏览 seamless。',
    platform: 'douyin',
    type: 'comment',
    author: {
      name: '购物达人小雅',
      profileUrl: 'https://douyin.com/user/ya'
    },
    url: 'https://douyin.com/video/123456',
    qualityScore: 85,
    likes: 445,
    timestamp: '2026-03-11T18:30:00Z'
  },
  {
    id: 'v-011',
    content: '终于找到一个能同时管理 Google Calendar 和 Outlook 的调度工具了！之前用4个不同的app。',
    platform: 'twitter',
    type: 'post',
    author: {
      name: 'ProductivityGeek',
      profileUrl: 'https://twitter.com/geek'
    },
    url: 'https://twitter.com/geek/status/789012',
    qualityScore: 89,
    likes: 234,
    timestamp: '2026-03-10T09:45:00Z'
  },
  {
    id: 'v-012',
    content: 'AI代码审查不仅找bug，还能教 junior dev 最佳实践。团队代码质量明显提升。',
    platform: 'zhihu',
    type: 'post',
    author: {
      name: '技术总监老马',
      profileUrl: 'https://zhihu.com/people/ma'
    },
    url: 'https://zhihu.com/p/789012',
    qualityScore: 96,
    likes: 567,
    timestamp: '2026-03-09T14:00:00Z'
  }
]

export const PLATFORM_OPTIONS = [
  { value: 'all', label: '全部平台' },
  { value: 'bilibili', label: 'B站' },
  { value: 'douyin', label: '抖音' },
  { value: 'zhihu', label: '知乎' },
  { value: 'xiaohongshu', label: '小红书' },
  { value: 'weibo', label: '微博' },
  { value: 'twitter', label: 'Twitter' }
]