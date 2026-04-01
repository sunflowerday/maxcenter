// TypeScript interfaces for MaxCenter data

export interface Voice {
  id: string
  content: string
  platform: 'bilibili' | 'douyin' | 'zhihu' | 'xiaohongshu' | 'weibo' | 'twitter'
  type: 'post' | 'comment'
  author: {
    name: string
    avatar?: string
    profileUrl: string
  }
  url: string
  qualityScore: number
  likes: number
  timestamp: string
}

export interface UserVoice {
  id: string
  quote: string
  author: {
    name: string
    role: string
    profileUrl: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
    }
  }
}

export interface Comment {
  id: string
  author: string
  type: 'voice' | 'text'
  content: string
  timestamp: string
  votes: {
    up: string[]
    down: string[]
  }
}

export interface UseCase {
  id: string
  name: string
  domain: string[]
  difficulty: string
  skills: string[]
  background: {
    who: string
    when: string
    where: string
    what: string
    need: string
  }
  duration: {
    product: number
    technology: number
  }
  userVoices: UserVoice[]
  score?: {
    value: number
    type: string
    date: string
  }
  tech: {
    tokens: number
    environment: string
    metrics: Record<string, number>
  }
  comments: Comment[]
  // Link to related bench tasks
  relatedBenchTasks?: string[]
}

export interface HourlyActivity {
  hour: number
  activity: string
}

export interface Customer {
  id: string
  name: string
  avatar?: string
  x: number
  y: number
  clusterId: number
  profiles: string[]
  typicalUseCases: string[]
  tags: string[]
  status: 'online' | 'idle' | 'offline'
  recentStatus: string
  hourlyActivity: HourlyActivity[]
  // Link to related benchmark tasks
  relatedBenchTasks?: string[]
  // Knowledge level for this persona
  knowledgeLevel?: string
  // Core needs/pain points
  coreNeeds?: string[]
}

export interface Human {
  id: string
  name: string
  avatar?: string
  role: string
  status: 'online' | 'idle' | 'offline'
  activity: string
  growth: string
  helpWanted: string
  hourlyActivity: HourlyActivity[]
}

export interface AgentSuggestion {
  id: string
  content: string
  confidence: number
  category: 'workflow' | 'product' | 'collaboration' | 'cost' | 'discovery'
  action: string
  metadata: Record<string, string>
}

export interface BenchmarkTask {
  id: string
  name: string
  domain: string
  scores: {
    architecture: string
    score: number
  }[]
}

export interface ArchitectureScore {
  architecture: string
  overallScore: number
  domains: {
    [domain: string]: number
  }
}

export interface BenchmarkRun {
  id: string
  name: string
  date: string
  tasks: BenchmarkTask[]
  architectures: ArchitectureScore[]
}

export interface PinchBenchTask {
  id: string
  cnName: string
  type: string
  initialUserMessage: string
  hiddenContext: string
}

// Transcript types for session message rendering
export interface TranscriptMessage {
  role: 'user' | 'assistant'
  timestamp: string
  content: string
  model?: string
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

export interface Transcript {
  session: string
  exportedAt: string
  dateRange: {
    start: string
    end: string
  }
  messageCount: {
    total: number
    user: number
    assistant: number
  }
  messages: TranscriptMessage[]
}

// User Persona for submission and categorization
export interface UserPersona {
  id: string
  name: string
  // Knowledge/skill level
  knowledgeLevel: 'beginner' | 'beginner-intermediate' | 'intermediate' | 'intermediate-expert' | 'expert'
  // Core needs and pain points
  coreNeeds: string[]
  // Detailed description
  description: string
  // Related use cases (many-to-many relationship)
  typicalUseCases: string[]
  // Demographics info
  demographics: {
    industry: string
    companySize: string
    role: string
    location: string
  }
  // Pain points this persona faces
  painPoints: string[]
  // Goals they want to achieve
  goals: string[]
  // How they prefer to communicate
  communicationPreferences: {
    channels: string[]
    style: string
    frequency: string
  }
  // Source platforms (reddit, discord, etc.)
  sourcePlatforms: string[]
  // Confidence score from clustering
  confidence?: number
}
