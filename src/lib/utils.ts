import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "../../prisma/db";
import { generateGeminiResponse } from "@/scripts/gpt-script";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkWebsite = async () => {
  const now = new Date();
  const urls = await prisma.monitor.findMany({
    where: { isDeleted: false, nextCheckAt: { lte: now } },
  });

  for (const { url, id, checkInterval } of urls) {
    let httpCode: number | null = null;
    let responseTime: number | null = null;
    let errorMessage: string | null = null;
    let bodySnippet = "";

    try {
      const start = Date.now();
      const res = await fetch(url, { method: "GET" });
      responseTime = Date.now() - start;
      httpCode = res.status;

      const body = await res.text();
      bodySnippet = body.slice(0, 1000);
    } catch (err: any) {
      errorMessage = err.message || "Request failed";
    }

    const geminiResult = await generateGeminiResponse({
      httpCode,
      responseTime,
      errorMessage,
      bodySnippet,
    });

    console.log("Result for", url, geminiResult);

    if (geminiResult) {
      await prisma.monitorLog.create({
        data: {
          monitorId: id,
          status: geminiResult.status,
          httpCode: geminiResult.httpCode,
          responseTime: geminiResult.responseTime,
          errorMessage: geminiResult.errorMessage,
          checkedAt: new Date()
        },
      });
    }

    await prisma.monitor.update({
      where: { id },
      data: {
        nextCheckAt: new Date(Date.now() + Number(checkInterval) * 60 * 1000),
      },
    });
  }
};

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