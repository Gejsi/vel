import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { httpLink } from '@trpc/client/links/httpLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { splitLink } from '@trpc/client/links/splitLink'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    // the server's full URL is needed to use SSR
    const url = `${getBaseUrl()}/api/trpc`

    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${60 * 60 * 24}` // one day in seconds
    )

    return {
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        splitLink({
          condition({ context }) {
            // check for context property `includeBatch`
            return context.includeBatch === true
          },
          // when condition is true, use batching
          true: httpBatchLink({ url }),
          // when condition is false, use normal request
          false: httpLink({ url }),
        }),
      ],
      url,
      transformer: superjson,
      headers: {
        // informs the server that it's an SSR request
        'x-ssr': '1',
      },
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      },
    }
  },

  ssr: false,
})(MyApp)
