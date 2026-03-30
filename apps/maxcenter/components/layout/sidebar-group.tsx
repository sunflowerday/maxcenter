"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarGroupProps {
  title: string
  children: React.ReactNode
  defaultCollapsed?: boolean
}

export function SidebarGroup({
  title,
  children,
  defaultCollapsed = false,
}: SidebarGroupProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium",
          "text-muted-foreground hover:text-foreground",
          "transition-colors rounded-lg hover:bg-gray-100"
        )}
      >
        <span className="truncate flex-1 text-left">{title}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
            isCollapsed && "rotate-90"
          )}
        />
      </button>
      <div
        className={cn(
          "mt-1 space-y-1 overflow-hidden transition-all duration-200 bg-white",
          isCollapsed && "h-0 mt-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}
