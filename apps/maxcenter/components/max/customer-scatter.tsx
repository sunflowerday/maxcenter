"use client"

import { useEffect, useState } from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Customer } from "@/lib/mock-data"

interface CustomerScatterProps {
  customers: Customer[]
  selectedId?: string
  onSelect: (id: string) => void
}

const CLUSTER_COLORS: Record<number, string> = {
  0: "#3b82f6", // blue
  1: "#22c55e", // green
  2: "#f97316", // orange
  3: "#a855f7", // purple
}

const CLUSTER_LABELS: Record<number, string> = {
  0: "Finance & FinTech companies",
  1: "Healthcare & Medical organizations",
  2: "Education & Learning platforms",
  3: "SaaS & Technology startups",
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: Customer
  }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  if (active && payload && payload.length) {
    const customer = payload[0].payload
    return (
      <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2">
        <p className="font-medium text-foreground">
          {customer.name}
        </p>
        <p className="text-xs text-muted-foreground">
          Cluster {customer.clusterId}
        </p>
      </div>
    )
  }
  return null
}

export function CustomerScatter({
  customers,
  selectedId,
  onSelect,
}: CustomerScatterProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const axisColor = isDark ? "#374151" : "#e5e7eb"
  const textColor = isDark ? "#9ca3af" : "#6b7280"

  const clusters = [0, 1, 2, 3]
  const selectedCustomer = customers.find((c) => c.id === selectedId)

  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 1]}
            name="X"
            tick={false}
            axisLine={{ stroke: axisColor }}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 1]}
            name="Y"
            tick={false}
            axisLine={{ stroke: axisColor }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-foreground">
                {value}
              </span>
            )}
          />
          {clusters.map((clusterId) => {
            const clusterCustomers = customers.filter(
              (c) => c.clusterId === clusterId
            )

            return (
              <Scatter
                key={clusterId}
                name={CLUSTER_LABELS[clusterId]}
                data={clusterCustomers}
                fill={CLUSTER_COLORS[clusterId]}
                onClick={(data) => onSelect(data.payload.id)}
                style={{ cursor: "pointer" }}
              />
            )
          })}
          {/* Render selected customer with highlight */}
          {selectedCustomer && (
            <Scatter
              name="Selected"
              data={[selectedCustomer]}
              fill="#1f2937"
              stroke={isDark ? "#f3f4f6" : "#000"}
              strokeWidth={2}
              onClick={(data) => onSelect(data.payload.id)}
              style={{ cursor: "pointer" }}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
