"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { DocumentManagement } from "@/components/documents/document-management"

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage employee documents and files</p>
        </div>
        <DocumentManagement />
      </div>
    </DashboardLayout>
  )
}
