import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import axios from "axios";

export const connectSlack = createTRPCRouter({
    getAuthUrl: protectedProcedure.query(() => {
        const clientId = process.env.SLACK_CLIENT_ID!;
        const redirectUri = encodeURIComponent(process.env.SLACK_REDIRECT_URI!);
        const scopes = encodeURIComponent("chat:write,channels:read");

        const url = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
        return { url };
    }),

    exchangeCode: publicProcedure.input(z.object({ code: z.string() })).mutation(async ({ input }) => {

        const res = await axios.post(
            "https://slack.com/api/oauth.v2.access",
            new URLSearchParams({
                client_id: process.env.SLACK_CLIENT_ID!,
                client_secret: process.env.SLACK_CLIENT_SECRET!,
                code: input.code,
                redirect_uri: process.env.SLACK_REDIRECT_URI!,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        if (!res.data.ok) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: res.data.error
            });
        }

        // // Bot token save karo DB me, user ke saath link karke
        // await ctx.prisma.slackInstallation.create({
        //     data: {
        //         userId: userID,
        //         accessToken: res.data.access_token,
        //         botUserId: res.data.bot_user_id,
        //         teamId: res.data.team.id,
        //         webhookUrl: ""

        //     },
        // });
    }),
    sendNotification: protectedProcedure.input(z.object({
        channel: z.string(),
        text: z.string()
    })).mutation(async ({ ctx, input }) => {
        const userID = ctx.session.user.id;
        const token = await ctx.prisma.slackInstallation.findFirst({
            where: { userId: userID },
            select: { accessToken: true }
        });

        if (!token) throw new TRPCError({ code: "NOT_FOUND", message: "Slack not connected" });

        const { channel, text } = input;
        await axios.post(
            "https://slack.com/api/chat.postMessage",
            { channel, text },
            {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
    })

});

