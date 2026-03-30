"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { FILTER_OPTIONS } from "@/lib/mock-data"

export interface Filters {
  domain: string[]
  difficulty: string[]
  skills: string[]
  region: string[]
}

interface UseCaseFiltersProps {
  selectedFilters: Filters
  onFilterChange: (filters: Filters) => void
}

const filterLabels: Record<keyof Filters, string> = {
  domain: "Domain",
  difficulty: "Difficulty",
  skills: "Skills",
  region: "Region",
}

export function UseCaseFilters({
  selectedFilters,
  onFilterChange,
}: UseCaseFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<keyof Filters | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleFilter = (filterType: keyof Filters, value: string) => {
    const current = selectedFilters[filterType]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFilterChange({ ...selectedFilters, [filterType]: updated })
  }

  const clearFilter = (filterType: keyof Filters) => {
    onFilterChange({ ...selectedFilters, [filterType]: [] })
  }

  const clearAll = () => {
    onFilterChange({ domain: [], difficulty: [], skills: [], region: [] })
  }

  const hasActiveFilters =
    selectedFilters.domain.length > 0 ||
    selectedFilters.difficulty.length > 0 ||
    selectedFilters.skills.length > 0 ||
    selectedFilters.region.length > 0

  const getSelectedCount = (filterType: keyof Filters) => selectedFilters[filterType].length

  return (
    <div ref={dropdownRef} className="space-y-3">
      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(FILTER_OPTIONS) as (keyof Filters)[]).map((filterType) => (
          <div key={filterType} className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === filterType ? null : filterType)}
              aria-expanded={openDropdown === filterType}
              aria-haspopup="listbox"
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-muted dark:hover:bg-secondary",
                getSelectedCount(filterType) > 0
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                  : "border-border bg-background text-foreground dark:border-border dark:bg-background dark:text-foreground"
              )}
            >
              {filterLabels[filterType]}
              {getSelectedCount(filterType) > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {getSelectedCount(filterType)}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === filterType && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Panel */}
            {openDropdown === filterType && (
              <div
                id={`${filterType}-dropdown`}
                role="listbox"
                className="absolute z-50 mt-1 w-56 rounded-lg border bg-background py-1 shadow-lg dark:bg-background dark:border-border">
                <div className="max-h-64 overflow-y-auto">
                  {FILTER_OPTIONS[filterType].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-muted dark:hover:bg-secondary"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters[filterType].includes(option)}
                        onChange={() => toggleFilter(filterType, option)}
                        className="h-4 w-4 rounded border-border text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-foreground dark:text-foreground">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Selected Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FILTER_OPTIONS) as (keyof Filters)[]).map((filterType) =>
            selectedFilters[filterType].map((value) => (
              <span
                key={`${filterType}-${value}`}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground dark:bg-secondary dark:text-foreground"
              >
                <span className="text-muted-foreground dark:text-muted-foreground">{filterLabels[filterType]}:</span>
                {value}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFilter(filterType, value)
                  }}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted dark:hover:bg-secondary"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}
    </div>
  )
}
