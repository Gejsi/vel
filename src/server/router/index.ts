import superjson from 'superjson'
import { cardRouter } from './card.router'
import { createRouter } from './context'
import { deckRouter } from './deck.router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('deck.', deckRouter)
  .merge('card.', cardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
