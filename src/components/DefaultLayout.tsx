import Head from 'next/head'
import { env } from 'process'
import { ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { trpc } from '../utils/trpc'
import Footer from './Footer'
import Navbar from './Navbar'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = trpc.useQuery(['auth.getSession'])

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>bird app</title>
      </Head>

      <Navbar session={session} />
      <main className='container mx-auto min-h-screen p-4'>
        <div className='py-4'></div>
        {children}
      </main>
      <Footer />

      {env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}

export default DefaultLayout
