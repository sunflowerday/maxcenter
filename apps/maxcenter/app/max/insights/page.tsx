"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Brain, BarChart3, Users, Activity, ChevronRight, Play, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type TabType = "insights" | "deep-analysis"

interface MemberInsight {
  member_id: string
  member_name: string
  period_start: string
  period_end: string
  insights: {
    total_sessions: number
    total_messages: number
    total_hours: number
    tool_calls: number
    friction_signals: string[]
    outcomes: string[]
    goal_categories: string[]
    languages: string[]
    friction_score: number
  }
  raw_html?: string
}

interface DeepAnalysis {
  content: string
  generated_at: string
  status: "idle" | "generating" | "done" | "error"
}

// Mock data for demo when API returns empty
const mockInsights: MemberInsight[] = [
  {
    member_id: "member-1",
    member_name: "Alice Chen",
    period_start: "2026-03-30T00:00:00Z",
    period_end: "2026-03-31T00:00:00Z",
    insights: {
      total_sessions: 12,
      total_messages: 847,
      total_hours: 28.5,
      tool_calls: 342,
      friction_signals: [
        "Repeated authentication prompts",
        "Context loss on page refresh",
        "Slow file search results"
      ],
      outcomes: [
        "Completed API integration",
        "Fixed authentication flow",
        "Deployed v2.3.1 release"
      ],
      goal_categories: ["Backend Development", "DevOps", "Code Review"],
      languages: ["TypeScript", "Python", "Go"],
      friction_score: 32
    }
  },
  {
    member_id: "member-2",
    member_name: "Bob Martinez",
    period_start: "2026-03-30T00:00:00Z",
    period_end: "2026-03-31T00:00:00Z",
    insights: {
      total_sessions: 8,
      total_messages: 523,
      total_hours: 19.2,
      tool_calls: 189,
      friction_signals: [
        "Unclear error messages",
        "Missing documentation for new endpoints"
      ],
      outcomes: [
        "Designed new microservice architecture",
        "Created Swagger documentation"
      ],
      goal_categories: ["Architecture", "Documentation"],
      languages: ["Java", "TypeScript"],
      friction_score: 18
    }
  },
  {
    member_id: "member-3",
    member_name: "Carol Wang",
    period_start: "2026-03-30T00:00:00Z",
    period_end: "2026-03-31T00:00:00Z",
    insights: {
      total_sessions: 15,
      total_messages: 1203,
      total_hours: 34.8,
      tool_calls: 567,
      friction_signals: [
        "Large PR reviews timing out",
        "Test suite instability",
        "Environment configuration issues"
      ],
      outcomes: [
        "Completed 3 major feature PRs",
        "Reduced test suite runtime by 40%",
        "Mentored 2 junior developers"
      ],
      goal_categories: ["Frontend Development", "Testing", "Mentoring"],
      languages: ["React", "TypeScript", "Jest"],
      friction_score: 58
    }
  },
  {
    member_id: "member-4",
    member_name: "David Kim",
    period_start: "2026-03-30T00:00:00Z",
    period_end: "2026-03-31T00:00:00Z",
    insights: {
      total_sessions: 6,
      total_messages: 298,
      total_hours: 14.3,
      tool_calls: 87,
      friction_signals: [],
      outcomes: [
        "Optimized database queries",
        "Implemented caching layer"
      ],
      goal_categories: ["Performance", "Database"],
      languages: ["SQL", "Python", "Redis"],
      friction_score: 12
    }
  }
]

const mockDeepAnalysis: DeepAnalysis = {
  content: `# Team Performance Deep Analysis

## Executive Summary

The team has shown **18% improvement** in overall productivity compared to the previous period. Key drivers include reduced friction in the development workflow and more effective use of parallel sessions.

## Key Findings

### 1. Friction Hotspots
- **Authentication flows** remain the primary friction source (mentioned by 3/4 team members)
- **PR review bottlenecks** in the frontend team causing 15% slowdown
- **Documentation gaps** for newer microservices

### 2. Successful Patterns
- Multi-session parallel work is most effective for complex features
- Tool call efficiency (messages/tool_calls ratio) correlates strongly with outcome quality
- Early friction signal detection prevents escalation

### 3. Recommendations

#### Immediate (This Week)
1. Implement token refresh middleware to eliminate repeated auth prompts
2. Add PR review timeouts to prevent blocking
3. Create quick-start guides for 3 new endpoints

#### Short-term (This Month)
1. Deploy parallel review system for large PRs
2. Establish documentation rotation schedule
3. Add automated friction monitoring

#### Long-term (This Quarter)
1. Redesign authentication UX with session persistence
2. Implement AI-assisted code review
3. Build team-wide insights dashboard

## Team Dynamics

| Member | Sessions | Efficiency | Friction | Trend |
|--------|----------|------------|----------|-------|
| Alice Chen | 12 | High | Medium | Improving |
| Bob Martinez | 8 | Very High | Low | Stable |
| Carol Wang | 15 | Medium | High | Needs Attention |
| David Kim | 6 | Very High | Very Low | Excellent |

## Risk Factors

- **Carol's high friction score** may indicate burnout or overload
- **Documentation debt** accumulating on newer services
- **Test instability** could erode confidence in deployments

## Action Items

- [ ] Schedule 1:1 with Carol to discuss workload
- [ ] Priority ticket for auth middleware (this sprint)
- [ ] Documentation sprint for Q2 microservices`,
  generated_at: new Date().toISOString(),
  status: "done"
}

function FrictionBadge({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s < 20) return "bg-green-100 text-green-700 border-green-200"
    if (s < 40) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    if (s < 60) return "bg-orange-100 text-orange-700 border-orange-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  const getLabel = (s: number) => {
    if (s < 20) return "Low"
    if (s < 40) return "Medium"
    if (s < 60) return "High"
    return "Critical"
  }

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", getColor(score))}>
      {getLabel(score)} ({score})
    </span>
  )
}

function InsightCard({ insight }: { insight: MemberInsight }) {
  return (
    <div className="bg-background rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {insight.member_name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{insight.member_name}</h3>
            <p className="text-xs text-muted-foreground">
              {new Date(insight.period_start).toLocaleDateString()} - {new Date(insight.period_end).toLocaleDateString()}
            </p>
          </div>
        </div>
        <FrictionBadge score={insight.insights.friction_score} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-xs">Sessions</span>
          </div>
          <div className="text-xl font-bold text-foreground">{insight.insights.total_sessions}</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">Messages</span>
          </div>
          <div className="text-xl font-bold text-foreground">{insight.insights.total_messages}</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="text-xs">Hours</span>
          </div>
          <div className="text-xl font-bold text-foreground">{insight.insights.total_hours.toFixed(1)}</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Brain className="w-3.5 h-3.5" />
            <span className="text-xs">Tool Calls</span>
          </div>
          <div className="text-xl font-bold text-foreground">{insight.insights.tool_calls}</div>
        </div>
      </div>

      {/* Friction Signals */}
      {insight.insights.friction_signals.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-orange-500" />
            Friction Signals
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {insight.insights.friction_signals.map((signal, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md border border-orange-100"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Outcomes */}
      {insight.insights.outcomes.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Outcomes</h4>
          <ul className="space-y-1">
            {insight.insights.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer: Categories & Languages */}
      <div className="flex flex-wrap gap-4 pt-3 border-t border-border">
        <div>
          <span className="text-xs text-muted-foreground block mb-1">Goals</span>
          <div className="flex flex-wrap gap-1">
            {insight.insights.goal_categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs text-muted-foreground block mb-1">Languages</span>
          <div className="flex flex-wrap gap-1">
            {insight.insights.languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightsTab({ insights }: { insights: MemberInsight[] }) {
  const [filter, setFilter] = useState<"all" | "high-friction" | "low-friction">("all")

  const filteredInsights = insights.filter(item => {
    if (filter === "all") return true
    if (filter === "high-friction") return item.insights.friction_score >= 40
    if (filter === "low-friction") return item.insights.friction_score < 40
    return true
  })

  const avgFriction = insights.length > 0
    ? Math.round(insights.reduce((sum, i) => sum + i.insights.friction_score, 0) / insights.length)
    : 0

  const totalSessions = insights.reduce((sum, i) => sum + i.insights.total_sessions, 0)
  const totalMessages = insights.reduce((sum, i) => sum + i.insights.total_messages, 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-80 mb-1">Team Members</div>
          <div className="text-3xl font-bold">{insights.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-80 mb-1">Total Sessions</div>
          <div className="text-3xl font-bold">{totalSessions}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-80 mb-1">Avg Friction Score</div>
          <div className="text-3xl font-bold">{avgFriction}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-80 mb-1">Total Messages</div>
          <div className="text-3xl font-bold">{totalMessages.toLocaleString()}</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All Members
        </button>
        <button
          onClick={() => setFilter("high-friction")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "high-friction"
              ? "bg-orange-500 text-white"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          High Friction
        </button>
        <button
          onClick={() => setFilter("low-friction")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "low-friction"
              ? "bg-green-500 text-white"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          Low Friction
        </button>
      </div>

      {/* Insight Cards Grid */}
      {filteredInsights.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No insights match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <InsightCard key={insight.member_id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  )
}

function DeepAnalysisTab() {
  const [analysis, setAnalysis] = useState<DeepAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchAnalysis = useCallback(async () => {
    try {
      const res = await fetch("/api/team/deep-analysis")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setAnalysis(data)
    } catch (error) {
      // Use mock data on error
      setAnalysis(mockDeepAnalysis)
    }
  }, [])

  useEffect(() => {
    fetchAnalysis()
  }, [fetchAnalysis])

  const triggerDeepAnalysis = async () => {
    setLoading(true)
    toast.loading("Generating deep analysis...", { id: "deep-analysis" })

    try {
      const res = await fetch("/api/team/deep-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: true })
      })

      if (!res.ok) throw new Error("Failed to trigger analysis")

      const data = await res.json()
      setAnalysis(data)
      toast.success("Deep analysis generated successfully!", { id: "deep-analysis" })
    } catch (error) {
      toast.error("Failed to generate analysis. Using demo data.", { id: "deep-analysis" })
      setAnalysis(mockDeepAnalysis)
    } finally {
      setLoading(false)
    }
  }

  // Simple markdown renderer (handles basic formatting)
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactElement[] = []
    let inList = false
    let listItems: string[] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1 mb-4">
            {listItems.map((item, i) => (
              <li key={i} className="text-foreground">{renderInline(item)}</li>
            ))}
          </ul>
        )
        listItems = []
      }
      inList = false
    }

    const renderInline = (text: string) => {
      // Bold
      text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Code
      text = text.replace(/`(.+?)`/g, "<code className='px-1 py-0.5 bg-muted rounded text-sm'>$1</code>")
      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    lines.forEach((line, idx) => {
      const trimmed = line.trim()

      // Checkbox item
      if (trimmed.startsWith("- [ ]") || trimmed.startsWith("- [x]")) {
        flushList()
        const checked = trimmed.startsWith("- [x]")
        const text = trimmed.replace(/^- \[[ x]\] /, "")
        elements.push(
          <div key={idx} className="flex items-start gap-2 mb-2">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className={checked ? "line-through text-muted-foreground" : "text-foreground"}>
              {renderInline(text)}
            </span>
          </div>
        )
        return
      }

      // List item
      if (trimmed.startsWith("- ")) {
        inList = true
        listItems.push(trimmed.replace(/^- /, ""))
        return
      }

      // Regular list continuation
      if (trimmed.match(/^\d+\.\s/) && inList) {
        listItems.push(trimmed.replace(/^\d+\.\s/, ""))
        return
      }

      flushList()

      // Heading 1
      if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={idx} className="text-2xl font-bold text-foreground mb-4 mt-6">
            {trimmed.replace(/^# /, "")}
          </h1>
        )
        return
      }

      // Heading 2
      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={idx} className="text-xl font-semibold text-foreground mb-3 mt-5">
            {trimmed.replace(/^## /, "")}
          </h2>
        )
        return
      }

      // Heading 3
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={idx} className="text-lg font-medium text-foreground mb-2 mt-4">
            {trimmed.replace(/^### /, "")}
          </h3>
        )
        return
      }

      // Table row
      if (trimmed.startsWith("|")) {
        const cells = trimmed.split("|").filter(c => c.trim() && c.trim() !== "---")
        if (cells.length > 0 && !trimmed.includes("---")) {
          const isHeader = elements.length === 0 || elements[elements.length - 1]?.type !== "table"
          elements.push(
            <div key={idx} className={cn("grid gap-2 mb-1", `grid-cols-${cells.length}`)}>
              {cells.map((cell, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-2",
                    isHeader ? "bg-muted font-medium text-sm" : "text-sm",
                    trimmed.startsWith("|---") ? "" : "border border-border rounded"
                  )}
                >
                  {renderInline(cell.trim())}
                </div>
              ))}
            </div>
          )
        }
        return
      }

      // Empty line
      if (!trimmed) {
        elements.push(<div key={idx} className="h-2" />)
        return
      }

      // Paragraph
      elements.push(
        <p key={idx} className="text-foreground mb-4 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      )
    })

    flushList()
    return elements
  }

  return (
    <div className="space-y-6">
      {/* Header with trigger button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Team Deep Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered insights and recommendations based on team performance data
          </p>
        </div>
        <button
          onClick={triggerDeepAnalysis}
          disabled={loading}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "触发深度分析"}
        </button>
      </div>

      {/* Analysis Content */}
      {analysis ? (
        <div className="bg-background rounded-lg border border-border p-6">
          {analysis.status === "generating" ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating comprehensive analysis...</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {renderMarkdown(analysis.content)}
            </div>
          )}

          {analysis.generated_at && (
            <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
              Last updated: {new Date(analysis.generated_at).toLocaleString()}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-background rounded-lg border border-border p-6 text-center py-12">
          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No analysis available. Click the button above to generate one.</p>
        </div>
      )}
    </div>
  )
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("insights")
  const [insights, setInsights] = useState<MemberInsight[]>([])
  const [loading, setLoading] = useState(true)

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "insights", label: "洞察详情", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "deep-analysis", label: "深度分析", icon: <Brain className="h-4 w-4" /> }
  ]

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch("/api/insights/latest")
        const data = await res.json()

        if (data.insights && data.insights.length > 0) {
          // Transform API data to our format
          const transformed: MemberInsight[] = data.insights.map((row: any) => {
            let parsedInsights: any = {}
            try {
              parsedInsights = typeof row.insights_data === "string"
                ? JSON.parse(row.insights_data)
                : row.insights_data || {}
            } catch {
              parsedInsights = {}
            }

            return {
              member_id: row.member_id,
              member_name: row.member_name || row.member_id,
              period_start: row.period_start || row.created_at,
              period_end: row.period_end || row.created_at,
              insights: {
                total_sessions: parsedInsights.total_sessions || 0,
                total_messages: parsedInsights.total_messages || 0,
                total_hours: parsedInsights.total_hours || 0,
                tool_calls: parsedInsights.tool_calls || 0,
                friction_signals: parsedInsights.friction_signals || [],
                outcomes: parsedInsights.outcomes || [],
                goal_categories: parsedInsights.goal_categories || [],
                languages: parsedInsights.languages || [],
                friction_score: parsedInsights.friction_score || 0
              },
              raw_html: row.raw_html
            }
          })
          setInsights(transformed)
        } else {
          // Use mock data for demo
          setInsights(mockInsights)
        }
      } catch (error) {
        console.warn("Failed to fetch insights, using demo data:", error)
        setInsights(mockInsights)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Insights</h1>
          <p className="text-sm text-muted-foreground">
            Monitor team performance, friction signals, and outcomes
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading insights...</p>
        </div>
      ) : (
        <>
          {activeTab === "insights" && <InsightsTab insights={insights} />}
          {activeTab === "deep-analysis" && <DeepAnalysisTab />}
        </>
      )}
    </div>
  )
}
