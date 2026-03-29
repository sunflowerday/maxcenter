"use client"

import { X } from "lucide-react"
import { Customer } from "@/lib/mock-data"

interface CustomerDetailPanelProps {
  customer: Customer | null
  onClose: () => void
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary"
}) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    secondary:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

export function CustomerDetailPanel({
  customer,
  onClose,
}: CustomerDetailPanelProps) {
  if (!customer) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Select a customer to view details
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Customer Details
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          aria-label="Close panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {customer.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cluster {customer.clusterId}
            </p>
          </div>
        </div>

        {/* Profile Badges */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profiles
          </h4>
          <div className="flex flex-wrap gap-2">
            {customer.profiles.map((profile) => (
              <Badge key={profile} variant="primary">
                {profile}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cluster Assignment */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cluster Assignment
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-900 dark:text-gray-100">
              Cluster {customer.clusterId}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {customer.clusterId === 0 && "Finance & FinTech companies"}
              {customer.clusterId === 1 && "Healthcare & Medical organizations"}
              {customer.clusterId === 2 && "Education & Learning platforms"}
              {customer.clusterId === 3 && "SaaS & Technology startups"}
            </p>
          </div>
        </div>

        {/* Typical Use Cases */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Typical Use Cases
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {customer.typicalUseCases.length} use case
              {customer.typicalUseCases.length !== 1 ? "s" : ""}
            </p>
            <ul className="mt-2 space-y-1">
              {customer.typicalUseCases.map((uc) => (
                <li
                  key={uc}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {customer.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
