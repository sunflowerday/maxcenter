"use client"

import { AgentSuggestion } from "@/lib/mock-data"
import { Wrench, Package, Users, DollarSign, Search } from "lucide-react"

interface AgentCardProps {
  suggestion: AgentSuggestion
}

const categoryConfig = {
  workflow: {
    icon: Wrench,
    color: "border-blue-500 dark:border-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-700 dark:text-blue-400",
    label: "Workflow",
  },
  product: {
    icon: Package,
    color: "border-purple-500 dark:border-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-700 dark:text-purple-400",
    label: "Product",
  },
  collaboration: {
    icon: Users,
    color: "border-green-500 dark:border-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-700 dark:text-green-400",
    label: "Collaboration",
  },
  cost: {
    icon: DollarSign,
    color: "border-yellow-500 dark:border-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-700 dark:text-yellow-400",
    label: "Cost",
  },
  discovery: {
    icon: Search,
    color: "border-orange-500 dark:border-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-700 dark:text-orange-400",
    label: "Discovery",
  },
}

function getConfidenceColor(confidence: number): {
  bar: string
  text: string
  bg: string
} {
  if (confidence > 80) {
    return {
      bar: "bg-green-500 dark:bg-green-400",
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
    }
  }
  if (confidence >= 50) {
    return {
      bar: "bg-yellow-500 dark:bg-yellow-400",
      text: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
    }
  }
  return {
    bar: "bg-red-500 dark:bg-red-400",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
  }
}

export function AgentCard({ suggestion }: AgentCardProps) {
  const category = categoryConfig[suggestion.category]
  const confidenceColors = getConfidenceColor(suggestion.confidence)
  const Icon = category.icon

  return (
    <div
      className={`relative border-l-4 ${category.color} rounded-lg bg-card p-5 shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.textColor}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {category.label}
        </span>
      </div>

      {/* Suggestion Content */}
      <p className="text-base font-medium text-foreground mb-3 leading-relaxed">
        {suggestion.content}
      </p>

      {/* Confidence Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Confidence
          </span>
          <span className={`text-sm font-bold ${confidenceColors.text}`}>
            {suggestion.confidence}%
          </span>
        </div>
        <div className="h-2 bg-secondary dark:bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${confidenceColors.bar} rounded-full transition-all`}
            style={{ width: `${suggestion.confidence}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <div className="mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Recommended Action
        </span>
        <p className="text-sm text-muted-foreground mt-1">{suggestion.action}</p>
      </div>

      {/* Metadata */}
      {Object.keys(suggestion.metadata).length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-border">
          {Object.entries(suggestion.metadata).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground/60 capitalize">{key}:</span>
              <span className="text-xs text-muted-foreground font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
