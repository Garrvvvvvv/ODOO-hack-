"use client"

import { Users, UserCheck, AlertCircle, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Total Employees",
    value: "248",
    change: "+12",
    icon: Users,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    label: "Present Today",
    value: "215",
    change: "+8",
    icon: UserCheck,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    label: "On Leave",
    value: "18",
    change: "-2",
    icon: AlertCircle,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    label: "Pending Approvals",
    value: "12",
    change: "+5",
    icon: TrendingUp,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">{stat.change} this week</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
