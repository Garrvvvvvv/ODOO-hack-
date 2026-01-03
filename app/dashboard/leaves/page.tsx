"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { LeaveManagement } from "@/components/leaves/leave-management"

export default function LeavesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and approvals</p>
        </div>
        <LeaveManagement />
      </div>
    </DashboardLayout>
  )
}
