"use client"

import { Menu, Bell, LogOut } from "lucide-react"
import { useState } from "react"
import { NotificationPanel } from "@/components/notifications/notification-panel"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Menu */}
        <button onClick={onMenuClick} className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden">
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold cursor-pointer">
              A
            </div>
          </div>

          {/* Logout */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors ml-2">
            <LogOut className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
