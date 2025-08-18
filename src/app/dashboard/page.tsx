import Main from "@/components/dashboard/main"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <>
      <Separator />
      <div className="min-h-screen bg-background">
        <Main />
      </div>
    </>
  )
}
