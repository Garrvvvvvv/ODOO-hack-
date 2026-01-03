"use client"

import { X, Bell, CheckCircle, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationPanelProps {
  onClose?: () => void
}

const notifications = [
  {
    id: 1,
    type: "approval",
    title: "New Leave Request",
    description: "John Doe requested 5 days vacation",
    time: "2 hours ago",
    icon: AlertCircle,
    read: false,
  },
  {
    id: 2,
    type: "approved",
    title: "Request Approved",
    description: "Emily Brown's sick leave was approved",
    time: "5 hours ago",
    icon: CheckCircle,
    read: false,
  },
  {
    id: 3,
    type: "document",
    title: "Document Uploaded",
    description: "Sarah Smith uploaded verification documents",
    time: "1 day ago",
    icon: FileText,
    read: true,
  },
  {
    id: 4,
    type: "approval",
    title: "Expense Report Pending",
    description: "Mike Johnson submitted conference expenses",
    time: "2 days ago",
    icon: AlertCircle,
    read: true,
  },
]

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-foreground" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs font-bold bg-destructive text-white rounded-full px-2 py-1">{unreadCount}</span>
          )}
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div
              key={notification.id}
              className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${
                    notification.type === "approved"
                      ? "bg-green-500/10"
                      : notification.type === "document"
                        ? "bg-blue-500/10"
                        : "bg-yellow-500/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      notification.type === "approved"
                        ? "text-green-600 dark:text-green-400"
                        : notification.type === "document"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>

                {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1"></div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border flex gap-2">
        <Button variant="outline" className="flex-1 h-9 bg-transparent">
          Mark all as read
        </Button>
        <Button className="flex-1 bg-primary hover:bg-accent text-primary-foreground h-9">View all</Button>
      </div>
    </div>
  )
}
