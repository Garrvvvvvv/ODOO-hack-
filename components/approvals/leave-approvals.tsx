"use client"

import { ApprovalCard } from "./approval-card"

const leaveApprovals = [
  {
    id: 1,
    type: "Leave Request",
    requester: "John Doe",
    title: "Vacation Leave - 5 Days",
    description: "Feb 10-15, 2024 - Personal vacation",
    status: "Pending",
    priority: "Normal",
    submittedDate: "2024-01-20",
    daysOld: 2,
  },
  {
    id: 4,
    type: "Leave Request",
    requester: "Emily Brown",
    title: "Sick Leave",
    description: "Jan 25, 2024 - Medical appointment",
    status: "Approved",
    priority: "Normal",
    submittedDate: "2024-01-23",
    daysOld: 0,
  },
  {
    id: 5,
    type: "Leave Request",
    requester: "David Lee",
    title: "Unpaid Leave - 3 Days",
    description: "Feb 5-7, 2024 - Personal matters",
    status: "Pending",
    priority: "Normal",
    submittedDate: "2024-01-15",
    daysOld: 7,
  },
]

export function LeaveApprovals() {
  return (
    <div className="space-y-4">
      {leaveApprovals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  )
}
