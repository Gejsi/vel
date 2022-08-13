import { useSession } from 'next-auth/react'
import Head from 'next/head'
import type { NextPageWithLayout } from './_app'

const Me: NextPageWithLayout = () => {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <h1>Loading</h1>

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
