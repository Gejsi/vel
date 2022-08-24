import Head from 'next/head'
import Toolbar from '../components/Toolbar'
import type { NextPageWithLayout } from './_app'

const Editor: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel | Editor</title>
      </Head>

      <Toolbar title='Editor' />
      <span>Editor</span>
    </>
  )
}

export default Editor
