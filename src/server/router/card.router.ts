import type { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'
import { z } from 'zod'
import { deckIdSchema } from '../../schemas/deck-id.schema'
import type { JsonValue } from '../../types/json'
import { createProtectedRouter } from './context'

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

const jsonSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

type PrismaJson = Prisma.NullTypes.JsonNull | Prisma.InputJsonValue

export const cardRouter = createProtectedRouter()
  .middleware(async ({ next, rawInput, ctx }) => {
    const parsedDeckId = z.object({ deckId: deckIdSchema }).safeParse(rawInput)

    if (!parsedDeckId.success) throw new TRPCError({ code: 'BAD_REQUEST' })

    const deck = await ctx.prisma.deck.findUnique({
      where: { id: parsedDeckId.data.deckId },
      select: { userId: true },
    })

    if (deck?.userId !== ctx.session.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Cannot access private deck',
      })

    return next()
  })
  .mutation('save', {
    input: z.object({
      question: jsonSchema,
      answer: jsonSchema,
      deckId: deckIdSchema,
      cardId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.update({
        where: { id: input.deckId },
        data: {
          updatedAt: dayjs().toDate(),
          cards: {
            update: {
              where: {
                id: input.cardId,
              },
              data: {
                question: input.question as PrismaJson,
                answer: input.answer as PrismaJson,
                id: input.cardId,
              },
            },
          },
        },
      })
    },
  })
  .mutation('create', {
    input: z.object({
      deckId: deckIdSchema,
    }),
    async resolve({ ctx, input }) {
      const initialValue = [{ type: 'paragraph' }]

      return await ctx.prisma.deck.update({
        where: { id: input.deckId },
        data: {
          updatedAt: dayjs().toDate(),
          cards: {
            create: {
              question: initialValue,
              answer: initialValue,
            },
          },
        },
      })
    },
  })
  .mutation('delete', {
    input: z.object({
      deckId: deckIdSchema,
      cardId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.deck.update({
        where: { id: input.deckId },
        data: {
          updatedAt: dayjs().toDate(),
          cards: {
            delete: {
              id: input.cardId,
            },
          },
        },
      })
    },
  })
