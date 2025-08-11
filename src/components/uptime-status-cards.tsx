"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const monitors = [
  {
    id: 1,
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptime: "99.9%",
    lastChecked: "2 minutes ago",
    responseTime: "245ms",
  },
  {
    id: 2,
    name: "API Server",
    url: "https://api.example.com",
    status: "up",
    uptime: "99.8%",
    lastChecked: "1 minute ago",
    responseTime: "156ms",
  },
  {
    id: 3,
    name: "Database",
    url: "https://db.example.com",
    status: "down",
    uptime: "98.2%",
    lastChecked: "5 minutes ago",
    responseTime: "timeout",
  },
  {
    id: 4,
    name: "CDN",
    url: "https://cdn.example.com",
    status: "up",
    uptime: "99.9%",
    lastChecked: "3 minutes ago",
    responseTime: "89ms",
  },
]

export function UptimeStatusCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Monitor Status</h2>
        <Button variant="outline" size="sm">
          Refresh All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {monitors.map((monitor) => (
          <Card key={monitor.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">{monitor.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Monitor</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete Monitor</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={monitor.status === "up" ? "default" : "destructive"}
                  className={monitor.status === "up" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {monitor.status.toUpperCase()}
                </Badge>
                <span className="text-sm font-medium">{monitor.uptime}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response:</span>
                  <span className="font-medium">{monitor.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last check:</span>
                  <span className="font-medium">{monitor.lastChecked}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground truncate">{monitor.url}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
