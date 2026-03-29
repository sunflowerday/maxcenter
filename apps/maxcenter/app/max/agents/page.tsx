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
  if (confidence > 80) return "text-green-600"
  if (confidence >= 50) return "text-yellow-600"
  return "text-red-600"
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
        acc[cat.value] = agentSuggestions.filter((s) => s.category === cat.value).length
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Agent Suggestions
        </h1>
        <p className="text-gray-500">
          Intelligent insights and recommendations powered by analysis of your product data
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-3xl font-bold text-blue-700">{stats.total}</div>
          <div className="text-sm text-blue-600 font-medium">Total Suggestions</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className={`text-3xl font-bold ${getConfidenceColor(stats.avgConfidence)}`}>
            {stats.avgConfidence}%
          </div>
          <div className="text-sm text-purple-600 font-medium">Average Confidence</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="text-3xl font-bold text-green-700">
            {agentSuggestions.filter((s) => s.confidence > 80).length}
          </div>
          <div className="text-sm text-green-600 font-medium">High Confidence</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="text-3xl font-bold text-orange-700">
            {Object.keys(stats.byCategory).length}
          </div>
          <div className="text-sm text-orange-600 font-medium">Categories</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">By Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.slice(1).map((cat) => {
            const Icon = cat.icon
            const count = stats.byCategory[cat.value]
            return (
              <div
                key={cat.value}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200"
              >
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                <span className="text-sm font-bold text-gray-900">{count}</span>
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
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
              {cat.value !== "all" && (
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                    isActive ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-500"
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
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No suggestions found for this category.</p>
        </div>
      )}
    </div>
  )
}
