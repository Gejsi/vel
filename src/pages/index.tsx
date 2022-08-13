import Head from 'next/head'
import Spinner from '../components/Spinner'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel</title>
      </Head>

      <h1>Hello from Vel</h1>
      <button className='btn'>Greet</button>
      <Spinner />
    </>
  )
}

export default Home
