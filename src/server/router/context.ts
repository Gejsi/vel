import { inferAsyncReturnType, router, TRPCError } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import {
  Session,
  unstable_getServerSession as getServerSession,
} from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { prisma } from '../db/prisma'

interface CreateContextOptions {
  getUserSession: () => Promise<Session | null>
}

/**
 * inner function useful for:
 * - Integration testing when we don't want to mock Next.js' request/response
 * - `createSSGHelpers` where we don't have a `req` or `res`
 */
export async function createInnerContext(opts: CreateContextOptions) {
  return {
    getUserSession: opts.getUserSession,
    prisma,
  }
}

export async function createContext(opts: CreateNextContextOptions) {
  const getUserSession = async () =>
    await getServerSession(opts.req, opts.res, authOptions)

  return await createInnerContext({
    getUserSession,
  })
}

type Context = inferAsyncReturnType<typeof createContext>

export const createRouter = () => router<Context>()

// Creates a tRPC router that asserts all queries and mutations are from an authorized user.
// Will throw an unauthorized error if a user is not signed in.
export const createProtectedRouter = createRouter().middleware(
  async ({ ctx, next }) => {
    const session = await ctx.getUserSession()
    if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' })

    return next({
      ctx: {
        ...ctx,
        session, // session is known to be non-null and will be passed to other procedures
      },
    })
  }
)
