import Head from 'next/head'
import { MdAdd } from 'react-icons/md'
import Toolbar from '../components/Toolbar'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel | Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className='btn gap-2'>
          <MdAdd className='w-6 h-6' />
          Create deck
        </button>
      </Toolbar>

      <p>Content</p>
    </>
  )
}

export default Decks
