'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Edit, Trash2 } from 'lucide-react'
import UpdateURL from '../update-urls-form'

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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedURL, setSelectedURL] = useState<URLs | null>(null);

    return (
        <div>
            <UpdateURL
                open={isOpen}
                onOpenChange={setIsOpen}
                url={selectedURL || undefined}
            />
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
                                    <TableCell>{log.name}</TableCell>
                                    <TableCell className="text-blue-600">{log.url}</TableCell>
                                    <TableCell>{log.checkInterval}</TableCell>
                                    <TableCell>{log.timeout}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedURL(log);
                                                setIsOpen(true);
                                            }}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-400">
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
    );
};


export default TableURLs