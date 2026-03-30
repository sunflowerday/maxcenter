"use client"

import { X } from "lucide-react"
import { Customer } from "@/lib/mock-data"

const CLUSTER_LABELS: Record<number, string> = {
  0: "Finance & FinTech companies",
  1: "Healthcare & Medical organizations",
  2: "Education & Learning platforms",
  3: "SaaS & Technology startups",
}

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
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-blue-50 text-blue-700",
    secondary:
      "bg-purple-50 text-purple-700",
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
        <p className="text-muted-foreground text-sm">
          Select a customer to view details
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Customer Details
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
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
            className="h-16 w-16 rounded-full bg-muted"
          />
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {customer.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Cluster {customer.clusterId}
            </p>
          </div>
        </div>

        {/* Profile Badges */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
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
          <h4 className="text-sm font-medium text-foreground mb-2">
            Cluster Assignment
          </h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-foreground">
              Cluster {customer.clusterId}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {CLUSTER_LABELS[customer.clusterId]}
            </p>
          </div>
        </div>

        {/* Typical Use Cases */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
            Typical Use Cases
          </h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground">
              {customer.typicalUseCases.length} use case
              {customer.typicalUseCases.length !== 1 ? "s" : ""}
            </p>
            <ul className="mt-2 space-y-1">
              {customer.typicalUseCases.map((uc) => (
                <li
                  key={uc}
                  className="text-xs text-muted-foreground"
                >
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
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
