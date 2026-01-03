"use client"

import { useState } from "react"
import { Search, Plus, Calendar, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const leaveRequests = [
  {
    id: 1,
    employeeName: "John Doe",
    leaveType: "Vacation",
    startDate: "2024-02-10",
    endDate: "2024-02-15",
    days: 5,
    reason: "Personal vacation",
    status: "Pending",
    appliedDate: "2024-01-20",
  },
  {
    id: 2,
    employeeName: "Sarah Smith",
    leaveType: "Sick Leave",
    startDate: "2024-01-25",
    endDate: "2024-01-25",
    days: 1,
    reason: "Medical appointment",
    status: "Approved",
    appliedDate: "2024-01-23",
  },
  {
    id: 3,
    employeeName: "Mike Johnson",
    leaveType: "Vacation",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    days: 5,
    reason: "Family trip",
    status: "Pending",
    appliedDate: "2024-01-18",
  },
  {
    id: 4,
    employeeName: "Emily Brown",
    leaveType: "Maternity Leave",
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    days: 90,
    reason: "Maternity",
    status: "Approved",
    appliedDate: "2024-01-10",
  },
  {
    id: 5,
    employeeName: "David Lee",
    leaveType: "Vacation",
    startDate: "2024-02-05",
    endDate: "2024-02-09",
    days: 4,
    reason: "Trip to Japan",
    status: "Rejected",
    appliedDate: "2024-01-15",
  },
]

export function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    return matchesSearch && request.status.toLowerCase() === selectedTab
  })

  const stats = [
    {
      label: "Total Pending",
      value: leaveRequests.filter((r) => r.status === "Pending").length,
      color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    },
    {
      label: "Approved",
      value: leaveRequests.filter((r) => r.status === "Approved").length,
      color: "bg-green-500/10 text-green-700 dark:text-green-400",
    },
    {
      label: "Rejected",
      value: leaveRequests.filter((r) => r.status === "Rejected").length,
      color: "bg-red-500/10 text-red-700 dark:text-red-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-lg p-4 ${stat.color}`}>
            <p className="text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee or leave type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-10">
          <Plus className="w-4 h-4" />
          New Leave Request
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{request.employeeName}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "Approved"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : request.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                              : "bg-red-500/10 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{request.leaveType}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">From</p>
                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar className="w-4 h-4" />
                          {request.startDate}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">To</p>
                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar className="w-4 h-4" />
                          {request.endDate}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Days</p>
                        <p className="text-foreground font-medium">{request.days} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Applied</p>
                        <p className="text-foreground">{request.appliedDate}</p>
                      </div>
                    </div>

                    <p className="text-sm text-foreground mt-4 p-3 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Reason: </span>
                      {request.reason}
                    </p>
                  </div>

                  {request.status === "Pending" && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white h-9">
                        Approve
                      </Button>
                      <Button className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white h-9">Reject</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No leave requests found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
