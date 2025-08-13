import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const getURLs = createTRPCRouter({
    getAllURLs: protectedProcedure.query(async ({ ctx }) => {
        return ctx.prisma.monitor.findMany({
            select: {
                name: true,
                checkInterval: true,
                slackAlert: true,
                timeout: true,
                url: true,
                emailAlert: true,
                id: true
            }
        })
    })
})