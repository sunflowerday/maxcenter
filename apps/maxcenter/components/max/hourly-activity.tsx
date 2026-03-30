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
          className="flex-shrink-0 flex flex-col items-center min-w-[4rem]"
        >
          <span className="text-xs font-medium text-muted-foreground mb-1">
            {item.hour}:00
          </span>
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
          <div className="mt-2 text-center max-w-[5rem]">
            <p className="text-xs text-muted-foreground leading-tight truncate">
              {item.activity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
