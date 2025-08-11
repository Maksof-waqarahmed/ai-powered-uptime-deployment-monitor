import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Monitors",
    value: "12",
    change: "+2 from last month",
    icon: Activity,
    color: "text-blue-600",
  },
  {
    title: "Uptime",
    value: "99.9%",
    change: "+0.1% from last week",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Incidents",
    value: "3",
    change: "-2 from last week",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Avg Response",
    value: "245ms",
    change: "-12ms from last hour",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
