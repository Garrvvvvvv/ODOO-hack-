"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PayrollSummary } from "./payroll-summary"
import { PayrollProcessing } from "./payroll-processing"
import { PaymentHistory } from "./payment-history"
import { SalaryManagement } from "./salary-management"

export function PayrollDashboard() {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="processing">Process Payroll</TabsTrigger>
        <TabsTrigger value="salary">Salary Management</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="mt-6">
        <PayrollSummary />
      </TabsContent>

      <TabsContent value="processing" className="mt-6">
        <PayrollProcessing />
      </TabsContent>

      <TabsContent value="salary" className="mt-6">
        <SalaryManagement />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <PaymentHistory />
      </TabsContent>
    </Tabs>
  )
}
