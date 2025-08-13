import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { monitorSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";


export const monitorRouter = createTRPCRouter({
    add: protectedProcedure.input(
        z.object({
            name: z.string().min(1, "Name is required"),
            url: z.string().url("Invalid URL"),
            checkInterval: z.string().min(1),
            timeout: z.string().min(1),
            emailAlert: z.boolean(),
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