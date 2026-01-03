"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfo } from "./profile-tabs/personal-info"
import { EmploymentDetails } from "./profile-tabs/employment-details"
import { Documents } from "./profile-tabs/documents"
import { PerformanceHistory } from "./profile-tabs/performance-history"
import { AttendanceHistory } from "./profile-tabs/attendance-history"
import { Mail, Phone, MapPin } from "lucide-react"

interface EmployeeProfileProps {
  employeeId: string
}

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  // Mock employee data - would come from database
  const employee = {
    id: employeeId,
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "JD",
    joinDate: "2023-01-15",
    manager: "Sarah Smith",
    salary: 150000,
    employmentType: "Full-time",
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
          <div className="flex gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl">
              {employee.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{employee.name}</h1>
              <p className="text-lg text-primary mb-4">{employee.position}</p>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {employee.location}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:w-auto">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Department</p>
              <p className="font-semibold text-foreground">{employee.department}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Manager</p>
              <p className="font-semibold text-foreground">{employee.manager}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo employee={employee} />
        </TabsContent>

        <TabsContent value="employment">
          <EmploymentDetails employee={employee} />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceHistory employeeId={employee.id} />
        </TabsContent>

        <TabsContent value="documents">
          <Documents employeeId={employee.id} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceHistory employeeId={employee.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
