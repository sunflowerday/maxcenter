"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarProps {
  children?: React.ReactNode
}

const navItems = [
  { href: "/max/use-cases", label: "Use Cases" },
  { href: "/max/customers", label: "Customers" },
  { href: "/max/bench", label: "Bench" },
  { href: "/max/humans", label: "Humans" },
  { href: "/max/agents", label: "Agents" },
]

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[200px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-4">
        {!collapsed && (
          <span className="text-lg font-semibold truncate text-foreground">
            MaxCenter
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg",
            "hover:bg-muted hover:text-foreground",
            "text-muted-foreground transition-colors",
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
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm transition-colors mb-1",
              "hover:bg-muted hover:text-foreground",
              pathname === item.href
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Additional content passed as children */}
      {children}
    </aside>
  )
}