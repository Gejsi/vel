import { createNextApiHandler } from '@trpc/server/adapters/next'
import { prisma } from '../../../server/db/prisma'
import { appRouter } from '../../../server/router'
import { createContext } from '../../../server/router/context'

export default createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prisma.$disconnect(),
})
