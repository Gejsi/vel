import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import type { JsonValue } from '../../types/json'
import { createProtectedRouter } from './context'

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

const jsonSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

type PrismaJson = Prisma.NullTypes.JsonNull | Prisma.InputJsonValue

export const cardRouter = createProtectedRouter().mutation('save', {
  input: z.object({
    question: jsonSchema,
    answer: jsonSchema,
    deckId: z.number(),
    cardId: z.number(),
  }),
  async resolve({ ctx, input }) {
    const card = await ctx.prisma.card.upsert({
      where: {
        id: input.cardId,
      },
      create: {
        question: input.question as PrismaJson,
        answer: input.answer as PrismaJson,
        deckId: input.deckId,
        id: input.cardId,
      },
      update: {
        question: input.question as PrismaJson,
        answer: input.answer as PrismaJson,
        id: input.cardId,
      },
    })

    console.log(card)

    return card
  },
})
