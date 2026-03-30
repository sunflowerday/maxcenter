"use client"

import Link from "next/link"
import { UseCase } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface UseCaseCardProps {
  useCase: UseCase
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Advanced: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const regionFlags: Record<string, string> = {
  "North America": "🇺🇸",
  Europe: "🇪🇺",
  Asia: "🌏",
  "Latin America": "🌎",
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  const hasScore = useCase.score !== undefined

  return (
    <Link href={`/max/use-cases/${useCase.id}`}>
      <article className="group relative flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md dark:bg-card dark:border-border">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground dark:text-foreground group-hover:text-primary">
          {useCase.name}
        </h3>

        {/* Domain Tags */}
        <div className="mb-2 flex flex-wrap gap-1">
          {useCase.domain.map((d) => (
            <span
              key={d}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground dark:bg-secondary dark:text-foreground"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Difficulty Badge */}
        <div className="mb-3">
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
              difficultyColors[useCase.difficulty as keyof typeof difficultyColors]
            )}
          >
            {useCase.difficulty}
          </span>
        </div>

        {/* Skills Tags */}
        <div className="mb-3 flex flex-wrap gap-1">
          {useCase.skills.map((skill) => (
            <span
              key={skill}
              className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Region with Flag */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
          <span className="flex items-center gap-1">
            {useCase.region.map((r) => (
              <span key={r} title={r}>{regionFlags[r] || "🌍"}</span>
            ))}
          </span>
          <span>{useCase.region.join(", ")}</span>
        </div>

        {/* Score Indicator */}
        {hasScore && (
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${useCase.score!.value}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-foreground dark:text-foreground">
                {useCase.score!.value}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground">
              {useCase.score!.type} • {new Date(useCase.score!.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          </div>
        )}
      </article>
    </Link>
  )
}
