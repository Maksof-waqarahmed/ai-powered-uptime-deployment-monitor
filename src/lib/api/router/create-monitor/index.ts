import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";


export const monitorRouter = createTRPCRouter({
    add: protectedProcedure.input(
        z.object({
            name: z.string().min(1, "Name is required"),
            url: z.string().url("Invalid URL"),
            checkInterval: z.string().min(1),
            timeout: z.string().min(1),
            emailAlert: z.boolean(),
            slackAlert: z.boolean(),
            slackWebhook: z.string().optional(),
            email: z.string().email().optional()
        })
    ).mutation(async ({ ctx, input }) => {
        const userID = ctx.session.user.id;

        try {
            return ctx.prisma.monitor.create({
                data: {
                    name: input.name,
                    url: input.url,
                    checkInterval: input.checkInterval,
                    timeout: input.timeout,
                    userId: userID,
                    emailAlert: input.emailAlert || false,
                    slackAlert: input.slackAlert || false,
                    slackWebhook: input.slackWebhook || null,
                    email: input.email || null,
                    nextCheckAt: new Date(Date.now() + Number(input.checkInterval) * 60 * 1000)
                }
            })
        } catch (error: any) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error
            })

        }
    }),
    getAllMonitors: protectedProcedure.query(async ({ ctx }) => {
        const userID = ctx.session.user.id;

        return await ctx.prisma.monitorLog.findMany({
            where: { monitor: { userId: userID } },
            include: {
                monitor: {
                    select: {
                        name: true,
                        url: true,
                    }
                }
            },
            orderBy: {
                checkedAt: "desc"
            }
        })

    })
})



{/* Slack Alert */ }
// <FormField
//     control={form.control}
//     name="slackAlert"
//     render={({ field }) => (
//         <FormItem className="flex items-center justify-between">
//             <div>
//                 <FormLabel>Slack Alerts</FormLabel>
//                 <p className="text-sm text-muted-foreground">Send notifications to your Slack channel</p>
//             </div>
//             <FormControl>
//                 <Switch
//                      checked={field.value}
//                      onCheckedChange={field.onChange}
//                  />
//                 <div className="flex gap-4 mt-6">
//                     <Button>
//                         {isLoading ? "Creating Monitor..." : "Create Monitor"}
//                         Connect Slack
//                     </Button>
//                 </div>
//             </FormControl>
//         </FormItem>
//     )}
// />