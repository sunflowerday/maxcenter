"use client"

import { useState } from "react"
import { benchmarkRuns, type BenchmarkRun } from "@/lib/mock-data"
import { BenchChart } from "@/components/max/bench-chart"
import { cn } from "@/lib/utils"
import { ChevronDown, BarChart3, TrendingUp, Table2 } from "lucide-react"

type TabType = "architecture" | "model" | "dataset"

export default function BenchPage() {
  const [selectedRunId, setSelectedRunId] = useState(benchmarkRuns[0].id)
  const [activeTab, setActiveTab] = useState<TabType>("architecture")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const selectedRun = benchmarkRuns.find(run => run.id === selectedRunId) as BenchmarkRun

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "architecture", label: "By Architecture", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "model", label: "By Model", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "dataset", label: "Dataset", icon: <Table2 className="h-4 w-4" /> }
  ]

  // Data for By Architecture tab - grouped bar chart by domain
  const architectureByDomainData = selectedRun.architectures.map(arch => ({
    name: arch.architecture,
    ...arch.domains
  }))

  // Data for By Architecture tab - radar chart
  const radarData = Object.keys(selectedRun.architectures[0].domains).map(domain => {
    const entry: Record<string, string | number> = { domain }
    selectedRun.architectures.forEach(arch => {
      entry[arch.architecture] = arch.domains[domain]
    })
    return entry
  })

  // Data for By Model tab - line chart showing score distribution
  const modelScoreDistribution = selectedRun.tasks.map(task => {
    const entry: Record<string, string | number> = {
      name: task.name.length > 15 ? task.name.substring(0, 15) + "..." : task.name,
      domain: task.domain
    }
    task.scores.forEach(score => {
      entry[score.architecture] = score.score
    })
    return entry
  })

  // Data for By Model tab - overall scores bar chart
  const overallScores = selectedRun.architectures.map(arch => ({
    name: arch.architecture,
    score: arch.overallScore
  }))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maxbench</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Benchmark results across different model architectures
          </p>
        </div>

        {/* Run Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border",
              "bg-background border-border",
              "text-foreground",
              "hover:bg-muted",
              "transition-colors"
            )}
          >
            <span className="text-sm font-medium">{selectedRun.name}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", dropdownOpen && "rotate-180")} />
          </button>

          {dropdownOpen && (
            <div className={cn(
              "absolute right-0 mt-2 w-64 rounded-lg border",
              "bg-background border-border",
              "shadow-lg z-50"
            )}>
              {benchmarkRuns.map(run => (
                <button
                  key={run.id}
                  onClick={() => {
                    setSelectedRunId(run.id)
                    setDropdownOpen(false)
                  }}
                  className={cn(
                    "w-full px-4 py-3 text-left",
                    "hover:bg-muted",
                    "first:rounded-t-lg last:rounded-b-lg",
                    run.id === selectedRunId && "bg-muted"
                  )}
                >
                  <div className="text-sm font-medium text-foreground">
                    {run.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {run.date} - {run.tasks.length} tasks
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map(tab => (
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
      <div className="space-y-6">
        {activeTab === "architecture" && (
          <>
            {/* Grouped Bar Chart */}
            <BenchChart
              data={architectureByDomainData}
              type="bar"
              title="Architecture Scores by Domain"
            />

            {/* Radar Chart */}
            <BenchChart
              data={radarData}
              type="radar"
              title="Architecture Comparison (Radar)"
            />

            {/* Architecture Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedRun.architectures.map((arch, idx) => (
                <div
                  key={arch.architecture}
                  className={cn(
                    "bg-background rounded-lg border p-4",
                    idx === 0 ? "border-purple-500" :
                    idx === 1 ? "border-blue-500" :
                    "border-amber-500"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      idx === 0 ? "bg-purple-500" : idx === 1 ? "bg-blue-500" : "bg-amber-500"
                    )} />
                    <h3 className="font-semibold text-foreground">
                      {arch.architecture}
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {arch.overallScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="mt-4 space-y-1">
                    {Object.entries(arch.domains).map(([domain, score]) => (
                      <div key={domain} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{domain}</span>
                        <span className="font-medium text-foreground">{score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "model" && (
          <>
            {/* Overall Scores Bar Chart */}
            <BenchChart
              data={overallScores}
              type="bar"
              title="Overall Scores by Architecture"
            />

            {/* Score Distribution Line Chart */}
            <BenchChart
              data={modelScoreDistribution}
              type="line"
              title="Score Distribution Across Tasks"
            />

            {/* Model Rankings */}
            <div className="bg-background rounded-lg border border-border p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Model Rankings
              </h3>
              <div className="space-y-3">
                {selectedRun.architectures
                  .sort((a, b) => b.overallScore - a.overallScore)
                  .map((arch, idx) => (
                    <div
                      key={arch.architecture}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          idx === 0 ? "bg-purple-100 text-purple-600" :
                          idx === 1 ? "bg-blue-100 text-blue-600" :
                          "bg-amber-100 text-amber-600"
                        )}>
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {arch.architecture}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Object.keys(arch.domains).length} domains evaluated
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {arch.overallScore.toFixed(1)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "dataset" && (
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Task Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Claude 4
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      GPT-5
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Gemini Ultra
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedRun.tasks.map(task => {
                    const claudeScore = task.scores.find(s => s.architecture === "Claude 4")?.score || 0
                    const gptScore = task.scores.find(s => s.architecture === "GPT-5")?.score || 0
                    const geminiScore = task.scores.find(s => s.architecture === "Gemini Ultra")?.score || 0

                    return (
                      <tr key={task.id} className="hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {task.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                            {task.domain}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            claudeScore >= 90 ? "text-green-600" :
                            claudeScore >= 85 ? "text-blue-600" :
                            "text-foreground"
                          )}>
                            {claudeScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            gptScore >= 90 ? "text-green-600" :
                            gptScore >= 85 ? "text-blue-600" :
                            "text-foreground"
                          )}>
                            {gptScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            geminiScore >= 90 ? "text-green-600" :
                            geminiScore >= 85 ? "text-blue-600" :
                            "text-foreground"
                          )}>
                            {geminiScore}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="px-4 py-3 border-t border-border bg-muted">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total Tasks: {selectedRun.tasks.length}
                </span>
                <span className="text-muted-foreground">
                  Average across architectures: {
                    (selectedRun.architectures.reduce((sum, a) => sum + a.overallScore, 0) / selectedRun.architectures.length).toFixed(1)
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
