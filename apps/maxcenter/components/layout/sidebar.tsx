"use client"

import { useState } from "react"
import { Menu, X, BookOpen, Users, BarChart3, UserCircle, Bot } from "lucide-react"

import { cn } from "@/lib/utils"
import { SidebarGroup } from "./sidebar-group"
import { SidebarNavItem } from "./sidebar-nav"

interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-white dark:bg-gray-900 transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-4">
        {!collapsed && (
          <span className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">
            MaxCenter
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
            "text-gray-500 dark:text-gray-400 transition-colors",
            !collapsed && "ml-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Product Market Fit */}
        <SidebarGroup title="Product Market Fit" icon={BookOpen}>
          <SidebarNavItem
            href="/max/use-cases"
            icon={BookOpen}
            label="Use Cases"
            collapsed={collapsed}
          />
          <SidebarNavItem
            href="/max/customers"
            icon={Users}
            label="Customers"
            collapsed={collapsed}
          />
        </SidebarGroup>

        {/* Product Technology Fit */}
        <SidebarGroup title="Product Technology Fit" icon={BarChart3}>
          <SidebarNavItem
            href="/max/bench"
            icon={BarChart3}
            label="Bench"
            collapsed={collapsed}
          />
        </SidebarGroup>

        {/* Product Team Fit */}
        <SidebarGroup title="Product Team Fit" icon={UserCircle}>
          <SidebarNavItem
            href="/max/humans"
            icon={UserCircle}
            label="Humans"
            collapsed={collapsed}
          />
          <SidebarNavItem
            href="/max/agents"
            icon={Bot}
            label="Agents"
            collapsed={collapsed}
          />
        </SidebarGroup>
      </nav>

      {/* Additional content passed as children */}
      {children}
    </aside>
  )
}
