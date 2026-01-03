"use client"

interface EmploymentDetailsProps {
  employee: any
}

export function EmploymentDetails({ employee }: EmploymentDetailsProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Employment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Position</label>
          <p className="text-foreground mt-1">{employee.position}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Department</label>
          <p className="text-foreground mt-1">{employee.department}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Employment Type</label>
          <p className="text-foreground mt-1">{employee.employmentType}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Join Date</label>
          <p className="text-foreground mt-1">{employee.joinDate}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Manager</label>
          <p className="text-foreground mt-1">{employee.manager}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Annual Salary</label>
          <p className="text-foreground mt-1">${employee.salary?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
