import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "../../prisma/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const checkWebsite = async () => {
  const now = new Date();

  const urls = await prisma.monitor.findMany({
    where: { nextCheckAt: { lte: now } }
  })

  for (const { url, id, checkInterval } of urls) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        // await sendSlackAlert(monitor.slackToken, `❌ ${monitor.url} is DOWN!`);
      }
    } catch (err) {
      // await sendSlackAlert(monitor.slackToken, `🚨 ${monitor.url} check failed!`);
    }

    // Update next check time
    await prisma.monitor.update({
      where: { id },
      data: { nextCheckAt: new Date(Date.now() + Number(checkInterval) * 60 * 1000) }
    });

  }
}
async function sendSlackAlert(token: string, text: string) {
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ channel: "#general", text })
  });
}