"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Search } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"

const logs = [
  {
    id: 1,
    monitor: "Main Website",
    status: "up",
    responseTime: "245ms",
    statusCode: 200,
    timestamp: "2024-01-15 14:30:25",
    location: "US East",
  },
  {
    id: 2,
    monitor: "API Server",
    status: "up",
    responseTime: "156ms",
    statusCode: 200,
    timestamp: "2024-01-15 14:29:45",
    location: "US West",
  },
  {
    id: 3,
    monitor: "Database",
    status: "down",
    responseTime: "timeout",
    statusCode: 0,
    timestamp: "2024-01-15 14:25:12",
    location: "EU Central",
  },
  {
    id: 4,
    monitor: "CDN",
    status: "up",
    responseTime: "89ms",
    statusCode: 200,
    timestamp: "2024-01-15 14:28:33",
    location: "Asia Pacific",
  },
  {
    id: 5,
    monitor: "Main Website",
    status: "up",
    responseTime: "267ms",
    statusCode: 200,
    timestamp: "2024-01-15 14:25:25",
    location: "US East",
  },
]

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.monitor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logs</h1>
        <p className="text-muted-foreground">View detailed logs of all uptime checks and monitor events</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search monitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="up">Up</SelectItem>
                <SelectItem value="down">Down</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerWithRange />

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Monitor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Status Code</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.monitor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "up" ? "default" : "destructive"}
                      className={log.status === "up" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {log.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.responseTime}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.statusCode || "N/A"}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.location}</TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
