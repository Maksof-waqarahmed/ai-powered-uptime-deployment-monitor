import { WebClient } from "@slack/web-api";

export async function sendSlackMessage(accessToken: string, channelId: string, text: string) {
  try {
    const slack = new WebClient(accessToken);
    await slack.chat.postMessage({
      channel: channelId,
      text,
    });

    console.log('Slack alert sent!');
  } catch (error: any) {
    console.error('Error sending Slack alert:', error);
  }
}
