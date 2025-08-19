// lib/slack.ts
import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_BOT_TOKEN!;
const client = new WebClient(token);

export async function sendSlackMessage(channel: string, text: string) {
  try {
    await client.chat.postMessage({
      channel,
      text,
    });

    console.log('Slack alert sent!');
  } catch (error: any) {
    console.error('Error sending Slack alert:', error);
  }
}
