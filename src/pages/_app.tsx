import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import type { Maybe } from '@trpc/server'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps as NextAppProps } from 'next/app'
import type { AppType } from 'next/dist/shared/lib/utils'
import type { NextPage } from 'next/types'
import type { ReactElement, ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import superjson from 'superjson'
import Layout from '../components/Layout'
import { env } from '../env/client.mjs'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type PageProps = {
  session?: Maybe<Session>
  [x: string]: any
}

// omit Next.js default `pageProps` and extend with custom ones
type AppProps = Omit<NextAppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const AppHandler = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}

      {env.NEXT_PUBLIC_NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </SessionProvider>
  )
}) as AppType

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''

  if (env.NEXT_PUBLIC_VERCEL_URL) return `https://${env.NEXT_PUBLIC_VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${env.NEXT_PUBLIC_PORT ?? 3000}` // dev SSR should use localhost
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
