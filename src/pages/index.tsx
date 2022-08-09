import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

type TechnologyCardProps = {
  name: string
  description: string
  documentation: string
}

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>Vel</title>
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        Hello from Vel and {hello.data?.greeting}
        <button className='btn'>Greet</button>
      </main>
    </>
  )
}

export default Home
