"use client"

import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AttendanceRecord {
  date: string
  checkIn: string
  checkOut: string
  duration: string
  status: "present" | "late" | "absent" | "half-day"
}

interface AttendanceHistoryProps {
  employeeId: string
}

export function AttendanceHistory({ employeeId }: AttendanceHistoryProps) {
  const attendanceRecords: AttendanceRecord[] = [
    {
      date: "2024-01-15",
      checkIn: "09:05 AM",
      checkOut: "06:30 PM",
      duration: "9h 25m",
      status: "late",
    },
    {
      date: "2024-01-14",
      checkIn: "08:55 AM",
      checkOut: "06:15 PM",
      duration: "9h 20m",
      status: "present",
    },
    {
      date: "2024-01-13",
      checkIn: "09:00 AM",
      checkOut: "01:00 PM",
      duration: "4h 0m",
      status: "half-day",
    },
    {
      date: "2024-01-12",
      checkIn: "-",
      checkOut: "-",
      duration: "-",
      status: "absent",
    },
    {
      date: "2024-01-11",
      checkIn: "09:10 AM",
      checkOut: "06:45 PM",
      duration: "9h 35m",
      status: "late",
    },
    {
      date: "2024-01-10",
      checkIn: "08:50 AM",
      checkOut: "06:20 PM",
      duration: "9h 30m",
      status: "present",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/10 text-green-600 border-green-200"
      case "late":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      case "absent":
        return "bg-red-500/10 text-red-600 border-red-200"
      case "half-day":
        return "bg-blue-500/10 text-blue-600 border-blue-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4" />
      case "absent":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const presentDays = attendanceRecords.filter((r) => r.status === "present").length
  const lateDays = attendanceRecords.filter((r) => r.status === "late").length
  const absentDays = attendanceRecords.filter((r) => r.status === "absent").length
  const totalDays = attendanceRecords.length

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Days</div>
          <div className="text-2xl font-bold text-foreground">{totalDays}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Present</div>
          <div className="text-2xl font-bold text-green-600">{presentDays}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Late</div>
          <div className="text-2xl font-bold text-yellow-600">{lateDays}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Absent</div>
          <div className="text-2xl font-bold text-red-600">{absentDays}</div>
        </Card>
      </div>

      {/* Attendance Table */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Attendance History</h2>
        </div>

        <div className="space-y-3">
          {attendanceRecords.map((record) => (
            <div
              key={record.date}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-foreground">
                    {new Date(record.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(record.status)}`}
                  >
                    {getStatusIcon(record.status)}
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
                <div className="text-right">
                  <div className="font-medium text-foreground">{record.checkIn}</div>
                  <div className="text-xs">Check In</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{record.checkOut}</div>
                  <div className="text-xs">Check Out</div>
                </div>
                <div className="text-right min-w-16">
                  <div className="font-medium text-foreground">{record.duration}</div>
                  <div className="text-xs">Duration</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
