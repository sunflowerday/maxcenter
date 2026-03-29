"use client"

import { useState } from "react"
import { Customer, customers as mockCustomers } from "@/lib/mock-data"
import { CustomerScatter } from "@/components/max/customer-scatter"
import { CustomerDetailPanel } from "@/components/max/customer-detail-panel"

export default function CustomersPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>()

  const selectedCustomer = selectedCustomerId
    ? mockCustomers.find((c) => c.id === selectedCustomerId) ?? null
    : null

  const handleSelect = (id: string) => {
    setSelectedCustomerId(id)
  }

  const handleClose = () => {
    setSelectedCustomerId(undefined)
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Scatter Plot - 70% width */}
      <div className="w-[70%] h-full p-6">
        <div className="h-full flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Customer Scatter
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click on a point to view customer details
            </p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <CustomerScatter
              customers={mockCustomers as Customer[]}
              selectedId={selectedCustomerId}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>

      {/* Detail Panel - 30% width */}
      <div className="w-[30%] h-full">
        <CustomerDetailPanel
          customer={selectedCustomer}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}
