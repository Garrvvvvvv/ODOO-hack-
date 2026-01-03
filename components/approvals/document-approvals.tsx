"use client"

import { ApprovalCard } from "./approval-card"

const documentApprovals = [
  {
    id: 2,
    type: "Document Verification",
    requester: "Sarah Smith",
    title: "Passport Verification",
    description: "Identity verification document - Renewal",
    status: "Pending",
    priority: "High",
    submittedDate: "2024-01-18",
    daysOld: 4,
  },
  {
    id: 6,
    type: "Document Verification",
    requester: "Mike Johnson",
    title: "License Verification",
    description: "Driver license for official records",
    status: "Approved",
    priority: "Normal",
    submittedDate: "2024-01-10",
    daysOld: 12,
  },
]

export function DocumentApprovals() {
  return (
    <div className="space-y-4">
      {documentApprovals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  )
}
