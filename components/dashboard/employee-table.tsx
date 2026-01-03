"use client"

import { MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    position: "Senior Developer",
    department: "Engineering",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@company.com",
    position: "Product Manager",
    department: "Product",
    status: "Active",
    joinDate: "2023-03-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    position: "Designer",
    department: "Design",
    status: "Active",
    joinDate: "2023-05-10",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@company.com",
    position: "HR Manager",
    department: "Human Resources",
    status: "Active",
    joinDate: "2023-02-28",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@company.com",
    position: "QA Engineer",
    department: "Quality Assurance",
    status: "On Leave",
    joinDate: "2023-04-05",
  },
]

export function EmployeeTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Employees</h2>
        <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-9">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Position</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{employee.position}</td>
                <td className="px-6 py-4 text-sm text-foreground">{employee.department}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === "Active"
                        ? "bg-green-500/10 text-green-700 dark:text-green-400"
                        : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{employee.joinDate}</td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing 5 of 248 employees</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-border hover:bg-muted transition-colors">Previous</button>
          <button className="px-3 py-1 rounded border border-border hover:bg-muted transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
