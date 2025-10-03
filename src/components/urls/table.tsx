'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Edit, Trash2 } from 'lucide-react'
import UpdateURL from '../update-urls-form'
import { api } from '@/trpc-server/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import PaginationComponent from '../pagination'
import { URLs } from '@/schemas'

interface TableProps {
    data: URLs[],
    totalPages: number,
    currentPage: number
}

const TableURLs = ({ data, currentPage, totalPages }: TableProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedURL, setSelectedURL] = useState<URLs | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { mutateAsync: remove } = api.urls.deleteURLs.useMutation({
        onError: (error) => {
            console.log("Error", error)
        }
    })
    const router = useRouter();

    async function deleteMonitor(id: string) {
        setDeletingId(id);
        try {
            await remove({ id });
            toast.success("Monitor Deleted Successfully");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete monitor");
        } finally {
            setDeletingId(null);
        }
    }

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
                                <TableHead>Timeout</TableHead>
                                <TableHead>Email Alert</TableHead>
                                <TableHead>Slack Alert</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data && data.length > 0 ? (
                                    data.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell>{log.name}</TableCell>
                                            <TableCell className="text-blue-600">
                                                <a href={log.url} target='_blank'>{log.url}</a>
                                            </TableCell>
                                            <TableCell>{log.checkInterval}</TableCell>
                                            <TableCell>{log.timeout}</TableCell>
                                            <TableCell>
                                                {log.emailAlert ? (
                                                    <span className="text-green-600 font-medium">Yes</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {log.slackAlert ? (
                                                    <span className="text-green-600 font-medium">Yes</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
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
                                                <Button
                                                    onClick={() => deleteMonitor(log.id)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-400"
                                                    disabled={deletingId === log.id}
                                                >
                                                    {deletingId === log.id ? (
                                                        <span className="animate-spin border-2 border-t-transparent border-red-400 rounded-full w-4 h-4" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-500">
                                            No URL Added Yet!
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                    {
                        data && data.length > 0 && (
                            <div className='flex justify-end w-full mt-5'>
                                <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default TableURLs
