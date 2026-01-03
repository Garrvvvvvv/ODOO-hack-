import { DashboardLayout } from "@/components/dashboard/layout"
import { EmployeeProfile } from "@/components/employees/employee-profile"

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <DashboardLayout>
      <EmployeeProfile employeeId={id} />
    </DashboardLayout>
  )
}
