import { prisma } from "../../prisma/db";
import { generateGPTResponse } from "./gpt-script";
import { sendSlackWebhook } from "./send-slack-alert";
import { sendEmail } from "./smtp-server";

export const checkWebsite = async () => {
  const now = new Date();
  const monitors = await prisma.monitor.findMany({
    where: { isDeleted: false, nextCheckAt: { lte: now } },
    select: {
      id: true,
      url: true,
      checkInterval: true,
      email: true,
      slackWebhook: true,
      name: true,
    }
  });

  for (const monitor of monitors) {
    const { url, id, checkInterval, email, slackWebhook, name } = monitor;
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

    let gptResult;
    if (httpCode && httpCode >= 200 && httpCode < 300) {
      gptResult = { status: "UP", httpCode, responseTime, errorMessage: null };
    } else if (httpCode && httpCode >= 400) {
      gptResult = { status: "DOWN", httpCode, responseTime, errorMessage };
    } else {
      gptResult = await generateGPTResponse({
        httpCode,
        responseTime,
        errorMessage,
        bodySnippet,
      });
    }

    if (gptResult) {
      await prisma.monitorLog.create({
        data: {
          monitorId: id,
          status: gptResult.status,
          httpCode: gptResult.httpCode,
          responseTime: gptResult.responseTime,
          errorMessage: gptResult.errorMessage,
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

    if ((gptResult?.status === "DOWN" || gptResult?.status === "ERROR") && email) {
      await sendEmail(email!,
        `Name: ${name}\n⚠️ Website Down Alert\nURL: ${url}\nError: ${errorMessage || httpCode}`,
      );
    }

    if ((gptResult?.status === "DOWN" || gptResult?.status === "ERROR") && slackWebhook) {
      await sendSlackWebhook(slackWebhook,
        `Name: ${name}\n⚠️ Website Down Alert\nURL: ${url}\nError: ${errorMessage || httpCode}`,
      );
    }
  }
};