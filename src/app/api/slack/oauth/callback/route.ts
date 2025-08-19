import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!state || !code) return new Response(!code ? "No Code" : "No State", { status: 400 });

  try {
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          code,
          redirect_uri: process.env.SLACK_REDIRECT_URI,
        },
      }
    );

    const data = response.data;

    if (!data.ok) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: 400,
      });
    }

    const slack = await prisma.slackInstallation.create({
      data: {
        teamId: data.team.id,
        teamName: data.team.name,
        botUserId: data.bot_user_id,
        authedUserId: data.authed_user?.id,
        accessToken: data.access_token,
        webhookUrl: "",
        channelId: null,
        channelName: null,
        scopes: data.scope,
        user: {
          connect: { id: state },
        },
      },
    });

    return NextResponse.redirect(`http://localhost:3000/dashboard/monitoring/add-urls`);
  } catch (err) {
    console.error(err);
    return new Response("OAuth error", { status: 500 });
  }
}
