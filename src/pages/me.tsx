import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Spinner from '../components/Spinner'
import type { NextPageWithLayout } from './_app'

const Me: NextPageWithLayout = () => {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <Spinner />

  return (
    <>
      <Head>
        <title>{session?.user?.name}'s profile</title>
      </Head>

      <h1>Personal page</h1>
    </>
  )
}

export default Me
