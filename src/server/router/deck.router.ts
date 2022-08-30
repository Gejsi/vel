import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { createProtectedRouter } from './context'

// deck common needed fields
const defaultSelector = Prisma.validator<Prisma.DeckSelect>()({
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
        select: defaultSelector,
      })
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log(input.id, typeof input.id)
      const parsedId = parseInt(input.id, 10)

      return await ctx.prisma.deck.findUniqueOrThrow({
        where: { id: parsedId },
        select: defaultSelector,
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
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.delete({ where: { id: input.id } })
    },
  })
