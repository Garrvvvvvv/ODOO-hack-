"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { PayrollDashboard } from "@/components/payroll/payroll-dashboard"

export default function PayrollPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee salaries and process payroll</p>
        </div>
        <PayrollDashboard />
      </div>
    </DashboardLayout>
  )
}
