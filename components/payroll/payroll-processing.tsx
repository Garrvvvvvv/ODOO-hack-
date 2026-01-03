"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const payrollCycles = [
  {
    id: 1,
    period: "June 2024",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    processedDate: "2024-07-05",
    totalAmount: "$480,000",
    employeeCount: 248,
    status: "Completed",
  },
  {
    id: 2,
    period: "May 2024",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    processedDate: "2024-06-05",
    totalAmount: "$450,000",
    employeeCount: 248,
    status: "Completed",
  },
  {
    id: 3,
    period: "April 2024",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    processedDate: "2024-05-05",
    totalAmount: "$465,000",
    employeeCount: 248,
    status: "Completed",
  },
]

export function PayrollProcessing() {
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Process New Payroll */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Process New Payroll</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payroll Period</label>
            <input
              type="month"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              defaultValue="2024-07"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
            <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
              <option>Bank Transfer</option>
              <option>Check</option>
              <option>Cash</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-foreground">Total Employees to Process:</span>
            <span className="font-bold text-lg text-foreground">248</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Estimated Amount:</span>
            <span className="font-bold text-lg text-primary">$480,000</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-accent text-primary-foreground flex-1 h-10">Preview Payroll</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 h-10">Process Payroll</Button>
        </div>
      </div>

      {/* Payroll History */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Payroll Cycles</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Period</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Employees</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Total Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Processed Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollCycles.map((cycle) => (
                <tr key={cycle.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{cycle.period}</p>
                      <p className="text-xs text-muted-foreground">
                        {cycle.startDate} to {cycle.endDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{cycle.employeeCount}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{cycle.totalAmount}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{cycle.processedDate}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-700 dark:text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      {cycle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-accent text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
