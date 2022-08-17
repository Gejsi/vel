import Head from 'next/head'
import type { NextPageWithLayout } from './_app'

const Me: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Your profile</title>
      </Head>

      <h1>Personal page</h1>
    </>
  )
}

export default Me
