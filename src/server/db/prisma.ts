import { PrismaClient } from '@prisma/client'
import { env } from '../../env/server.mjs'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  prisma.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    )

    return result
  })

  global.prisma = prisma
}
