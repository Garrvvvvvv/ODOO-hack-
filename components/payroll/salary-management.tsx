"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const salaries = [
  {
    id: 1,
    employeeName: "John Doe",
    position: "Senior Developer",
    baseSalary: 150000,
    allowances: 10000,
    deductions: 12000,
    netSalary: 148000,
    currency: "USD",
  },
  {
    id: 2,
    employeeName: "Sarah Smith",
    position: "Product Manager",
    baseSalary: 140000,
    allowances: 8000,
    deductions: 11200,
    netSalary: 136800,
    currency: "USD",
  },
  {
    id: 3,
    employeeName: "Mike Johnson",
    position: "Designer",
    baseSalary: 120000,
    allowances: 5000,
    deductions: 10000,
    netSalary: 115000,
    currency: "USD",
  },
  {
    id: 4,
    employeeName: "Emily Brown",
    position: "HR Manager",
    baseSalary: 130000,
    allowances: 7000,
    deductions: 10400,
    netSalary: 126600,
    currency: "USD",
  },
  {
    id: 5,
    employeeName: "David Lee",
    position: "QA Engineer",
    baseSalary: 110000,
    allowances: 5000,
    deductions: 9200,
    netSalary: 105800,
    currency: "USD",
  },
]

export function SalaryManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSalaries = salaries.filter(
    (salary) =>
      salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalBaseSalary = salaries.reduce((sum, s) => sum + s.baseSalary, 0)
  const totalAllowances = salaries.reduce((sum, s) => sum + s.allowances, 0)
  const totalDeductions = salaries.reduce((sum, s) => sum + s.deductions, 0)
  const totalNetSalary = salaries.reduce((sum, s) => sum + s.netSalary, 0)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Base Salary</p>
          <p className="text-2xl font-bold text-foreground">${totalBaseSalary.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Allowances</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalAllowances.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Deductions</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalDeductions.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Net Salary</p>
          <p className="text-2xl font-bold text-primary">${totalNetSalary.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-10">
          <Plus className="w-4 h-4" />
          Add Salary
        </Button>
      </div>

      {/* Salary Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Position</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Base Salary</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Allowances</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Deductions</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Net Salary</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => (
                <tr key={salary.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{salary.employeeName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{salary.position}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    ${salary.baseSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-medium">
                    ${salary.allowances.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400 font-medium">
                    ${salary.deductions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">${salary.netSalary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
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
