"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react"

const monthlyData = [
  { month: "Jan", salary: 450000, deductions: 75000, net: 375000 },
  { month: "Feb", salary: 450000, deductions: 75000, net: 375000 },
  { month: "Mar", salary: 465000, deductions: 78000, net: 387000 },
  { month: "Apr", salary: 465000, deductions: 78000, net: 387000 },
  { month: "May", salary: 450000, deductions: 75000, net: 375000 },
  { month: "Jun", salary: 480000, deductions: 80000, net: 400000 },
]

export function PayrollSummary() {
  const stats = [
    {
      label: "Total Monthly Payroll",
      value: "$480,000",
      change: "+5.4%",
      icon: DollarSign,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      label: "Total Deductions",
      value: "$80,000",
      change: "+2.1%",
      icon: TrendingUp,
      color: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      label: "Active Employees",
      value: "248",
      change: "+12",
      icon: Users,
      color: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      label: "Pending Approval",
      value: "3",
      change: "-1",
      icon: AlertCircle,
      color: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">{stat.change} vs last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Payroll Trend (6 Months)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
            />
            <Legend />
            <Bar dataKey="salary" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="deductions" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="net" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
