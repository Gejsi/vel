import { createProtectedRouter } from './context'

export const deckRouter = createProtectedRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      const decks = await ctx.prisma.deck.findMany({
        where: { userId: ctx.session.user.id },
        select: {
          id: true,
          title: true,
          cards: true,
          createdAt: true,
          updatedAt: true,
        },
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
