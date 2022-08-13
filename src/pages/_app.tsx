import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import type { AppType } from 'next/dist/shared/lib/utils'
import type { NextPage } from 'next/types'
import type { ReactElement, ReactNode } from 'react'
import superjson from 'superjson'
import DefaultLayout from '../components/DefaultLayout'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const AppHandler = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={session}>
        <DefaultLayout>{page}</DefaultLayout>
      </SessionProvider>
    ))

  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}) as AppType

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
        httpBatchLink({ url, maxBatchSize: 10 }),
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
})(AppHandler)
