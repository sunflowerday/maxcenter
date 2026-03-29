"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts"

interface BenchChartProps {
  data: any[]
  type: "bar" | "radar" | "line"
  title: string
}

const chartColors = {
  "Claude 4": "#8b5cf6",
  "GPT-5": "#3b82f6",
  "Gemini Ultra": "#f59e0b"
}

export function BenchChart({ data, type, title }: BenchChartProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {data[0] && Object.keys(data[0])
              .filter(key => key !== "name" && key !== "domain")
              .map(key => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={chartColors[key as keyof typeof chartColors] || "#6b7280"}
                  radius={[4, 4, 0, 0]}
                />
              ))}
          </BarChart>
        )

      case "radar":
        return (
          <RadarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#6b7280" />
            {data[0] && Object.keys(data[0])
              .filter(key => key !== "domain")
              .map(key => (
                <Radar
                  key={key}
                  name={key}
                  dataKey={key}
                  stroke={chartColors[key as keyof typeof chartColors] || "#6b7280"}
                  fill={chartColors[key as keyof typeof chartColors] || "#6b7280"}
                  fillOpacity={0.2}
                />
              ))}
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px"
              }}
            />
          </RadarChart>
        )

      case "line":
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {data[0] && Object.keys(data[0])
              .filter(key => key !== "name" && key !== "domain")
              .map(key => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={chartColors[key as keyof typeof chartColors] || "#6b7280"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
          </LineChart>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
