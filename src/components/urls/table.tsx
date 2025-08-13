import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Edit, Trash2 } from 'lucide-react'

interface URLs {
    name: string,
    checkInterval: string,
    timeout: string,
    slackAlert: boolean,
    emailAlert: boolean,
    url: string,
    id: string
}

interface TableProps {
    data: URLs[]
}
const TableURLs = ({ data }: TableProps) => {
    return (
        <div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>App Name</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Interval</TableHead>
                                <TableHead>Time Out</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-sm">{log.name}</TableCell>
                                    <TableCell className="font-mono text-sm text-blue-600">{log.url}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.checkInterval}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.timeout}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.emailAlert}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.emailAlert}</TableCell>
                                    <TableCell >
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-primary hover:text-primary/40 hover:bg-white/10"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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

export default TableURLs