import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import z from "zod";

const monitorSelect = {
    name: true,
    checkInterval: true,
    slackAlert: true,
    timeout: true,
    url: true,
    emailAlert: true,
    id: true,
};

export const getURLs = createTRPCRouter({
    getAllURLs: protectedProcedure.query(async ({ ctx }) => {
        return ctx.prisma.monitor.findMany({
            where: { isDeleted: false },
            select: monitorSelect,
        });
    }),

    deleteURLs: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const isFound = await ctx.prisma.monitor.findFirst({
                where: { id: input.id },
            });

            if (!isFound) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Monitor not found",
                });
            }

            await ctx.prisma.monitor.update({
                where: { id: input.id },
                data: { isDeleted: true },
            });

            return { success: true, message: "Monitor deleted successfully" };
        }),

    updateURL: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().optional(),
                url: z.string().url().optional(),
                checkInterval: z.number().min(1).optional(),
                timeout: z.number().min(1).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input;

            const isFound = await ctx.prisma.monitor.findFirst({
                where: { id },
            });

            if (!isFound) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Monitor not found",
                });
            }

            const updateData = Object.fromEntries(
                Object.entries(rest).filter(([_, v]) => v !== undefined)
            );

            if (Object.keys(updateData).length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "No valid fields provided for update",
                });
            }

            await ctx.prisma.monitor.update({
                where: { id },
                data: updateData
            });
        }),
});
