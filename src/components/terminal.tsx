import { Terminal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export interface Logs {
    id: string
    monitorId: string
    status: string
    httpCode: number | null
    responseTime: number | null
    errorMessage: string | null
    checkedAt: Date
    monitor: {
        name: string
        url: string
    }
}

interface TerminalProps {
    data: Logs[]
}
const TerminalComp = ({ data }: TerminalProps) => {

    const getLevelColor = (level: string) => {
        switch (level) {
            case "ERROR":
                return "text-red-400"
            case "DOWN":
                return "text-yellow-400"
            case "UP":
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
        <div>
            <Card className="bg-black border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-400">
                        <Terminal className="h-5 w-5" />
                        Live Logs
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-black rounded-lg font-mono text-sm max-h-96">
                        {data && data.map((log) => (
                            <div key={log.id} className="mb-2 hover:bg-gray-900 p-2 rounded">
                                <span className="text-gray-500"> [{log.checkedAt.toLocaleString()}]</span>{" "}
                                <span className="font-bold text-white">{log.httpCode}</span>{" "}
                                <span className="text-blue-400"><a href={log.monitor.url} target='_blank'>{log.monitor.url}</a></span> <span className="text-purple-400">({log.monitor.name})</span>{" "}
                                <span className={getStatusColor(+log.status)}>{log.status}</span>{" "}
                                <span className="text-gray-400">{log.responseTime}</span>
                                <br />
                                <span className="text-gray-300 ml-4">└─ {log.errorMessage ?? "Successfull"}</span>
                            </div>
                        ))}
                        {data && data.length === 0 && (
                            <div className="text-gray-500 text-center py-8">No logs found matching your search criteria</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TerminalComp