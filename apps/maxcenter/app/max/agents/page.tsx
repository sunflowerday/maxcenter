"use client"

import { useState, useMemo } from "react"
import { AgentCard } from "@/components/max/agent-card"
import { agentSuggestions, AgentSuggestion } from "@/lib/mock-data"
import { Wrench, Package, Users, DollarSign, Search, Sparkles } from "lucide-react"

type Category = AgentSuggestion["category"]

const categories: { value: Category | "all"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "all", label: "All", icon: Sparkles },
  { value: "workflow", label: "Workflow", icon: Wrench },
  { value: "product", label: "Product", icon: Package },
  { value: "collaboration", label: "Collaboration", icon: Users },
  { value: "cost", label: "Cost", icon: DollarSign },
  { value: "discovery", label: "Discovery", icon: Search },
]

function getConfidenceColor(confidence: number): string {
  if (confidence > 80) return "text-green-600 dark:text-green-400"
  if (confidence >= 50) return "text-yellow-600 dark:text-yellow-400"
  return "text-red-600 dark:text-red-400"
}

export default function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")

  const filteredSuggestions = useMemo(() => {
    if (selectedCategory === "all") return agentSuggestions
    return agentSuggestions.filter((s) => s.category === selectedCategory)
  }, [selectedCategory])

  const stats = useMemo(() => {
    const total = agentSuggestions.length
    const avgConfidence = Math.round(
      agentSuggestions.reduce((sum, s) => sum + s.confidence, 0) / total
    )
    const byCategory = categories.slice(1).reduce(
      (acc, cat) => {
        acc[cat.value as Category] = agentSuggestions.filter((s) => s.category === cat.value).length
        return acc
      },
      {} as Record<Category, number>
    )
    return { total, avgConfidence, byCategory }
  }, [])

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AI Agent Suggestions
        </h1>
        <p className="text-muted-foreground">
          Intelligent insights and recommendations powered by analysis of your product data
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{stats.total}</div>
          <div className="text-sm text-blue-600 dark:text-blue-500 font-medium">Total Suggestions</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className={`text-3xl font-bold ${getConfidenceColor(stats.avgConfidence)}`}>
            {stats.avgConfidence}%
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-500 font-medium">Average Confidence</div>
        </div>
        <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="text-3xl font-bold text-green-700 dark:text-green-400">
            {agentSuggestions.filter((s) => s.confidence > 80).length}
          </div>
          <div className="text-sm text-green-600 dark:text-green-500 font-medium">High Confidence</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
            {Object.keys(stats.byCategory).length}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-500 font-medium">Categories</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-card rounded-xl p-4 border border-border mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-3">By Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.slice(1).map((cat) => {
            const Icon = cat.icon
            const count = stats.byCategory[cat.value as Category]
            return (
              <div
                key={cat.value}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
                <span className="text-sm font-bold text-foreground">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground border border-border hover:bg-muted hover:border-muted-foreground/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
              {cat.value !== "all" && (
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stats.byCategory[cat.value as Category] || 0}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuggestions.map((suggestion) => (
          <AgentCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">No suggestions found for this category.</p>
        </div>
      )}
    </div>
  )
}
