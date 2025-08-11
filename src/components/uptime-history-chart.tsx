"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { time: "00:00", uptime: 99.9, responseTime: 245 },
  { time: "04:00", uptime: 99.8, responseTime: 267 },
  { time: "08:00", uptime: 99.9, responseTime: 234 },
  { time: "12:00", uptime: 98.2, responseTime: 456 },
  { time: "16:00", uptime: 99.5, responseTime: 298 },
  { time: "20:00", uptime: 99.9, responseTime: 223 },
  { time: "24:00", uptime: 99.9, responseTime: 245 },
]

export function UptimeHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uptime History (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[95, 100]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Time</span>
                          <span className="font-bold text-muted-foreground">{label}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Uptime</span>
                          <span className="font-bold">{payload[0].value}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="uptime"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer> */}
      </CardContent>
    </Card>
  )
}
