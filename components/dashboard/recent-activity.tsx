"use client"

import { Clock, User, FileText, CheckCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "employee",
    message: "New employee added",
    description: "Jane Williams",
    timestamp: "2 hours ago",
    icon: User,
  },
  {
    id: 2,
    type: "document",
    message: "Document uploaded",
    description: "Q4 Performance Review",
    timestamp: "4 hours ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "approval",
    message: "Leave request approved",
    description: "John Doe - 5 days",
    timestamp: "6 hours ago",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "employee",
    message: "Employee updated",
    description: "Sarah Smith - Promoted",
    timestamp: "1 day ago",
    icon: User,
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <div className="flex items-start gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3 mt-0.5" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
