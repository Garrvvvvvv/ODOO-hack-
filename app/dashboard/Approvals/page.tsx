"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { ApprovalsCenter } from "@/components/approvals/approvals-center"

export default function ApprovalsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approvals & Workflows</h1>
          <p className="text-muted-foreground">Manage and process pending approvals</p>
        </div>
        <ApprovalsCenter />
      </div>
    </DashboardLayout>
  )
}
