import { useSession } from 'next-auth/react'
import Head from 'next/head'
import HomeLayout from '../components/HomeLayout'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { data } = useSession()

  return (
    <>
      <h1>Hello from Vel, {data?.user?.name}</h1>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>Vel</title>
      </Head>
      <HomeLayout>{page}</HomeLayout>
    </>
  )
}

export default Home
