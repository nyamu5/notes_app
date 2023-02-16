import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { noteRouter } from "./routers/noteRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
