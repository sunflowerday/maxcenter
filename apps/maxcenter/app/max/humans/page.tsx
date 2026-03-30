"use client"

import { humans, type Human } from "@/lib/mock-data"
import { HumanCard } from "@/components/max/human-card"
import { Users } from "lucide-react"

function StatsBar({ humans }: { humans: Human[] }) {
  const online = humans.filter((h) => h.status === "online").length
  const idle = humans.filter((h) => h.status === "idle").length
  const offline = humans.filter((h) => h.status === "offline").length

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg border border-border">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{online}</span> online
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{idle}</span> idle
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{offline}</span> offline
        </span>
      </div>
      <div className="flex-1" />
      <span className="text-sm text-muted-foreground">
        {humans.length} team members
      </span>
    </div>
  )
}

export default function HumansPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-100">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Team Members
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor your team&apos;s activity and availability
          </p>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="mb-6">
        <StatsBar humans={humans} />
      </div>

      {/* Human Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {humans.map((human) => (
          <HumanCard key={human.id} human={human} />
        ))}
      </div>
    </div>
  )
}
