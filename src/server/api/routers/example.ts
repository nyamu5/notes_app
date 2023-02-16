import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  test: protectedProcedure.query(({ ctx }) => {
    // ctx.prisma.
    return {
        result: "test"
      }
  }),
  
  notes: protectedProcedure.query(async ({ ctx, input }) => {
    const { prisma, session } = ctx;
    const db = await prisma.$connect();
    console.log({ db, input });
    
  })
});
