import { checkWebsite } from "@/lib/utils";
import cron from "node-cron";
// Run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running website checks...");
  await checkWebsite()
});
