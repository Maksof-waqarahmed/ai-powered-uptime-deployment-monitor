import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import z from "zod";

const monitorSelect = {
    name: true,
    checkInterval: true,
    slackAlert: true,
    slackWebhook: true,
    email: true,
    timeout: true,
    url: true,
    emailAlert: true,
    id: true,
};

export const getURLs = createTRPCRouter({
    getAllURLs: protectedProcedure.input(
        z.object({
            page: z.number().min(1).default(1),
            limit: z.number().min(1).max(100).default(10),
        })
    ).query(async ({ ctx, input }) => {
        const userID = ctx.session.user.id;
        const { page, limit } = input;

        const [items, total] = await Promise.all([
            ctx.prisma.monitor.findMany({
                where: { isDeleted: false, userId: userID },
                select: monitorSelect,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            ctx.prisma.monitor.count({
                where: { isDeleted: false, userId: userID },
            }),
        ]);

        return {
            items,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
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
                checkInterval: z.string().min(1).optional(),
                timeout: z.string().min(1).optional(),
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
                data: { ...updateData, updatedAt: new Date() }
            });
        }),
});
