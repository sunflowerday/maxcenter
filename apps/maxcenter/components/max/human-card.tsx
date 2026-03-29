"use client"

import { useState } from "react"
import { type Human } from "@/lib/mock-data"
import { HourlyActivity } from "./hourly-activity"
import { ChevronDown, ChevronUp } from "lucide-react"

interface HumanCardProps {
  human: Human
}

const statusColors = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  offline: "bg-gray-400",
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5">
        {/* Header: Avatar, Name, Role, Status */}
        <div className="flex items-start gap-4">
          {/* Avatar with status indicator */}
          <div className="relative flex-shrink-0">
            {human.avatar.includes("dicebear") ? (
              // Use initials fallback if no image
              <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
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
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${statusColors[human.status]}`}
            />
          </div>

          {/* Name, Role, Status text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {human.name}
              </h3>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${human.status === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : human.status === 'idle' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${statusColors[human.status]}`} />
                {statusLabels[human.status]}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {human.role}
            </p>
          </div>
        </div>

        {/* Current Activity */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Currently:</span> {human.activity}
          </p>
        </div>

        {/* Growth & Help Wanted */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-blue-600 dark:text-blue-400">Looking to grow:</span>{" "}
              {human.growth}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-purple-600 dark:text-purple-400">Looking for help:</span>{" "}
              {human.helpWanted}
            </p>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors border-t border-gray-100 dark:border-gray-700 -mx-5 px-5 mt-4 pt-4"
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
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Past 8 Hours
          </h4>
          <HourlyActivity activities={human.hourlyActivity} />
        </div>
      )}
    </div>
  )
}
