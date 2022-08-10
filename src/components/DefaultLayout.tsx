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
        <title>Vel</title>
      </Head>

      <div className='container mx-auto min-h-screen flex flex-col'>
        <Navbar session={session} />
        <main className='flex-1 p-2'>{children}</main>
        <Footer />
      </div>

      {env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}

export default DefaultLayout
