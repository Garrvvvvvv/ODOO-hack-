"use client"

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
}

interface PersonalInfoProps {
  employee: Employee
}

export function PersonalInfo({ employee }: PersonalInfoProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
          <p className="text-foreground mt-1">{employee.name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Email Address</label>
          <p className="text-foreground mt-1">{employee.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
          <p className="text-foreground mt-1">{employee.phone}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <p className="text-foreground mt-1">{employee.location}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
          <p className="text-foreground mt-1">March 15, 1990</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
          <p className="text-foreground mt-1">Jane Doe - +1 (555) 987-6543</p>
        </div>
      </div>
    </div>
  )
}
