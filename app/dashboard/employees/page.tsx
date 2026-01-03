"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { EmployeeListView } from "@/components/employees/employee-list-view"

export default function EmployeesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage and view employee information</p>
        </div>
        <EmployeeListView />
      </div>
    </DashboardLayout>
  )
}
