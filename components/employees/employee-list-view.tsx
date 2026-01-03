"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+1 (555) 123-4567",
    avatar: "JD",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@company.com",
    position: "Product Manager",
    department: "Product",
    phone: "+1 (555) 234-5678",
    avatar: "SS",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    position: "Designer",
    department: "Design",
    phone: "+1 (555) 345-6789",
    avatar: "MJ",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@company.com",
    position: "HR Manager",
    department: "Human Resources",
    phone: "+1 (555) 456-7890",
    avatar: "EB",
    status: "Active",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@company.com",
    position: "QA Engineer",
    department: "Quality Assurance",
    phone: "+1 (555) 567-8901",
    avatar: "DL",
    status: "On Leave",
  },
]

export function EmployeeListView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState("All")

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === "All" || emp.department === filterDept

    return matchesSearch && matchesDept
  })

  const departments = ["All", ...new Set(employees.map((e) => e.department))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-10">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Link key={employee.id} href={`/dashboard/employees/${employee.id}`}>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              {/* Avatar */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {employee.avatar}
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    employee.status === "Active"
                      ? "bg-green-500/10 text-green-700 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                  }`}
                >
                  {employee.status}
                </span>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-semibold text-foreground mb-1">{employee.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{employee.position}</p>

                <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-3">
                  <p>{employee.department}</p>
                  <p className="truncate">{employee.email}</p>
                  <p>{employee.phone}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No employees found matching your search</p>
        </div>
      )}
    </div>
  )
}
