// app/api/slack/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/trpc-server/server";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

    try {
        console.log("Code", code)
        const host = req.nextUrl.origin;
        console.log("Host", host)
        // await api.slack.exchangeCode({ code });
        // return NextResponse.json({ message: "Code received", code });
        return NextResponse.redirect(`https://ai-powered.loca.lt/dashboard/monitoring/add-urls?slack=connected`);;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Slack OAuth failed" }, { status: 500 });
    }
}
