import superjson from 'superjson'
import { createRouter } from './context'
import { deckRouter } from './deck.router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('deck.', deckRouter)

// export type definition of API
export type AppRouter = typeof appRouter
