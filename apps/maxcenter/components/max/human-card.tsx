"use client"

import { useState } from "react"
import { type Human } from "@/lib/mock-data"
import { HourlyActivity } from "./hourly-activity"
import { ChevronDown, ChevronUp } from "lucide-react"

interface HumanCardProps {
  human: Human
}

const statusConfig = {
  online: {
    dot: "bg-green-500 dark:bg-green-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  idle: {
    dot: "bg-yellow-500 dark:bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  offline: {
    dot: "bg-gray-400 dark:bg-gray-400",
    badge: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
  },
}

const statusLabels = {
  online: "Online",
  idle: "Idle",
  offline: "Offline",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function HumanCard({ human }: HumanCardProps) {
  const [expanded, setExpanded] = useState(false)
  const status = statusConfig[human.status]

  return (
    <div className="bg-card dark:bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-5">
        {/* Header: Avatar, Name, Role, Status */}
        <div className="flex items-start gap-4">
          {/* Avatar with status indicator */}
          <div className="relative flex-shrink-0">
            {human.avatar.includes("dicebear") ? (
              // Use initials fallback if no image
              <div className="w-14 h-14 rounded-full bg-muted dark:bg-muted flex items-center justify-center">
                <span className="text-lg font-semibold text-muted-foreground">
                  {getInitials(human.name)}
                </span>
              </div>
            ) : (
              <img
                src={human.avatar}
                alt={human.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            )}
            {/* Status dot on avatar */}
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${status.dot}`}
            />
          </div>

          {/* Name, Role, Status text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {human.name}
              </h3>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${status.badge}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {statusLabels[human.status]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {human.role}
            </p>
          </div>
        </div>

        {/* Current Activity */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Currently:</span> {human.activity}
          </p>
        </div>

        {/* Growth & Help Wanted */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-blue-600 dark:text-blue-400">Looking to grow:</span>{" "}
              {human.growth}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-500 mt-1.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-purple-600 dark:text-purple-400">Looking for help:</span>{" "}
              {human.helpWanted}
            </p>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-t border-border -mx-5 px-5 mt-4 pt-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Activity
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Activity
            </>
          )}
        </button>
      </div>

      {/* Expandable Hourly Activity */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Past 8 Hours
          </h4>
          <HourlyActivity activities={human.hourlyActivity} />
        </div>
      )}
    </div>
  )
}
