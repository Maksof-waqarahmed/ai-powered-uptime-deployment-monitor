import { checkWebsite } from "./check-website";
import cron from "node-cron";

console.log("Starting monitoring cron...");

cron.schedule("* * * * *", async () => {
  console.log("Running website checks...");
  await checkWebsite();
});
