"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"
import { Input } from "@/components/ui/input"

const paymentHistory = [
  {
    id: 1,
    employeeName: "John Doe",
    payrollPeriod: "June 2024",
    paidDate: "2024-07-05",
    amount: "$148,000",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 2,
    employeeName: "Sarah Smith",
    payrollPeriod: "June 2024",
    paidDate: "2024-07-05",
    amount: "$136,800",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 3,
    employeeName: "Mike Johnson",
    payrollPeriod: "June 2024",
    paidDate: "2024-07-05",
    amount: "$115,000",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 4,
    employeeName: "Emily Brown",
    payrollPeriod: "June 2024",
    paidDate: "2024-07-05",
    amount: "$126,600",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 5,
    employeeName: "David Lee",
    payrollPeriod: "June 2024",
    paidDate: "2024-07-05",
    amount: "$105,800",
    paymentMethod: "Bank Transfer",
    status: "Pending",
  },
]

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHistory = paymentHistory.filter((payment) =>
    payment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Payment Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Employee Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Payroll Period</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Paid Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Payment Method</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{payment.employeeName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{payment.payrollPeriod}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{payment.paidDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{payment.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No payment history found</p>
          </div>
        )}
      </div>
    </div>
  )
}
