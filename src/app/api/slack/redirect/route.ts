import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const state = session?.user.id;
  try {
    const clientId = process.env.SLACK_CLIENT_ID;
    const redirectUri = process.env.SLACK_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return new Response("Missing client ID or redirect URI", { status: 400 });
    }

    const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write&redirect_uri=${redirectUri}&state=${state}`;

    return Response.redirect(slackUrl);
  } catch (err) {
    console.error(err);
    return new Response("OAuth error", { status: 500 });
  }
}
