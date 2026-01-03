"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { AttendanceTracker } from "@/components/attendance/attendance-tracker"

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track employee attendance and check-ins</p>
        </div>
        <AttendanceTracker />
      </div>
    </DashboardLayout>
  )
}
