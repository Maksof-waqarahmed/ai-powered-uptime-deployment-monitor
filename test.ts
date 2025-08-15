
// import { prisma } from "./prisma/db";

// const checkWebsite = async () => {
//   const now = new Date();
//   const urls = await prisma.monitor.findMany({
//     where: { isDeleted: false, nextCheckAt: { lte: now } },
//   });

//   for (const { url, id, checkInterval } of urls) {
//     let httpCode: number | null = null;
//     let responseTime: number | null = null;
//     let errorMessage: string | null = null;
//     let bodySnippet = "";

//     try {
//       const start = Date.now();
//       const res = await fetch("https://wallwoodies.com/", { method: "GET" });
//       responseTime = Date.now() - start;
//       httpCode = res.status;

//       const body = await res.text();
//       bodySnippet = body.slice(0, 1000);
//     } catch (err: any) {
//       errorMessage = err.message || "Request failed";
//     }

//     const geminiResult = await generateKeyWordsGemini({
//       httpCode,
//       responseTime,
//       errorMessage,
//       bodySnippet,
//     });

//     console.log("Result for", url, geminiResult);

//     // if (geminiResult) {
//     //   await prisma.monitorLog.create({
//     //     data: {
//     //       monitorId: id,
//     //       status: geminiResult.status,
//     //       httpCode: geminiResult.httpCode,
//     //       responseTime: geminiResult.responseTime,
//     //       errorMessage: geminiResult.errorMessage,
//     //       checkedAt: new Date(),
//     //     },
//     //   });
//     // }

//     // await prisma.monitor.update({
//     //   where: { id },
//     //   data: {
//     //     nextCheckAt: new Date(Date.now() + checkInterval * 60 * 1000),
//     //   },
//     // });
//   }
// };

// checkWebsite();
