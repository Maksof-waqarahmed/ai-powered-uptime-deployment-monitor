import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { monitorSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";


export const monitorRouter = createTRPCRouter({
    add: protectedProcedure.input(
        z.object({
            monitorSchema
        })
    ).mutation(async ({ ctx, input }) => {
        const userID = ctx.session.user.id;

        try {
            return ctx.prisma.monitor.create({
                data: {
                    name: input.monitorSchema.name,
                    url: input.monitorSchema.url,
                    checkInterval: input.monitorSchema.checkInterval,
                    timeout: input.monitorSchema.timeout,
                    userId: userID

                }
            })
        } catch (error: any) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error
            })

        }
    })
})