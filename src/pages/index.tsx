import Head from 'next/head'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel</title>
      </Head>

      <h1>Hello from Vel</h1>
      <button className='btn'>Greet</button>
    </>
  )
}

export default Home
