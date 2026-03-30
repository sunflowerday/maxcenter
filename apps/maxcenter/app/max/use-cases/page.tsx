"use client"

import { useState, useMemo } from "react"
import { useCases, UseCase, FILTER_OPTIONS } from "@/lib/mock-data"
import { UseCaseCard } from "@/components/max/use-case-card"
import { UseCaseFilters, Filters } from "@/components/max/use-case-filters"
import { Search } from "lucide-react"

export default function UseCasesPage() {
  const [filters, setFilters] = useState<Filters>({
    domain: [],
    difficulty: [],
    skills: [],
    region: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUseCases = useMemo(() => {
    return useCases.filter((uc: UseCase) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          uc.name.toLowerCase().includes(query) ||
          uc.domain.some((d) => d.toLowerCase().includes(query)) ||
          uc.skills.some((s) => s.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // AND between dimensions, OR within dimension
      if (filters.domain.length > 0 && !filters.domain.some((d) => uc.domain.includes(d))) {
        return false
      }
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(uc.difficulty)) {
        return false
      }
      if (filters.skills.length > 0 && !filters.skills.some((s) => uc.skills.includes(s))) {
        return false
      }
      if (filters.region.length > 0 && !filters.region.some((r) => uc.region.includes(r))) {
        return false
      }

      return true
    })
  }, [filters, searchQuery])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Use Cases</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover AI product use cases across industries
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search use cases..."
            aria-label="Search use cases"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filter Bar */}
        <UseCaseFilters selectedFilters={filters} onFilterChange={setFilters} />
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUseCases.length} of {useCases.length} use cases
        </p>
      </div>

      {/* Use Case Cards Grid */}
      {filteredUseCases.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUseCases.map((uc) => (
            <UseCaseCard key={uc.id} useCase={uc} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <p className="text-muted-foreground">No use cases found matching your filters.</p>
          <button
            onClick={() => setFilters({ domain: [], difficulty: [], skills: [], region: [] })}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
