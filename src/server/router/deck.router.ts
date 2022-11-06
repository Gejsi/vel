import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { deckIdSchema } from '../../schemas/deck-id.schema'
import { deckTitleSchema } from '../../schemas/deck-title.schema'
import { createProtectedRouter } from './context'

// deck common needed fields
const commonSelector = Prisma.validator<Prisma.DeckSelect>()({
  id: true,
  title: true,
  cards: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
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
  .mutation('create', {
    async resolve({ ctx }) {
      return await ctx.prisma.deck.create({
        data: { userId: ctx.session.user.id },
      })
    },
  })
  .middleware(async ({ next, rawInput, ctx }) => {
    const parsedDeckId = z.object({ deckId: deckIdSchema }).safeParse(rawInput)

    if (!parsedDeckId.success) throw new TRPCError({ code: 'BAD_REQUEST' })

    const deck = await ctx.prisma.deck.findUnique({
      where: { id: parsedDeckId.data.deckId },
      select: commonSelector,
    })

    if (deck?.userId !== ctx.session.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Cannot access private deck',
      })

    return next({ ctx: { ...ctx, deck } })
  })
  .query('getById', {
    input: z.object({
      deckId: deckIdSchema,
    }),
    resolve({ ctx }) {
      if (!ctx.deck)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "This deck doesn't exist",
        })

      return ctx.deck
    },
  })
  .mutation('delete', {
    input: z.object({
      deckId: deckIdSchema,
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.delete({ where: { id: input.deckId } })
    },
  })
  .mutation('rename', {
    input: z.object({
      deckId: deckIdSchema,
      title: deckTitleSchema,
    }),
    async resolve({ ctx, input }) {
      const title = input.title.trim()
      const parsedTitle = deckTitleSchema.safeParse(title)

      if (!parsedTitle.success) throw new TRPCError({ code: 'BAD_REQUEST' })

      return await ctx.prisma.deck.update({
        where: { id: input.deckId },
        data: { title },
      })
    },
  })
