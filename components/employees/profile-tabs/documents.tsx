"use client"

import { FileText, Download, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const documents = [
  {
    id: 1,
    name: "Offer Letter",
    type: "PDF",
    uploadDate: "2023-01-15",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Employment Contract",
    type: "PDF",
    uploadDate: "2023-01-15",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "ID Verification",
    type: "PDF",
    uploadDate: "2023-01-20",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Performance Review 2024",
    type: "PDF",
    uploadDate: "2024-03-15",
    size: "1.5 MB",
  },
]

interface DocumentsProps {
  employeeId: string
}

export function Documents({ employeeId }: DocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Documents</h2>
          <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-9" size="sm">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.type} • {doc.size} • {doc.uploadDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-muted rounded transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-muted rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
