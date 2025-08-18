import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter } from "lucide-react";
import { Logs } from './terminal';

interface TableProps {
    data: Logs[]
}

const TableLogs = ({ data }: TableProps) => {
    return (
        <div>
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
                                <TableHead>Name</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>HTTP Code</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Message</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-sm">{log.checkedAt.toLocaleString()}</TableCell>
                                    <TableCell className="font-medium">{log.monitor.name}</TableCell>
                                    <TableCell className="font-mono text-sm text-blue-600"><a href={log.monitor.url} target="_blank">{log.monitor.url}</a></TableCell>
                                    <TableCell className="font-mono text-sm">{log.httpCode}</TableCell>
                                    <TableCell>
                                        <span className="">{log.status}</span>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{log.responseTime}</TableCell>
                                    <TableCell className="max-w-md truncate">
                                        {log.errorMessage ?? "Success"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default TableLogs