"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Clock, DollarSign, CheckSquare, Settings, X, Calendar } from "lucide-react"

interface SidebarProps {
  open: boolean
  onToggle?: () => void
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Employees", icon: Users, href: "/dashboard/employees" },
  { label: "Documents", icon: FileText, href: "/dashboard/documents" },
  { label: "Attendance", icon: Clock, href: "/dashboard/attendance" },
  { label: "Leave Management", icon: Calendar, href: "/dashboard/leaves" },
  { label: "Payroll", icon: DollarSign, href: "/dashboard/payroll" },
  { label: "Approvals", icon: CheckSquare, href: "/dashboard/approvals" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 transition-transform z-50 w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
              D
            </div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Dayflow</h1>
          </div>
          <button onClick={onToggle} className="lg:hidden p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-sidebar-foreground/60">© 2025 Dayflow HR</p>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onToggle}></div>}
    </>
  )
}
