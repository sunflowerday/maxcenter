"use client"

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
  0: "Cluster 0 - Finance",
  1: "Cluster 1 - Healthcare",
  2: "Cluster 2 - Education",
  3: "Cluster 3 - SaaS/Tech",
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: Customer
  }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const customer = payload[0].payload
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {customer.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
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
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 1]}
            name="Y"
            tick={false}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-700 dark:text-gray-300">
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
                onClick={(data) => onSelect(data.id)}
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
              stroke="#000"
              strokeWidth={2}
              onClick={(data) => onSelect(data.id)}
              style={{ cursor: "pointer" }}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
