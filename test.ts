// // lib/slack.ts
// import { WebClient } from "@slack/web-api";


// const client = new WebClient("token");

// export async function sendSlackMessage(channel: string, text: string) {
//     try {
//         await client.chat.postMessage({
//             channel, // channel ID ya user ID
//             text,    // jo bhi message bhejna ho
//         });

//         console.log("Slack alert sent!");
//     } catch (error: any) {
//         console.error("Error sending Slack alert:", error);
//     }
// }
// async function main() {
//     await sendSlackMessage("C096MUJUBT6", "Hello Slack! From Waqar Rana");
// }

// main();
// // "C07ABC12345" ek channel ID hai (Slack app → Channel → right click → Copy channel ID).
