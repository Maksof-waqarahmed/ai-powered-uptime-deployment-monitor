"use client"

import { useState, useEffect } from "react"
import { Search, Terminal, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock log data
const mockLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    level: "INFO",
    url: "/api/users",
    name: "User Authentication",
    message: "User login successful for user@example.com",
    status: 200,
    duration: "125ms",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:31:42",
    level: "ERROR",
    url: "/api/orders",
    name: "Order Processing",
    message: "Failed to process payment: Invalid card number",
    status: 400,
    duration: "89ms",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:30:18",
    level: "WARN",
    url: "/api/inventory",
    name: "Inventory Check",
    message: "Low stock warning: Product ID 12345 has only 2 items left",
    status: 200,
    duration: "45ms",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:29:33",
    level: "INFO",
    url: "/api/products",
    name: "Product Catalog",
    message: "Product list retrieved successfully",
    status: 200,
    duration: "67ms",
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:28:55",
    level: "ERROR",
    url: "/api/database",
    name: "Database Connection",
    message: "Connection timeout to database server",
    status: 500,
    duration: "5000ms",
  },
]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLogs, setFilteredLogs] = useState(mockLogs)
  const [selectedLevel, setSelectedLevel] = useState("ALL")

  useEffect(() => {
    let filtered = mockLogs.filter(
      (log) =>
        log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (selectedLevel !== "ALL") {
      filtered = filtered.filter((log) => log.level === selectedLevel)
    }

    setFilteredLogs(filtered)
  }, [searchTerm, selectedLevel])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "text-red-400"
      case "WARN":
        return "text-yellow-400"
      case "INFO":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400"
    if (status >= 400 && status < 500) return "text-yellow-400"
    if (status >= 500) return "text-red-400"
    return "text-gray-400"
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">System Logs</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-card"
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "INFO", "WARN", "ERROR"].map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal-style Log Display */}
        <Card className="bg-black border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Terminal className="h-5 w-5" />
              Live Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="mb-2 hover:bg-gray-900 p-2 rounded">
                  <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                  <span className={`font-bold ${getLevelColor(log.level)}`}>{log.level}</span>{" "}
                  <span className="text-blue-400">{log.url}</span> <span className="text-purple-400">({log.name})</span>{" "}
                  <span className={getStatusColor(log.status)}>{log.status}</span>{" "}
                  <span className="text-gray-400">{log.duration}</span>
                  <br />
                  <span className="text-gray-300 ml-4">└─ {log.message}</span>
                </div>
              ))}
              {filteredLogs.length === 0 && (
                <div className="text-gray-500 text-center py-8">No logs found matching your search criteria</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Log Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge
                        variant={log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "secondary" : "default"}
                      >
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.name}</TableCell>
                    <TableCell className="font-mono text-sm text-blue-600">{log.url}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(log.status)}>{log.status}</span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.duration}</TableCell>
                    <TableCell className="max-w-md truncate" title={log.message}>
                      {log.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
