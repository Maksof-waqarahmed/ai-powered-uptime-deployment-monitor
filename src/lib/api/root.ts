import { monitorRouter } from "./router/create-monitor";
import { getURLs } from "./router/urls";
import { createTRPCRouter } from "./trpc";
export const appRouter = createTRPCRouter({
    monitor: monitorRouter,
    urls: getURLs
});

// export type definition of API
export type AppRouter = typeof appRouter;
