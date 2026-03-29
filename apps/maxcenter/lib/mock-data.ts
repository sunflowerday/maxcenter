// Mock data for MaxCenter Dashboard

export interface UserVoice {
  id: string
  quote: string
  author: {
    name: string
    role: string
    avatar: string
    profileUrl: string
    socialLinks: {
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
  region: string[]
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
}

export interface Customer {
  id: string
  name: string
  avatar: string
  x: number
  y: number
  clusterId: number
  profiles: string[]
  typicalUseCases: string[]
  tags: string[]
}

export interface HourlyActivity {
  hour: number
  activity: string
}

export interface Human {
  id: string
  name: string
  avatar: string
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

export const FILTER_OPTIONS = {
  domain: ['Finance', 'Healthcare', 'Education', 'E-commerce', 'Productivity'],
  difficulty: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  skills: ['Coding', 'Writing', 'Analysis', 'Design', 'Communication'],
  region: ['North America', 'Europe', 'Asia', 'Latin America'],
}

// Use Cases
export const useCases: UseCase[] = [
  {
    id: 'uc-001',
    name: 'AI-Powered Financial Risk Assessment',
    domain: ['Finance'],
    difficulty: 'Advanced',
    skills: ['Analysis', 'Coding'],
    region: ['North America'],
    background: {
      who: 'Risk analysts at a mid-sized investment bank',
      when: 'During quarterly earnings season',
      where: 'New York headquarters',
      what: 'An automated system that analyzes market data, news sentiment, and historical patterns to predict financial risks',
      need: 'To reduce manual analysis time and improve accuracy of risk predictions by 40%'
    },
    duration: {
      product: 120,
      technology: 200
    },
    userVoices: [
      {
        id: 'uv-001',
        quote: 'This system cut our risk assessment time from 3 days to 4 hours. The accuracy is remarkable.',
        author: {
          name: 'Sarah Chen',
          role: 'Senior Risk Analyst',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          profileUrl: 'https://linkedin.com/in/sarahchen',
          socialLinks: {
            twitter: '@sarahchen_risk',
            linkedin: 'linkedin.com/in/sarahchen'
          }
        }
      },
      {
        id: 'uv-002',
        quote: 'The real-time alerts have prevented at least three major losses this quarter alone.',
        author: {
          name: 'Marcus Johnson',
          role: 'Portfolio Manager',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
          profileUrl: 'https://linkedin.com/in/marcusjohnson',
          socialLinks: {
            linkedin: 'linkedin.com/in/marcusjohnson'
          }
        }
      }
    ],
    score: {
      value: 87,
      type: 'benchmark',
      date: '2026-03-15'
    },
    tech: {
      tokens: 2450000,
      environment: 'AWS SageMaker, Python 3.11, TensorFlow',
      metrics: {
        accuracy: 94.2,
        latency_ms: 150,
        throughput: 1200
      }
    },
    comments: [
      {
        id: 'c-001',
        author: 'David Park',
        type: 'text',
        content: 'Great use case for demonstrating AI in finance. Would love to see integration with Bloomberg terminal.',
        timestamp: '2026-03-20T14:30:00Z',
        votes: { up: ['u1', 'u2', 'u3'], down: ['u4'] }
      },
      {
        id: 'c-002',
        author: 'Elena Rodriguez',
        type: 'voice',
        content: 'The sentiment analysis module is particularly impressive.',
        timestamp: '2026-03-19T09:15:00Z',
        votes: { up: ['u1', 'u5'], down: [] }
      },
      {
        id: 'c-003',
        author: 'James Wilson',
        type: 'text',
        content: 'Consider adding support for crypto markets in the next iteration.',
        timestamp: '2026-03-18T16:45:00Z',
        votes: { up: ['u2'], down: ['u6'] }
      }
    ]
  },
  {
    id: 'uc-002',
    name: 'Automated Medical Report Generation',
    domain: ['Healthcare'],
    difficulty: 'Expert',
    skills: ['Writing', 'Analysis'],
    region: ['Europe'],
    background: {
      who: 'Radiologists and pathologists at a large hospital network',
      when: 'During high-volume diagnostic periods',
      where: 'Berlin University Hospital',
      what: 'An AI system that generates preliminary diagnostic reports from medical imaging',
      need: 'To reduce report turnaround time and allow radiologists to focus on complex cases'
    },
    duration: {
      product: 180,
      technology: 320
    },
    userVoices: [
      {
        id: 'uv-003',
        quote: 'The drafts are incredibly accurate. I spend less time dictating and more time on diagnosis.',
        author: {
          name: 'Dr. Hans Mueller',
          role: 'Chief Radiologist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hans',
          profileUrl: 'https://linkedin.com/in/drhansmueller',
          socialLinks: {
            twitter: '@dr_mueller_rad'
          }
        }
      },
      {
        id: 'uv-004',
        quote: 'Integration with PACS was seamless. The AI understands medical terminology perfectly.',
        author: {
          name: 'Dr. Anna Schmidt',
          role: 'Pathologist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
          profileUrl: 'https://linkedin.com/in/annaschmidt',
          socialLinks: {
            linkedin: 'linkedin.com/in/annaschmidt'
          }
        }
      }
    ],
    score: {
      value: 92,
      type: 'benchmark',
      date: '2026-03-10'
    },
    tech: {
      tokens: 5200000,
      environment: 'Google Cloud Healthcare API, PyTorch, Docker',
      metrics: {
        accuracy: 96.8,
        latency_ms: 230,
        throughput: 450
      }
    },
    comments: [
      {
        id: 'c-004',
        author: 'Prof. Weber',
        type: 'text',
        content: 'HIPAA compliance is handled excellently. Medical data never leaves the secure environment.',
        timestamp: '2026-03-21T11:00:00Z',
        votes: { up: ['u1', 'u2', 'u7', 'u8'], down: [] }
      },
      {
        id: 'c-005',
        author: 'Lisa Chang',
        type: 'voice',
        content: 'The terminology database is comprehensive and regularly updated.',
        timestamp: '2026-03-20T08:30:00Z',
        votes: { up: ['u3'], down: ['u1'] }
      },
      {
        id: 'c-006',
        author: 'Michael Brown',
        type: 'text',
        content: 'Would appreciate support for MRI and PET scan analysis.',
        timestamp: '2026-03-19T14:20:00Z',
        votes: { up: ['u4', 'u5'], down: [] }
      }
    ]
  },
  {
    id: 'uc-003',
    name: 'Intelligent Course Recommendation Engine',
    domain: ['Education'],
    difficulty: 'Intermediate',
    skills: ['Analysis', 'Design'],
    region: ['North America', 'Europe'],
    background: {
      who: 'Students and academic advisors at universities',
      when: 'During course registration periods',
      where: 'Stanford Online Learning Platform',
      what: 'A recommendation system that suggests courses based on student goals, past performance, and career paths',
      need: 'To improve student retention and help them make informed course selections'
    },
    duration: {
      product: 80,
      technology: 140
    },
    userVoices: [
      {
        id: 'uv-005',
        quote: 'The recommendations actually understood my career goals. Game changer for planning.',
        author: {
          name: 'Emily Watson',
          role: 'Graduate Student',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
          profileUrl: 'https://linkedin.com/in/emilywatson',
          socialLinks: {
            twitter: '@emilywatson_cs'
          }
        }
      },
      {
        id: 'uv-006',
        quote: 'As an advisor, I now spend more time with students on complex decisions rather than logistics.',
        author: {
          name: 'Dr. Robert Kim',
          role: 'Academic Advisor',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
          profileUrl: 'https://linkedin.com/in/drrobertkim',
          socialLinks: {
            linkedin: 'linkedin.com/in/drrobertkim'
          }
        }
      }
    ],
    score: {
      value: 78,
      type: 'benchmark',
      date: '2026-03-12'
    },
    tech: {
      tokens: 890000,
      environment: 'Azure ML, Node.js, PostgreSQL',
      metrics: {
        accuracy: 85.3,
        latency_ms: 80,
        throughput: 3200
      }
    },
    comments: [
      {
        id: 'c-007',
        author: 'Jennifer Lee',
        type: 'text',
        content: 'The visualization of course pathways is very helpful for students.',
        timestamp: '2026-03-18T10:00:00Z',
        votes: { up: ['u1', 'u9', 'u10'], down: [] }
      },
      {
        id: 'c-008',
        author: 'Tom Anderson',
        type: 'text',
        content: 'Consider adding prerequisites tracking. Some recommendations seem off.',
        timestamp: '2026-03-17T15:30:00Z',
        votes: { up: ['u2'], down: ['u3'] }
      },
      {
        id: 'c-009',
        author: 'Rachel Green',
        type: 'voice',
        content: 'The career outcome predictions are surprisingly accurate.',
        timestamp: '2026-03-16T09:45:00Z',
        votes: { up: ['u4', 'u5', 'u6'], down: [] }
      }
    ]
  },
  {
    id: 'uc-004',
    name: 'Personalized Shopping Experience Engine',
    domain: ['E-commerce'],
    difficulty: 'Advanced',
    skills: ['Coding', 'Analysis'],
    region: ['Asia', 'North America'],
    background: {
      who: 'E-commerce platforms and their customers',
      when: 'During shopping高峰 periods',
      where: 'Tokyo, Shopify integration center',
      what: 'A real-time personalization system that customizes product recommendations and pricing',
      need: 'To increase conversion rates and customer lifetime value through hyper-personalization'
    },
    duration: {
      product: 200,
      technology: 280
    },
    userVoices: [
      {
        id: 'uv-007',
        quote: 'The recommendations feel like they actually know my style. Conversion up 35% since launch.',
        author: {
          name: 'Yuki Tanaka',
          role: 'E-commerce Director',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuki',
          profileUrl: 'https://linkedin.com/in/yukitanaka',
          socialLinks: {
            twitter: '@yuki_ecom'
          }
        }
      },
      {
        id: 'uv-008',
        quote: 'As a customer, I love that it remembers my preferences across devices.',
        author: {
        name: 'Alex Rivera',
        role: 'Premium Customer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        profileUrl: 'https://twitter.com/alexrivera',
        socialLinks: {
          twitter: '@alexrivera'
        }
      }
      }
    ],
    score: {
      value: 89,
      type: 'benchmark',
      date: '2026-03-08'
    },
    tech: {
      tokens: 3800000,
      environment: 'Kubernetes, Python, Redis, TensorFlow Serving',
      metrics: {
        accuracy: 91.4,
        latency_ms: 45,
        throughput: 15000
      }
    },
    comments: [
      {
        id: 'c-010',
        author: 'Chris Wong',
        type: 'text',
        content: 'The A/B testing framework built in is excellent for continuous improvement.',
        timestamp: '2026-03-22T13:00:00Z',
        votes: { up: ['u1', 'u2', 'u3', 'u11'], down: [] }
      },
      {
        id: 'c-011',
        author: 'Nina Patel',
        type: 'voice',
        content: 'Price optimization alone has paid for the entire implementation.',
        timestamp: '2026-03-21T16:30:00Z',
        votes: { up: ['u5', 'u12'], down: ['u4'] }
      },
      {
        id: 'c-012',
        author: 'Kevin Zhang',
        type: 'text',
        content: 'Would be great to see integration with in-store POS systems.',
        timestamp: '2026-03-20T11:15:00Z',
        votes: { up: ['u6', 'u7'], down: [] }
      }
    ]
  },
  {
    id: 'uc-005',
    name: 'Smart Calendar Scheduling Assistant',
    domain: ['Productivity'],
    difficulty: 'Beginner',
    skills: ['Communication', 'Analysis'],
    region: ['North America', 'Europe'],
    background: {
      who: 'Professionals and teams managing complex schedules',
      when: 'During daily calendar management',
      where: 'Remote-first companies',
      what: 'An AI assistant that automatically schedules meetings, considers time zones, and finds optimal meeting times',
      need: 'To eliminate the back-and-forth of scheduling and reduce meeting fatigue'
    },
    duration: {
      product: 40,
      technology: 60
    },
    userVoices: [
      {
        id: 'uv-009',
        quote: 'I deleted 4 other scheduling apps. This one does it all without any friction.',
        author: {
          name: 'Michelle Torres',
          role: 'VP of Operations',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michelle',
          profileUrl: 'https://linkedin.com/in/michelletorres',
          socialLinks: {
            twitter: '@mtorres_ops'
          }
        }
      },
      {
        id: 'uv-010',
        quote: 'The time zone intelligence is incredible. It knows exactly when my EU team is available.',
        author: {
          name: 'Daniel Moore',
        role: 'Engineering Lead',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniel',
          profileUrl: 'https://linkedin.com/in/danielmoore',
          socialLinks: {
            linkedin: 'linkedin.com/in/danielmoore'
          }
        }
      }
    ],
    score: {
      value: 82,
      type: 'benchmark',
      date: '2026-03-14'
    },
    tech: {
      tokens: 320000,
      environment: 'Next.js, Supabase, OpenAI API',
      metrics: {
        accuracy: 88.7,
        latency_ms: 200,
        throughput: 5000
      }
    },
    comments: [
      {
        id: 'c-013',
        author: 'Amanda Foster',
        type: 'text',
        content: 'Finally, a scheduling tool that actually works with Google Calendar AND Outlook.',
        timestamp: '2026-03-19T08:00:00Z',
        votes: { up: ['u1', 'u8', 'u13', 'u14'], down: [] }
      },
      {
        id: 'c-014',
        author: 'Steven Chen',
        type: 'voice',
        content: 'The buffer time suggestions between meetings have improved my focus significantly.',
        timestamp: '2026-03-18T14:00:00Z',
        votes: { up: ['u9', 'u10'], down: [] }
      },
      {
        id: 'c-015',
        author: 'Lisa Wang',
        type: 'text',
        content: 'Would love to see integration with Zoom and Teams for one-click joining.',
        timestamp: '2026-03-17T10:30:00Z',
        votes: { up: ['u11'], down: ['u12'] }
      }
    ]
  },
  {
    id: 'uc-006',
    name: 'Healthcare Patient Triage System',
    domain: ['Healthcare'],
    difficulty: 'Expert',
    skills: ['Analysis', 'Coding', 'Communication'],
    region: ['Europe', 'Latin America'],
    background: {
      who: 'Emergency room staff and nurses',
      when: 'During patient intake at hospitals',
      where: 'Barcelona Regional Hospital',
      what: 'An AI-powered triage system that prioritizes patients based on symptoms and vital signs',
      need: 'To reduce wait times for critical cases and improve resource allocation'
    },
    duration: {
      product: 160,
      technology: 240
    },
    userVoices: [
      {
        id: 'uv-011',
        quote: 'We caught three critical cases earlier because of the AI alerts. Lives saved, no doubt.',
        author: {
          name: 'Dr. Carmen Vega',
          role: 'ER Chief',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carmen',
          profileUrl: 'https://linkedin.com/in/drvega',
          socialLinks: {
            twitter: '@drvega_er'
          }
        }
      },
      {
        id: 'uv-012',
        quote: 'The system explains its reasoning in plain language. I always know why it flagged someone.',
        author: {
          name: 'Maria Santos',
          role: 'Triage Nurse',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
          profileUrl: 'https://linkedin.com/in/mariasantos',
          socialLinks: {
            linkedin: 'linkedin.com/in/mariasantos'
          }
        }
      }
    ],
    score: {
      value: 94,
      type: 'benchmark',
      date: '2026-03-11'
    },
    tech: {
      tokens: 4100000,
      environment: 'AWS Lambda, Python, FHIR API, React Native',
      metrics: {
        accuracy: 97.1,
        latency_ms: 180,
        throughput: 800
      }
    },
    comments: [
      {
        id: 'c-016',
        author: 'Dr. Fernandez',
        type: 'text',
        content: 'The HL7 FHIR integration was smooth. Works with our existing hospital systems.',
        timestamp: '2026-03-21T09:00:00Z',
        votes: { up: ['u1', 'u2', 'u3', 'u15'], down: [] }
      },
      {
        id: 'c-017',
        author: 'Roberto Almeida',
        type: 'voice',
        content: 'Language support is excellent. We serve patients in Catalan, Spanish, and English.',
        timestamp: '2026-03-20T12:00:00Z',
        votes: { up: ['u4', 'u5'], down: [] }
      },
      {
        id: 'c-018',
        author: 'Dr. Kimura',
        type: 'text',
        content: 'Consider adding pediatric triage protocols. Current version is adult-focused.',
        timestamp: '2026-03-19T15:45:00Z',
        votes: { up: ['u6'], down: ['u7'] }
      }
    ]
  },
  {
    id: 'uc-007',
    name: 'Automated Code Review Assistant',
    domain: ['Productivity'],
    difficulty: 'Intermediate',
    skills: ['Coding', 'Analysis'],
    region: ['North America', 'Asia'],
    background: {
      who: 'Software development teams',
      when: 'During pull request reviews',
      where: 'Distributed teams across multiple time zones',
      what: 'An AI that automatically reviews code, suggests improvements, and identifies potential bugs',
      need: 'To speed up code reviews and maintain consistent quality standards'
    },
    duration: {
      product: 90,
      technology: 150
    },
    userVoices: [
      {
        id: 'uv-013',
        quote: 'It catches things my team misses. Security issues especially. Integration with GitHub is seamless.',
        author: {
          name: 'Priya Sharma',
          role: 'Engineering Manager',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
          profileUrl: 'https://linkedin.com/in/priyasharma',
          socialLinks: {
            twitter: '@priya_eng'
          }
        }
      },
      {
        id: 'uv-014',
        quote: 'The explanations are clear and help junior developers learn best practices.',
        author: {
          name: 'Jason Lee',
          role: 'Senior Developer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jason',
          profileUrl: 'https://github.com/jasonlee',
          socialLinks: {
            twitter: '@jasonlee_dev'
          }
        }
      }
    ],
    score: {
      value: 85,
      type: 'benchmark',
      date: '2026-03-13'
    },
    tech: {
      tokens: 1680000,
      environment: 'GitHub Actions, Node.js, GPT-4, Docker',
      metrics: {
        accuracy: 89.2,
        latency_ms: 300,
        throughput: 2500
      }
    },
    comments: [
      {
        id: 'c-019',
        author: 'Omar Hassan',
        type: 'text',
        content: 'The security vulnerability detection is top-notch. Found issues that slipped through our previous tools.',
        timestamp: '2026-03-20T16:00:00Z',
        votes: { up: ['u1', 'u16', 'u17'], down: [] }
      },
      {
        id: 'c-020',
        author: 'Grace Kim',
        type: 'voice',
        content: 'Would be great to have custom rules for our coding standards.',
        timestamp: '2026-03-19T11:30:00Z',
        votes: { up: ['u2', 'u3'], down: [] }
      },
      {
        id: 'c-021',
        author: 'Ben Thompson',
        type: 'text',
        content: 'Consider supporting GitLab and Bitbucket integration.',
        timestamp: '2026-03-18T09:15:00Z',
        votes: { up: ['u4'], down: ['u5'] }
      }
    ]
  }
]

// Customers
export const customers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Nexus Financial Group',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NFG',
    x: 0.25,
    y: 0.35,
    clusterId: 0,
    profiles: ['Early Adopter', 'Enterprise'],
    typicalUseCases: ['uc-001'],
    tags: ['Banking', 'Enterprise', 'North America']
  },
  {
    id: 'cust-002',
    name: 'MedCore Health Systems',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MCH',
    x: 0.72,
    y: 0.28,
    clusterId: 1,
    profiles: ['Power User', 'Enterprise'],
    typicalUseCases: ['uc-002', 'uc-006'],
    tags: ['Healthcare', 'Enterprise', 'Europe']
  },
  {
    id: 'cust-003',
    name: 'EduPath Learning',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EPL',
    x: 0.45,
    y: 0.55,
    clusterId: 2,
    profiles: ['Early Adopter', 'Growth'],
    typicalUseCases: ['uc-003'],
    tags: ['Education', 'SMB', 'North America']
  },
  {
    id: 'cust-004',
    name: 'ShopMax Asia',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SMA',
    x: 0.82,
    y: 0.62,
    clusterId: 1,
    profiles: ['Power User', 'Enterprise'],
    typicalUseCases: ['uc-004'],
    tags: ['E-commerce', 'Enterprise', 'Asia']
  },
  {
    id: 'cust-005',
    name: 'CloudFirst Tech',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CFT',
    x: 0.18,
    y: 0.78,
    clusterId: 3,
    profiles: ['Developer', 'Startup'],
    typicalUseCases: ['uc-005', 'uc-007'],
    tags: ['SaaS', 'Startup', 'North America']
  },
  {
    id: 'cust-006',
    name: 'Atlantic General Hospital',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AGH',
    x: 0.65,
    y: 0.22,
    clusterId: 1,
    profiles: ['Enterprise', 'Healthcare'],
    typicalUseCases: ['uc-002', 'uc-006'],
    tags: ['Healthcare', 'Enterprise', 'North America']
  },
  {
    id: 'cust-007',
    name: 'TechStart Ventures',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TSV',
    x: 0.35,
    y: 0.85,
    clusterId: 3,
    profiles: ['Early Adopter', 'Startup'],
    typicalUseCases: ['uc-007'],
    tags: ['SaaS', 'Startup', 'North America']
  },
  {
    id: 'cust-008',
    name: 'EuroUniversity Consortium',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EUC',
    x: 0.52,
    y: 0.42,
    clusterId: 2,
    profiles: ['Education', 'Enterprise'],
    typicalUseCases: ['uc-003'],
    tags: ['Education', 'Enterprise', 'Europe']
  },
  {
    id: 'cust-009',
    name: 'RetailNow Global',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed RNG',
    x: 0.88,
    y: 0.55,
    clusterId: 1,
    profiles: ['Enterprise', 'Power User'],
    typicalUseCases: ['uc-004'],
    tags: ['E-commerce', 'Enterprise', 'Global']
  },
  {
    id: 'cust-010',
    name: 'FinanceFlow Inc',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FFI',
    x: 0.15,
    y: 0.32,
    clusterId: 0,
    profiles: ['Early Adopter', 'FinTech'],
    typicalUseCases: ['uc-001'],
    tags: ['Finance', 'SMB', 'North America']
  },
  {
    id: 'cust-011',
    name: 'Pacific Medical Center',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PMC',
    x: 0.78,
    y: 0.35,
    clusterId: 1,
    profiles: ['Healthcare', 'Enterprise'],
    typicalUseCases: ['uc-006'],
    tags: ['Healthcare', 'Enterprise', 'Asia']
  },
  {
    id: 'cust-012',
    name: 'LearnHub Platform',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LHP',
    x: 0.48,
    y: 0.68,
    clusterId: 2,
    profiles: ['Growth', 'EdTech'],
    typicalUseCases: ['uc-003', 'uc-005'],
    tags: ['Education', 'SMB', 'Latin America']
  },
  {
    id: 'cust-013',
    name: 'DevOps Masters',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DOM',
    x: 0.28,
    y: 0.92,
    clusterId: 3,
    profiles: ['Developer', 'Startup'],
    typicalUseCases: ['uc-007'],
    tags: ['SaaS', 'Startup', 'Europe']
  },
  {
    id: 'cust-014',
    name: 'Urban Retail Chain',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=URC',
    x: 0.92,
    y: 0.48,
    clusterId: 1,
    profiles: ['Enterprise', 'Retail'],
    typicalUseCases: ['uc-004', 'uc-005'],
    tags: ['E-commerce', 'Enterprise', 'North America']
  },
  {
    id: 'cust-015',
    name: 'Investment Partners LLC',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IPL',
    x: 0.22,
    y: 0.45,
    clusterId: 0,
    profiles: ['Early Adopter', 'Enterprise'],
    typicalUseCases: ['uc-001', 'uc-005'],
    tags: ['Finance', 'Enterprise', 'Europe']
  },
  {
    id: 'cust-016',
    name: 'HealthNet Brazil',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HNB',
    x: 0.62,
    y: 0.18,
    clusterId: 1,
    profiles: ['Healthcare', 'Growth'],
    typicalUseCases: ['uc-002', 'uc-006'],
    tags: ['Healthcare', 'Growth', 'Latin America']
  },
  {
    id: 'cust-017',
    name: 'ScholarNet Europe',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SNE',
    x: 0.55,
    y: 0.38,
    clusterId: 2,
    profiles: ['Education', 'Early Adopter'],
    typicalUseCases: ['uc-003'],
    tags: ['Education', 'SMB', 'Europe']
  },
  {
    id: 'cust-018',
    name: 'QuickCart Mobile',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=QCM',
    x: 0.85,
    y: 0.72,
    clusterId: 1,
    profiles: ['Power User', 'Mobile'],
    typicalUseCases: ['uc-004'],
    tags: ['E-commerce', 'Mobile', 'Asia']
  },
  {
    id: 'cust-019',
    name: 'CodeCraft Studios',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CCS',
    x: 0.38,
    y: 0.88,
    clusterId: 3,
    profiles: ['Developer', 'Agency'],
    typicalUseCases: ['uc-007', 'uc-005'],
    tags: ['SaaS', 'Agency', 'North America']
  },
  {
    id: 'cust-020',
    name: 'WealthAI Technologies',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=WAT',
    x: 0.12,
    y: 0.25,
    clusterId: 0,
    profiles: ['FinTech', 'Enterprise'],
    typicalUseCases: ['uc-001'],
    tags: ['Finance', 'Enterprise', 'Global']
  },
  {
    id: 'cust-021',
    name: 'MedPharm Solutions',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MPS',
    x: 0.68,
    y: 0.42,
    clusterId: 1,
    profiles: ['Healthcare', 'Pharma'],
    typicalUseCases: ['uc-002'],
    tags: ['Healthcare', 'Pharma', 'Europe']
  },
  {
    id: 'cust-022',
    name: 'FutureLearn Academy',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FLA',
    x: 0.42,
    y: 0.58,
    clusterId: 2,
    profiles: ['EdTech', 'Growth'],
    typicalUseCases: ['uc-003', 'uc-005'],
    tags: ['Education', 'Growth', 'Asia']
  }
]

// Humans (Team Members)
export const humans: Human[] = [
  {
    id: 'hum-001',
    name: 'Alice Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    role: 'Product Manager',
    status: 'online',
    activity: 'Leading product strategy session',
    growth: '+15% this quarter',
    helpWanted: 'Need design review for new dashboard',
    hourlyActivity: [
      { hour: 9, activity: 'Responded to product feedback emails' },
      { hour: 10, activity: 'Sprint planning meeting' },
      { hour: 11, activity: 'Analyzing user metrics dashboard' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Product roadmap review' },
      { hour: 14, activity: 'Leading product strategy session' },
      { hour: 15, activity: 'Stakeholder update meeting' },
      { hour: 16, activity: 'Writing PRD for Q2 features' }
    ]
  },
  {
    id: 'hum-002',
    name: 'Bob Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    role: 'Senior Engineer',
    status: 'online',
    activity: 'Code review in progress',
    growth: '+22% productivity',
    helpWanted: 'Looking for pair programming on auth module',
    hourlyActivity: [
      { hour: 9, activity: 'Code review for PR #234' },
      { hour: 10, activity: 'Standup meeting' },
      { hour: 11, activity: 'Implementing new API endpoints' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Code review in progress' },
      { hour: 14, activity: 'Debugging production issue' },
      { hour: 15, activity: 'Writing unit tests' },
      { hour: 16, activity: 'Documentation update' }
    ]
  },
  {
    id: 'hum-003',
    name: 'Carol Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
    role: 'UX Designer',
    status: 'idle',
    activity: 'Reviewing design mockups',
    growth: '+18% user satisfaction',
    helpWanted: 'Need feedback on new navigation design',
    hourlyActivity: [
      { hour: 9, activity: 'Checking user research notes' },
      { hour: 10, activity: 'Design system documentation' },
      { hour: 11, activity: 'Meeting with stakeholders' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Reviewing design mockups' },
      { hour: 14, activity: 'Figma design session' },
      { hour: 15, activity: 'User testing prep' },
      { hour: 16, activity: 'Design critique session' }
    ]
  },
  {
    id: 'hum-004',
    name: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    role: 'Data Scientist',
    status: 'online',
    activity: 'Training ML model',
    growth: '+30% model accuracy',
    helpWanted: 'Seeking domain expert for finance use cases',
    hourlyActivity: [
      { hour: 9, activity: 'Data cleaning and preparation' },
      { hour: 10, activity: 'Team standup' },
      { hour: 11, activity: 'Feature engineering' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Training ML model' },
      { hour: 14, activity: 'Model evaluation' },
      { hour: 15, activity: 'Writing ML pipeline code' },
      { hour: 16, activity: 'Documenting findings' }
    ]
  },
  {
    id: 'hum-005',
    name: 'Eva Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eva',
    role: 'QA Engineer',
    status: 'offline',
    activity: 'Off for the day',
    growth: '+12% test coverage',
    helpWanted: 'Automation scripts need review',
    hourlyActivity: [
      { hour: 9, activity: 'Running regression tests' },
      { hour: 10, activity: 'Bug triage meeting' },
      { hour: 11, activity: 'Writing automated tests' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Test case review' },
      { hour: 14, activity: 'Exploratory testing' },
      { hour: 15, activity: 'Defect reporting' },
      { hour: 16, activity: 'Test documentation' }
    ]
  },
  {
    id: 'hum-006',
    name: 'Frank Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
    role: 'DevOps Engineer',
    status: 'online',
    activity: 'Infrastructure monitoring',
    growth: '+25% deployment speed',
    helpWanted: 'Need help with Kubernetes debugging',
    hourlyActivity: [
      { hour: 9, activity: 'Morning infrastructure check' },
      { hour: 10, activity: 'CI/CD pipeline maintenance' },
      { hour: 11, activity: 'Security audit review' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Kubernetes cluster maintenance' },
      { hour: 14, activity: 'Infrastructure monitoring' },
      { hour: 15, activity: 'Deployment automation' },
      { hour: 16, activity: 'Performance tuning' }
    ]
  },
  {
    id: 'hum-007',
    name: 'Grace Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
    role: 'Customer Success Manager',
    status: 'idle',
    activity: 'Preparing for client demo',
    growth: '+20% retention rate',
    helpWanted: 'Need technical specs for client presentation',
    hourlyActivity: [
      { hour: 9, activity: 'Client check-in calls' },
      { hour: 10, activity: 'Onboarding new customers' },
      { hour: 11, activity: 'Quarterly business review prep' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'Training session for client' },
      { hour: 14, activity: 'Preparing for client demo' },
      { hour: 15, activity: 'Customer feedback analysis' },
      { hour: 16, activity: 'Success story documentation' }
    ]
  },
  {
    id: 'hum-008',
    name: 'Henry Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry',
    role: 'Backend Engineer',
    status: 'online',
    activity: 'API optimization',
    growth: '+17% API performance',
    helpWanted: 'Database schema review needed',
    hourlyActivity: [
      { hour: 9, activity: 'Code review session' },
      { hour: 10, activity: 'Database query optimization' },
      { hour: 11, activity: 'Team standup' },
      { hour: 12, activity: 'Lunch break' },
      { hour: 13, activity: 'API optimization' },
      { hour: 14, activity: 'Writing API documentation' },
      { hour: 15, activity: 'Performance testing' },
      { hour: 16, activity: 'Code merge and deployment' }
    ]
  }
]

// Agent Suggestions
export const agentSuggestions: AgentSuggestion[] = [
  {
    id: 'agt-001',
    content: 'Consider implementing real-time collaboration features based on high engagement patterns in the use case data.',
    confidence: 92,
    category: 'workflow',
    action: 'Create feature proposal document',
    metadata: { priority: 'high', effort: 'medium' }
  },
  {
    id: 'agt-002',
    content: 'Healthcare use cases show 34% higher satisfaction when AI explanations are included. Add explainability to all medical products.',
    confidence: 88,
    category: 'product',
    action: 'Add explainability module to product roadmap',
    metadata: { priority: 'high', effort: 'high' }
  },
  {
    id: 'agt-003',
    content: 'Cross-functional review meetings are taking 40% longer than optimal. Suggest implementing async review workflow.',
    confidence: 85,
    category: 'workflow',
    action: 'Design async review process',
    metadata: { priority: 'medium', effort: 'low' }
  },
  {
    id: 'agt-004',
    content: 'Enterprise customers in Finance domain have 2.3x higher LTV. Consider dedicated enterprise support tier.',
    confidence: 79,
    category: 'discovery',
    action: 'Research enterprise pricing models',
    metadata: { priority: 'medium', effort: 'high' }
  },
  {
    id: 'agt-005',
    content: 'Token usage efficiency could improve by 25% by batching similar requests in the ML pipeline.',
    confidence: 94,
    category: 'cost',
    action: 'Implement request batching optimization',
    metadata: { priority: 'high', effort: 'medium' }
  },
  {
    id: 'agt-006',
    content: 'User voices indicate demand for mobile-first experience. 68% of feedback mentions mobile accessibility.',
    confidence: 82,
    category: 'product',
    action: 'Start mobile UX audit',
    metadata: { priority: 'high', effort: 'high' }
  },
  {
    id: 'agt-007',
    content: 'Cluster analysis shows potential for new customer segment: "Mid-Market Growth" segment could add 15% revenue.',
    confidence: 76,
    category: 'discovery',
    action: 'Define mid-market customer personas',
    metadata: { priority: 'medium', effort: 'low' }
  },
  {
    id: 'agt-008',
    content: 'Suggestion: Pair junior developers with senior mentors for code review. Data shows 40% faster skill development.',
    confidence: 90,
    category: 'collaboration',
    action: 'Set up mentorship pairing program',
    metadata: { priority: 'medium', effort: 'low' }
  },
  {
    id: 'agt-009',
    content: 'API latency in Healthcare cluster is 18% above target. Recommend infrastructure scaling for EU region.',
    confidence: 91,
    category: 'cost',
    action: 'Evaluate EU infrastructure capacity',
    metadata: { priority: 'high', effort: 'high' }
  },
  {
    id: 'agt-010',
    content: 'Education domain use cases have highest share rate. Consider investing more in learning content features.',
    confidence: 87,
    category: 'product',
    action: 'Create Education feature roadmap',
    metadata: { priority: 'medium', effort: 'medium' }
  },
  {
    id: 'agt-011',
    content: 'Team velocity increased when daily standups moved to async format. Consider full async adoption.',
    confidence: 83,
    category: 'workflow',
    action: 'Pilot async standup for one sprint',
    metadata: { priority: 'low', effort: 'low' }
  },
  {
    id: 'agt-012',
    content: 'Integration requests for EHR systems are trending. Prioritizing FHIR compatibility could open 3 new enterprise deals.',
    confidence: 88,
    category: 'discovery',
    action: 'Research FHIR integration requirements',
    metadata: { priority: 'high', effort: 'high' }
  }
]
