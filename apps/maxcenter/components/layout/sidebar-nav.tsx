"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  href: string
  label: string
  collapsed?: boolean
}

export function SidebarNavItem({
  href,
  label,
  collapsed = false,
}: SidebarNavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-gray-100 hover:text-foreground",
        isActive
          ? "bg-gray-100 text-foreground font-medium"
          : "text-muted-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}
