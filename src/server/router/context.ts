import { router, TRPCError, type inferAsyncReturnType } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import {
  unstable_getServerSession as getServerSession,
  type Session,
} from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { prisma } from '../db/prisma'

interface CreateContextOptions {
  session: Session | null
}

/**
 * Inner function useful for:
 * - integration testing when we don't want to mock Next.js' request/response
 * - `createSSGHelpers` where we don't have a `req` or `res`
 */
export async function createContextInner(opts: CreateContextOptions) {
  return {
    session: opts.session,
    prisma,
  }
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res, authOptions)

  return await createContextInner({ session })
}

type Context = inferAsyncReturnType<typeof createContext>

export const createRouter = () => router<Context>()

export const createProtectedRouter = () =>
  createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    })
  })
