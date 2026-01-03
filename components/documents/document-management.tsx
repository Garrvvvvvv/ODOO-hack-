"use client"

import { useState } from "react"
import { Search, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, Trash2 } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Offer Letter - John Doe",
    employee: "John Doe",
    type: "PDF",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    category: "Onboarding",
  },
  {
    id: 2,
    name: "Employment Contract - Sarah Smith",
    employee: "Sarah Smith",
    type: "PDF",
    uploadDate: "2024-01-20",
    size: "1.8 MB",
    category: "Legal",
  },
  {
    id: 3,
    name: "ID Verification - Mike Johnson",
    employee: "Mike Johnson",
    type: "PDF",
    uploadDate: "2024-02-10",
    size: "3.2 MB",
    category: "Verification",
  },
  {
    id: 4,
    name: "Performance Review 2024 - Emily Brown",
    employee: "Emily Brown",
    type: "PDF",
    uploadDate: "2024-03-15",
    size: "1.5 MB",
    category: "Performance",
  },
  {
    id: 5,
    name: "Tax Document - David Lee",
    employee: "David Lee",
    type: "PDF",
    uploadDate: "2024-03-20",
    size: "0.9 MB",
    category: "Tax",
  },
]

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", ...new Set(documents.map((d) => d.category))]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.employee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || doc.category === filterCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents by name or employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 h-10">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Documents Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Document Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Upload Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Size</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{doc.employee}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-400">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{doc.uploadDate}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{doc.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground" />
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

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No documents found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
