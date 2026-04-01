import { AgentSuggestion, BenchmarkRun } from "./types"

export const benchmarkRuns: BenchmarkRun[] = [
  {
    id: 'run-001',
    name: 'Q1 2026 Benchmark',
    date: '2026-03-15',
    tasks: [
      {
        id: 'task-001',
        name: 'Code Generation',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 92 },
          { architecture: 'GPT-5', score: 89 },
          { architecture: 'Gemini Ultra', score: 87 }
        ]
      },
      {
        id: 'task-002',
        name: 'Math Reasoning',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 88 },
          { architecture: 'GPT-5', score: 91 },
          { architecture: 'Gemini Ultra', score: 85 }
        ]
      },
      {
        id: 'task-003',
        name: 'Creative Writing',
        domain: 'Writing',
        scores: [
          { architecture: 'Claude 4', score: 95 },
          { architecture: 'GPT-5', score: 93 },
          { architecture: 'Gemini Ultra', score: 90 }
        ]
      },
      {
        id: 'task-004',
        name: 'Medical Diagnosis',
        domain: 'Healthcare',
        scores: [
          { architecture: 'Claude 4', score: 87 },
          { architecture: 'GPT-5', score: 85 },
          { architecture: 'Gemini Ultra', score: 92 }
        ]
      },
      {
        id: 'task-005',
        name: 'Financial Analysis',
        domain: 'Finance',
        scores: [
          { architecture: 'Claude 4', score: 90 },
          { architecture: 'GPT-5', score: 88 },
          { architecture: 'Gemini Ultra', score: 86 }
        ]
      },
      {
        id: 'task-006',
        name: 'Legal Document Review',
        domain: 'Legal',
        scores: [
          { architecture: 'Claude 4', score: 86 },
          { architecture: 'GPT-5', score: 90 },
          { architecture: 'Gemini Ultra', score: 83 }
        ]
      },
      {
        id: 'task-007',
        name: 'Code Debugging',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 94 },
          { architecture: 'GPT-5', score: 91 },
          { architecture: 'Gemini Ultra', score: 88 }
        ]
      },
      {
        id: 'task-008',
        name: 'Data Analysis',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 89 },
          { architecture: 'GPT-5', score: 87 },
          { architecture: 'Gemini Ultra', score: 91 }
        ]
      }
    ],
    architectures: [
      {
        architecture: 'Claude 4',
        overallScore: 90.1,
        domains: {
          Coding: 93,
          Analysis: 88.5,
          Writing: 95,
          Healthcare: 87,
          Finance: 90,
          Legal: 86
        }
      },
      {
        architecture: 'GPT-5',
        overallScore: 89.0,
        domains: {
          Coding: 90,
          Analysis: 89,
          Writing: 93,
          Healthcare: 85,
          Finance: 88,
          Legal: 90
        }
      },
      {
        architecture: 'Gemini Ultra',
        overallScore: 87.8,
        domains: {
          Coding: 87.5,
          Analysis: 88,
          Writing: 90,
          Healthcare: 92,
          Finance: 86,
          Legal: 83
        }
      }
    ]
  },
  {
    id: 'run-002',
    name: 'Q4 2025 Benchmark',
    date: '2025-12-10',
    tasks: [
      {
        id: 'task-001',
        name: 'Code Generation',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 88 },
          { architecture: 'GPT-5', score: 85 },
          { architecture: 'Gemini Ultra', score: 82 }
        ]
      },
      {
        id: 'task-002',
        name: 'Math Reasoning',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 84 },
          { architecture: 'GPT-5', score: 87 },
          { architecture: 'Gemini Ultra', score: 80 }
        ]
      },
      {
        id: 'task-003',
        name: 'Creative Writing',
        domain: 'Writing',
        scores: [
          { architecture: 'Claude 4', score: 92 },
          { architecture: 'GPT-5', score: 90 },
          { architecture: 'Gemini Ultra', score: 86 }
        ]
      },
      {
        id: 'task-004',
        name: 'Medical Diagnosis',
        domain: 'Healthcare',
        scores: [
          { architecture: 'Claude 4', score: 82 },
          { architecture: 'GPT-5', score: 80 },
          { architecture: 'Gemini Ultra', score: 88 }
        ]
      },
      {
        id: 'task-005',
        name: 'Financial Analysis',
        domain: 'Finance',
        scores: [
          { architecture: 'Claude 4', score: 86 },
          { architecture: 'GPT-5', score: 84 },
          { architecture: 'Gemini Ultra', score: 82 }
        ]
      },
      {
        id: 'task-006',
        name: 'Legal Document Review',
        domain: 'Legal',
        scores: [
          { architecture: 'Claude 4', score: 82 },
          { architecture: 'GPT-5', score: 86 },
          { architecture: 'Gemini Ultra', score: 78 }
        ]
      },
      {
        id: 'task-007',
        name: 'Code Debugging',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 90 },
          { architecture: 'GPT-5', score: 87 },
          { architecture: 'Gemini Ultra', score: 84 }
        ]
      },
      {
        id: 'task-008',
        name: 'Data Analysis',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 85 },
          { architecture: 'GPT-5', score: 83 },
          { architecture: 'Gemini Ultra', score: 87 }
        ]
      }
    ],
    architectures: [
      {
        architecture: 'Claude 4',
        overallScore: 86.1,
        domains: {
          Coding: 89,
          Analysis: 84.5,
          Writing: 92,
          Healthcare: 82,
          Finance: 86,
          Legal: 82
        }
      },
      {
        architecture: 'GPT-5',
        overallScore: 84.6,
        domains: {
          Coding: 86,
          Analysis: 85,
          Writing: 90,
          Healthcare: 80,
          Finance: 84,
          Legal: 86
        }
      },
      {
        architecture: 'Gemini Ultra',
        overallScore: 83.4,
        domains: {
          Coding: 83,
          Analysis: 83.5,
          Writing: 86,
          Healthcare: 88,
          Finance: 82,
          Legal: 78
        }
      }
    ]
  },
  {
    id: 'run-003',
    name: 'Q2 2025 Benchmark',
    date: '2025-06-20',
    tasks: [
      {
        id: 'task-001',
        name: 'Code Generation',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 82 },
          { architecture: 'GPT-5', score: 79 },
          { architecture: 'Gemini Ultra', score: 75 }
        ]
      },
      {
        id: 'task-002',
        name: 'Math Reasoning',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 78 },
          { architecture: 'GPT-5', score: 81 },
          { architecture: 'Gemini Ultra', score: 73 }
        ]
      },
      {
        id: 'task-003',
        name: 'Creative Writing',
        domain: 'Writing',
        scores: [
          { architecture: 'Claude 4', score: 88 },
          { architecture: 'GPT-5', score: 86 },
          { architecture: 'Gemini Ultra', score: 81 }
        ]
      },
      {
        id: 'task-004',
        name: 'Medical Diagnosis',
        domain: 'Healthcare',
        scores: [
          { architecture: 'Claude 4', score: 76 },
          { architecture: 'GPT-5', score: 74 },
          { architecture: 'Gemini Ultra', score: 83 }
        ]
      },
      {
        id: 'task-005',
        name: 'Financial Analysis',
        domain: 'Finance',
        scores: [
          { architecture: 'Claude 4', score: 81 },
          { architecture: 'GPT-5', score: 79 },
          { architecture: 'Gemini Ultra', score: 77 }
        ]
      },
      {
        id: 'task-006',
        name: 'Legal Document Review',
        domain: 'Legal',
        scores: [
          { architecture: 'Claude 4', score: 77 },
          { architecture: 'GPT-5', score: 81 },
          { architecture: 'Gemini Ultra', score: 72 }
        ]
      },
      {
        id: 'task-007',
        name: 'Code Debugging',
        domain: 'Coding',
        scores: [
          { architecture: 'Claude 4', score: 85 },
          { architecture: 'GPT-5', score: 82 },
          { architecture: 'Gemini Ultra', score: 79 }
        ]
      },
      {
        id: 'task-008',
        name: 'Data Analysis',
        domain: 'Analysis',
        scores: [
          { architecture: 'Claude 4', score: 80 },
          { architecture: 'GPT-5', score: 78 },
          { architecture: 'Gemini Ultra', score: 82 }
        ]
      }
    ],
    architectures: [
      {
        architecture: 'Claude 4',
        overallScore: 80.9,
        domains: {
          Coding: 83.5,
          Analysis: 79,
          Writing: 88,
          Healthcare: 76,
          Finance: 81,
          Legal: 77
        }
      },
      {
        architecture: 'GPT-5',
        overallScore: 80.0,
        domains: {
          Coding: 80.5,
          Analysis: 79.5,
          Writing: 86,
          Healthcare: 74,
          Finance: 79,
          Legal: 81
        }
      },
      {
        architecture: 'Gemini Ultra',
        overallScore: 77.8,
        domains: {
          Coding: 77,
          Analysis: 77.5,
          Writing: 81,
          Healthcare: 83,
          Finance: 77,
          Legal: 72
        }
      }
    ]
  }
]

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

