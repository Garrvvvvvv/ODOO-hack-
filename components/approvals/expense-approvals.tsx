"use client"

import { ApprovalCard } from "./approval-card"

const expenseApprovals = [
  {
    id: 3,
    type: "Expense Report",
    requester: "Mike Johnson",
    title: "Conference Attendance",
    description: "$2,500 for tech conference - Travel and accommodation",
    status: "Pending",
    priority: "Normal",
    submittedDate: "2024-01-19",
    daysOld: 3,
  },
  {
    id: 7,
    type: "Expense Report",
    requester: "Sarah Smith",
    title: "Training Course",
    description: "$1,200 for professional development training",
    status: "Approved",
    priority: "Normal",
    submittedDate: "2024-01-12",
    daysOld: 10,
  },
]

export function ExpenseApprovals() {
  return (
    <div className="space-y-4">
      {expenseApprovals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  )
}
