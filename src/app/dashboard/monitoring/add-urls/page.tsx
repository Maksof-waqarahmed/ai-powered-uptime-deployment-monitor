import AddUrlsForm from "@/components/add-urls-form";
import { api } from "@/trpc-server/server";

export default async function AddMonitor() {
  const data = await api.slack.getAuthUrl();
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Monitor</h1>
        <p className="text-muted-foreground">Set up a new URL monitor to track uptime and performance</p>
      </div>

      <div className="w-full">
        <AddUrlsForm slackURL={data.url} />
      </div>
    </div>
  )
}
