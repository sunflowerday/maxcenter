"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  href: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
}

export function SidebarNavItem({
  href,
  icon: Icon,
  label,
  collapsed = false,
}: SidebarNavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        isActive
          ? "bg-gray-100 text-gray-900 font-medium dark:bg-gray-800 dark:text-gray-100"
          : "text-gray-500 dark:text-gray-400",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", collapsed && "h-5 w-5")} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}
