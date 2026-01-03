"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { ChevronRight, BarChart3, Users, Clock, FileText } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(true)

  const handleLoginSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 min-h-screen gap-8 items-center p-4 md:p-12">
        {/* Left side - Features */}
        <div className="hidden md:flex flex-col justify-center space-y-12">
          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Complete HR Management</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Streamline your entire HR workflow with intelligent automation and real-time insights.
            </p>
          </div>

          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Team Collaboration</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Foster better communication and engagement across your entire organization.
            </p>
          </div>

          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Time & Attendance</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Track attendance, manage leaves, and handle scheduling effortlessly.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            {/* Logo and Branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary mb-4">
                <span className="text-primary-foreground text-2xl font-bold">D</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dayflow</h1>
              <p className="text-muted-foreground">Modern HR Management Platform</p>
            </div>

            {/* Login Form */}
            <LoginForm onSuccess={handleLoginSuccess} />

            {/* Demo Credentials */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Demo Credentials
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                  <div>
                    <p className="font-medium text-foreground">Admin Account</p>
                    <p>admin@dayflow.com</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                  <div>
                    <p className="font-medium text-foreground">Employee Account</p>
                    <p>emp@dayflow.com</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-muted-foreground/70 mt-2">Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
