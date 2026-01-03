"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ApprovalCard } from "./approval-card"

const allApprovals = [
  {
    id: 1,
    type: "Leave Request",
    requester: "John Doe",
    title: "Vacation Leave - 5 Days",
    description: "Feb 10-15, 2024",
    status: "Pending",
    priority: "Normal",
    submittedDate: "2024-01-20",
    daysOld: 2,
  },
  {
    id: 2,
    type: "Document Verification",
    requester: "Sarah Smith",
    title: "Passport Verification",
    description: "Identity verification document",
    status: "Pending",
    priority: "High",
    submittedDate: "2024-01-18",
    daysOld: 4,
  },
  {
    id: 3,
    type: "Expense Report",
    requester: "Mike Johnson",
    title: "Conference Attendance",
    description: "$2,500 for tech conference",
    status: "Pending",
    priority: "Normal",
    submittedDate: "2024-01-19",
    daysOld: 3,
  },
  {
    id: 4,
    type: "Leave Request",
    requester: "Emily Brown",
    title: "Sick Leave",
    description: "Jan 25, 2024",
    status: "Approved",
    priority: "Normal",
    submittedDate: "2024-01-23",
    daysOld: 0,
  },
]

export function AllApprovals() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApprovals = allApprovals.filter(
    (approval) =>
      approval.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingCount = allApprovals.filter((a) => a.status === "Pending").length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">This Week</p>
          <p className="text-3xl font-bold text-foreground">8</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Urgent (High Priority)</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">1</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by requester or request title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Approvals Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApprovals.map((approval) => (
          <ApprovalCard key={approval.id} approval={approval} />
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No approvals found matching your search</p>
        </div>
      )}
    </div>
  )
}
