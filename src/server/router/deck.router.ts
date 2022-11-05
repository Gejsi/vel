import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { titleSchema } from '../../schemas/deck-title.schema'
import { createProtectedRouter } from './context'

// deck common needed fields
const commonSelector = Prisma.validator<Prisma.DeckSelect>()({
  id: true,
  title: true,
  cards: true,
  createdAt: true,
  updatedAt: true,
})

export const deckRouter = createProtectedRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.deck.findMany({
        where: { userId: ctx.session.user.id },
        select: commonSelector,
      })
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.findUniqueOrThrow({
        where: { id: input.id },
        select: commonSelector,
      })
    },
  })
  .mutation('create', {
    async resolve({ ctx }) {
      return await ctx.prisma.deck.create({
        data: { userId: ctx.session.user.id },
      })
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.delete({ where: { id: input.id } })
    },
  })
  .mutation('rename', {
    input: z.object({
      id: z.string(),
      title: titleSchema,
    }),
    async resolve({ ctx, input }) {
      const title = input.title.trim()
      const parsedTitle = titleSchema.safeParse(title)

      if (!parsedTitle.success) throw new TRPCError({ code: 'BAD_REQUEST' })

      return await ctx.prisma.deck.update({
        where: { id: input.id },
        data: { title },
      })
    },
  })
