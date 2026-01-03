"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface ApprovalCardProps {
  approval: {
    id: number
    type: string
    requester: string
    title: string
    description: string
    status: string
    priority: string
    submittedDate: string
    daysOld: number
  }
}

export function ApprovalCard({ approval }: ApprovalCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      case "Normal":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "Rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {approval.type}
            </span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}
            >
              {approval.priority}
            </span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}
            >
              {approval.status}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">{approval.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{approval.requester}</p>

          <p className="text-sm text-foreground mb-4">{approval.description}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Submitted {approval.daysOld} days ago • {approval.submittedDate}
          </div>
        </div>

        {approval.status === "Pending" && (
          <div className="flex gap-2 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white h-10">Approve</Button>
            <Button className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white h-10">Reject</Button>
          </div>
        )}
      </div>
    </div>
  )
}
