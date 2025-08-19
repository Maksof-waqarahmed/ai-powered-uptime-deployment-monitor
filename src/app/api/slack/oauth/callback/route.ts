import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return new Response("No code provided", { status: 400 });

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
      return new Response(JSON.stringify({ error: data.error }), { status: 400 });
    }
    return NextResponse.redirect(`http://localhost:3000/dashboard`);
  } catch (err) {
    console.error(err);
    return new Response("OAuth error", { status: 500 });
  }
}
