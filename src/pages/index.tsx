import Head from 'next/head'
import HomeLayout from '../components/HomeLayout'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel landing page</title>
      </Head>

      <h1>Hello from Vel</h1>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Home
