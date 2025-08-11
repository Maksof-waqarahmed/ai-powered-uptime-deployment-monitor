"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "sonner"

export default function AddMonitor() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // toast.success("Monitor added successfully!")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Monitor</h1>
        <p className="text-muted-foreground">Set up a new URL monitor to track uptime and performance</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Monitor Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Monitor Name</Label>
                  <Input id="name" placeholder="e.g., Main Website" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL to Monitor</Label>
                  <Input id="url" type="url" placeholder="https://example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" placeholder="Brief description of what this monitor tracks" rows={3} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="interval">Check Interval</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Every 1 minute</SelectItem>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="10">Every 10 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every 1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input id="timeout" type="number" defaultValue="30" min="5" max="300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications when status changes</p>
                    </div>
                    <Switch id="email-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="slack-alerts">Slack Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send notifications to your Slack channel</p>
                    </div>
                    <Switch id="slack-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get SMS notifications for critical issues</p>
                    </div>
                    <Switch id="sms-alerts" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Advanced Settings</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expected-status">Expected Status Code</Label>
                      <Input id="expected-status" placeholder="200" defaultValue="200" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-agent">User Agent</Label>
                      <Input id="user-agent" placeholder="UptimeAI Monitor" defaultValue="UptimeAI Monitor" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expected-content">Expected Content (Optional)</Label>
                    <Input id="expected-content" placeholder="Text that should be present on the page" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Monitor..." : "Create Monitor"}
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
