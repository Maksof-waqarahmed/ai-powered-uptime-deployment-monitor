export async function sendSlackWebhook(webhookUrl: string, message: string) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });

    console.log("Slack alert sent!");
  } catch (error) {
    console.error("Error sending Slack alert:", error);
  }
}
