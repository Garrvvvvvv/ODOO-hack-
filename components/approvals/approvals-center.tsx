"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaveApprovals } from "./leave-approvals"
import { DocumentApprovals } from "./document-approvals"
import { ExpenseApprovals } from "./expense-approvals"
import { AllApprovals } from "./all-approvals"

export function ApprovalsCenter() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All Requests</TabsTrigger>
        <TabsTrigger value="leave">Leave Requests</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <AllApprovals />
      </TabsContent>

      <TabsContent value="leave" className="mt-6">
        <LeaveApprovals />
      </TabsContent>

      <TabsContent value="documents" className="mt-6">
        <DocumentApprovals />
      </TabsContent>

      <TabsContent value="expenses" className="mt-6">
        <ExpenseApprovals />
      </TabsContent>
    </Tabs>
  )
}
