import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return prisma.note.findMany({ orderBy: { updatedAt: "desc" } });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.note.findFirst({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        archived: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          archived: input.archived,
        },
      });
    }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        archived: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updates } = input;
      return await ctx.prisma.note.update({
        where: { id },
        data: { ...updates },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.delete({ where: { id: input.id } });
    }),
});
