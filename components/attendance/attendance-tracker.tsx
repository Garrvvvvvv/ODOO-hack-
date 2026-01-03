"use client"

import { useState } from "react"
import { Search, Clock, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

const attendanceData = [
  {
    id: 1,
    name: "John Doe",
    date: "2024-01-15",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    duration: "8h 30m",
    status: "Present",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Sarah Smith",
    date: "2024-01-15",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    duration: "8h 30m",
    status: "Present",
    department: "Product",
  },
  {
    id: 3,
    name: "Mike Johnson",
    date: "2024-01-15",
    checkIn: null,
    checkOut: null,
    duration: "-",
    status: "Absent",
    department: "Design",
  },
  {
    id: 4,
    name: "Emily Brown",
    date: "2024-01-15",
    checkIn: "09:30 AM",
    checkOut: "05:00 PM",
    duration: "7h 30m",
    status: "Present",
    department: "Human Resources",
  },
  {
    id: 5,
    name: "David Lee",
    date: "2024-01-15",
    checkIn: "10:00 AM",
    checkOut: null,
    duration: "In Progress",
    status: "Present",
    department: "Quality Assurance",
  },
]

export function AttendanceTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || record.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const presentCount = attendanceData.filter((r) => r.status === "Present").length
  const absentCount = attendanceData.filter((r) => r.status === "Absent").length
  const totalCount = attendanceData.length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Employees</p>
          <p className="text-3xl font-bold text-foreground">{totalCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Present Today</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{presentCount}</p>
            <p className="text-sm text-muted-foreground mb-1">({Math.round((presentCount / totalCount) * 100)}%)</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Absent</p>
          <p className="text-3xl font-bold text-destructive">{absentCount}</p>
        </div>
      </div>

      {/* Date Selector and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
        />

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
        >
          <option value="All">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Check In</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Check Out</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{record.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{record.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{record.checkIn || "-"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{record.checkOut || "-"}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{record.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-red-500/10 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {record.status === "Present" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
