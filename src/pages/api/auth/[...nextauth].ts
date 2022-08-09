import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { env } from '../../../env/server.mjs'
import { prisma } from '../../../server/db/prisma'

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id

      return session
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)
