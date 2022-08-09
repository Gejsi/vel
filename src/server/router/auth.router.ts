import { createRouter } from './context'

// Example router with queries that can only be hit if the user requesting is signed in
export const authRouter = createRouter().query('getSession', {
  async resolve({ ctx }) {
    return await ctx.getUserSession()
  },
})
