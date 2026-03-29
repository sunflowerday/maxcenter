"use client"

import { type HourlyActivity } from "@/lib/mock-data"

interface HourlyActivityProps {
  activities: HourlyActivity[]
}

export function HourlyActivity({ activities }: HourlyActivityProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {activities.map((item) => (
        <div
          key={item.hour}
          className="flex-shrink-0 flex flex-col items-center"
        >
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            {item.hour}:00
          </span>
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="mt-2 w-20 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight truncate">
              {item.activity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
