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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Maxbench</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Benchmark results across different model architectures
          </p>
        </div>

        {/* Run Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border",
              "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
              "text-gray-900 dark:text-gray-100",
              "hover:bg-gray-50 dark:hover:bg-gray-800",
              "transition-colors"
            )}
          >
            <span className="text-sm font-medium">{selectedRun.name}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", dropdownOpen && "rotate-180")} />
          </button>

          {dropdownOpen && (
            <div className={cn(
              "absolute right-0 mt-2 w-64 rounded-lg border",
              "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
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
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    "first:rounded-t-lg last:rounded-b-lg",
                    run.id === selectedRunId && "bg-gray-50 dark:bg-gray-800"
                  )}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {run.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {run.date} - {run.tasks.length} tasks
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
                    "bg-white dark:bg-gray-900 rounded-lg border p-4",
                    idx === 0 ? "border-purple-500 dark:border-purple-500" :
                    idx === 1 ? "border-blue-500 dark:border-blue-500" :
                    "border-amber-500 dark:border-amber-500"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      idx === 0 ? "bg-purple-500" : idx === 1 ? "bg-blue-500" : "bg-amber-500"
                    )} />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {arch.architecture}
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {arch.overallScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Overall Score</div>
                  <div className="mt-4 space-y-1">
                    {Object.entries(arch.domains).map(([domain, score]) => (
                      <div key={domain} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{domain}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{score}</span>
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
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Model Rankings
              </h3>
              <div className="space-y-3">
                {selectedRun.architectures
                  .sort((a, b) => b.overallScore - a.overallScore)
                  .map((arch, idx) => (
                    <div
                      key={arch.architecture}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          idx === 0 ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" :
                          idx === 1 ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" :
                          "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                        )}>
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {arch.architecture}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {Object.keys(arch.domains).length} domains evaluated
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {arch.overallScore.toFixed(1)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "dataset" && (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Task Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Claude 4
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      GPT-5
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Gemini Ultra
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {selectedRun.tasks.map(task => {
                    const claudeScore = task.scores.find(s => s.architecture === "Claude 4")?.score || 0
                    const gptScore = task.scores.find(s => s.architecture === "GPT-5")?.score || 0
                    const geminiScore = task.scores.find(s => s.architecture === "Gemini Ultra")?.score || 0

                    return (
                      <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {task.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                            {task.domain}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            claudeScore >= 90 ? "text-green-600 dark:text-green-400" :
                            claudeScore >= 85 ? "text-blue-600 dark:text-blue-400" :
                            "text-gray-900 dark:text-gray-100"
                          )}>
                            {claudeScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            gptScore >= 90 ? "text-green-600 dark:text-green-400" :
                            gptScore >= 85 ? "text-blue-600 dark:text-blue-400" :
                            "text-gray-900 dark:text-gray-100"
                          )}>
                            {gptScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            geminiScore >= 90 ? "text-green-600 dark:text-green-400" :
                            geminiScore >= 85 ? "text-blue-600 dark:text-blue-400" :
                            "text-gray-900 dark:text-gray-100"
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
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Tasks: {selectedRun.tasks.length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
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
