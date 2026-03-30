"use client"

import { useEffect, useState } from "react"
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
  data: Record<string, string | number>[]
  type: "bar" | "radar" | "line"
  title: string
}

const chartColors = {
  "Claude 4": "#8b5cf6",
  "GPT-5": "#3b82f6",
  "Gemini Ultra": "#f59e0b"
}

const lightTheme = {
  grid: "#e5e7eb",
  axis: "#6b7280",
  tooltipBg: "white",
  tooltipBorder: "#e5e7eb",
}

const darkTheme = {
  grid: "#374151",
  axis: "#9ca3af",
  tooltipBg: "#1f2937",
  tooltipBorder: "#374151",
}

export function BenchChart({ data, type, title }: BenchChartProps) {
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

  const theme = isDark ? darkTheme : lightTheme

  const tooltipStyle = {
    backgroundColor: theme.tooltipBg,
    border: `1px solid ${theme.tooltipBorder}`,
    borderRadius: "8px",
    fontSize: "12px",
    color: isDark ? "#f3f4f6" : "#1f2937",
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme.axis }} stroke={theme.axis} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: theme.axis }} stroke={theme.axis} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: isDark ? "#f3f4f6" : "#1f2937" }}
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
            <PolarGrid stroke={theme.grid} />
            <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12, fill: theme.axis }} stroke={theme.axis} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: theme.axis }} stroke={theme.axis} />
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
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        )

      case "line":
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme.axis }} stroke={theme.axis} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: theme.axis }} stroke={theme.axis} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: isDark ? "#f3f4f6" : "#1f2937" }}
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
    <div className="bg-background rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
