import TerminalComp from "@/components/terminal"
import { api } from "@/trpc-server/server"
import { Search } from "lucide-react"

export default async function LogsPage() {

  const data = await api.monitor.getAllMonitors();

  console.log("Data", data)

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">System Logs</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              {/* <Input
                placeholder="Search by name or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-card"
              /> */}
            </div>
            <div className="flex gap-2">
              {/* {["ALL", "INFO", "WARN", "ERROR"].map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))} */}
            </div>
          </div>
        </div>

        {/* Terminal-style Log Display */}
        <TerminalComp data={data!}/>

        {/* Logs Table */}
        {/* <Card className="bg-card">
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
        </Card> */}
      </div>
    </div>
  )
}
