import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import type { JsonValue } from '../../types/json'
import { createProtectedRouter } from './context'

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

const jsonSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

type PrismaJson = Prisma.NullTypes.JsonNull | Prisma.InputJsonValue

export const cardRouter = createProtectedRouter()
  .mutation('save', {
    input: z.object({
      question: jsonSchema,
      answer: jsonSchema,
      deckId: z.number(),
      cardId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.card.update({
        where: {
          id: input.cardId,
        },
        data: {
          question: input.question as PrismaJson,
          answer: input.answer as PrismaJson,
          id: input.cardId,
        },
      })
    },
  })
  .mutation('create', {
    input: z.object({
      deckId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const initialValue = [{ type: 'p', children: [{ text: '' }] }]

      return await ctx.prisma.card.create({
        data: {
          question: initialValue,
          answer: initialValue,
          deckId: input.deckId,
        },
      })
    },
  })
