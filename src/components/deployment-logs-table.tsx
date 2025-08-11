"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const deployments = [
  {
    id: 1,
    service: "Frontend",
    status: "success",
    time: "2 hours ago",
    duration: "2m 34s",
    commit: "abc123f",
  },
  {
    id: 2,
    service: "API",
    status: "success",
    time: "4 hours ago",
    duration: "1m 45s",
    commit: "def456a",
  },
  {
    id: 3,
    service: "Database",
    status: "failed",
    time: "6 hours ago",
    duration: "5m 12s",
    commit: "ghi789b",
  },
  {
    id: 4,
    service: "CDN",
    status: "success",
    time: "8 hours ago",
    duration: "45s",
    commit: "jkl012c",
  },
]

export function DeploymentLogsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Deployments</CardTitle>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell className="font-medium">{deployment.service}</TableCell>
                <TableCell>
                  <Badge
                    variant={deployment.status === "success" ? "default" : "destructive"}
                    className={deployment.status === "success" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {deployment.status}
                  </Badge>
                </TableCell>
                <TableCell>{deployment.duration}</TableCell>
                <TableCell className="text-muted-foreground">{deployment.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
