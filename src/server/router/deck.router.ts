import { Prisma } from '@prisma/client'
import idSchema from '../../schemas/id.schema'
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
      const decks = await ctx.prisma.deck.findMany({
        where: { userId: ctx.session.user.id },
        select: defaultSelector,
      })

      return decks
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
    input: idSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.delete({ where: { id: input.id } })
    },
  })
