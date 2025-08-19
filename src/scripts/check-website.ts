import { prisma } from "../../prisma/db";
import { generateGeminiResponse } from "./gpt-script";
import { sendSlackMessage } from "./send-alert";

export const checkWebsite = async () => {
    const now = new Date();
    const monitors = await prisma.monitor.findMany({
      where: { isDeleted: false, nextCheckAt: { lte: now } },
      include: {
        user: {
          include: {
            SlackInstallation: true, // user ke saath slackInstallation bhi nikal lo
          },
        },
      },
    });
  
    for (const monitor of monitors) {
      const { url, id, checkInterval, user } = monitor;
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
      
  
      let log;
      if (geminiResult) {
        log = await prisma.monitorLog.create({
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
  
      if (geminiResult?.status === "DOWN" && user?.SlackInstallation?.length) {
        const slack = user.SlackInstallation[0];
  
        if (slack.channelId && slack.accessToken) {
          await sendSlackMessage(slack.accessToken, slack.channelId,
            `⚠️ Website Down Alert\nURL: ${url}\nError: ${errorMessage || httpCode}`
          );
        }
      }
    }
  };