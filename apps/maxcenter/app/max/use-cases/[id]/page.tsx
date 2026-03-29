"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCases, UseCase } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Clock,
  Code,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Quote,
  User,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"

// Section 1: Background (5W1H) - Narrative format
function BackgroundSection({ useCase }: { useCase: UseCase }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Background</h2>
      <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-800/50">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-gray-100">WHO:</span>{" "}
          {useCase.background.who}{". "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">WHAT:</span>{" "}
          {useCase.background.what}{". "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">WHEN:</span>{" "}
          {useCase.background.when}{". "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">WHERE:</span>{" "}
          {useCase.background.where}{". "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">WHY:</span>{" "}
          {useCase.background.need}.
        </p>
      </div>
    </section>
  )
}

// Section 2: Duration
function DurationSection({ useCase }: { useCase: UseCase }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Duration</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product Hours</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {useCase.duration.product}h
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Technology Hours</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {useCase.duration.technology}h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section 3: Market
function MarketSection({ useCase }: { useCase: UseCase }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Market</h2>

      {/* User Voices */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">User Voices</h3>
        <div className="space-y-4">
          {useCase.userVoices.map((voice) => (
            <div
              key={voice.id}
              className="relative rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <Quote className="absolute left-4 top-4 h-5 w-5 text-gray-200 dark:text-gray-700" />
              <p className="pl-6 text-gray-700 dark:text-gray-300">{voice.quote}</p>
              <div className="mt-4 flex items-center gap-3 pl-6">
                <img
                  src={voice.author.avatar}
                  alt={voice.author.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{voice.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{voice.author.role}</p>
                </div>
                <a
                  href={voice.author.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typical Users */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Typical Users</h3>
        <div className="flex flex-wrap gap-2">
          {useCase.userVoices.map((voice) => (
            <a
              key={voice.author.name}
              href={voice.author.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <img
                src={voice.author.avatar}
                alt={voice.author.name}
                className="h-5 w-5 rounded-full"
              />
              <span className="text-gray-700 dark:text-gray-200">{voice.author.name}</span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Section 4: Product
function ProductSection({ useCase }: { useCase: UseCase }) {
  if (!useCase.score) return null

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Product</h2>
      <div className="flex items-center gap-6 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${useCase.score.value * 2.83} 283`}
              strokeLinecap="round"
              className="stroke-blue-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {useCase.score.value}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Benchmark Score</p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">
            {useCase.score.type}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Evaluated on {new Date(useCase.score.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  )
}

// Section 5: Technical
function TechnicalSection({ useCase }: { useCase: UseCase }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Technical</h2>

      {/* Token Count and Environment */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Token Count</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {useCase.tech.tokens.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Environment</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {useCase.tech.environment}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Metrics</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(useCase.tech.metrics).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {key.replace(/_/g, " ")}
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {typeof value === "number" ? value.toFixed(1) : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <MessageSquare className="h-4 w-4" />
          Comments ({useCase.comments.length})
        </h3>
        <div className="space-y-4">
          {useCase.comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  {comment.type === "voice" ? (
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{comment.author}</p>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-xs font-medium",
                        comment.type === "voice"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      )}
                    >
                      {comment.type}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{comment.votes.up.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{comment.votes.down.length}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  {(comment.votes.up.length > 0 || comment.votes.down.length > 0) && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {comment.votes.up.length > 0 && (
                        <span>
                          Upvoted by:{" "}
                          {comment.votes.up
                            .map((u) => u.replace("u", "User "))
                            .join(", ")}
                        </span>
                      )}
                      {comment.votes.down.length > 0 && (
                        <span className={comment.votes.up.length > 0 ? "ml-2" : ""}>
                          Downvoted by:{" "}
                          {comment.votes.down
                            .map((u) => u.replace("u", "User "))
                            .join(", ")}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const useCase = useCases.find((uc) => uc.id === id)

  if (!useCase) {
    notFound()
  }

  return (
    <div className="p-6">
      {/* Back Link */}
      <Link
        href="/max/use-cases"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Use Cases
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{useCase.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {useCase.domain.map((d) => (
            <span
              key={d}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {d}
            </span>
          ))}
          <span
            className={cn(
              "rounded-full px-3 py-1 text-sm font-semibold",
              useCase.difficulty === "Beginner" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
              useCase.difficulty === "Intermediate" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
              useCase.difficulty === "Advanced" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
              useCase.difficulty === "Expert" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            )}
          >
            {useCase.difficulty}
          </span>
        </div>
      </div>

      {/* Sections */}
      <BackgroundSection useCase={useCase} />
      <DurationSection useCase={useCase} />
      <MarketSection useCase={useCase} />
      <ProductSection useCase={useCase} />
      <TechnicalSection useCase={useCase} />
    </div>
  )
}
