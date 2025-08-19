import cron from "node-cron";
import { checkWebsite } from "./check-website";
// Run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running website checks...");
  await checkWebsite()
});
